"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useState, useEffect } from "react";

function SetupMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-md text-center border-2 border-white/20">
        <div className="text-6xl mb-4">⚙️</div>
        <h1 className="text-2xl font-bold text-white mb-4">Setup Required</h1>
        <p className="text-white/80 mb-4">
          Please run{" "}
          <code className="bg-black/30 px-2 py-1 rounded">npx convex dev</code>{" "}
          to configure Convex.
        </p>
        <p className="text-white/60 text-sm">
          This will create your Convex deployment and set up the environment
          variables.
        </p>
      </div>
    </div>
  );
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ConvexReactClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (url) {
      setClient(new ConvexReactClient(url));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
        <div className="text-6xl animate-bounce">🌮</div>
      </div>
    );
  }

  if (!client) {
    return <SetupMessage />;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
