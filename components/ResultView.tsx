"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface ResultViewProps {
  resultUrl: string;
  photoId: string;
  onRetake: () => void;
}

export function ResultView({ resultUrl, photoId, onRetake }: ResultViewProps) {
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
      a.download = `fiesta-photo-${photoId}.png`;
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
          title: "My Fiesta Photo!",
          text: "Check out my awesome AI-transformed photo!",
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
    <div className="flex flex-col items-center h-full p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        🎉 Your Photo is Ready! 🎉
      </h2>

      {/* Result image */}
      <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl mb-6">
        <img
          src={resultUrl}
          alt="Your transformed photo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={handleDownload}
          className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 
                     rounded-2xl text-white font-bold text-lg shadow-lg
                     hover:from-green-600 hover:to-emerald-700 active:scale-95 transition-all"
        >
          📥 Download Photo
        </button>

        <button
          onClick={handleShare}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 
                     rounded-2xl text-white font-bold text-lg shadow-lg
                     hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all"
        >
          📤 Share Photo
        </button>

        <button
          onClick={onRetake}
          className="w-full py-4 px-6 bg-white/10 backdrop-blur-sm
                     rounded-2xl text-white font-bold text-lg border-2 border-white/30
                     hover:bg-white/20 active:scale-95 transition-all"
        >
          📸 Take Another Photo
        </button>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Scan to View & Download
            </h3>
            <div className="bg-white p-4 rounded-2xl inline-block mb-4">
              <QRCodeSVG value={shareUrl} size={200} />
            </div>
            <p className="text-gray-600 text-sm mb-4 break-all">{shareUrl}</p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full py-3 bg-gray-800 text-white rounded-xl font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
