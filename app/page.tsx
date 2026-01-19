"use client";

import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [boothUrl, setBoothUrl] = useState("");

  useEffect(() => {
    setBoothUrl(`${window.location.origin}/booth`);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden relative selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,_rgba(99,102,241,0.18),transparent_55%)]" />
        <div className="absolute -top-24 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2 text-white font-semibold tracking-tight">
            <span className="text-indigo-300">✨</span>
            AI Photo Booth
          </div>
          <Link
            href="/booth"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          >
            Launch Booth
          </Link>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-indigo-200">
              AI-Powered Transformations
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Turn selfies into cinematic scenes.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl">
              Capture a photo, pick a vibe, and get a polished, share-ready
              result in seconds. Built for both phones and big screens.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/booth"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 hover:bg-indigo-50 transition"
              >
                Start Photo Booth
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white/80 hover:bg-white/10 transition"
              >
                See how it works
              </a>
            </div>

            <div
              id="how-it-works"
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              {[
                { icon: "📸", title: "Capture", desc: "Snap a selfie in one tap." },
                { icon: "🎨", title: "Select", desc: "Pick a curated scene style." },
                { icon: "✨", title: "Share", desc: "Download or share instantly." },
              ].map((step, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <h3 className="text-sm font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-white/60">
                <span>Scan to open</span>
                <span>Mobile Ready</span>
              </div>
              <div className="mt-6 flex items-center justify-center rounded-2xl bg-white p-4">
                {boothUrl && <QRCodeSVG value={boothUrl} size={180} />}
              </div>
              <p className="mt-5 text-center text-sm text-slate-300">
                Open the booth on your phone to capture and share instantly.
              </p>
            </div>
            <Link
              href="/booth"
              className="mt-6 sm:hidden inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 hover:bg-indigo-50 transition"
            >
              Launch Booth
            </Link>
          </div>
        </div>

        <footer className="mt-14 text-center text-xs text-slate-500">
          Powered by Gemini AI
        </footer>
      </div>
    </main>
  );
}
