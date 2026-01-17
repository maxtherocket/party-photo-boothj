"use client";

import { SCENES, Scene } from "@/lib/scenes";

interface SceneSelectorProps {
  onSelect: (scene: Scene) => void;
  capturedImage: string;
}

export function SceneSelector({ onSelect, capturedImage }: SceneSelectorProps) {
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
        Pick a fun transformation for your photo
      </p>

      {/* Scene grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 pb-4">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSelect(scene)}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 
                         border-2 border-white/20 hover:border-yellow-400 
                         hover:bg-white/20 transition-all duration-200
                         active:scale-95"
            >
              <div className="text-5xl mb-2">{scene.emoji}</div>
              <h3 className="font-bold text-white text-lg">{scene.name}</h3>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                            bg-gradient-to-br from-yellow-400/20 to-pink-500/20 
                            transition-opacity pointer-events-none" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
