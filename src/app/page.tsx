"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DailyCard from "@/components/DailyCard";
import { generateDailyMessage, DailyMessage } from "@/lib/message-generator";
import { getTodayPillar, calculateUserBirthPillar } from "@/lib/bazi";

interface UserData {
  mbtiType: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthStem: string;
  birthBranch: string;
  birthElement: string;
  birthYinYang: string;
  birthAnimal?: string;
  yearStem?: string;
  yearBranch?: string;
}

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dailyMessage, setDailyMessage] = useState<DailyMessage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("mbti-saju-user");

    if (!storedUser) {
      router.push("/onboarding");
      return;
    }

    const user: UserData = JSON.parse(storedUser);

    // Backfill birthAnimal/yearStem/yearBranch for legacy users missing them
    if ((!user.birthAnimal || !user.yearStem) && user.birthYear) {
      const recalculated = calculateUserBirthPillar(user.birthYear, user.birthMonth, user.birthDay);
      user.birthAnimal = recalculated.birthAnimal;
      user.yearStem = recalculated.yearStem;
      user.yearBranch = recalculated.yearBranch;
      localStorage.setItem("mbti-saju-user", JSON.stringify(user));
    }

    setUserData(user);

    const todayPillar = getTodayPillar();
    const message = generateDailyMessage(user, todayPillar);
    setDailyMessage(message);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-violet-200 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-warm-500 text-sm">Loading your insights...</p>
        </div>
      </main>
    );
  }

  if (!dailyMessage || !userData) {
    return null;
  }

  return (
    <main className="min-h-screen pb-8">
      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-warm-900 tracking-tight">
              innergy
            </h1>
            <button
              onClick={() => router.push("/about")}
              className="w-8 h-8 rounded-full bg-warm-200 hover:bg-warm-300 flex items-center justify-center transition-colors"
              aria-label="How it works"
            >
              <svg className="w-4.5 h-4.5 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-soft hover:shadow-medium transition-shadow"
          >
            <span className="text-xs font-semibold text-violet-600">
              {userData.mbtiType}
            </span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <DailyCard message={dailyMessage} />

          {/* Compatibility Check */}
          <button
            onClick={() => router.push("/compatibility")}
            className="w-full mt-4 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-warm-900">Compatibility Check</p>
              <p className="text-xs text-warm-500">See how you match with someone</p>
            </div>
            <svg className="w-5 h-5 text-warm-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Energy Calendar */}
          <button
            onClick={() => router.push("/calendar")}
            className="w-full mt-3 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-warm-900">Energy Calendar</p>
              <p className="text-xs text-warm-500">Track your energy patterns over time</p>
            </div>
            <svg className="w-5 h-5 text-warm-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="text-xs text-warm-400">
          Your daily insight refreshes at midnight
        </p>
      </footer>
    </main>
  );
}
