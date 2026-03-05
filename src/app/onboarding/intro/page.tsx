"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HaruIcon from "@/components/HaruIcon";
import HaruLogo from "@/components/HaruLogo";

type SubStep = "welcome" | "explainer";

export default function OnboardingIntroPage() {
  const router = useRouter();
  const [subStep, setSubStep] = useState<SubStep>("welcome");

  if (subStep === "welcome") {
    return (
      <div
        className="animate-fade-in"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#f5f3ef',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          overflow: 'hidden',
          zIndex: 50,
        }}
      >
        {/* Soft background blobs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: 300, height: 300, borderRadius: '50%', background: 'rgba(198, 125, 92, 0.06)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: 260, height: 260, borderRadius: '50%', background: 'rgba(198, 125, 92, 0.05)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          {/* App icon */}
          <div className="mb-6">
            <HaruIcon size={88} />
          </div>

          {/* Logo */}
          <div className="mb-8">
            <HaruLogo variant="light" size="xl" />
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 320, position: 'relative', zIndex: 10 }}>
          <button
            onClick={() => setSubStep('explainer')}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: 'transparent',
              border: '1.5px solid rgba(198, 125, 92, 0.5)',
              borderRadius: 14,
              color: '#c67d5c',
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: 'none',
              fontFamily: 'inherit',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(198, 125, 92, 0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            onMouseDown={e => e.currentTarget.style.background = 'rgba(198, 125, 92, 0.12)'}
            onMouseUp={e => e.currentTarget.style.background = 'rgba(198, 125, 92, 0.06)'}
            onTouchStart={e => e.currentTarget.style.background = 'rgba(198, 125, 92, 0.12)'}
            onTouchEnd={e => e.currentTarget.style.background = 'transparent'}
          >
            Discover who you are
          </button>
        </div>
      </div>
    );
  }

  // explainer sub-step
  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ background: '#f5f3ef' }}>
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-warm-50 to-warm-100 px-6 py-5 text-center border-b border-warm-100">
            <h2 className="text-lg font-bold text-warm-900 mb-1">
              How Haru Works
            </h2>
            <p className="text-warm-500 text-sm">
              Two systems, one personalized insight
            </p>
          </div>

          <div className="p-5">
            {/* Two cards side by side */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* MBTI */}
              <div className="border border-warm-200 rounded-2xl p-3">
                <div className="w-9 h-9 bg-terracotta-50 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-lg">💡</span>
                </div>
                <h3 className="font-semibold text-warm-900 text-sm mb-1">Personality Type</h3>
                <p className="text-warm-500 text-xs leading-relaxed">
                  How you think, recharge, and make decisions.
                </p>
              </div>

              {/* Saju */}
              <div className="border border-warm-200 rounded-2xl p-3">
                <div className="w-9 h-9 bg-terracotta-50 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-lg">☯️</span>
                </div>
                <h3 className="font-semibold text-warm-900 text-sm mb-1">Saju</h3>
                <p className="text-warm-500 text-xs leading-relaxed">
                  Birth element, zodiac & yin/yang — shaped by today.
                </p>
              </div>
            </div>

            {/* Result - Haru highlight with CTA */}
            <div className="rounded-2xl p-4 text-center" style={{ background: '#c67d5c' }}>
              <p className="text-white/50 text-xs mb-3" style={{ letterSpacing: '0.04em', fontWeight: 400 }}>Personality meets Saju.</p>
              <div className="mb-4">
                <HaruLogo variant="dark" size="md" showSubtitle={true} />
              </div>
              <button
                onClick={() => router.push('/onboarding/questions')}
                className="w-full py-3 px-6 rounded-xl bg-white text-terracotta-500 font-semibold hover:bg-warm-50 transition-all"
              >
                Discover My Profile (2 min)
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
