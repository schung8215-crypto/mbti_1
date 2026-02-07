"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getDayPillar, Pillar } from "@/lib/bazi";
import { ACTIVITY_TAGS } from "@/content/activity-tags";
import { DAY_DESCRIPTIONS } from "@/content/day-descriptions";
import { STEM_INTERACTIONS } from "@/content/stem-interactions";

// --- Element cycle logic (copied for self-containment) ---

type RelationshipType =
  | "harmony"
  | "complementary"
  | "generating"
  | "being_generated"
  | "controlling"
  | "being_controlled"
  | "neutral";

const GENERATING_CYCLE: Record<string, string> = {
  Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood",
};
const CONTROLLING_CYCLE: Record<string, string> = {
  Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood",
};

function determineRelationshipType(
  userElement: string, userYinYang: string,
  dayElement: string, dayYinYang: string
): RelationshipType {
  if (userElement === dayElement && userYinYang === dayYinYang) return "harmony";
  if (userElement === dayElement) return "complementary";
  if (GENERATING_CYCLE[userElement] === dayElement) return "generating";
  if (GENERATING_CYCLE[dayElement] === userElement) return "being_generated";
  if (CONTROLLING_CYCLE[userElement] === dayElement) return "controlling";
  if (CONTROLLING_CYCLE[dayElement] === userElement) return "being_controlled";
  return "neutral";
}

// --- Types ---

interface UserData {
  mbtiType: string;
  birthStem: string;
  birthElement: string;
  birthYinYang: string;
}

interface DayInfo {
  day: number;
  pillar: Pillar;
  energyLevel: number;
  luck: number;
  relationship: RelationshipType;
  dayDescription: string;
  interaction: string;
  bestFor: string[];
  watchOutFor: string[];
}

