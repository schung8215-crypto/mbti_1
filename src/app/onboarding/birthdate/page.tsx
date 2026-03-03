"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { calculateUserBirthPillar } from "@/lib/bazi";
import { MBTI_DESCRIPTIONS } from "@/content/mbti-descriptions";
import { generateTagline } from "@/lib/tagline";

const ANIMAL_EMOJIS: Record<string, string> = {
  Rat: "🐀", Ox: "🐂", Tiger: "🐅", Rabbit: "🐇", Dragon: "🐲",
  Snake: "🐍", Horse: "🐴", Goat: "🐐", Monkey: "🐵", Rooster: "🐓",
  Dog: "🐕", Pig: "🐷",
};

const yinYangDescriptions: Record<string, { traits: string; icon: string }> = {
  Yin: { traits: "Receptive and introspective. You process deeply and recharge by going inward.", icon: "🌙" },
  Yang: { traits: "Active and outward-facing. You're energized by doing and tend to think on your feet.", icon: "☀️" },
};

const elementDescriptions: Record<string, { traits: string; icon: string }> = {
  Wood: { traits: "Growth, creativity, and vision. You initiate and expand.", icon: "🌳" },
  Fire: { traits: "Passion, warmth, and charisma. You inspire and energize.", icon: "🔥" },
  Earth: { traits: "Stability, reliability, and nurturing. You ground and support.", icon: "⛰️" },
  Metal: { traits: "Clarity, precision, and discipline. You refine and achieve.", icon: "✨" },
  Water: { traits: "Wisdom, adaptability, and intuition. You flow and reflect.", icon: "💧" },
};

const animalDescriptions: Record<string, { traits: string; icon: string }> = {
  Rat: { traits: "Quick-witted, resourceful, and charming", icon: "🐀" },
  Ox: { traits: "Dependable, patient, and determined", icon: "🐂" },
  Tiger: { traits: "Courageous, confident, and bold", icon: "🐅" },
  Rabbit: { traits: "Graceful, diplomatic, and gentle", icon: "🐇" },
  Dragon: { traits: "Ambitious, energetic, and charismatic", icon: "🐲" },
  Snake: { traits: "Intuitive, wise, and sophisticated", icon: "🐍" },
  Horse: { traits: "Energetic, independent, and adventurous", icon: "🐴" },
  Goat: { traits: "Creative, kind, and artistic", icon: "🐐" },
  Monkey: { traits: "Clever, innovative, and playful", icon: "🐵" },
  Rooster: { traits: "Observant, hardworking, and honest", icon: "🐓" },
  Dog: { traits: "Loyal, sincere, and faithful", icon: "🐕" },
  Pig: { traits: "Generous, compassionate, and easygoing", icon: "🐷" },
};

interface MbtiPending {
  mbtiType: string;
  mbtiTitle: string;
  scores: Record<string, number>;
}

type SubStep = "birthdate" | "saju-result";

