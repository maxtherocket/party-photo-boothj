"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface CameraProps {
  onCapture: (imageBase64: string) => void;
}

export function Camera({ onCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Unable to access camera. Please ensure you've granted camera permissions."
      );
    }
  }, []);

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera]);

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
                // Mirror the image horizontally for selfie effect
                ctx.translate(size, 0);
                ctx.scale(-1, 1);

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
  }, [onCapture]);

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
    <div className="relative flex flex-col items-center justify-center h-full">
      {/* Camera viewfinder */}
      <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
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
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Capture button */}
      <button
        onClick={capturePhoto}
        disabled={!isStreaming || countdown !== null}
        className="mt-8 w-24 h-24 rounded-full bg-white border-8 border-pink-500 shadow-lg 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:scale-105 active:scale-95 transition-transform
                   flex items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-orange-500" />
      </button>

      <p className="mt-4 text-white/70 text-center">
        Tap the button to take your photo!
      </p>
    </div>
  );
}
