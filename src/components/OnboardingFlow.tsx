"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MBTI_QUESTIONS,
  MbtiScores,
  calculateMbtiType,
  getInitialScores,
} from "@/content/mbti-questions";
import { MBTI_DESCRIPTIONS } from "@/content/mbti-descriptions";
import { calculateUserBirthPillar } from "@/lib/bazi";
import HaruIcon from "@/components/HaruIcon";
import HaruLogo from "@/components/HaruLogo";

interface PendingInvite {
  inviterMBTI: string;
  inviterName: string;
  inviterElement: string;
  inviterYinYang: string;
  inviterAnimal: string;
}

interface OnboardingFlowProps {
  onComplete: (data: {
    mbtiType: string;
    birthYear: number;
    birthMonth: number;
    birthDay: number;
  }) => void;
  pendingInvite?: PendingInvite | null;
}

const elementIcons: Record<string, string> = {
  Wood: '🌳', Fire: '🔥', Earth: '⛰️', Metal: '✨', Water: '💧',
}
const animalIcons: Record<string, string> = {
  Rat: '🐭', Ox: '🐂', Tiger: '🐯', Rabbit: '🐰', Dragon: '🐉',
  Snake: '🐍', Horse: '🐴', Goat: '🐐', Monkey: '🐒', Rooster: '🐓',
  Dog: '🐕', Pig: '🐷',
}

type Step = "welcome" | "explainer" | "test" | "mbti-result" | "birthdate" | "saju-result";

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

