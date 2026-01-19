# ✨ AI Photo Booth

An AI-powered photo booth web app that transforms selfies into fun, themed scenes using Google's Gemini API.

## Features

- 📸 Take selfies using your device's camera
- 🎨 Choose from curated scene transformations with a custom prompt option
- ✨ AI-powered image transformation using Gemini 2.0 Flash
- 📱 QR code sharing for easy access
- 💾 Download transformed photos directly

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + React + Tailwind CSS
- **Backend**: Convex (database + file storage + serverless functions)
- **AI**: Google Gemini API (gemini-2.0-flash-exp)
- **Hosting**: Vercel

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Convex

Run the following command and follow the prompts to create a new Convex project:

```bash
npx convex dev
```

This will:
- Create a new Convex project (or link to existing)
- Generate the `_generated` folder with TypeScript types
- Create a `.env.local` file with your `CONVEX_DEPLOYMENT` URL
- Start the Convex dev server

### 3. Set up Gemini API Key

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Add it to your Convex deployment:
   - Go to your [Convex Dashboard](https://dashboard.convex.dev)
   - Select your project
   - Go to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key

### 4. Run the development server

In one terminal, keep Convex running:
```bash
npx convex dev
```

In another terminal, run Next.js:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment to Vercel

### 1. Deploy Convex to production

```bash
npx convex deploy
```

### 2. Set Gemini API key in production

Go to your Convex Dashboard and add `GEMINI_API_KEY` to your production deployment's environment variables.

### 3. Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

Make sure to set `NEXT_PUBLIC_CONVEX_URL` in Vercel's environment variables using your production Convex URL.

## Project Structure

```
/app
  /page.tsx              # Landing page with QR code
  /booth/page.tsx        # Main photo booth flow
  /photo/[id]/page.tsx   # Shareable result page
/components
  /Camera.tsx            # Camera capture component
  /SceneSelector.tsx     # Scene selection grid
  /ProcessingView.tsx    # Loading state
  /ResultView.tsx        # Result with download/share
/convex
  /schema.ts             # Database schema
  /photos.ts             # Mutations and queries
  /generateImage.ts      # Gemini API action
/lib
  /scenes.ts             # Scene configurations
```

## Customizing Scenes

Edit `lib/scenes.ts` to add or modify scene prompts:

```typescript
{
  id: "myScene",
  name: "My Custom Scene",
  emoji: "🎭",
  prompt: "Transform this photo into...",
}
```

## License

MIT
