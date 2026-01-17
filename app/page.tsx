"use client";

import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [boothUrl, setBoothUrl] = useState("");

  useEffect(() => {
    setBoothUrl(`${window.location.origin}/booth`);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 overflow-hidden">
      {/* Animated background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-yellow-500/20 rounded-full blur-2xl animate-pulse" />

        {/* Floating emojis */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce" style={{ animationDelay: "0s" }}>🌮</div>
        <div className="absolute top-40 right-10 text-4xl animate-bounce" style={{ animationDelay: "0.5s" }}>🎉</div>
        <div className="absolute bottom-40 left-20 text-4xl animate-bounce" style={{ animationDelay: "1s" }}>🎊</div>
        <div className="absolute bottom-20 right-20 text-4xl animate-bounce" style={{ animationDelay: "1.5s" }}>🌶️</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-bounce" style={{ animationDelay: "0.3s" }}>🥳</div>
        <div className="absolute top-1/3 right-5 text-3xl animate-bounce" style={{ animationDelay: "0.8s" }}>✨</div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-300 drop-shadow-lg mb-4">
            🌮 Taco Fiesta
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            AI Photo Booth
          </h2>
          <p className="text-white/80 mt-4 text-lg max-w-md">
            Take a selfie, pick a fun scene, and watch AI transform you into something amazing!
          </p>
        </div>

        {/* QR Code Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 shadow-2xl mb-8">
          <p className="text-white text-center mb-4 font-semibold">
            📱 Scan to join on your phone!
          </p>
          <div className="bg-white p-4 rounded-2xl">
            {boothUrl && <QRCodeSVG value={boothUrl} size={200} />}
          </div>
        </div>

        {/* Direct link button */}
        <Link
          href="/booth"
          className="group relative px-12 py-5 bg-gradient-to-r from-yellow-400 via-pink-500 to-orange-500 
                   rounded-full text-white font-bold text-xl shadow-2xl
                   hover:scale-105 active:scale-95 transition-all duration-200
                   overflow-hidden"
        >
          <span className="relative z-10">Start Photo Booth →</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-pink-600 to-orange-600 
                        opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Instructions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">📸</div>
            <h3 className="text-white font-bold mb-1">1. Take a Selfie</h3>
            <p className="text-white/60 text-sm">Strike a pose with friends!</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🎨</div>
            <h3 className="text-white font-bold mb-1">2. Pick a Scene</h3>
            <p className="text-white/60 text-sm">Choose from fun themes</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-2">✨</div>
            <h3 className="text-white font-bold mb-1">3. Get Transformed</h3>
            <p className="text-white/60 text-sm">AI magic in seconds!</p>
          </div>
        </div>

        {/* Footer */}
        <p className="absolute bottom-4 text-white/40 text-sm">
          Made with ❤️ for the Fiesta
        </p>
      </div>
    </main>
  );
}
