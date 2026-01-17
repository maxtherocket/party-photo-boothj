# Taco Fiesta AI Photo Booth - Technical Reference

> A comprehensive technical reference for the AI-powered photo booth application. Use this document as context when working with LLMs on this codebase.

## Project Overview

An AI-powered photo booth web application that captures selfies and transforms them into themed scenes using Google's Gemini API. Built for party use with a mobile-first, no-authentication design.

**Key Features:**
- Real-time camera capture with selfie mode
- 6 themed AI transformation scenes
- QR code sharing for mobile access
- Direct image download
- Real-time status updates via Convex subscriptions

---

## Tech Stack

| Layer | Technology | Version/Details |
|-------|------------|-----------------|
| **Framework** | Next.js | 14+ with App Router |
| **Language** | TypeScript | Strict mode |
| **Styling** | Tailwind CSS | v4 with @import syntax |
| **Backend** | Convex | Serverless functions + database + file storage |
| **AI** | Google Gemini API | `gemini-2.0-flash-exp` model |
| **AI SDK** | `@google/genai` | Official Google GenAI npm package |
| **QR Codes** | `qrcode.react` | SVG-based QR generation |
| **Hosting** | Vercel | Frontend hosting |
| **Font** | Poppins | Google Fonts |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Next.js)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Camera    │→ │   Scene     │→ │   Processing → Result   │  │
│  │   Capture   │  │   Selector  │  │   (real-time updates)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│         │                │                      ↑               │
│         └────────────────┼──────────────────────┘               │
│                          ↓                                      │
│              ┌───────────────────────┐                          │
│              │  Convex React Client  │                          │
│              │  (subscriptions)      │                          │
│              └───────────────────────┘                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                      CONVEX BACKEND                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Mutations  │  │   Queries   │  │   Actions (Node.js)     │  │
│  │  - create   │  │  - getPhoto │  │  - generateTransformed  │  │
│  │  - update   │  │             │  │    Image                │  │
│  └─────────────┘  └─────────────┘  └───────────┬─────────────┘  │
│         │                │                     │                │
│         ↓                ↓                     ↓                │
│  ┌─────────────────────────────┐    ┌─────────────────────────┐ │
│  │      Database (photos)      │    │    File Storage         │ │
│  │  - originalStorageId        │    │  - Original selfies     │ │
│  │  - resultStorageId          │    │  - Generated images     │ │
│  │  - scene, status, createdAt │    │                         │ │
│  └─────────────────────────────┘    └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                    GOOGLE GEMINI API                            │
│  Model: gemini-2.0-flash-exp                                    │
│  Input: JPEG image + text prompt                                │
│  Output: PNG image (base64)                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
fun-ai-photo-booth/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout with Convex provider
│   ├── page.tsx                  # Landing page with QR code
│   ├── globals.css               # Global styles (Tailwind v4)
│   ├── booth/
│   │   └── page.tsx              # Main photo booth flow
│   └── photo/
│       └── [id]/
│           └── page.tsx          # Shareable result page
│
├── components/                   # React components
│   ├── ConvexClientProvider.tsx  # Convex React provider wrapper
│   ├── Camera.tsx                # Camera capture with countdown
│   ├── SceneSelector.tsx         # Theme selection grid
│   ├── ProcessingView.tsx        # Loading/processing state
│   └── ResultView.tsx            # Final image with download/share
│
├── convex/                       # Convex backend
│   ├── schema.ts                 # Database schema definition
│   ├── photos.ts                 # Mutations and queries
│   ├── generateImage.ts          # Gemini API action (Node.js)
│   ├── tsconfig.json             # Convex TypeScript config
│   └── _generated/               # Auto-generated types (by npx convex dev)
│       ├── api.d.ts
│       ├── api.js
│       ├── dataModel.d.ts
│       ├── server.d.ts
│       └── server.js
│
├── lib/                          # Shared utilities
│   └── scenes.ts                 # Scene configurations and prompts
│
├── docs/                         # Documentation
│   └── PROJECT_REFERENCE.md      # This file
│
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## Database Schema

