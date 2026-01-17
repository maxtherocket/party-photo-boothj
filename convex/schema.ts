import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  photos: defineTable({
    originalStorageId: v.id("_storage"),
    resultStorageId: v.optional(v.id("_storage")),
    scene: v.string(),
    status: v.union(
      v.literal("processing"),
      v.literal("complete"),
      v.literal("failed")
    ),
    createdAt: v.number(),
  }),
});
