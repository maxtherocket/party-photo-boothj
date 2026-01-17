"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Sprinkling some magic... ✨",
  "Adding extra salsa... 🌶️",
  "Mixing the perfect vibe... 🎨",
  "Almost there... 🚀",
  "Making it legendary... 🌟",
  "Final touches... 💫",
];

interface ProcessingViewProps {
  sceneName: string;
}

export function ProcessingView({ sceneName }: ProcessingViewProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      {/* Animated loader */}
      <div className="relative w-32 h-32 mb-8">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 border-r-pink-500 animate-spin" />
        {/* Inner spinning ring (opposite direction) */}
        <div
          className="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-400 border-l-yellow-500 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl animate-bounce">🎨</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">
        Creating Your {sceneName}!
      </h2>

      <p className="text-xl text-yellow-400 animate-pulse min-h-[2rem]">
        {LOADING_MESSAGES[messageIndex]}
      </p>

      <p className="mt-8 text-white/50 text-sm">
        This usually takes 10-20 seconds
      </p>

      {/* Fun animated dots */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
