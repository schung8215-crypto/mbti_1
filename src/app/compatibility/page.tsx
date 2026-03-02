"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
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
  Wood: "\u{1F33F}",
  Fire: "\u{1F525}",
  Earth: "\u{26F0}\uFE0F",
  Metal: "\u{2728}",
  Water: "\u{1F4A7}",
};

const animalIcons: Record<string, string> = {
  Rat: "🐭", Ox: "🐂", Tiger: "🐯", Rabbit: "🐰",
  Dragon: "🐉", Snake: "🐍", Horse: "🐴", Goat: "🐐",
  Monkey: "🐒", Rooster: "🐓", Dog: "🐕", Pig: "🐷",
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

// ── Cognitive function friendly labels ────────────────────────────
const cognitiveLabels: Record<string, string> = {
  Ni: "Introverted Intuition",
  Ne: "Extraverted Intuition",
  Si: "Introverted Sensing",
  Se: "Extraverted Sensing",
  Ti: "Introverted Thinking",
  Te: "Extraverted Thinking",
  Fi: "Introverted Feeling",
  Fe: "Extraverted Feeling",
};

// ── Animal compatibility ─────────────────────────────────────────
const TRINITY_GROUPS = [
  ["Rat", "Dragon", "Monkey"],
  ["Ox", "Snake", "Rooster"],
  ["Tiger", "Horse", "Dog"],
  ["Rabbit", "Goat", "Pig"],
];

const SECRET_FRIENDS: [string, string][] = [
  ["Rat", "Ox"], ["Tiger", "Pig"], ["Rabbit", "Dog"],
  ["Dragon", "Rooster"], ["Snake", "Monkey"], ["Horse", "Goat"],
];

const CONFLICTS: [string, string][] = [
  ["Rat", "Horse"], ["Ox", "Goat"], ["Tiger", "Monkey"],
  ["Rabbit", "Rooster"], ["Dragon", "Dog"], ["Snake", "Pig"],
];

interface AnimalCompatibility {
  title: string;
  score: number;
  description: string;
}

function getAnimalCompatibility(a: string, b: string): AnimalCompatibility {
  if (a === b) return {
    title: "Perfect Match",
    score: 5,
    description: "You share the same animal sign — deeply in tune with each other's rhythms and needs.",
  };

  const isFriends = SECRET_FRIENDS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  if (isFriends) return {
    title: "Secret Friends",
    score: 5,
    description: "A rare, powerful bond. Your energies complement each other so naturally it feels effortless.",
  };

  const isTrinity = TRINITY_GROUPS.some((group) => group.includes(a) && group.includes(b));
  if (isTrinity) return {
    title: "Kindred Spirits",
    score: 4,
    description: "You belong to the same energy family — shared values and a natural understanding between you.",
  };

  const isConflict = CONFLICTS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  if (isConflict) return {
    title: "Magnetic Tension",
    score: 2,
    description: "Opposite energies that push against each other. Growth is possible, but patience is essential.",
  };

  return {
    title: "Neutral Ground",
    score: 3,
    description: "Your animal energies are neither in conflict nor in harmony — a blank canvas to build on.",
  };
}

// ── Hero gradient based on score ─────────────────────────────────
function getHeroColor(score: number): string {
  if (score >= 4) return "#c67d5c";  // terracotta
  if (score === 3) return "#7a9e92";  // sage
  return "#c49a6c";                   // warm amber
}

// ── Interfaces ───────────────────────────────────────────────────
interface UserData {
  mbtiType: string;
  birthElement: string;
  birthYinYang: string;
  birthAnimal: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
}

interface InviterProfile {
  mbtiType: string;
  element: string;
  yinYang: string;
  animal: string;
  title: string;
}

function buildShareLink(userData: UserData, birthYear: string, birthMonth: string, birthDay: string): string {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  const title = MBTI_DESCRIPTIONS[userData.mbtiType]?.title || userData.mbtiType;
  const params = new URLSearchParams({
    from: userData.mbtiType,
    el: userData.birthElement,
    yy: userData.birthYinYang,
    an: userData.birthAnimal,
    name: title,
    by: birthYear,
    bm: birthMonth,
    bd: birthDay,
  });
  return `${base}/compatibility?${params.toString()}`;
}

async function shareOrCopy(url: string, label: string): Promise<"shared" | "copied"> {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check our compatibility on Haru!",
        text: `${label} wants to check your compatibility on Haru ✨`,
        url,
      });
      return "shared";
    } catch { /* user cancelled */ }
  }
  await navigator.clipboard.writeText(url);
  return "copied";
}

function CompatibilityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("input");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [inviter, setInviter] = useState<InviterProfile | null>(null);
  const [shareFeedback, setShareFeedback] = useState<"" | "shared" | "copied">("");

  // Partner inputs
  const [partnerMbti, setPartnerMbti] = useState("");
  const [partnerYear, setPartnerYear] = useState("");
  const [partnerMonth, setPartnerMonth] = useState("");
  const [partnerDay, setPartnerDay] = useState("");

  // Results
  const [report, setReport] = useState<CompatibilityReport | null>(null);
  const [partnerElement, setPartnerElement] = useState("");
  const [partnerYinYang, setPartnerYinYang] = useState("");
  const [partnerAnimal, setPartnerAnimal] = useState("");

  // Compact dimensions
  const [expandedDim, setExpandedDim] = useState<string | null>(null);

  // Auto-check when routed from reveal with ?autocheck=1
  const [shouldAutoCheck, setShouldAutoCheck] = useState(false);
  const autoCheckRef = useRef(false);

  // Read inviter from URL params + auto-fill partner fields
  useEffect(() => {
    const from = searchParams.get("from");
    const el = searchParams.get("el");
    const yy = searchParams.get("yy");
    const an = searchParams.get("an");
    const name = searchParams.get("name");
    const by = searchParams.get("by");
    const bm = searchParams.get("bm");
    const bd = searchParams.get("bd");

    if (from && el && yy) {
      setInviter({ mbtiType: from, element: el, yinYang: yy, animal: an || "", title: name || from });
      setPartnerMbti(from);
      if (by) setPartnerYear(by);
      if (bm) setPartnerMonth(bm);
      if (bd) setPartnerDay(bd);
      if (searchParams.get("autocheck")) setShouldAutoCheck(true);
    }
  }, [searchParams]);

  // Dynamically calculate partner's element/animal from date inputs
  const partnerPillarPreview = (() => {
    const y = parseInt(partnerYear);
    const m = parseInt(partnerMonth);
    const d = parseInt(partnerDay);
    if (y > 1900 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      try {
        return calculateUserBirthPillar(y, m, d);
      } catch { return null; }
    }
    return null;
  })();

  const canSubmit = partnerMbti && partnerYear && partnerMonth && partnerDay;

  // Auto-check effect: fires once when all data is ready and autocheck=1 was in URL
  useEffect(() => {
    if (shouldAutoCheck && canSubmit && userData && step === "input" && !autoCheckRef.current) {
      autoCheckRef.current = true;
      handleCheck();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAutoCheck, canSubmit, userData, step]);

  useEffect(() => {
    const storedUser = localStorage.getItem("mbti-saju-user");
    if (!storedUser) {
      // Preserve invite context before redirecting to onboarding
      const from = searchParams.get("from");
      const el = searchParams.get("el");
      const yy = searchParams.get("yy");
      if (from && el && yy) {
        localStorage.setItem("haru-pending-invite", JSON.stringify({
          inviterMBTI: from,
          inviterName: searchParams.get("name") || from,
          inviterElement: el,
          inviterYinYang: yy,
          inviterAnimal: searchParams.get("an") || "",
          inviterBirthYear: searchParams.get("by") ? parseInt(searchParams.get("by")!) : null,
          inviterBirthMonth: searchParams.get("bm") ? parseInt(searchParams.get("bm")!) : null,
          inviterBirthDay: searchParams.get("bd") ? parseInt(searchParams.get("bd")!) : null,
        }));
      }
      router.push("/onboarding/intro");
      return;
    }
    const user = JSON.parse(storedUser);
    setUserData({
      mbtiType: user.mbtiType,
      birthElement: user.birthElement,
      birthYinYang: user.birthYinYang,
      birthAnimal: user.birthAnimal || "",
      birthYear: String(user.birthYear || ""),
      birthMonth: String(user.birthMonth || ""),
      birthDay: String(user.birthDay || ""),
    });
  }, [router, searchParams]);

  const handleCheck = () => {
    if (!userData || !canSubmit) return;
    setStep("loading");

    const pillar = calculateUserBirthPillar(
      parseInt(partnerYear),
      parseInt(partnerMonth),
      parseInt(partnerDay)
    );

    setPartnerElement(pillar.birthElement);
    setPartnerYinYang(pillar.birthYinYang);
    setPartnerAnimal(pillar.birthAnimal || "");

    const result = generateCompatibilityReport(
      { mbtiType: userData.mbtiType, birthElement: userData.birthElement, birthYinYang: userData.birthYinYang },
      { mbtiType: partnerMbti, birthElement: pillar.birthElement, birthYinYang: pillar.birthYinYang }
    );

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
    setPartnerAnimal("");
    setExpandedDim(null);
    setShareFeedback("");
    setStep("input");
  };

  const handleInviteFriend = useCallback(async () => {
    if (!userData) return;
    const url = buildShareLink(userData, userData.birthYear, userData.birthMonth, userData.birthDay);
    const title = MBTI_DESCRIPTIONS[userData.mbtiType]?.title || userData.mbtiType;
    const result = await shareOrCopy(url, title);
    setShareFeedback(result);
    setTimeout(() => setShareFeedback(""), 3000);
  }, [userData]);

  if (!userData) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-terracotta-200 border-t-terracotta-500 rounded-full animate-spin" />
      </main>
    );
  }

  // ── LOADING ──────────────────────────────────────────────────────
  if (step === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-terracotta-200 border-t-terracotta-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-warm-600 text-sm">Analyzing your compatibility...</p>
        </div>
      </main>
    );
  }

  // ── RESULTS ──────────────────────────────────────────────────────
  if (step === "results" && report) {
    const userElColor = elementColors[userData.birthElement] || elementColors.Earth;
    const partnerElColor = elementColors[partnerElement] || elementColors.Earth;
    const animalCompat = getAnimalCompatibility(userData.birthAnimal, partnerAnimal);
    const heroColor = getHeroColor(report.overallScore);

    return (
      <main className="min-h-screen pb-20">
        <header className="px-6 pt-6 pb-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-xl font-bold text-warm-900 tracking-tight">Compatibility</h1>
          </div>
        </header>

        <div className="px-4 md:px-6">
          <div className="max-w-md mx-auto space-y-4">

            {/* 1. Hero Card */}
            <div className="animate-slide-up rounded-3xl p-6 shadow-glow text-center" style={{ background: heroColor }}>
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-1">
                    <span className="text-white font-bold text-sm">{userData.mbtiType}</span>
                  </div>
                  <p className="text-white/70 text-xs">You</p>
                </div>
                <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-1">
                    <span className="text-white font-bold text-sm">{partnerMbti}</span>
                  </div>
                  <p className="text-white/70 text-xs">Partner</p>
                </div>
              </div>

              <div className="flex justify-center gap-1.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${i < Math.round(report.overallScore) ? "bg-white" : "bg-white/25"}`}
                  />
                ))}
              </div>
              <p className="text-white text-xl font-bold">{report.scoreLabel}</p>
            </div>

            {/* 2. Element Match */}
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
                  <span className="text-xs font-medium text-warm-500">{report.element.compatibility.title}</span>
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
                    style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: i < report.element.compatibility.score ? '#5a8a7a' : '#ebe7e2',
                    }}
                  />
                ))}
              </div>

              <p className="text-sm text-warm-600 text-center leading-relaxed">
                {report.element.compatibility.description}
              </p>
            </div>

            {/* 3. Animal Match */}
            {userData.birthAnimal && partnerAnimal && (
              <div className="animate-fade-in bg-white rounded-3xl shadow-soft p-6">
                <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
                  Animal Match
                </h2>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-terracotta-50 rounded-xl flex items-center justify-center mb-1">
                      <span className="text-2xl">{animalIcons[userData.birthAnimal]}</span>
                    </div>
                    <span className="text-xs font-medium text-warm-600">{userData.birthAnimal}</span>
                  </div>

                  <div className="px-3 py-1 bg-warm-100 rounded-full">
                    <span className="text-xs font-medium text-warm-500">{animalCompat.title}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-terracotta-50 rounded-xl flex items-center justify-center mb-1">
                      <span className="text-2xl">{animalIcons[partnerAnimal]}</span>
                    </div>
                    <span className="text-xs font-medium text-warm-600">{partnerAnimal}</span>
                  </div>
                </div>

                <div className="flex justify-center gap-1.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: i < animalCompat.score ? '#c67d5c' : '#ebe7e2',
                      }}
                    />
                  ))}
                </div>

                <p className="text-sm text-warm-600 text-center leading-relaxed">
                  {animalCompat.description}
                </p>
              </div>
            )}

            {/* 4. Personality Match — Compact + Expandable */}
            <div className="animate-fade-in bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
                Personality Match
              </h2>

              <div className="space-y-2">
                {report.mbti.dimensions.map((dim) => {
                  const isOpen = expandedDim === dim.dimension;
                  return (
                    <div
                      key={dim.dimension}
                      className="border border-warm-100 rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => setExpandedDim(isOpen ? null : dim.dimension)}
                    >
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-warm-700">{dim.label}</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  width: 8, height: 8, borderRadius: '50%',
                                  background: i < dim.interaction.score ? '#c67d5c' : '#ebe7e2',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: 11, fontWeight: 500, color: '#c67d5c', background: '#fef6f0', padding: '2px 8px', borderRadius: 99, border: '1px solid #f4e8dd' }}>
                            {dim.combo}
                          </span>
                          <svg
                            className={`w-4 h-4 text-warm-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="px-4 pb-4 border-t border-warm-100 pt-3 space-y-1.5">
                          <p className="text-sm" style={{ color: '#5a8a7a' }}>
                            <span className="font-medium">Strength:</span> {dim.interaction.strength}
                          </p>
                          <p className="text-sm" style={{ color: '#d9934a' }}>
                            <span className="font-medium">Challenge:</span> {dim.interaction.challenge}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Cognitive Style — no pill, details on expand */}
                {(() => {
                  const dimKey = "cognitive";
                  const isOpen = expandedDim === dimKey;
                  return (
                    <div
                      className="border border-warm-100 rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => setExpandedDim(isOpen ? null : dimKey)}
                    >
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-warm-700">Cognitive Style</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                style={{
                                  width: 8, height: 8, borderRadius: '50%',
                                  background: i < report.mbti.functionInteraction.score ? '#c67d5c' : '#ebe7e2',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <svg
                          className={`w-4 h-4 text-warm-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {isOpen && (
                        <div className="px-4 pb-4 border-t border-warm-100 pt-3 space-y-1.5">
                          <p className="text-xs text-warm-400">
                            {cognitiveLabels[report.mbti.functionInteraction.func1] || report.mbti.functionInteraction.func1} + {cognitiveLabels[report.mbti.functionInteraction.func2] || report.mbti.functionInteraction.func2}
                          </p>
                          <p className="text-sm text-warm-600">{report.mbti.functionInteraction.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <p className="text-xs text-warm-400 text-center mt-3">Tap any dimension to expand</p>
            </div>

            {/* 5. Together */}
            <div className="animate-fade-in bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">Together</h2>
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

            {/* 6. Try Together */}
            <div className="animate-fade-in bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">Try Together</h2>
              <div className="flex flex-wrap gap-2">
                {report.activities.map((activity, i) => {
                  const colors = [
                    { bg: '#fef6f0', text: '#c67d5c', border: '#f4e8dd' },
                    { bg: '#f0f5f3', text: '#5a8a7a', border: '#d4e6df' },
                    { bg: '#fdf8f0', text: '#d9934a', border: '#f0e0c8' },
                  ]
                  const c = colors[i % colors.length]
                  return (
                    <span
                      key={i}
                      style={{
                        padding: '6px 14px',
                        background: c.bg,
                        color: c.text,
                        border: `1px solid ${c.border}`,
                        borderRadius: 99,
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {activity}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* 7. Communication Tip */}
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

            {/* 8. Actions */}
            <div className="space-y-3">
              <button
                onClick={handleInviteFriend}
                className="w-full py-4 px-6 rounded-2xl bg-white border-2 border-terracotta-200 text-terracotta-500 font-semibold hover:bg-terracotta-50 transition-all flex items-center justify-center gap-2"
              >
                {shareFeedback === "copied" ? (
                  <>✓ Link copied!</>
                ) : shareFeedback === "shared" ? (
                  <>✓ Shared!</>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Invite a Friend to Compare
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="w-full py-4 px-6 rounded-2xl text-white font-semibold transition-all shadow-md" style={{ background: '#c67d5c' }}
              >
                Try Another Match
              </button>
            </div>

          </div>
        </div>
        <BottomNav />
      </main>
    );
  }

  // ── INPUT ────────────────────────────────────────────────────────
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const userDesc = MBTI_DESCRIPTIONS[userData.mbtiType];

  return (
    <main className="min-h-screen pb-20">
      <header className="px-6 pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-warm-500 hover:text-warm-700 transition-colors mb-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-xl font-bold text-warm-900 tracking-tight">Compatibility</h1>
          <p className="text-warm-500 text-sm mt-1">See how your energies align</p>
        </div>
      </header>

      <div className="px-4 md:px-6">
        <div className="max-w-md mx-auto space-y-4">

          {/* Invited by banner */}
          {inviter && (
            <div className="bg-terracotta-50 border border-terracotta-100 rounded-3xl p-5 animate-fade-in">
              <p className="text-xs font-semibold text-terracotta-500 uppercase tracking-wider mb-3">
                ✨ Invited to Compare
              </p>
              <div className="rounded-2xl p-4" style={{ background: '#c67d5c' }}>
                <p className="font-bold text-lg text-white mb-1">{inviter.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{elementIcons[inviter.element]} {inviter.yinYang} {inviter.element}</span>
                  {inviter.animal && (
                    <>
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>·</span>
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{animalIcons[inviter.animal]} {inviter.animal}</span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-warm-500 mt-3">
                Add your info below to see how your energies align!
              </p>
            </div>
          )}

          {/* You */}
          <div className="rounded-3xl p-6 animate-fade-in" style={{ background: '#c67d5c' }}>
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>You</h2>
            <p className="font-bold text-xl text-white mb-1.5">{userDesc?.title || userData.mbtiType}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{elementIcons[userData.birthElement]} {userData.birthYinYang} {userData.birthElement}</span>
              {userData.birthAnimal && (
                <>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>·</span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{animalIcons[userData.birthAnimal]} {userData.birthAnimal}</span>
                </>
              )}
            </div>
          </div>

          {/* Partner */}
          <div className="bg-white rounded-3xl shadow-soft p-6 animate-fade-in">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">Your Partner</h2>

            {/* MBTI Selector */}
            <div className="mb-4">
              <label className="block text-sm text-warm-600 mb-1.5">MBTI Type</label>
              <select
                value={partnerMbti}
                onChange={(e) => setPartnerMbti(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-terracotta-500 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                style={selectStyle}
              >
                <option value="">Select type</option>
                {MBTI_TYPES.map((type) => (
                  <option key={type} value={type}>{type} — {MBTI_DESCRIPTIONS[type]?.title}</option>
                ))}
              </select>
            </div>

            {/* Birth Date */}
            <div className="space-y-3">
              <label className="block text-sm text-warm-600 mb-1.5">Birth Date</label>
              <select
                value={partnerYear}
                onChange={(e) => setPartnerYear(e.target.value)}
                className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-terracotta-500 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                style={selectStyle}
              >
                <option value="">Select year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={partnerMonth}
                  onChange={(e) => setPartnerMonth(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-terracotta-500 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
                  style={selectStyle}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {new Date(2000, month - 1).toLocaleString("en-US", { month: "long" })}
                    </option>
                  ))}
                </select>

                <select
                  value={partnerDay}
                  onChange={(e) => setPartnerDay(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-terracotta-500 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
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
          {step === 'input' && (
            <button
              onClick={handleCheck}
              disabled={!canSubmit}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: 16,
                border: 'none',
                background: canSubmit ? '#c67d5c' : '#d9cfc9',
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit',
                boxShadow: canSubmit ? '0 4px 20px rgba(198,125,92,0.25)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Check Compatibility
            </button>
          )}

        </div>
      </div>
      <BottomNav />
    </main>
  );
}

export default function CompatibilityPage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-3 border-terracotta-200 border-t-terracotta-500 rounded-full animate-spin" /></main>}>
      <CompatibilityContent />
    </Suspense>
  );
}