**Table: `photos`**

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  photos: defineTable({
    originalStorageId: v.id("_storage"),      // Reference to uploaded selfie
    resultStorageId: v.optional(v.id("_storage")), // Reference to AI result
    scene: v.string(),                         // Scene ID (e.g., "tacoFiesta")
    status: v.union(
      v.literal("processing"),
      v.literal("complete"),
      v.literal("failed")
    ),
    createdAt: v.number(),                     // Unix timestamp
  }),
});
```

**Document Lifecycle:**
1. Created with `status: "processing"` when photo is uploaded
2. Updated to `status: "complete"` with `resultStorageId` after AI generation
3. Updated to `status: "failed"` if generation fails

---

## Convex Functions

### Mutations (`convex/photos.ts`)

| Function | Purpose | Args |
|----------|---------|------|
| `generateUploadUrl` | Generate presigned URL for file upload | none |
| `createPhoto` | Create new photo record | `storageId`, `scene` |
| `updatePhotoResult` | Update photo with AI result | `photoId`, `resultStorageId` |
| `markPhotoFailed` | Mark photo as failed | `photoId` |

### Queries (`convex/photos.ts`)

| Function | Purpose | Args |
|----------|---------|------|
| `getPhoto` | Get photo with signed URLs | `photoId` |

### Actions (`convex/generateImage.ts`)

| Function | Purpose | Runtime |
|----------|---------|---------|
| `generateTransformedImage` | Call Gemini API and store result | Node.js (`"use node"`) |

---

## Gemini API Integration

**File:** `convex/generateImage.ts`

```typescript
"use node";  // Required for Node.js runtime in Convex

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash-exp",
  contents: [
    {
      parts: [
        { text: scenePrompt },           // Text prompt describing the transformation
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64,           // Base64-encoded input image
          },
        },
      ],
    },
  ],
  config: {
    responseModalities: ["TEXT", "IMAGE"],  // Request image output
  },
});

// Extract generated image from response
const generatedImageBase64 = response.candidates[0].content.parts
  .find(part => part.inlineData)?.inlineData.data;
```

**Key Points:**
- Model `gemini-2.0-flash-exp` supports image input+output
- Images sent as base64 with MIME type
- Response contains `inlineData.data` with base64 result
- Must set `responseModalities: ["TEXT", "IMAGE"]` to get image output

---

## Scene Configuration

**File:** `lib/scenes.ts`

```typescript
export interface Scene {
  id: string;      // Unique identifier (used in database)
  name: string;    // Display name
  emoji: string;   // Visual icon
  prompt: string;  // AI transformation prompt
}

export const SCENES: Scene[] = [
  {
    id: "tacoFiesta",
    name: "Taco Fiesta",
    emoji: "🌮",
    prompt: "Transform this photo into a vibrant Mexican fiesta scene...",
  },
  // ... more scenes
];
```

**Available Scenes:**
1. **Taco Fiesta** 🌮 - Mexican fiesta with sombreros and papel picado
2. **Y2K Throwback** 📱 - Early 2000s aesthetic with flip phones
3. **Disco Fever** 🪩 - 1970s disco with mirror balls
4. **Wild West** 🤠 - Western frontier theme
5. **Space Adventure** 🚀 - Astronaut space exploration
6. **Under the Sea** 🧜 - Underwater mermaid fantasy

---

## React Components

### `Camera.tsx`
- Uses `navigator.mediaDevices.getUserMedia()` with `facingMode: 'user'`
- 3-second countdown before capture
- Flash effect on capture
- Crops to square and mirrors for selfie view
- Outputs base64 JPEG

### `SceneSelector.tsx`
- Grid display of available scenes
- Shows preview of captured photo
- Triggers scene selection callback

### `ProcessingView.tsx`
- Animated loading spinner
- Rotating fun messages
- Scene name display

### `ResultView.tsx`
- Displays generated image
- Download button (creates blob URL)
- Share button (Web Share API with QR fallback)
- QR code modal for sharing
- "Take Another" button

### `ConvexClientProvider.tsx`
- Wraps app with `ConvexProvider`
- Handles missing `NEXT_PUBLIC_CONVEX_URL` gracefully
- Shows setup instructions if not configured

---

## User Flow

```
1. LANDING (/)
   └─→ Display QR code with booth URL
   └─→ "Start Photo Booth" button