export default function OnboardingFlow({ onComplete, pendingInvite }: OnboardingFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<MbtiScores>(getInitialScores());
  const [mbtiType, setMbtiType] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthElement, setBirthElement] = useState("");
  const [birthYinYang, setBirthYinYang] = useState("");
  const [birthAnimal, setBirthAnimal] = useState("");

  // Track answers so we can undo them on back
  const [answerHistory, setAnswerHistory] = useState<string[]>([]);

  const handleAnswer = (type: string) => {
    const newScores = { ...scores, [type]: scores[type as keyof MbtiScores] + 1 };
    setScores(newScores);
    setAnswerHistory([...answerHistory, type]);

    if (currentQuestion < MBTI_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const calculatedType = calculateMbtiType(newScores);
      setMbtiType(calculatedType);
      setStep("mbti-result");
    }
  };

  const handleBack = () => {
    if (step === "test" && currentQuestion > 0) {
      // Undo the last answer's score
      const lastType = answerHistory[answerHistory.length - 1];
      if (lastType) {
        setScores({ ...scores, [lastType]: scores[lastType as keyof MbtiScores] - 1 });
        setAnswerHistory(answerHistory.slice(0, -1));
      }
      setCurrentQuestion(currentQuestion - 1);
    } else if (step === "test" && currentQuestion === 0) {
      setStep("explainer");
    } else if (step === "mbti-result") {
      // Undo the last answer and go back to last question
      const lastType = answerHistory[answerHistory.length - 1];
      if (lastType) {
        setScores({ ...scores, [lastType]: scores[lastType as keyof MbtiScores] - 1 });
        setAnswerHistory(answerHistory.slice(0, -1));
      }
      setCurrentQuestion(MBTI_QUESTIONS.length - 1);
      setStep("test");
    } else if (step === "birthdate") {
      setStep("mbti-result");
    } else if (step === "saju-result") {
      setStep("birthdate");
    }
  };

  const handleBirthdateSubmit = () => {
    if (birthYear && birthMonth && birthDay) {
      const result = calculateUserBirthPillar(
        parseInt(birthYear),
        parseInt(birthMonth),
        parseInt(birthDay)
      );
      setBirthElement(result.birthElement);
      setBirthYinYang(result.birthYinYang);
      setBirthAnimal(result.birthAnimal);
      setStep("saju-result");
    }
  };

  const handleConfirm = () => {
    onComplete({
      mbtiType,
      birthYear: parseInt(birthYear),
      birthMonth: parseInt(birthMonth),
      birthDay: parseInt(birthDay),
    });
  };

  const progress =
    step === "test"
      ? 15 + ((currentQuestion + 1) / MBTI_QUESTIONS.length) * 50
      : step === "mbti-result"
      ? 70
      : step === "birthdate"
      ? 80
      : step === "saju-result"
      ? 100
      : 0;

  // Splash screen
  if (step === "welcome") {
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

        {pendingInvite ? (
          /* ── Invite variant ── */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 340, position: 'relative', zIndex: 10 }}>
            {/* Inviter card */}
            <div style={{ background: '#c67d5c', borderRadius: 16, padding: '16px 20px', marginBottom: 28, width: '100%', boxShadow: '0 4px 20px rgba(198,125,92,0.25)' }}>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Invited by
              </p>
              <p style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 6 }}>{pendingInvite.inviterName}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                {elementIcons[pendingInvite.inviterElement]} {pendingInvite.inviterYinYang} {pendingInvite.inviterElement}
                {pendingInvite.inviterAnimal && (
                  <> · {animalIcons[pendingInvite.inviterAnimal]} {pendingInvite.inviterAnimal}</>
                )}
              </p>
            </div>

            <div className="mb-6">
              <HaruLogo variant="light" size="lg" />
            </div>

            <p style={{ fontSize: 14, color: '#8a7e78', textAlign: 'center', lineHeight: 1.6, marginBottom: 28 }}>
              Build your profile to see how your energies align
            </p>

            <button
              onClick={() => setStep('explainer')}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: '#c67d5c',
                border: 'none',
                borderRadius: 14,
                color: 'white',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(198, 125, 92, 0.2)',
                fontFamily: 'inherit',
              }}
            >
              Build My Profile
            </button>
          </div>
        ) : (
          /* ── Default variant ── */
          <>
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
                onClick={() => setStep('explainer')}
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
          </>
        )}
      </div>
    );
  }

  // Explainer screen - shows how MBTI + Saju combine
  if (step === "explainer") {
    return (
      <div className="animate-fade-in">
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
                  Your personality type reflects how you recharge, take in information, and make decisions.
                </p>
              </div>

              {/* Saju */}
              <div className="border border-warm-200 rounded-2xl p-3">
                <div className="w-9 h-9 bg-terracotta-50 rounded-xl flex items-center justify-center mb-2">
                  <span className="text-lg">☯️</span>
                </div>
                <h3 className="font-semibold text-warm-900 text-sm mb-1">Saju</h3>
                <p className="text-warm-500 text-xs leading-relaxed">
                  Your birth date reveals your element, animal sign, and yin/yang — and how they interact with today's energy.
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
                onClick={() => setStep("test")}
                className="w-full py-3 px-6 rounded-xl bg-white text-terracotta-500 font-semibold hover:bg-warm-50 transition-all"
              >
                Discover My Profile (2 min)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Test questions
  if (step === "test") {
    const question = MBTI_QUESTIONS[currentQuestion];

    return (
      <div className="animate-fade-in">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
          {/* Progress bar */}
          <div className="h-1.5 bg-warm-100">
            <div
              className="h-full bg-terracotta-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-warm-400 hover:text-warm-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">Back</span>
              </button>
              <p className="text-sm text-warm-400">
                {currentQuestion + 1} / {MBTI_QUESTIONS.length}
              </p>
            </div>

            <h2 className="text-base font-semibold text-warm-900 mb-4 leading-relaxed">
              {question.question}
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => handleAnswer(question.optionA.type)}
                className="w-full p-3 text-left rounded-2xl border-2 border-warm-200 hover:border-terracotta-400 hover:bg-terracotta-50/50 transition-all"
              >
                <span className="text-warm-700 text-sm">{question.optionA.text}</span>
              </button>
              <button
                onClick={() => handleAnswer(question.optionB.type)}
                className="w-full p-3 text-left rounded-2xl border-2 border-warm-200 hover:border-terracotta-400 hover:bg-terracotta-50/50 transition-all"
              >
                <span className="text-warm-700 text-sm">{question.optionB.text}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MBTI Result screen
  if (step === "mbti-result") {
    const description = MBTI_DESCRIPTIONS[mbtiType];

    return (
      <div className="animate-slide-up">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 text-center relative" style={{ background: '#c67d5c' }}>
            <button
              onClick={handleBack}
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

          <div className="p-5 space-y-3">
            <p className="text-warm-700 leading-relaxed text-sm">
              {description.summary}
            </p>

            {/* Strengths */}
            <div className="flex flex-wrap gap-2">
              {description.strengths.map((strength, i) => (
                <span key={i} className="px-3 py-1 bg-terracotta-50 text-terracotta-600 rounded-full text-xs font-medium">
                  {strength}
                </span>
              ))}
            </div>

            <button
              onClick={() => setStep("birthdate")}
              className="w-full py-3 px-6 rounded-2xl font-semibold transition-all text-white shadow-md" style={{ background: '#b36a49' }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Birthdate input with dropdown selects
  if (step === "birthdate") {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
      <div className="animate-fade-in">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">

          <div className="p-6">
            <button
              onClick={handleBack}
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

              <button
                onClick={handleBirthdateSubmit}
                disabled={!birthYear || !birthMonth || !birthDay}
                className="w-full py-3 px-6 rounded-2xl text-white font-semibold disabled:opacity-50 transition-all shadow-md" style={{ background: '#c67d5c' }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Saju Result screen
  if (step === "saju-result") {
    const elementInfo = elementDescriptions[birthElement] || elementDescriptions.Earth;
    const animalInfo = animalDescriptions[birthAnimal] || animalDescriptions.Dragon;
    const yinYangInfo = yinYangDescriptions[birthYinYang] || yinYangDescriptions.Yin;

    return (
      <div className="animate-slide-up">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 text-center relative" style={{ background: '#5a8a7a' }}>
            <button
              onClick={handleBack}
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
              Based on 10 Heavenly Stems & 12 Earthly Branches
            </p>

            <button
              onClick={handleConfirm}
              className="w-full py-3 px-6 rounded-2xl font-semibold transition-all text-white shadow-md" style={{ background: '#4a7868' }}
            >
              See My Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

}
