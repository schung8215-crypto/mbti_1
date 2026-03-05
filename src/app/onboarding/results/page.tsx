"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { MBTI_DESCRIPTIONS } from "@/content/mbti-descriptions";

interface MbtiPending {
  mbtiType: string;
  mbtiTitle: string;
  scores: Record<string, number>;
}

const T_CARD = 300;
const T_CTA  = 1000;

export default function OnboardingResultsPage() {
  const router = useRouter();
  const [pending, setPending] = useState<MbtiPending | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("mbti-pending");
    if (!stored) {
      router.replace("/onboarding/intro");
      return;
    }
    try {
      setPending(JSON.parse(stored));
    } catch {
      router.replace("/onboarding/intro");
    }

    // Check if user is already signed in
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      supabase.auth.getSession().then(({ data: { session } }) => {
        setIsLoggedIn(!!session);
      });
    }

    const timers = [
      setTimeout(() => setPhase(1), T_CARD),
      setTimeout(() => setPhase(2), T_CTA),
    ];
    return () => timers.forEach(clearTimeout);
  }, [router]);

  if (!pending) return null;

  const description = MBTI_DESCRIPTIONS[pending.mbtiType];
  if (!description) {
    router.replace("/onboarding/intro");
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col justify-center p-4 py-8" style={{ background: '#f5f3ef' }}>
      <div className="w-full max-w-md mx-auto space-y-3">

        {/* Card 1 — Personality result */}
        <div
          className="bg-white rounded-3xl shadow-soft overflow-hidden"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="px-6 py-5 text-center relative" style={{ background: '#c67d5c' }}>
            <button
              onClick={() => router.push('/onboarding/questions')}
              className="absolute top-4 left-4 flex items-center gap-1 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back</span>
            </button>
            <p className="text-white/70 text-xs mb-1">You are</p>
            <h1 className="text-3xl font-bold text-white mb-0.5">{description.type}</h1>
            <p className="text-base text-white/90">{description.title}</p>
          </div>

          <div className="p-5">
            <p className="text-warm-700 leading-relaxed text-sm">{description.summary}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {description.strengths.map((strength, i) => (
                <span key={i} className="px-3 py-1 bg-terracotta-50 text-terracotta-600 rounded-full text-xs font-medium">
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2 — Next step CTA */}
        <div
          className="rounded-3xl shadow-soft overflow-hidden"
          style={{
            background: '#faf8f5',
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="p-5 space-y-4">
            <div>
              <p className="font-bold text-warm-900 text-base">Your personality type is just the beginning</p>
              <p className="text-warm-500 text-sm mt-1">Add your birth date to see how your profile interacts with today's energy</p>
            </div>

            <ul className="space-y-2">
              {[
                "Your Saju profile — element, zodiac & yin/yang",
                "Daily insights shaped by your type & birth stem",
                "Compatibility by personality & element",
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 rounded-full bg-terracotta-400 flex-shrink-0" />
                  <span className="text-terracotta-600 font-medium">{text}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => router.push(isLoggedIn ? '/onboarding/birthdate' : '/auth/login')}
              className="w-full py-3 px-6 rounded-2xl font-semibold text-white transition-all"
              style={{ background: '#c67d5c' }}
            >
              {isLoggedIn ? 'Continue' : 'Create Free Account'}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
