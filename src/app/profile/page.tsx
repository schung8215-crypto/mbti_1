"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { MBTI_DESCRIPTIONS } from "@/content/mbti-descriptions";
import { calculateUserBirthPillar } from "@/lib/bazi";

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

const elementColors: Record<string, { bg: string; text: string; gradient: string; tagBg: string }> = {
  Wood: { bg: "bg-sage-100", text: "text-sage-700", gradient: "from-sage-500 via-sage-600 to-sage-700", tagBg: "bg-sage-50 border border-sage-200" },
  Fire: { bg: "bg-red-100", text: "text-red-600", gradient: "from-red-400 via-red-500 to-red-600", tagBg: "bg-red-50 border border-red-200" },
  Earth: { bg: "bg-amber-100", text: "text-amber-700", gradient: "from-amber-400 via-amber-500 to-amber-600", tagBg: "bg-amber-50 border border-amber-200" },
  Metal: { bg: "bg-warm-200", text: "text-warm-700", gradient: "from-warm-400 via-warm-500 to-warm-600", tagBg: "bg-warm-100 border border-warm-300" },
  Water: { bg: "bg-blue-100", text: "text-blue-600", gradient: "from-blue-400 via-blue-500 to-blue-600", tagBg: "bg-blue-50 border border-blue-200" },
};

const elementIcons: Record<string, string> = {
  Wood: "\u{1F33F}", Fire: "\u{1F525}", Earth: "\u26F0\uFE0F", Metal: "\u2728", Water: "\u{1F4A7}",
};

const animalIcons: Record<string, string> = {
  Rat: "\u{1F400}", Ox: "\u{1F402}", Tiger: "\u{1F405}", Rabbit: "\u{1F407}",
  Dragon: "\u{1F432}", Snake: "\u{1F40D}", Horse: "\u{1F434}", Goat: "\u{1F410}",
  Monkey: "\u{1F435}", Rooster: "\u{1F413}", Dog: "\u{1F415}", Pig: "\u{1F437}",
};

const elementDescriptions: Record<string, { traits: string; strengths: string[] }> = {
  Wood: {
    traits: "Wood energy represents growth, creativity, and vision. You have a natural ability to see possibilities and initiate new projects. Like a tree reaching toward the sun, you're driven to expand and evolve.",
    strengths: ["Creative", "Visionary", "Flexible", "Compassionate"],
  },
  Fire: {
    traits: "Fire energy embodies passion, warmth, and charisma. You light up any room and inspire others with your enthusiasm. Your natural expressiveness draws people to you.",
    strengths: ["Passionate", "Charismatic", "Joyful", "Inspiring"],
  },
  Earth: {
    traits: "Earth energy grounds you with stability, reliability, and practicality. You're the person others turn to for support and wisdom. Your nurturing nature creates harmony around you.",
    strengths: ["Reliable", "Nurturing", "Practical", "Grounded"],
  },
  Metal: {
    traits: "Metal energy gives you clarity, precision, and strong values. You have high standards and a refined sense of quality. Your disciplined approach helps you achieve excellence.",
    strengths: ["Disciplined", "Precise", "Principled", "Refined"],
  },
  Water: {
    traits: "Water energy flows with wisdom, adaptability, and depth. You have a reflective nature and strong intuition. Like water finding its path, you navigate challenges with fluidity.",
    strengths: ["Intuitive", "Wise", "Adaptable", "Reflective"],
  },
};

