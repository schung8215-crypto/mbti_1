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

const elementColors: Record<string, { bg: string; text: string }> = {
  Wood: { bg: "bg-sage-100", text: "text-sage-700" },
  Fire: { bg: "bg-red-100", text: "text-red-600" },
  Earth: { bg: "bg-amber-100", text: "text-amber-700" },
  Metal: { bg: "bg-warm-200", text: "text-warm-700" },
  Water: { bg: "bg-blue-100", text: "text-blue-600" },
};

const elementIcons: Record<string, string> = {
  Wood: "🌿",
  Fire: "🔥",
  Earth: "⛰️",
  Metal: "✨",
  Water: "💧",
};

const branchToAnimal: Record<string, { name: string; icon: string }> = {
  "子": { name: "Rat", icon: "🐀" },
  "丑": { name: "Ox", icon: "🐂" },
  "寅": { name: "Tiger", icon: "🐅" },
  "卯": { name: "Rabbit", icon: "🐇" },
  "辰": { name: "Dragon", icon: "🐲" },
  "巳": { name: "Snake", icon: "🐍" },
  "午": { name: "Horse", icon: "🐴" },
  "未": { name: "Goat", icon: "🐐" },
  "申": { name: "Monkey", icon: "🐵" },
  "酉": { name: "Rooster", icon: "🐓" },
  "戌": { name: "Dog", icon: "🐕" },
  "亥": { name: "Pig", icon: "🐷" },
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
  Rat: {
    traits: "Quick-witted and resourceful, the Rat brings cleverness and charm. You excel at finding opportunities others miss and have a natural talent for networking.",
    strengths: ["Clever", "Quick-witted", "Resourceful", "Charming"],
  },
  Ox: {
    traits: "Strong and dependable, the Ox represents determination and hard work. You approach tasks with patience and persistence, building lasting results over time.",
    strengths: ["Dependable", "Patient", "Determined", "Hardworking"],
  },
  Tiger: {
    traits: "Bold and competitive, the Tiger embodies courage and confidence. You're a natural leader who isn't afraid to take risks and stand up for what you believe.",
    strengths: ["Courageous", "Confident", "Bold", "Competitive"],
  },
  Rabbit: {
    traits: "Gentle and elegant, the Rabbit brings grace and diplomacy. You have refined tastes and a talent for creating peaceful, beautiful environments.",
    strengths: ["Graceful", "Diplomatic", "Gentle", "Artistic"],
  },
  Dragon: {
    traits: "Powerful and lucky, the Dragon symbolizes ambition and success. You have a magnetic presence and the drive to achieve extraordinary things.",
    strengths: ["Ambitious", "Confident", "Energetic", "Charismatic"],
  },
  Snake: {
    traits: "Wise and intuitive, the Snake represents deep thinking and mystery. You have excellent judgment and a sophisticated approach to life's challenges.",
    strengths: ["Intuitive", "Wise", "Sophisticated", "Analytical"],
  },
  Horse: {
    traits: "Free-spirited and energetic, the Horse loves adventure and independence. You're enthusiastic about life and inspire others with your positive energy.",
    strengths: ["Energetic", "Independent", "Adventurous", "Cheerful"],
  },
  Goat: {
    traits: "Creative and gentle, the Goat brings artistic sensitivity and kindness. You have a rich inner world and appreciate beauty in all its forms.",
    strengths: ["Creative", "Kind", "Artistic", "Empathetic"],
  },
  Monkey: {
    traits: "Clever and playful, the Monkey excels at problem-solving and innovation. You have a sharp mind and a great sense of humor that keeps life interesting.",
    strengths: ["Clever", "Innovative", "Playful", "Versatile"],
  },
  Rooster: {
    traits: "Observant and hardworking, the Rooster brings honesty and precision. You have high standards and pay attention to details others might miss.",
    strengths: ["Observant", "Honest", "Hardworking", "Precise"],
  },
  Dog: {
    traits: "Loyal and sincere, the Dog represents faithfulness and justice. You're a true friend who values honesty and stands by those you care about.",
    strengths: ["Loyal", "Sincere", "Faithful", "Protective"],
  },
  Pig: {
    traits: "Generous and compassionate, the Pig brings warmth and sincerity. You enjoy life's pleasures and have a big heart for helping others.",
    strengths: ["Generous", "Compassionate", "Sincere", "Easygoing"],
  },
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
  const elementStyle = elementColors[userData.birthElement] || elementColors.Earth;

  // Recalculate from library if year pillar data is missing
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
      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-warm-900 tracking-tight">Profile</h1>
        </div>
      </header>

      <div className="px-4 md:px-6">
        <div className="max-w-md mx-auto space-y-4">
          {/* Profile header card */}
          <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
            <div className="bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 px-6 py-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">{userData.mbtiType}</span>
              </div>
              <h1 className="text-xl font-bold text-white mb-1">
                {mbtiDescription?.title || userData.mbtiType}
              </h1>
              <p className="text-violet-200 text-sm">Your Innergy Profile</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-warm-100">
                <span className="text-warm-600 text-sm">Personality Type</span>
                <span className="font-semibold text-violet-600">{userData.mbtiType}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-warm-100">
                <span className="text-warm-600 text-sm">Birth Date</span>
                <span className="font-medium text-warm-900">
                  {userData.birthYear}.{String(userData.birthMonth).padStart(2, "0")}.
                  {String(userData.birthDay).padStart(2, "0")}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-warm-100">
                <span className="text-warm-600 text-sm">Year Pillar</span>
                <div className="text-right">
                  <span className="font-medium text-warm-900">
                    {yearStem && yearBranch ? `${yearStem} ${yearBranch}` : "—"}
                  </span>
                  <p className="text-warm-500 text-xs mt-0.5">{zodiacAnimal}</p>
                </div>
              </div>
              <div className="py-3">
                <div className="flex justify-between items-center">
                  <span className="text-warm-600 text-sm">Day Pillar</span>
                  <div className="text-right">
                    <span className="font-medium text-warm-900">
                      {userData.birthStem} {userData.birthBranch}
                    </span>
                    <p className="text-warm-500 text-xs mt-0.5">{userData.birthYinYang} {userData.birthElement}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Saju element card */}
          <div className="bg-white rounded-3xl shadow-soft p-6">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
              Your Birth Element
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl ${elementStyle.bg} flex items-center justify-center`}>
                <span className="text-2xl">{elementIcons[userData.birthElement]}</span>
              </div>
              <div>
                <p className={`font-semibold ${elementStyle.text}`}>
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
              {elementDescriptions[userData.birthElement]?.strengths.map((strength, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 ${elementStyle.bg} ${elementStyle.text} rounded-full text-xs font-medium`}
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Zodiac Animal card */}
          <div className="bg-white rounded-3xl shadow-soft p-6">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
              Your Zodiac Animal
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
                <span className="text-2xl">{animalIcons[zodiacAnimal] || "\u{1F432}"}</span>
              </div>
              <div>
                <p className="font-semibold text-violet-700">
                  {zodiacAnimal}
                </p>
              </div>
            </div>
            <p className="text-warm-600 text-sm leading-relaxed mb-4">
              {animalDescriptions[zodiacAnimal]?.traits}
            </p>
            <div className="flex flex-wrap gap-2">
              {animalDescriptions[zodiacAnimal]?.strengths.map((strength, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-violet-50 text-violet-700 rounded-full text-xs font-medium"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* MBTI description card */}
          {mbtiDescription && (
            <div className="bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
                About Your Type
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center">
                  <span className="font-bold text-lg text-sage-700">{userData.mbtiType}</span>
                </div>
                <div>
                  <p className="font-semibold text-sage-700">
                    {mbtiDescription.title}
                  </p>
                  <p className="text-warm-500 text-sm">Personality type</p>
                </div>
              </div>
              <p className="text-warm-600 text-sm leading-relaxed mb-4">
                {mbtiDescription.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {mbtiDescription.strengths.map((strength, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-sage-50 text-sage-700 rounded-full text-xs font-medium"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reset button */}
          <div className="pt-4">
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
