"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface CameraProps {
  onCapture: (imageBase64: string) => void;
}

interface CameraDevice {
  deviceId: string;
  label: string;
}

interface CameraCapabilities {
  hasZoom: boolean;
  zoomMin: number;
  zoomMax: number;
  zoomStep: number;
  currentZoom: number;
}

export function Camera({ onCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  
  // Camera selection state
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [availableDevices, setAvailableDevices] = useState<CameraDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [showDeviceSelector, setShowDeviceSelector] = useState(false);
  
  // Zoom state
  const [capabilities, setCapabilities] = useState<CameraCapabilities | null>(null);
  const [zoom, setZoom] = useState(1);

  // Enumerate available video devices
  const enumerateDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices
        .filter((d) => d.kind === "videoinput")
        .map((d, index) => ({
          deviceId: d.deviceId,
          label: d.label || `Camera ${index + 1}`,
        }));
      setAvailableDevices(videoDevices);
    } catch (err) {
      console.error("Error enumerating devices:", err);
    }
  }, []);

  // Stop current stream
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  // Start camera with current settings
  const startCamera = useCallback(async () => {
    // Stop any existing stream first
    stopStream();
    
    try {
      // Build constraints
      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1920 },
          ...(selectedDeviceId 
            ? { deviceId: { exact: selectedDeviceId } }
            : { facingMode: facingMode }
          ),
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError(null);
        
        // Check for zoom and other capabilities
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack && "getCapabilities" in videoTrack) {
          try {
            const caps = videoTrack.getCapabilities() as MediaTrackCapabilities & {
              zoom?: { min: number; max: number; step: number };
            };
            
            if (caps.zoom) {
              const settings = videoTrack.getSettings() as MediaTrackSettings & { zoom?: number };
              setCapabilities({
                hasZoom: true,
                zoomMin: caps.zoom.min,
                zoomMax: caps.zoom.max,
                zoomStep: caps.zoom.step,
                currentZoom: settings.zoom || caps.zoom.min,
              });
              setZoom(settings.zoom || caps.zoom.min);
            } else {
              setCapabilities(null);
            }
          } catch {
            setCapabilities(null);
          }
        }
      }
      
      // Enumerate devices after getting permission (labels become available)
      await enumerateDevices();
      
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Unable to access camera. Please ensure you've granted camera permissions."
      );
    }
  }, [facingMode, selectedDeviceId, stopStream, enumerateDevices]);

  // Handle zoom change
  const handleZoomChange = useCallback(async (newZoom: number) => {
    if (!streamRef.current) return;
    
    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (!videoTrack) return;
    
    try {
      await videoTrack.applyConstraints({
        // @ts-expect-error - zoom is not in the standard type definitions yet
        advanced: [{ zoom: newZoom }],
      });
      setZoom(newZoom);
    } catch (err) {
      console.error("Error applying zoom:", err);
    }
  }, []);

  // Toggle between front and back camera
  const toggleCamera = useCallback(() => {
    setSelectedDeviceId(null); // Reset device selection when toggling
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  // Select a specific device
  const selectDevice = useCallback((deviceId: string) => {
    setSelectedDeviceId(deviceId);
    setShowDeviceSelector(false);
  }, []);

  // Effect to start camera when facingMode or device changes
  useEffect(() => {
    startCamera();

    return () => {
      stopStream();
    };
  }, [facingMode, selectedDeviceId]); // eslint-disable-line react-hooks/exhaustive-deps

  const capturePhoto = useCallback(() => {
    // Start countdown
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);

          // Take the photo
          setTimeout(() => {
            if (videoRef.current && canvasRef.current) {
              const video = videoRef.current;
              const canvas = canvasRef.current;

              // Set canvas to square (crop to center)
              const size = Math.min(video.videoWidth, video.videoHeight);
              canvas.width = size;
              canvas.height = size;

              const ctx = canvas.getContext("2d");
              if (ctx) {
                // Only mirror the image for front-facing camera (selfie mode)
                const shouldMirror = facingMode === "user" && !selectedDeviceId;
                
                if (shouldMirror) {
                  ctx.translate(size, 0);
                  ctx.scale(-1, 1);
                }

                // Calculate crop offset to center
                const offsetX = (video.videoWidth - size) / 2;
                const offsetY = (video.videoHeight - size) / 2;

                ctx.drawImage(
                  video,
                  offsetX,
                  offsetY,
                  size,
                  size,
                  0,
                  0,
                  size,
                  size
                );

                // Flash effect
                setFlash(true);
                setTimeout(() => setFlash(false), 150);

                // Get base64 without the data URL prefix
                const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
                const base64 = dataUrl.split(",")[1];
                onCapture(base64);
              }
            }
            setCountdown(null);
          }, 100);

          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [onCapture, facingMode, selectedDeviceId]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="text-6xl mb-4">📷</div>
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={startCamera}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full text-white font-bold text-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-4">
      {/* Camera viewfinder */}
      <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${
            facingMode === "user" && !selectedDeviceId ? "scale-x-[-1]" : ""
          }`}
        />

        {/* Countdown overlay */}
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-9xl font-bold text-white animate-pulse">
              {countdown}
            </span>
          </div>
        )}

        {/* Flash effect */}
        {flash && <div className="absolute inset-0 bg-white animate-pulse" />}

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-yellow-400 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-yellow-400 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-yellow-400 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-yellow-400 rounded-br-lg" />

        {/* Camera controls overlay */}
        <div className="absolute top-4 right-14 flex gap-2">
          {/* Flip camera button */}
          <button
            onClick={toggleCamera}
            disabled={countdown !== null}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white 
                       flex items-center justify-center hover:bg-black/70 
                       disabled:opacity-50 transition-all"
            title={facingMode === "user" ? "Switch to back camera" : "Switch to front camera"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>

          {/* Device selector button (only show if multiple devices) */}
          {availableDevices.length > 1 && (
            <button
              onClick={() => setShowDeviceSelector(!showDeviceSelector)}
              disabled={countdown !== null}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white 
                         flex items-center justify-center hover:bg-black/70 
                         disabled:opacity-50 transition-all"
              title="Select camera"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Device selector dropdown */}
        {showDeviceSelector && availableDevices.length > 1 && (
          <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-2 min-w-48">
            <p className="text-white/60 text-xs px-3 py-1 uppercase tracking-wide">
              Select Camera
            </p>
            {availableDevices.map((device) => (
              <button
                key={device.deviceId}
                onClick={() => selectDevice(device.deviceId)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedDeviceId === device.deviceId
                    ? "bg-pink-500 text-white"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {device.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Zoom slider (only show if camera supports zoom) */}
      {capabilities?.hasZoom && (
        <div className="w-full max-w-md mt-4 px-4">
          <div className="flex items-center gap-3">
            <span className="text-white/70 text-sm">🔍</span>
            <input
              type="range"
              min={capabilities.zoomMin}
              max={capabilities.zoomMax}
              step={capabilities.zoomStep}
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              disabled={countdown !== null}
              className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 
                         [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white 
                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg
                         [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <span className="text-white/70 text-sm min-w-[3ch]">
              {zoom.toFixed(1)}x
            </span>
          </div>
        </div>
      )}

      {/* Capture button */}
      <button
        onClick={capturePhoto}
        disabled={!isStreaming || countdown !== null}
        className="mt-6 w-24 h-24 rounded-full bg-white border-8 border-pink-500 shadow-lg 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:scale-105 active:scale-95 transition-transform
                   flex items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-orange-500" />
      </button>

      <p className="mt-4 text-white/70 text-center">
        {facingMode === "user" ? "📸 Selfie mode" : "📷 Back camera"} • Tap to capture!
      </p>
    </div>
  );
}
