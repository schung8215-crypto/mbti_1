"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DailyCard from "@/components/DailyCard";
import BottomNav from "@/components/BottomNav";
import { generateDailyMessage, DailyMessage } from "@/lib/message-generator";
import { getTodayPillar, calculateUserBirthPillar } from "@/lib/bazi";
import HaruLogo from "@/components/HaruLogo";
import TrialBanner from "@/components/TrialBanner";
import PaywallScreen from "@/components/PaywallScreen";
import LockedInsightView from "@/components/LockedInsightView";
import { useTrialStatus, shouldShowPaywall, isContentLocked } from "@/hooks/useTrialStatus";
import { usePushNotifications } from "@/hooks/usePushNotifications";

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

export default function TodayPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dailyMessage, setDailyMessage] = useState<DailyMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedReflections, setSavedReflections] = useState<Record<string, Reflection>>({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [paywallDismissed, setPaywallDismissed] = useState(false);
  const { status: trialStatus, daysRemaining, loading: trialLoading } = useTrialStatus();
  usePushNotifications(); // register push token once user is on the daily screen
  useEffect(() => {
    const storedUser = localStorage.getItem("mbti-saju-user");

    if (!storedUser) {
      router.push("/onboarding/intro");
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
          <div className="w-10 h-10 border-3 border-terracotta-200 border-t-terracotta-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-warm-500 text-sm">Loading your insights...</p>
        </div>
      </main>
    );
  }

  if (!dailyMessage || !userData) {
    return null;
  }

  // Show paywall when trial expires (and not yet dismissed)
  if (shouldShowPaywall(trialStatus, daysRemaining) && !paywallDismissed) {
    return <PaywallScreen onDismiss={() => setPaywallDismissed(true)} daysUsed={7} />;
  }

  // Show locked view when paywall was dismissed but content is still locked
  if (isContentLocked(trialStatus) && paywallDismissed) {
    return <LockedInsightView />;
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Trial Banner */}
      <TrialBanner />

      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <HaruLogo variant="light" size="sm" showSubtitle={false} align="left" />
        </div>
      </header>

      {/* Main content */}
      <div className="px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <DailyCard message={dailyMessage} isSaved={isSaved} onSaveTap={handleSaveButtonTap} />
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
                className="w-full h-28 px-4 py-3 rounded-2xl bg-warm-50 border border-warm-200 text-warm-800 text-sm placeholder-warm-400 resize-none focus:outline-none focus:ring-2 focus:ring-terracotta-300 focus:border-transparent"
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
                  className="flex-1 py-3 px-4 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-semibold transition-colors"
                >
                  {isSaved ? "Update Reflection" : "Save Reflection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </main>
  );
}
