"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface ResultViewProps {
  resultUrl: string;
  photoId: string;
  onRetake: () => void;
  onTryAnotherScene: () => void;
}

export function ResultView({ resultUrl, photoId, onRetake, onTryAnotherScene }: ResultViewProps) {
  const [showQR, setShowQR] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/photo/${photoId}`
      : "";

  const handleDownload = async () => {
    try {
      const response = await fetch(resultUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-photo-${photoId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My AI Photo Booth Result",
          text: "Check out my AI-transformed photo!",
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
        setShowQR(true);
      }
    } else {
      setShowQR(true);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Your photo is ready</h2>
        <p className="text-sm text-white/60 mt-1">
          Download, share, or try a different scene with the same photo.
        </p>
      </div>

      {/* Result image */}
      <div className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
        <img
          src={resultUrl}
          alt="Your transformed photo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto">
        <button
          onClick={handleDownload}
          className="py-3 px-4 rounded-2xl bg-white text-slate-900 font-semibold shadow-lg hover:bg-indigo-50 transition-all"
        >
          Download
        </button>

        <button
          onClick={handleShare}
          className="py-3 px-4 rounded-2xl bg-white/10 text-white font-semibold border border-white/15 hover:bg-white/15 transition-all"
        >
          Share
        </button>

        <button
          onClick={onTryAnotherScene}
          className="py-3 px-4 rounded-2xl bg-indigo-500/80 text-white font-semibold hover:bg-indigo-500 transition-all"
        >
          Try Another Scene
        </button>

        <button
          onClick={onRetake}
          className="py-3 px-4 rounded-2xl bg-transparent text-white/80 font-semibold border border-white/10 hover:text-white hover:border-white/30 transition-all"
        >
          Take New Photo
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-950 rounded-3xl p-6 max-w-sm w-full text-center border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Scan to open
            </h3>
            <div className="bg-white p-4 rounded-2xl inline-block mb-4">
              <QRCodeSVG value={shareUrl} size={200} />
            </div>
            <p className="text-white/60 text-sm mb-4 break-all">
              {shareUrl}
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full py-3 bg-white text-slate-900 rounded-xl font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