export default function OnboardingBirthdatePage() {
  const router = useRouter();
  const [pending, setPending] = useState<MbtiPending | null>(null);
  const [subStep, setSubStep] = useState<SubStep>("birthdate");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthElement, setBirthElement] = useState("");
  const [birthYinYang, setBirthYinYang] = useState("");
  const [birthAnimal, setBirthAnimal] = useState("");
  const [saving, setSaving] = useState(false);
  const [dateError, setDateError] = useState("");

  // Reset day if it exceeds the days in the newly selected month/year
  useEffect(() => {
    if (birthYear && birthMonth && birthDay) {
      const daysInMonth = new Date(parseInt(birthYear), parseInt(birthMonth), 0).getDate();
      if (parseInt(birthDay) > daysInMonth) setBirthDay("");
    }
  }, [birthYear, birthMonth]);

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
  }, [router]);

  const handleBirthdateSubmit = () => {
    if (!birthYear || !birthMonth || !birthDay) return;

    setDateError("");
    const selected = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected > today) {
      setDateError("Birth date can't be in the future.");
      return;
    }
    const age = today.getFullYear() - selected.getFullYear() -
      (today < new Date(today.getFullYear(), selected.getMonth(), selected.getDate()) ? 1 : 0);
    if (age < 13) {
      setDateError("You must be at least 13 years old to use Haru.");
      return;
    }

    const result = calculateUserBirthPillar(
      parseInt(birthYear),
      parseInt(birthMonth),
      parseInt(birthDay)
    );
    setBirthElement(result.birthElement);
    setBirthYinYang(result.birthYinYang);
    setBirthAnimal(result.birthAnimal);
    setSubStep("saju-result");
  };

  const handleComplete = async () => {
    if (!pending) return;
    setSaving(true);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();

    const birthPillar = calculateUserBirthPillar(
      parseInt(birthYear),
      parseInt(birthMonth),
      parseInt(birthDay)
    );

    const mbtiDesc = MBTI_DESCRIPTIONS[pending.mbtiType];
    const { tagline, subtitle } = generateTagline(
      pending.mbtiType,
      birthPillar.birthYinYang,
      birthPillar.birthElement,
      birthPillar.birthAnimal
    );

    const now = new Date();
    const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const userData = {
      mbti_type: pending.mbtiType,
      birth_year: parseInt(birthYear),
      birth_month: parseInt(birthMonth),
      birth_day: parseInt(birthDay),
      birth_stem: birthPillar.birthStem,
      birth_branch: birthPillar.birthBranch,
      birth_element: birthPillar.birthElement,
      birth_yin_yang: birthPillar.birthYinYang,
      mbti_title: mbtiDesc?.title || "",
      tagline,
      tagline_subtitle: subtitle,
      birth_animal: birthPillar.birthAnimal,
      birth_animal_emoji: ANIMAL_EMOJIS[birthPillar.birthAnimal] || "",
      trial_started_at: now.toISOString(),
      trial_ends_at: trialEndsAt.toISOString(),
      subscription_status: "trial",
      onboarding_completed: true,
      updated_at: now.toISOString(),
    };

    if (user) {
      const { data: savedUser, error } = await supabase
        .from("users")
        .upsert({ id: user.id, email: user.email, provider: user.app_metadata?.provider, ...userData })
        .select()
        .single();

      if (error) {
        console.error("Error saving user:", error);
      }

      const localData = {
        mbtiType: pending.mbtiType,
        birthYear: parseInt(birthYear),
        birthMonth: parseInt(birthMonth),
        birthDay: parseInt(birthDay),
        birthStem: birthPillar.birthStem,
        birthBranch: birthPillar.birthBranch,
        birthElement: birthPillar.birthElement,
        birthYinYang: birthPillar.birthYinYang,
        birthAnimal: birthPillar.birthAnimal,
        yearStem: birthPillar.yearStem,
        yearBranch: birthPillar.yearBranch,
        mbtiTitle: mbtiDesc?.title || "",
        tagline,
        taglineSubtitle: subtitle,
        supabaseId: savedUser?.id || user.id,
      };
      localStorage.setItem("mbti-saju-user", JSON.stringify(localData));
    } else {
      const { saveUser } = await import("@/lib/supabase");
      const savedUser = await saveUser(userData as any);

      const localData = {
        mbtiType: pending.mbtiType,
        birthYear: parseInt(birthYear),
        birthMonth: parseInt(birthMonth),
        birthDay: parseInt(birthDay),
        birthStem: birthPillar.birthStem,
        birthBranch: birthPillar.birthBranch,
        birthElement: birthPillar.birthElement,
        birthYinYang: birthPillar.birthYinYang,
        birthAnimal: birthPillar.birthAnimal,
        yearStem: birthPillar.yearStem,
        yearBranch: birthPillar.yearBranch,
        mbtiTitle: mbtiDesc?.title || "",
        tagline,
        taglineSubtitle: subtitle,
        supabaseId: savedUser?.id,
      };
      localStorage.setItem("mbti-saju-user", JSON.stringify(localData));
    }

    router.push("/reveal");
  };

  if (saving) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-terracotta-200 border-t-terracotta-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-warm-600">Setting up your profile...</p>
        </div>
      </main>
    );
  }

  if (!pending) return null;

  if (subStep === "birthdate") {
    const currentYear = new Date().getFullYear();
    const maxBirthYear = currentYear - 13;
    const years = Array.from({ length: 100 }, (_, i) => maxBirthYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const daysInMonth = birthYear && birthMonth
      ? new Date(parseInt(birthYear), parseInt(birthMonth), 0).getDate()
      : 31;
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <main className="min-h-screen flex items-center justify-center p-4" style={{ background: '#f5f3ef' }}>
        <div className="w-full max-w-md animate-fade-in">
          <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
            <div className="p-6">
              <button
                onClick={() => router.push('/onboarding/results')}
                className="flex items-center gap-1 text-warm-400 hover:text-warm-600 transition-colors mb-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">Back</span>
              </button>
              <div className="text-center mb-4">
                <div className="w-11 h-11 bg-terracotta-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-terracotta-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-warm-900">Your birth date</h2>
                <p className="text-warm-500 text-sm">For your Saju energy reading</p>
              </div>

              <div className="space-y-3">
                {/* Year selector */}
                <div>
                  <label className="block text-sm text-warm-600 mb-1">Year</label>
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 focus:border-terracotta-500 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                  >
                    <option value="">Select year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Month selector */}
                  <div>
                    <label className="block text-sm text-warm-600 mb-1">Month</label>
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 focus:border-terracotta-500 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {new Date(2000, month - 1).toLocaleString('en-US', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Day selector */}
                  <div>
                    <label className="block text-sm text-warm-600 mb-1">Day</label>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-warm-200 focus:border-terracotta-500 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                    >
                      <option value="">Day</option>
                      {days.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {dateError && (
                  <p className="text-red-500 text-sm text-center">{dateError}</p>
                )}
                <button
                  onClick={handleBirthdateSubmit}
                  disabled={!birthYear || !birthMonth || !birthDay}
                  className="w-full py-3 px-6 rounded-2xl text-white font-semibold disabled:opacity-50 transition-all shadow-md"
                  style={{ background: '#c67d5c' }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // saju-result sub-step
  const elementInfo = elementDescriptions[birthElement] || elementDescriptions.Earth;
  const animalInfo = animalDescriptions[birthAnimal] || animalDescriptions.Dragon;
  const yinYangInfo = yinYangDescriptions[birthYinYang] || yinYangDescriptions.Yin;

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ background: '#f5f3ef' }}>
      <div className="w-full max-w-md animate-slide-up">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 text-center relative" style={{ background: '#5a8a7a' }}>
            <button
              onClick={() => setSubStep('birthdate')}
              className="absolute top-4 left-4 flex items-center gap-1 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm">Back</span>
            </button>
            <p className="text-white/70 text-xs mb-1">Your Saju energy</p>
            <h1 className="text-2xl font-bold text-white mb-0.5">
              {birthYinYang} {birthElement}
            </h1>
            <p className="text-base text-white/90">{birthAnimal}</p>
          </div>

          <div className="p-5 space-y-3">
            {/* Element */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef4f2' }}>
                <span className="text-xl">{elementInfo.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-warm-900 text-sm mb-0.5">{birthElement}</p>
                <p className="text-warm-600 text-xs leading-relaxed">{elementInfo.traits}</p>
              </div>
            </div>

            {/* Yin / Yang */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef4f2' }}>
                <span className="text-xl">{yinYangInfo.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-warm-900 text-sm mb-0.5">{birthYinYang}</p>
                <p className="text-warm-600 text-xs leading-relaxed">{yinYangInfo.traits}</p>
              </div>
            </div>

            {/* Animal */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef4f2' }}>
                <span className="text-xl">{animalInfo.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-warm-900 text-sm mb-0.5">{birthAnimal}</p>
                <p className="text-warm-600 text-xs leading-relaxed">{animalInfo.traits}</p>
              </div>
            </div>

            <p className="text-warm-400 text-xs text-center">
              Based on 10 Heavenly Stems &amp; 12 Earthly Branches
            </p>

            <button
              onClick={handleComplete}
              className="w-full py-3 px-6 rounded-2xl font-semibold transition-all text-white shadow-md"
              style={{ background: '#4a7868' }}
            >
              See My Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
