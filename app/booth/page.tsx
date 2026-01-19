"use client";

import { useState, useCallback } from "react";
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Camera } from "@/components/Camera";
import { SceneSelector } from "@/components/SceneSelector";
import { ProcessingView } from "@/components/ProcessingView";
import { ResultView } from "@/components/ResultView";
import { Scene } from "@/lib/scenes";

type BoothStep = "camera" | "scene" | "processing" | "result";

export default function BoothPage() {
  const [step, setStep] = useState<BoothStep>("camera");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [photoId, setPhotoId] = useState<Id<"photos"> | null>(null);

  const generateUploadUrl = useMutation(api.photos.generateUploadUrl);
  const createPhoto = useMutation(api.photos.createPhoto);
  const generateImage = useAction(api.generateImage.generateTransformedImage);

  // Poll for photo status
  const photo = useQuery(
    api.photos.getPhoto,
    photoId ? { photoId } : "skip"
  );

  // When photo completes, move to result step
  if (photo?.status === "complete" && step === "processing") {
    setStep("result");
  }

  const handleCapture = useCallback((imageBase64: string) => {
    setCapturedImage(imageBase64);
    setStep("scene");
  }, []);

  const handleSceneSelect = useCallback(
    async (scene: Scene) => {
      if (!capturedImage) return;

      setSelectedScene(scene);
      setStep("processing");

      try {
        // Upload the image to Convex storage
        const uploadUrl = await generateUploadUrl();

        // Convert base64 to blob
        const binaryString = atob(capturedImage);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "image/jpeg" });

        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": "image/jpeg" },
          body: blob,
        });
        const { storageId } = await result.json();

        // Create photo record
        const newPhotoId = await createPhoto({
          storageId,
          scene: scene.id,
        });
        setPhotoId(newPhotoId);

        // Trigger image generation
        await generateImage({
          photoId: newPhotoId,
          imageBase64: capturedImage,
          scenePrompt: scene.prompt,
        });
      } catch (error) {
        console.error("Error processing photo:", error);
        // Reset to camera on error
        setStep("camera");
        setCapturedImage(null);
        setSelectedScene(null);
      }
    },
    [capturedImage, generateUploadUrl, createPhoto, generateImage]
  );

  const handleRetake = useCallback(() => {
    setStep("camera");
    setCapturedImage(null);
    setSelectedScene(null);
    setPhotoId(null);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,_rgba(99,102,241,0.2),transparent_55%)]" />
        <div className="absolute -top-24 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col max-w-5xl mx-auto w-full px-4 pb-10">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="text-white font-semibold tracking-tight flex items-center gap-2">
            <span className="text-indigo-300">✨</span> AI Photo Booth
          </div>
          <a
            href="/"
            className="text-xs font-medium text-white/60 hover:text-white/90 transition"
          >
            Back to Home
          </a>
        </header>

        {/* Main content */}
        <div className="flex-1 flex flex-col rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
          {step === "camera" && <Camera onCapture={handleCapture} />}

          {step === "scene" && capturedImage && (
            <SceneSelector
              onSelect={handleSceneSelect}
              capturedImage={capturedImage}
            />
          )}

          {step === "processing" && selectedScene && (
            <ProcessingView sceneName={selectedScene.name} />
          )}

          {step === "result" && photo?.resultUrl && photoId && (
            <ResultView
              resultUrl={photo.resultUrl}
              photoId={photoId}
              onRetake={handleRetake}
            />
          )}

          {/* Error state */}
          {step === "processing" && photo?.status === "failed" && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="text-5xl mb-4 grayscale">😅</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Processing Issue
              </h2>
              <p className="text-slate-400 mb-6 max-w-xs mx-auto">
                We hit a snag while generating your image. Give it another try.
              </p>
              <button
                onClick={handleRetake}
                className="px-7 py-3 bg-white text-black rounded-full font-bold text-base hover:bg-slate-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
