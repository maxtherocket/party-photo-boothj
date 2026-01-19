"use client";

import { useState } from "react";
import { SCENES, Scene, buildCustomPrompt } from "@/lib/scenes";

interface SceneSelectorProps {
  onSelect: (scene: Scene) => void;
  capturedImage: string;
}

export function SceneSelector({ onSelect, capturedImage }: SceneSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  const handleSceneClick = (scene: Scene) => {
    if (scene.isCustom) {
      setShowCustomInput(true);
    } else {
      onSelect(scene);
    }
  };

  const handleCustomSubmit = () => {
    if (!customPrompt.trim()) return;
    
    const customScene: Scene = {
      id: "custom",
      name: "Custom Scene",
      emoji: "✨",
      prompt: buildCustomPrompt(customPrompt.trim()),
    };
    
    onSelect(customScene);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Preview of captured photo */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
            <img
              src={`data:image/jpeg;base64,${capturedImage}`}
              alt="Your photo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-2">
            Choose a scene
          </h2>
          <p className="text-white/70">
            Pick a style or create a custom prompt for your transformation.
          </p>
        </div>
      </div>

      {/* Custom prompt modal */}
      {showCustomInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-950/95 rounded-3xl p-6 max-w-md w-full border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="text-xl">✨</span> Create a custom scene
              </h3>
              <button
                onClick={() => setShowCustomInput(false)}
                className="text-white/60 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <p className="text-white/70 text-sm mb-4">
              Describe the scene you want. We&apos;ll keep your face and identity
              intact and match the style to your vibe.
            </p>

            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., a cinematic rooftop at night with neon signs and rain..."
              className="w-full h-32 p-4 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/40 resize-none focus:outline-none focus:border-indigo-400 transition-colors"
              autoFocus
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowCustomInput(false)}
                className="flex-1 py-3 rounded-xl border border-white/15 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSubmit}
                disabled={!customPrompt.trim()}
                className="flex-1 py-3 rounded-xl bg-white text-slate-900 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 transition-all"
              >
                Generate Scene
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scene grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-2">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => handleSceneClick(scene)}
              className={`group relative rounded-2xl p-4 border transition-all duration-200 active:scale-95 ${
                scene.isCustom
                  ? "bg-white/10 border-indigo-300/40 hover:bg-white/15"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <div className="text-4xl mb-2">{scene.emoji}</div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                {scene.name}
              </h3>
              {scene.isCustom && (
                <p className="text-white/60 text-xs mt-1">Custom prompt</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