interface SelectedDay extends DayInfo {
  date: Date;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const elementIcons: Record<string, string> = {
  Wood: "\u{1F33F}", Fire: "\u{1F525}", Earth: "\u{26F0}\uFE0F", Metal: "\u{2728}", Water: "\u{1F4A7}",
};

// --- Component ---

export default function CalendarPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);

  const todayDate = useMemo(() => new Date(), []);

  useEffect(() => {
    const storedUser = localStorage.getItem("mbti-saju-user");
    if (!storedUser) {
      router.push("/onboarding");
      return;
    }
    const user = JSON.parse(storedUser);
    setUserData({
      mbtiType: user.mbtiType,
      birthStem: user.birthStem,
      birthElement: user.birthElement,
      birthYinYang: user.birthYinYang,
    });
  }, [router]);

  // Calculate all days in the current month
  const monthDays = useMemo(() => {
    if (!userData) return [];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: DayInfo[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const pillar = getDayPillar(currentYear, currentMonth + 1, d);
      const relationship = determineRelationshipType(
        userData.birthElement, userData.birthYinYang,
        pillar.element, pillar.yinYang
      );
      const activity = ACTIVITY_TAGS[relationship];
      const dayKey = `${pillar.stem}-${pillar.branch}`;
      const dayDescription = DAY_DESCRIPTIONS[dayKey] || "A day of balance and flow";
      const interactionKey = `${userData.birthStem}-${pillar.stem}`;
      const interaction = STEM_INTERACTIONS[interactionKey] || "";

      days.push({
        day: d,
        pillar,
        energyLevel: activity.energyLevel,
        luck: activity.luck,
        relationship,
        dayDescription,
        interaction,
        bestFor: activity.bestFor.slice(0, 3),
        watchOutFor: activity.watchOutFor.slice(0, 2),
      });
    }

    return days;
  }, [userData, currentYear, currentMonth]);

  // First day of month offset (0 = Sunday)
  const firstDayOffset = useMemo(
    () => new Date(currentYear, currentMonth, 1).getDay(),
    [currentYear, currentMonth]
  );

  const isToday = useCallback(
    (day: number) =>
      currentYear === todayDate.getFullYear() &&
      currentMonth === todayDate.getMonth() &&
      day === todayDate.getDate(),
    [currentYear, currentMonth, todayDate]
  );

  const isCurrentMonth =
    currentYear === todayDate.getFullYear() &&
    currentMonth === todayDate.getMonth();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleToday = () => {
    setCurrentYear(todayDate.getFullYear());
    setCurrentMonth(todayDate.getMonth());
  };

  const handleDayTap = (dayInfo: DayInfo) => {
    if (!userData) return;
    const date = new Date(currentYear, currentMonth, dayInfo.day);
    setSelectedDay({ ...dayInfo, date });
  };

  const getEnergyColor = (energy: number) => {
    if (energy >= 4) return "bg-sage-400";
    if (energy === 3) return "bg-amber-400";
    return "bg-red-400";
  };

  const getEnergyBorder = (energy: number) => {
    if (energy >= 4) return "border-sage-400";
    if (energy === 3) return "border-amber-400";
    return "border-red-400";
  };

  const getEnergyBg = (energy: number) => {
    if (energy >= 4) return "bg-sage-50";
    if (energy === 3) return "bg-amber-50";
    return "bg-red-50";
  };

  if (!userData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-violet-200 border-t-violet-500 rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-8">
      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-warm-600 hover:text-warm-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Home</span>
          </button>
        </div>
      </header>

      <div className="px-4 md:px-6">
        <div className="max-w-md mx-auto space-y-4">
          {/* Month Navigation */}
          <div className="bg-white rounded-3xl shadow-soft p-5 animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={handlePrevMonth}
                className="w-9 h-9 rounded-xl bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="text-center">
                <h2 className="text-lg font-bold text-warm-900">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </h2>
              </div>

              <button
                onClick={handleNextMonth}
                className="w-9 h-9 rounded-xl bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Today button */}
            {!isCurrentMonth && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={handleToday}
                  className="text-xs font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-full transition-colors"
                >
                  Today
                </button>
              </div>
            )}

            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-2">
              {WEEKDAYS.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-warm-400 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for offset */}
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Day cells */}
              {monthDays.map((dayInfo) => {
                const today = isToday(dayInfo.day);
                return (
                  <button
                    key={dayInfo.day}
                    onClick={() => handleDayTap(dayInfo)}
                    className={`
                      aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all
                      ${today ? "ring-2 ring-violet-500 ring-offset-1" : ""}
                      ${getEnergyBg(dayInfo.energyLevel)}
                      hover:scale-105 active:scale-95
                    `}
                  >
                    <span className={`text-sm font-medium ${today ? "text-violet-700" : "text-warm-700"}`}>
                      {dayInfo.day}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${getEnergyColor(dayInfo.energyLevel)}`} />
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-5 mt-4 pt-4 border-t border-warm-100">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-sage-400" />
                <span className="text-xs text-warm-500">Favorable</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-xs text-warm-500">Neutral</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="text-xs text-warm-500">Challenging</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Day Detail Modal */}
      {selectedDay && (() => {
        const selectedDate = new Date(currentYear, currentMonth, selectedDay.day);
        const todayMidnight = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
        const isFuture = selectedDate.getTime() > todayMidnight.getTime();

        const energyLabel = selectedDay.energyLevel >= 4 ? "Favorable" : selectedDay.energyLevel === 3 ? "Neutral" : "Challenging";

        const formattedDate = selectedDay.date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        });

        return (
          <div
            className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center animate-fade-in"
            onClick={() => setSelectedDay(null)}
          >
            <div
              className="w-full max-w-md bg-white rounded-t-3xl shadow-medium max-h-[85vh] overflow-y-auto animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {isFuture ? (
                /* ---- FUTURE DAY: Energy Forecast ---- */
                <div className="p-6 text-center">
                  {/* Close button */}
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4 text-warm-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-violet-500 text-2xl mb-3">&#x1F52E;</p>
                  <p className="text-xs font-semibold text-violet-500 uppercase tracking-wider mb-4">Energy Forecast</p>

                  <p className="text-sm text-warm-500 mb-1">{formattedDate}</p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                      selectedDay.energyLevel >= 4
                        ? "bg-sage-100 text-sage-700"
                        : selectedDay.energyLevel === 3
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {energyLabel} ({selectedDay.energyLevel}/5)
                    </span>
                  </div>

                  <p className="text-warm-700 font-medium mb-6">
                    {elementIcons[selectedDay.pillar.element]} {selectedDay.pillar.element} Day
                  </p>

                  <div className="bg-warm-50 rounded-2xl p-5 mb-2">
                    <p className="text-warm-600 text-sm leading-relaxed">
                      Your personalized daily insight will be available on{" "}
                      <span className="font-semibold text-warm-800">
                        {selectedDay.date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                      </span>.
                    </p>
                    <p className="text-warm-500 text-sm mt-2 leading-relaxed">
                      Come back then to see how this day&apos;s energy specifically affects you.
                    </p>
                  </div>
                </div>
              ) : (
                /* ---- TODAY / PAST: Full Detail ---- */
                <>
                  {/* Modal header */}
                  <div className={`p-6 border-b ${getEnergyBorder(selectedDay.energyLevel)} border-b-2`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-warm-500">{formattedDate}</p>
                        <h3 className="text-lg font-bold text-warm-900 mt-0.5">
                          {selectedDay.dayDescription}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedDay(null)}
                        className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4 text-warm-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Element + Energy badges */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-warm-100 rounded-full text-xs font-medium text-warm-700">
                        {elementIcons[selectedDay.pillar.element]} {selectedDay.pillar.yinYang} {selectedDay.pillar.element}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        selectedDay.energyLevel >= 4
                          ? "bg-sage-100 text-sage-700"
                          : selectedDay.energyLevel === 3
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                      }`}>
                        Energy {selectedDay.energyLevel}/5
                      </span>
                    </div>
                  </div>

                  {/* Energy dots */}
                  <div className="px-6 py-4 bg-warm-50/50 border-b border-warm-100">
                    <div className="flex justify-around">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-warm-600 w-14">Energy</span>
                        <div className="flex gap-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2.5 h-2.5 rounded-full ${
                                i < selectedDay.energyLevel ? "bg-violet-500" : "bg-warm-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-warm-600 w-14">Luck</span>
                        <div className="flex gap-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2.5 h-2.5 rounded-full ${
                                i < selectedDay.luck ? "bg-sage-500" : "bg-warm-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Best for / Watch out */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-sm font-semibold text-warm-700">Best for</h3>
                        </div>
                        <ul className="space-y-2">
                          {selectedDay.bestFor.map((item, i) => (
                            <li key={i} className="text-sm text-warm-600 leading-snug">{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01" />
                            </svg>
                          </div>
                          <h3 className="text-sm font-semibold text-warm-700">Watch out</h3>
                        </div>
                        <ul className="space-y-2">
                          {selectedDay.watchOutFor.map((item, i) => (
                            <li key={i} className="text-sm text-warm-600 leading-snug">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* View Full Reading — only for today */}
                    {isToday(selectedDay.day) && (
                      <button
                        onClick={() => router.push("/")}
                        className="w-full mt-5 py-3 px-4 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-600 text-sm font-semibold transition-colors"
                      >
                        View Full Reading
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })()}
    </main>
  );
}