2. CAMERA (/booth, step="camera")
   └─→ Show live camera feed (front-facing)
   └─→ Tap capture button
   └─→ 3-2-1 countdown
   └─→ Flash effect + capture

3. SCENE SELECT (/booth, step="scene")
   └─→ Show captured photo preview
   └─→ Display 6 scene options
   └─→ User taps scene

4. PROCESSING (/booth, step="processing")
   └─→ Upload original to Convex storage
   └─→ Create photo record (status: "processing")
   └─→ Trigger Gemini API action
   └─→ Show loading animation
   └─→ Subscribe to photo record for updates

5. RESULT (/booth, step="result")
   └─→ Display transformed image
   └─→ Download / Share / QR buttons
   └─→ "Take Another" to restart

6. SHAREABLE PAGE (/photo/[id])
   └─→ Direct link to view/download result
   └─→ Works without original session
```

---

## Environment Variables

### Next.js (`.env.local`)
```
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### Convex Dashboard (Environment Variables)
```
GEMINI_API_KEY=your_gemini_api_key
```

**Note:** `GEMINI_API_KEY` must be set in the Convex Dashboard, not in `.env.local`, because it's used by Convex actions running on Convex's servers.

---

## Deployment

### Development
```bash
# Terminal 1: Start Convex dev server
npx convex dev

# Terminal 2: Start Next.js dev server
npm run dev
```

### Production
```bash
# Deploy Convex functions to production
npx convex deploy

# Deploy to Vercel
npx vercel

# Set NEXT_PUBLIC_CONVEX_URL in Vercel env vars
```

---

## Key Implementation Details

### File Upload Flow
1. Client calls `generateUploadUrl` mutation to get presigned URL
2. Client POSTs image blob to presigned URL
3. Convex returns `storageId`
4. Client calls `createPhoto` mutation with `storageId`

### Real-time Updates
- Client uses `useQuery(api.photos.getPhoto, { photoId })` 
- Convex automatically pushes updates when document changes
- No polling required - true real-time subscriptions

### Image Storage
- Original images: Uploaded via presigned URL
- Generated images: Stored via `ctx.storage.store(blob)` in action
- URLs: Retrieved via `ctx.storage.getUrl(storageId)` in queries

### Error Handling
- Gemini API failures → `status: "failed"`
- UI shows error state with retry option
- Missing Convex URL → Shows setup instructions

---

## Styling Approach

- **Tailwind CSS v4** with `@import "tailwindcss"` syntax
- **CSS Variables** for theming
- **Gradient backgrounds** with blur effects
- **Mobile-first** responsive design
- **Large touch targets** for party use
- **Animations** for loading states and feedback

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "convex": "^1.x",
    "@google/genai": "^0.x",
    "qrcode.react": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^4.x",
    "@tailwindcss/postcss": "^4.x",
    "@types/node": "^20.x",
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "eslint": "^9.x",
    "eslint-config-next": "^14.x"
  }
}
```

---

## Common Tasks

### Add a New Scene
1. Edit `lib/scenes.ts`
2. Add new scene object with `id`, `name`, `emoji`, `prompt`
3. Scene automatically appears in selector

### Modify AI Prompt Behavior
1. Edit prompts in `lib/scenes.ts`
2. Or modify the base prompt structure in `convex/generateImage.ts`

### Change Image Output Size
1. Edit `convex/generateImage.ts`
2. Add `config.imageConfig.aspectRatio` and `config.imageConfig.imageSize`

### Add New Database Fields
1. Update `convex/schema.ts`
2. Update relevant mutations/queries in `convex/photos.ts`
3. Run `npx convex dev` to regenerate types

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "No address provided to ConvexReactClient" | Run `npx convex dev` to set up `.env.local` |
| "GEMINI_API_KEY not configured" | Add key in Convex Dashboard → Settings → Environment Variables |
| Camera not working | Check HTTPS (required for camera access) and permissions |
| Build fails with missing `_generated` | Run `npx convex dev` to generate types |
| Image generation slow | Normal - Gemini takes 10-20 seconds |

---

## Security Notes

- No authentication required (by design for party use)
- API keys stored in Convex environment (not exposed to client)
- File storage URLs are signed but publicly accessible
- Consider adding TTL for photo cleanup after event