const animalDescriptions: Record<string, { traits: string; strengths: string[] }> = {
  Rat: { traits: "Quick-witted and resourceful, the Rat brings cleverness and charm. You excel at finding opportunities others miss and have a natural talent for networking.", strengths: ["Clever", "Quick-witted", "Resourceful", "Charming"] },
  Ox: { traits: "Strong and dependable, the Ox represents determination and hard work. You approach tasks with patience and persistence, building lasting results over time.", strengths: ["Dependable", "Patient", "Determined", "Hardworking"] },
  Tiger: { traits: "Bold and competitive, the Tiger embodies courage and confidence. You're a natural leader who isn't afraid to take risks and stand up for what you believe.", strengths: ["Courageous", "Confident", "Bold", "Competitive"] },
  Rabbit: { traits: "Gentle and elegant, the Rabbit brings grace and diplomacy. You have refined tastes and a talent for creating peaceful, beautiful environments.", strengths: ["Graceful", "Diplomatic", "Gentle", "Artistic"] },
  Dragon: { traits: "Powerful and lucky, the Dragon symbolizes ambition and success. You have a magnetic presence and the drive to achieve extraordinary things.", strengths: ["Ambitious", "Confident", "Energetic", "Charismatic"] },
  Snake: { traits: "Wise and intuitive, the Snake represents deep thinking and mystery. You have excellent judgment and a sophisticated approach to life's challenges.", strengths: ["Intuitive", "Wise", "Sophisticated", "Analytical"] },
  Horse: { traits: "Free-spirited and energetic, the Horse loves adventure and independence. You're enthusiastic about life and inspire others with your positive energy.", strengths: ["Energetic", "Independent", "Adventurous", "Cheerful"] },
  Goat: { traits: "Creative and gentle, the Goat brings artistic sensitivity and kindness. You have a rich inner world and appreciate beauty in all its forms.", strengths: ["Creative", "Kind", "Artistic", "Empathetic"] },
  Monkey: { traits: "Clever and playful, the Monkey excels at problem-solving and innovation. You have a sharp mind and a great sense of humor that keeps life interesting.", strengths: ["Clever", "Innovative", "Playful", "Versatile"] },
  Rooster: { traits: "Observant and hardworking, the Rooster brings honesty and precision. You have high standards and pay attention to details others might miss.", strengths: ["Observant", "Honest", "Hardworking", "Precise"] },
  Dog: { traits: "Loyal and sincere, the Dog represents faithfulness and justice. You're a true friend who values honesty and stands by those you care about.", strengths: ["Loyal", "Sincere", "Faithful", "Protective"] },
  Pig: { traits: "Generous and compassionate, the Pig brings warmth and sincerity. You enjoy life's pleasures and have a big heart for helping others.", strengths: ["Generous", "Compassionate", "Sincere", "Easygoing"] },
};

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("mbti-saju-user");
    if (!storedUser) {
      router.push("/onboarding");
      return;
    }
    setUserData(JSON.parse(storedUser));
  }, [router]);

  const handleReset = () => {
    if (confirm("Are you sure you want to reset your profile? You'll need to take the test again.")) {
      localStorage.removeItem("mbti-saju-user");
      router.push("/onboarding");
    }
  };

  if (!userData) {
    return null;
  }

  const mbtiDescription = MBTI_DESCRIPTIONS[userData.mbtiType];
  const elStyle = elementColors[userData.birthElement] || elementColors.Earth;

  let zodiacAnimal = userData.birthAnimal;
  let yearStem = userData.yearStem;
  let yearBranch = userData.yearBranch;
  if ((!zodiacAnimal || !yearStem) && userData.birthYear) {
    const recalculated = calculateUserBirthPillar(userData.birthYear, userData.birthMonth, userData.birthDay);
    zodiacAnimal = recalculated.birthAnimal;
    yearStem = recalculated.yearStem;
    yearBranch = recalculated.yearBranch;
  }
  zodiacAnimal = zodiacAnimal || "Dragon";

  return (
    <main className="min-h-screen pb-20">
      {/* Hero header */}
      <div className="bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 px-6 pt-8 pb-16 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-md mx-auto text-center relative z-10">
          <div className="w-24 h-24 bg-white/15 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-glow animate-fade-in">
            <span className="text-white font-bold text-3xl tracking-wide">{userData.mbtiType}</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1 animate-fade-in">
            {mbtiDescription?.title || userData.mbtiType}
          </h1>
          <p className="text-violet-200 text-sm animate-fade-in">
            {userData.birthYinYang} {userData.birthElement} {elementIcons[userData.birthElement]} &middot; {zodiacAnimal} {animalIcons[zodiacAnimal]}
          </p>
        </div>
      </div>

      {/* Cards — overlap the header */}
      <div className="px-4 md:px-6 -mt-8">
        <div className="max-w-md mx-auto space-y-4">

          {/* Birth Chart card */}
          <div className="bg-white rounded-3xl shadow-medium p-5 animate-slide-up">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">Birth Chart</h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Day Pillar */}
              <div className={`rounded-2xl bg-gradient-to-br ${elStyle.gradient} p-4 text-center`}>
                <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wider mb-2">Day Pillar</p>
                <p className="text-white text-2xl font-bold tracking-wider mb-1">{userData.birthStem} {userData.birthBranch}</p>
                <p className="text-white/80 text-xs font-medium">
                  {elementIcons[userData.birthElement]} {userData.birthYinYang} {userData.birthElement}
                </p>
              </div>
              {/* Year Pillar */}
              <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 p-4 text-center">
                <p className="text-white/70 text-[10px] font-semibold uppercase tracking-wider mb-2">Year Pillar</p>
                <p className="text-white text-2xl font-bold tracking-wider mb-1">
                  {yearStem && yearBranch ? `${yearStem} ${yearBranch}` : "\u2014"}
                </p>
                <p className="text-white/80 text-xs font-medium">
                  {animalIcons[zodiacAnimal]} {zodiacAnimal}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-warm-100">
              <span className="text-warm-500 text-xs">Born</span>
              <span className="text-warm-800 text-sm font-semibold">
                {userData.birthYear}.{String(userData.birthMonth).padStart(2, "0")}.{String(userData.birthDay).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Element card */}
          <div className="bg-white rounded-3xl shadow-soft p-6 animate-slide-up">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
              Your Birth Element
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${elStyle.gradient} flex items-center justify-center shadow-soft`}>
                <span className="text-3xl">{elementIcons[userData.birthElement]}</span>
              </div>
              <div>
                <p className={`font-bold text-lg ${elStyle.text}`}>
                  {userData.birthYinYang} {userData.birthElement}
                </p>
                <p className="text-warm-500 text-sm">
                  {userData.birthYinYang === "Yang" ? "Active & outward" : "Receptive & inward"} energy
                </p>
              </div>
            </div>
            <p className="text-warm-600 text-sm leading-relaxed mb-4">
              {elementDescriptions[userData.birthElement]?.traits}
            </p>
            <div className="flex flex-wrap gap-2">
              {elementDescriptions[userData.birthElement]?.strengths.map((s, i) => (
                <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${elStyle.tagBg} ${elStyle.text}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Zodiac Animal card */}
          <div className="bg-white rounded-3xl shadow-soft p-6 animate-slide-up">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
              Your Zodiac Animal
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center shadow-soft">
                <span className="text-3xl">{animalIcons[zodiacAnimal]}</span>
              </div>
              <div>
                <p className="font-bold text-lg text-violet-700">{zodiacAnimal}</p>
                <p className="text-warm-500 text-sm">Year of the {zodiacAnimal}</p>
              </div>
            </div>
            <p className="text-warm-600 text-sm leading-relaxed mb-4">
              {animalDescriptions[zodiacAnimal]?.traits}
            </p>
            <div className="flex flex-wrap gap-2">
              {animalDescriptions[zodiacAnimal]?.strengths.map((s, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-50 border border-violet-200 text-violet-700">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* MBTI card */}
          {mbtiDescription && (
            <div className="bg-white rounded-3xl shadow-soft p-6 animate-slide-up">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
                About Your Type
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center shadow-soft">
                  <span className="font-bold text-xl text-white">{userData.mbtiType}</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-sage-700">{mbtiDescription.title}</p>
                  <p className="text-warm-500 text-sm">Personality type</p>
                </div>
              </div>
              <p className="text-warm-600 text-sm leading-relaxed mb-4">
                {mbtiDescription.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {mbtiDescription.strengths.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-sage-50 border border-sage-200 text-sage-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Profile */}
          <button
            onClick={() => {
              const text = `My Innergy Profile: ${userData.mbtiType} (${mbtiDescription?.title || ""}) \u2022 ${userData.birthYinYang} ${userData.birthElement} ${elementIcons[userData.birthElement]} \u2022 Year of the ${zodiacAnimal} ${animalIcons[zodiacAnimal]}\n\nDiscover yours at myinnergy.vercel.app`;
              if (navigator.share) {
                navigator.share({ title: "My Innergy Profile", text });
              } else {
                navigator.clipboard.writeText(text);
                alert("Profile copied to clipboard!");
              }
            }}
            className="w-full bg-white rounded-3xl shadow-soft p-4 flex items-center gap-3 hover:shadow-medium transition-shadow"
          >
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-warm-900">Share Your Profile</p>
              <p className="text-xs text-warm-500">Show your cosmic identity</p>
            </div>
            <svg className="w-5 h-5 text-warm-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* How it works */}
          <button
            onClick={() => router.push("/about")}
            className="w-full bg-white rounded-3xl shadow-soft p-4 flex items-center gap-3 hover:shadow-medium transition-shadow"
          >
            <div className="w-10 h-10 bg-warm-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-warm-900">How It Works</p>
              <p className="text-xs text-warm-500">Learn about your daily insights</p>
            </div>
            <svg className="w-5 h-5 text-warm-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Reset */}
          <div className="pt-2 pb-4">
            <button
              onClick={handleReset}
              className="w-full py-3 px-4 rounded-xl text-warm-500 hover:text-red-500 hover:bg-red-50 transition-colors text-sm font-medium"
            >
              Reset Profile
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
