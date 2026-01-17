"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { GoogleGenAI } from "@google/genai";

export const generateTransformedImage = action({
  args: {
    photoId: v.id("photos"),
    imageBase64: v.string(),
    scenePrompt: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY not set");
      await ctx.runMutation(api.photos.markPhotoFailed, {
        photoId: args.photoId,
      });
      throw new Error("GEMINI_API_KEY not configured");
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [
          {
            parts: [
              { text: args.scenePrompt },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: args.imageBase64,
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ["TEXT", "IMAGE"],
        },
      });

      // Extract the generated image from response
      const candidate = response.candidates?.[0];
      if (!candidate?.content?.parts) {
        throw new Error("No response from Gemini");
      }

      let generatedImageBase64: string | null = null;
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          generatedImageBase64 = part.inlineData.data;
          break;
        }
      }

      if (!generatedImageBase64) {
        throw new Error("No image generated in response");
      }

      // Convert base64 to blob and store in Convex storage (actions can use ctx.storage.store)
      const binaryString = atob(generatedImageBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "image/png" });

      // Store the generated image
      const storageId = await ctx.storage.store(blob);

      // Update the photo record with the result
      await ctx.runMutation(api.photos.updatePhotoResult, {
        photoId: args.photoId,
        resultStorageId: storageId,
      });

      return { success: true };
    } catch (error) {
      console.error("Error generating image:", error);
      await ctx.runMutation(api.photos.markPhotoFailed, {
        photoId: args.photoId,
      });
      throw error;
    }
  },
});
