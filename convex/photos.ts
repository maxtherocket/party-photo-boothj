import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createPhoto = mutation({
  args: {
    storageId: v.id("_storage"),
    scene: v.string(),
  },
  handler: async (ctx, args) => {
    const photoId = await ctx.db.insert("photos", {
      originalStorageId: args.storageId,
      scene: args.scene,
      status: "processing",
      createdAt: Date.now(),
    });
    return photoId;
  },
});

export const updatePhotoResult = mutation({
  args: {
    photoId: v.id("photos"),
    resultStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.photoId, {
      resultStorageId: args.resultStorageId,
      status: "complete",
    });
  },
});

export const markPhotoFailed = mutation({
  args: {
    photoId: v.id("photos"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.photoId, {
      status: "failed",
    });
  },
});

export const getPhoto = query({
  args: { photoId: v.id("photos") },
  handler: async (ctx, args) => {
    const photo = await ctx.db.get(args.photoId);
    if (!photo) return null;

    const originalUrl = await ctx.storage.getUrl(photo.originalStorageId);
    const resultUrl = photo.resultStorageId
      ? await ctx.storage.getUrl(photo.resultStorageId)
      : null;

    return {
      ...photo,
      originalUrl,
      resultUrl,
    };
  },
});
