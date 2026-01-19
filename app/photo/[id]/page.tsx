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
      a.download = `ai-photo-${photoId}.png`;
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
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-bounce mb-4">✨</div>
          <p className="text-white text-lg">Loading your photo...</p>
        </div>
      </main>
    );
  }

  if (photo === null) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-2xl font-bold text-white mb-2">Photo Not Found</h1>
          <p className="text-white/70 mb-6">
            This photo might have been deleted or the link is incorrect.
          </p>
          <Link
            href="/booth"
            className="inline-block px-8 py-3 rounded-full bg-white text-slate-900 font-semibold shadow-lg hover:bg-indigo-50 transition"
          >
            Take a New Photo
          </Link>
        </div>
      </main>
    );
  }

  if (photo.status === "processing") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
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
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
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
            className="inline-block px-8 py-3 rounded-full bg-white text-slate-900 font-semibold shadow-lg hover:bg-indigo-50 transition"
          >
            Try Again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden relative">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,_rgba(99,102,241,0.2),transparent_55%)]" />
        <div className="absolute -top-24 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center p-4 py-10">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          AI Photo Booth
        </h1>
        {scene && (
          <p className="text-white/60 mb-6">
            {scene.emoji} {scene.name}
          </p>
        )}

        {/* Photo */}
        {photo.resultUrl && (
          <div className="w-full max-w-md aspect-[9/16] rounded-3xl overflow-hidden border border-white/20 shadow-2xl mb-6">
            <img
              src={photo.resultUrl}
              alt="Your transformed photo"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
          <button
            onClick={handleDownload}
            className="w-full py-3 px-4 rounded-2xl bg-white text-slate-900 font-semibold shadow-lg hover:bg-indigo-50 transition"
          >
            Download
          </button>

          <Link
            href="/booth"
            className="w-full py-3 px-4 rounded-2xl bg-white/10 text-white font-semibold border border-white/15 text-center hover:bg-white/15 transition"
          >
            Take your own
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-white/50 text-sm text-center">
          Created with AI Photo Booth
        </p>
      </div>
    </main>
  );
}
