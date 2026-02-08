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

interface Reflection {
  date: string;
  note: string;
  dayDescription: string;
  mainMessage: string;
  energyLevel: number;
  luck: number;
  element: string;
  yinYang: string;
  bestFor: string[];
  watchOutFor: string[];
  savedAt: string;
}

function loadReflections(): Record<string, Reflection> {
  try {
    const stored = localStorage.getItem("mbti-saju-reflections");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveReflectionToStorage(reflections: Record<string, Reflection>) {
  localStorage.setItem("mbti-saju-reflections", JSON.stringify(reflections));
}

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dailyMessage, setDailyMessage] = useState<DailyMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedReflections, setSavedReflections] = useState<Record<string, Reflection>>({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentNote, setCurrentNote] = useState("");

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
    setSavedReflections(loadReflections());
    setLoading(false);
  }, [router]);

  const todayKey = new Date().toISOString().slice(0, 10);
  const isSaved = todayKey in savedReflections;

  const handleSaveButtonTap = () => {
    if (isSaved) {
      setCurrentNote(savedReflections[todayKey].note);
    } else {
      setCurrentNote("");
    }
    setShowSaveModal(true);
  };

  const handleSaveReflection = () => {
    if (!dailyMessage) return;
    const updated = { ...savedReflections };
    updated[todayKey] = {
      date: todayKey,
      note: currentNote,
      dayDescription: dailyMessage.todayEnergy,
      mainMessage: dailyMessage.mainMessage,
      energyLevel: dailyMessage.energyLevel,
      luck: dailyMessage.luck,
      element: dailyMessage.todayElement,
      yinYang: dailyMessage.todayYinYang,
      bestFor: dailyMessage.bestFor,
      watchOutFor: dailyMessage.watchOutFor,
      savedAt: new Date().toISOString(),
    };
    saveReflectionToStorage(updated);
    setSavedReflections(updated);
    setShowSaveModal(false);
  };

  const handleRemoveReflection = () => {
    const updated = { ...savedReflections };
    delete updated[todayKey];
    saveReflectionToStorage(updated);
    setSavedReflections(updated);
    setShowSaveModal(false);
  };

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
          <DailyCard message={dailyMessage} isSaved={isSaved} onSaveTap={handleSaveButtonTap} />

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

          {/* My Reflections */}
          <button
            onClick={() => router.push("/reflections")}
            className="w-full mt-3 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-warm-900">My Reflections</p>
              <p className="text-xs text-warm-500">Look back on your saved insights</p>
            </div>
            <svg className="w-5 h-5 text-warm-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Save Reflection Modal */}
      {showSaveModal && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center animate-fade-in"
          onClick={() => setShowSaveModal(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-3xl shadow-medium animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Close button */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-warm-900">
                  {isSaved ? "Edit Reflection" : "Save Reflection"}
                </h3>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-warm-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Today's summary */}
              <div className="bg-warm-50 rounded-2xl p-4 mb-4">
                <p className="text-sm text-warm-500 mb-1">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
                <p className="text-sm font-medium text-warm-700">
                  {dailyMessage?.todayElement} Day — Energy {dailyMessage?.energyLevel}/5
                </p>
              </div>

              {/* Note textarea */}
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="How are you feeling today?"
                className="w-full h-28 px-4 py-3 rounded-2xl bg-warm-50 border border-warm-200 text-warm-800 text-sm placeholder-warm-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent"
              />

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                {isSaved && (
                  <button
                    onClick={handleRemoveReflection}
                    className="px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                )}
                <button
                  onClick={handleSaveReflection}
                  className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors"
                >
                  {isSaved ? "Update Reflection" : "Save Reflection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="text-xs text-warm-400">
          Your daily insight refreshes at midnight
        </p>
      </footer>
    </main>
  );
}
