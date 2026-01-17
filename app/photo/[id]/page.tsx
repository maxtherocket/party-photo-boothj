"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SCENES } from "@/lib/scenes";

export default function PhotoPage() {
  const params = useParams();
  const photoId = params.id as Id<"photos">;

  const photo = useQuery(api.photos.getPhoto, { photoId });

  const scene = photo ? SCENES.find((s) => s.id === photo.scene) : null;

  const handleDownload = async () => {
    if (!photo?.resultUrl) return;

    try {
      const response = await fetch(photo.resultUrl);
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

  if (photo === undefined) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🌮</div>
          <p className="text-white text-xl">Loading your photo...</p>
        </div>
      </main>
    );
  }

  if (photo === null) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-2xl font-bold text-white mb-2">Photo Not Found</h1>
          <p className="text-white/70 mb-6">
            This photo might have been deleted or the link is incorrect.
          </p>
          <Link
            href="/booth"
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 
                     rounded-2xl text-white font-bold text-lg shadow-lg"
          >
            Take a New Photo
          </Link>
        </div>
      </main>
    );
  }

  if (photo.status === "processing") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl animate-spin mb-4">🎨</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Still Processing...
          </h1>
          <p className="text-white/70">
            Your photo is being transformed. Check back in a moment!
          </p>
        </div>
      </main>
    );
  }

  if (photo.status === "failed") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😅</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Processing Failed
          </h1>
          <p className="text-white/70 mb-6">
            Sorry, something went wrong with this photo.
          </p>
          <Link
            href="/booth"
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 
                     rounded-2xl text-white font-bold text-lg shadow-lg"
          >
            Try Again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center p-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">
          🌮 Fiesta Photo Booth 🎉
        </h1>
        {scene && (
          <p className="text-white/70 mb-6">
            {scene.emoji} {scene.name}
          </p>
        )}

        {/* Photo */}
        {photo.resultUrl && (
          <div className="w-full max-w-md aspect-square rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl mb-6">
            <img
              src={photo.resultUrl}
              alt="Your transformed photo"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={handleDownload}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 
                     rounded-2xl text-white font-bold text-lg shadow-lg
                     hover:from-green-600 hover:to-emerald-700 active:scale-95 transition-all"
          >
            📥 Download Photo
          </button>

          <Link
            href="/booth"
            className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-orange-500 
                     rounded-2xl text-white font-bold text-lg shadow-lg text-center
                     hover:from-pink-600 hover:to-orange-600 active:scale-95 transition-all"
          >
            📸 Take Your Own Photo
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-white/50 text-sm text-center">
          Created at the Taco Fiesta Party 🎉
        </p>
      </div>
    </main>
  );
}
