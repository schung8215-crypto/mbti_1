"use client";

import { useState } from "react";
import {
  MBTI_QUESTIONS,
  MbtiScores,
  calculateMbtiType,
  getInitialScores,
} from "@/content/mbti-questions";
import { MBTI_DESCRIPTIONS } from "@/content/mbti-descriptions";
import { calculateUserBirthPillar } from "@/lib/bazi";

interface OnboardingFlowProps {
  onComplete: (data: {
    mbtiType: string;
    birthYear: number;
    birthMonth: number;
    birthDay: number;
  }) => void;
}

type Step = "welcome" | "explainer" | "test" | "mbti-result" | "birthdate" | "saju-result" | "final";

const elementDescriptions: Record<string, { traits: string; icon: string }> = {
  Wood: { traits: "Growth, creativity, and vision. You initiate and expand.", icon: "🌿" },
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

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
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

  const handleAnswer = (type: string) => {
    const newScores = { ...scores, [type]: scores[type as keyof MbtiScores] + 1 };
    setScores(newScores);

    if (currentQuestion < MBTI_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const calculatedType = calculateMbtiType(newScores);
      setMbtiType(calculatedType);
      setStep("mbti-result");
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
      ? 95
      : step === "final"
      ? 100
      : 0;

  // Welcome screen
  if (step === "welcome") {
    return (
      <div className="animate-fade-in">
        <div className="bg-white rounded-3xl shadow-soft p-8 text-center">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-violet-400 via-violet-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow rotate-3">
            <svg className="w-10 h-10 text-white -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-warm-900 mb-1">innergy</h1>
          <p className="text-violet-600 font-medium mb-8">Your daily inner energy guide</p>

          <button
            onClick={() => setStep("explainer")}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold hover:from-violet-600 hover:to-violet-700 transition-all shadow-md"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // Explainer screen - shows how MBTI + Saju combine
  if (step === "explainer") {
    return (
      <div className="animate-fade-in">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-warm-50 to-warm-100 px-6 py-8 text-center border-b border-warm-100">
            <h2 className="text-xl font-bold text-warm-900 mb-2">
              How Innergy Works
            </h2>
            <p className="text-warm-500 text-sm">
              Two systems, one personalized insight
            </p>
          </div>

          <div className="p-6">
            {/* Two cards side by side */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* MBTI */}
              <div className="border border-warm-200 rounded-2xl p-4">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-xl">👤</span>
                </div>
                <h3 className="font-semibold text-warm-900 text-sm mb-1">MBTI</h3>
                <p className="text-warm-500 text-xs leading-relaxed">
                  Your personality type shapes how you experience the world
                </p>
              </div>

              {/* Saju */}
              <div className="border border-warm-200 rounded-2xl p-4">
                <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-xl">☯️</span>
                </div>
                <h3 className="font-semibold text-warm-900 text-sm mb-1">Saju</h3>
                <p className="text-warm-500 text-xs leading-relaxed">
                  Your birth energy interacts with each day&apos;s energy
                </p>
              </div>
            </div>

            {/* Result - Innergy highlight with CTA */}
            <div className="bg-gradient-to-br from-violet-500 via-violet-600 to-sage-500 rounded-2xl p-6 text-center">
              <p className="text-white/80 text-xs uppercase tracking-wider mb-1">Your daily</p>
              <h3 className="text-2xl font-bold text-white mb-2">Innergy</h3>
              <p className="text-white/70 text-sm mb-5">Personalized guidance, every day</p>
              <button
                onClick={() => setStep("test")}
                className="w-full py-4 px-6 rounded-xl bg-white text-violet-600 font-semibold hover:bg-warm-50 transition-all"
              >
                Take the 2-min Test
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
              className="h-full bg-gradient-to-r from-violet-400 to-violet-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-6">
            <p className="text-sm text-warm-400 mb-4">
              {currentQuestion + 1} / {MBTI_QUESTIONS.length}
            </p>

            <h2 className="text-lg font-semibold text-warm-900 mb-6 leading-relaxed">
              {question.question}
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => handleAnswer(question.optionA.type)}
                className="w-full p-4 text-left rounded-2xl border-2 border-warm-200 hover:border-violet-400 hover:bg-violet-50/50 transition-all"
              >
                <span className="text-warm-700">{question.optionA.text}</span>
              </button>
              <button
                onClick={() => handleAnswer(question.optionB.type)}
                className="w-full p-4 text-left rounded-2xl border-2 border-warm-200 hover:border-violet-400 hover:bg-violet-50/50 transition-all"
              >
                <span className="text-warm-700">{question.optionB.text}</span>
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
          <div className="h-1.5 bg-warm-100">
            <div className="h-full bg-gradient-to-r from-violet-400 to-violet-600" style={{ width: `${progress}%` }} />
          </div>

          {/* Header */}
          <div className="bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 px-6 py-8 text-center">
            <p className="text-violet-200 text-sm mb-2">You are</p>
            <h1 className="text-4xl font-bold text-white mb-1">{description.type}</h1>
            <p className="text-lg text-violet-100">{description.title}</p>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-warm-700 leading-relaxed text-[15px]">
              {description.summary}
            </p>

            {/* Strengths */}
            <div className="flex flex-wrap gap-2">
              {description.strengths.map((strength, i) => (
                <span key={i} className="px-3 py-1.5 bg-sage-50 text-sage-700 rounded-full text-sm font-medium">
                  {strength}
                </span>
              ))}
            </div>

            <button
              onClick={() => setStep("birthdate")}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold hover:from-violet-600 hover:to-violet-700 transition-all shadow-md"
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
          <div className="h-1.5 bg-warm-100">
            <div className="h-full bg-gradient-to-r from-violet-400 to-violet-600" style={{ width: `${progress}%` }} />
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-warm-900">Your birth date</h2>
              <p className="text-warm-500 text-sm">For your Saju energy reading</p>
            </div>

            <div className="space-y-4">
              {/* Year selector */}
              <div>
                <label className="block text-sm text-warm-600 mb-1.5">Year</label>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-violet-400 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
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
                  <label className="block text-sm text-warm-600 mb-1.5">Month</label>
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-violet-400 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
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
                  <label className="block text-sm text-warm-600 mb-1.5">Day</label>
                  <select
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-warm-200 focus:border-violet-400 outline-none text-warm-900 bg-white appearance-none cursor-pointer"
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
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold disabled:opacity-50 transition-all shadow-md mt-2"
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

    return (
      <div className="animate-slide-up">
        <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
          <div className="h-1.5 bg-warm-100">
            <div className="h-full bg-gradient-to-r from-violet-400 to-violet-600" style={{ width: `${progress}%` }} />
          </div>

          {/* Header */}
          <div className="bg-gradient-to-br from-sage-500 via-sage-600 to-sage-700 px-6 py-8 text-center">
            <p className="text-sage-200 text-sm mb-2">Your Saju energy</p>
            <h1 className="text-3xl font-bold text-white mb-1">
              {birthYinYang} {birthElement}
            </h1>
            <p className="text-lg text-sage-100">{birthAnimal}</p>
          </div>

          <div className="p-6 space-y-5">
            {/* Element */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{elementInfo.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-warm-900 mb-1">{birthYinYang} {birthElement}</p>
                <p className="text-warm-600 text-sm leading-relaxed">{elementInfo.traits}</p>
              </div>
            </div>

            {/* Animal */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{animalInfo.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-warm-900 mb-1">{birthAnimal}</p>
                <p className="text-warm-600 text-sm leading-relaxed">{animalInfo.traits}</p>
              </div>
            </div>

            <p className="text-warm-400 text-xs text-center pt-2">
              Based on 10 Heavenly Stems & 12 Earthly Branches
            </p>

            <button
              onClick={() => setStep("final")}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold hover:from-violet-600 hover:to-violet-700 transition-all shadow-md"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Final confirmation
  return (
    <div className="animate-scale-in">
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-violet-400 to-violet-600" />

        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <span className="text-white font-bold text-2xl">{mbtiType}</span>
          </div>

          <h2 className="text-xl font-bold text-warm-900 mb-1">All set!</h2>
          <p className="text-warm-500 text-sm mb-6">Your Innergy is ready</p>

          <div className="bg-warm-50 rounded-2xl p-4 mb-6 text-left">
            <div className="flex justify-between py-2">
              <span className="text-warm-500 text-sm">Type</span>
              <span className="font-semibold text-violet-600">{mbtiType}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-warm-200">
              <span className="text-warm-500 text-sm">Element</span>
              <span className="font-medium text-warm-800">{birthYinYang} {birthElement}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-warm-200">
              <span className="text-warm-500 text-sm">Zodiac</span>
              <span className="font-medium text-warm-800">{birthAnimal}</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold transition-all shadow-md"
          >
            See Today&apos;s Insight
          </button>
        </div>
      </div>
    </div>
  );
}
