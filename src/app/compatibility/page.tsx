"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculateUserBirthPillar } from "@/lib/bazi";
import { generateCompatibilityReport, CompatibilityReport } from "@/lib/compatibility";
import { MBTI_DESCRIPTIONS } from "@/content/mbti-descriptions";

type Step = "input" | "loading" | "results";

const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

const elementIcons: Record<string, string> = {
  Wood: "\u{1F33F}", // 🌿
  Fire: "\u{1F525}", // 🔥
  Earth: "\u{26F0}\uFE0F", // ⛰️
  Metal: "\u{2728}", // ✨
  Water: "\u{1F4A7}", // 💧
};

const elementColors: Record<string, { bg: string; text: string }> = {
  Wood: { bg: "bg-sage-100", text: "text-sage-700" },
  Fire: { bg: "bg-red-100", text: "text-red-600" },
  Earth: { bg: "bg-amber-100", text: "text-amber-700" },
  Metal: { bg: "bg-warm-200", text: "text-warm-700" },
  Water: { bg: "bg-blue-100", text: "text-blue-600" },
};

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 1rem center",
  backgroundSize: "1.5rem",
};

interface UserData {
  mbtiType: string;
  birthElement: string;
  birthYinYang: string;
}

export default function CompatibilityPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("input");
  const [userData, setUserData] = useState<UserData | null>(null);

  // Partner inputs
  const [partnerMbti, setPartnerMbti] = useState("");
  const [partnerYear, setPartnerYear] = useState("");
  const [partnerMonth, setPartnerMonth] = useState("");
  const [partnerDay, setPartnerDay] = useState("");

  // Results
  const [report, setReport] = useState<CompatibilityReport | null>(null);
  const [partnerElement, setPartnerElement] = useState("");
  const [partnerYinYang, setPartnerYinYang] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("mbti-saju-user");
    if (!storedUser) {
      router.push("/onboarding");
      return;
    }
    const user = JSON.parse(storedUser);
    setUserData({
      mbtiType: user.mbtiType,
      birthElement: user.birthElement,
      birthYinYang: user.birthYinYang,
    });
  }, [router]);

  const canSubmit = partnerMbti && partnerYear && partnerMonth && partnerDay;

  const handleCheck = () => {
    if (!userData || !canSubmit) return;

    setStep("loading");

    // Calculate partner's birth pillar
    const partnerPillar = calculateUserBirthPillar(
      parseInt(partnerYear),
      parseInt(partnerMonth),
      parseInt(partnerDay)
    );

    setPartnerElement(partnerPillar.birthElement);
    setPartnerYinYang(partnerPillar.birthYinYang);

    const result = generateCompatibilityReport(
      {
        mbtiType: userData.mbtiType,
        birthElement: userData.birthElement,
        birthYinYang: userData.birthYinYang,
      },
      {
        mbtiType: partnerMbti,
        birthElement: partnerPillar.birthElement,
        birthYinYang: partnerPillar.birthYinYang,
      }
    );

    // Brief loading animation
    setTimeout(() => {
      setReport(result);
      setStep("results");
    }, 1500);
  };

  const handleReset = () => {
    setPartnerMbti("");
    setPartnerYear("");
    setPartnerMonth("");
    setPartnerDay("");
    setReport(null);
    setPartnerElement("");
    setPartnerYinYang("");
    setStep("input");
  };

  if (!userData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-violet-200 border-t-violet-500 rounded-full animate-spin" />
      </main>
    );
  }

  // --- LOADING ---
  if (step === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-violet-200 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-warm-600 text-sm">Analyzing your compatibility...</p>
        </div>
      </main>
    );
  }

  // --- RESULTS ---
  if (step === "results" && report) {
    const userDesc = MBTI_DESCRIPTIONS[userData.mbtiType];
    const partnerDesc = MBTI_DESCRIPTIONS[partnerMbti];
    const userElColor = elementColors[userData.birthElement] || elementColors.Earth;
    const partnerElColor = elementColors[partnerElement] || elementColors.Earth;

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
            {/* 1. Score Header */}
            <div className="animate-slide-up bg-gradient-to-br from-violet-500 via-violet-600 to-sage-600 rounded-3xl p-6 shadow-glow text-center">
              <div className="flex items-center justify-center gap-4 mb-5">
                {/* You */}
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-1">
                    <span className="text-white font-bold text-sm">{userData.mbtiType}</span>
                  </div>
                  <p className="text-violet-200 text-xs">You</p>
                </div>

                {/* Heart */}
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>

                {/* Partner */}
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-1">
                    <span className="text-white font-bold text-sm">{partnerMbti}</span>
                  </div>
                  <p className="text-violet-200 text-xs">Partner</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-center gap-1.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < Math.round(report.overallScore)
                          ? "bg-white"
                          : "bg-white/25"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-white text-xl font-bold">{report.scoreLabel}</p>
              </div>
            </div>

            {/* 2. MBTI Analysis */}
            <div className="animate-fade-in bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
                Personality Match
              </h2>

              <div className="space-y-4">
                {report.mbti.dimensions.map((dim) => (
                  <div key={dim.dimension} className="border border-warm-100 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-warm-700">{dim.label}</span>
                      <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                        {dim.combo}
                      </span>
                    </div>
                    <div className="flex gap-1.5 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < dim.interaction.score ? "bg-violet-500" : "bg-warm-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-sage-700 mb-1">
                      <span className="font-medium">Strength:</span> {dim.interaction.strength}
                    </p>
                    <p className="text-sm text-amber-700">
                      <span className="font-medium">Challenge:</span> {dim.interaction.challenge}
                    </p>
                  </div>
                ))}

                {/* Cognitive Function */}
                <div className="border border-warm-100 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-warm-700">Cognitive Style</span>
                    <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                      {report.mbti.functionInteraction.func1} + {report.mbti.functionInteraction.func2}
                    </span>
                  </div>
                  <div className="flex gap-1.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < report.mbti.functionInteraction.score ? "bg-violet-500" : "bg-warm-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-warm-600">{report.mbti.functionInteraction.description}</p>
                </div>
              </div>
            </div>

            {/* 3. Element Match */}
            <div className="animate-fade-in bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
                Element Match
              </h2>

              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 ${userElColor.bg} rounded-xl flex items-center justify-center mb-1`}>
                    <span className="text-xl">{elementIcons[userData.birthElement]}</span>
                  </div>
                  <span className={`text-xs font-medium ${userElColor.text}`}>{userData.birthElement}</span>
                </div>

                <div className="px-3 py-1 bg-warm-100 rounded-full">
                  <span className="text-xs font-medium text-warm-500">
                    {report.element.compatibility.title}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 ${partnerElColor.bg} rounded-xl flex items-center justify-center mb-1`}>
                    <span className="text-xl">{elementIcons[partnerElement]}</span>
                  </div>
                  <span className={`text-xs font-medium ${partnerElColor.text}`}>{partnerElement}</span>
                </div>
              </div>

              <div className="flex justify-center gap-1.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i < report.element.compatibility.score ? "bg-sage-500" : "bg-warm-200"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-warm-600 text-center leading-relaxed">
                {report.element.compatibility.description}
              </p>
            </div>

            {/* 4. Together — Strengths & Challenges */}
            <div className="animate-fade-in bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
                Together
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-warm-700">Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {report.strengths.map((item, i) => (
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
                    {report.challenges.map((item, i) => (
                      <li key={i} className="text-sm text-warm-600 leading-snug">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Activities */}
            <div className="animate-fade-in bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
                Try Together
              </h2>
              <div className="flex flex-wrap gap-2">
                {report.activities.map((activity, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Communication Tip */}
            <div className="animate-fade-in bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl p-6 border border-sage-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-sage-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-sage-800 mb-1">Communication Tip</h3>
                  <p className="text-sm text-sage-700 leading-relaxed">{report.communicationTip}</p>
                </div>
              </div>
            </div>

            {/* 7. Try Another Match */}
            <button
              onClick={handleReset}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold hover:from-violet-600 hover:to-violet-700 transition-all shadow-md"
            >
              Try Another Match
            </button>
          </div>
        </div>
      </main>
    );
  }

  // --- INPUT ---
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const userDesc = MBTI_DESCRIPTIONS[userData.mbtiType];

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
          {/* Title */}
          <div className="text-center mb-2">
            <h1 className="text-xl font-bold text-warm-900">Compatibility Check</h1>
            <p className="text-warm-500 text-sm mt-1">See how your energies align</p>
          </div>

          {/* You section */}
          <div className="bg-white rounded-3xl shadow-soft p-6 animate-fade-in">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3">You</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-violet-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">{userData.mbtiType}</span>
              </div>
              <div>
                <p className="font-semibold text-warm-900">{userDesc?.title || userData.mbtiType}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-violet-600 font-medium">{userData.mbtiType}</span>
                  <span className="text-warm-300">·</span>
                  <span className="text-xs text-warm-500">{userData.birthYinYang} {userData.birthElement}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Partner section */}
          <div className="bg-white rounded-3xl shadow-soft p-6 animate-fade-in">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">Your Partner</h2>

            {/* MBTI Type Selector */}
            <div className="mb-4">
              <label className="block text-sm text-warm-600 mb-1.5">MBTI Type</label>
              <select
                value={partnerMbti}
                onChange={(e) => setPartnerMbti(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-violet-400 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                style={selectStyle}
              >
                <option value="">Select type</option>
                {MBTI_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type} — {MBTI_DESCRIPTIONS[type]?.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Birth Date */}
            <div className="space-y-3">
              <label className="block text-sm text-warm-600 mb-1.5">Birth Date</label>
              {/* Year */}
              <select
                value={partnerYear}
                onChange={(e) => setPartnerYear(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-violet-400 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                style={selectStyle}
              >
                <option value="">Select year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                {/* Month */}
                <select
                  value={partnerMonth}
                  onChange={(e) => setPartnerMonth(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-violet-400 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                  style={selectStyle}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {new Date(2000, month - 1).toLocaleString("en-US", { month: "long" })}
                    </option>
                  ))}
                </select>

                {/* Day */}
                <select
                  value={partnerDay}
                  onChange={(e) => setPartnerDay(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-violet-400 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                  style={selectStyle}
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Check Compatibility Button */}
          <button
            onClick={handleCheck}
            disabled={!canSubmit}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold disabled:opacity-50 hover:from-violet-600 hover:to-violet-700 transition-all shadow-md"
          >
            Check Compatibility
          </button>
        </div>
      </div>
    </main>
  );
}
