"use client";

import { useState, useCallback } from "react";
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Camera } from "@/components/Camera";
import { SceneSelector } from "@/components/SceneSelector";
import { ProcessingView } from "@/components/ProcessingView";
import { ResultView } from "@/components/ResultView";
import { Scene, SCENES } from "@/lib/scenes";

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
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            🌮 Fiesta Photo Booth 🎉
          </h1>
        </header>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
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
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="text-6xl mb-4">😅</div>
              <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
              <p className="text-white/70 mb-6">
                Something went wrong. Let&apos;s try again!
              </p>
              <button
                onClick={handleRetake}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 
                         rounded-2xl text-white font-bold text-lg shadow-lg"
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
