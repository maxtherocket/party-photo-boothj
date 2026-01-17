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
    <div className="flex flex-col h-full p-4">
      {/* Preview of captured photo */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl">
          <img
            src={`data:image/jpeg;base64,${capturedImage}`}
            alt="Your photo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-white mb-2">
        Choose Your Scene!
      </h2>
      <p className="text-white/70 text-center mb-6">
        Pick a wild transformation for your photo
      </p>

      {/* Custom prompt modal */}
      {showCustomInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-6 max-w-md w-full border-2 border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">✨</span> Create Your Scene
              </h3>
              <button
                onClick={() => setShowCustomInput(false)}
                className="text-white/60 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <p className="text-white/70 text-sm mb-4">
              Describe the scene you want to be in. Be creative and specific! 
              We&apos;ll add a fun hat and keep you looking like yourself.
            </p>

            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., I'm a pirate captain on a ship during a storm, fighting a giant octopus..."
              className="w-full h-32 p-4 rounded-xl bg-black/30 border-2 border-white/20 
                         text-white placeholder:text-white/40 resize-none
                         focus:outline-none focus:border-yellow-400 transition-colors"
              autoFocus
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowCustomInput(false)}
                className="flex-1 py-3 rounded-xl border-2 border-white/20 text-white font-bold
                           hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSubmit}
                disabled={!customPrompt.trim()}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 
                           text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed
                           hover:from-yellow-300 hover:to-orange-400 transition-all"
              >
                Let&apos;s Go! 🚀
              </button>
            </div>

            <p className="text-white/50 text-xs text-center mt-4">
              Pro tip: The wilder the description, the more fun the result!
            </p>
          </div>
        </div>
      )}

      {/* Scene grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 pb-4">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => handleSceneClick(scene)}
              className={`group relative backdrop-blur-sm rounded-2xl p-4 
                         border-2 hover:border-yellow-400 
                         hover:bg-white/20 transition-all duration-200
                         active:scale-95 ${
                           scene.isCustom
                             ? "bg-gradient-to-br from-yellow-500/20 to-pink-500/20 border-yellow-400/50"
                             : "bg-white/10 border-white/20"
                         }`}
            >
              <div className="text-5xl mb-2">{scene.emoji}</div>
              <h3 className="font-bold text-white text-lg">{scene.name}</h3>
              {scene.isCustom && (
                <p className="text-white/60 text-xs mt-1">Type your own!</p>
              )}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                            bg-gradient-to-br from-yellow-400/20 to-pink-500/20 
                            transition-opacity pointer-events-none"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
