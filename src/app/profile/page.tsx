"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { MBTI_DESCRIPTIONS } from "@/content/mbti-descriptions";
import { calculateUserBirthPillar } from "@/lib/bazi";
import { generateTagline } from "@/lib/tagline";
import CelebrityMatches from "@/components/CelebrityMatches";

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
  tagline?: string;
}

const elementColors: Record<string, { bg: string; text: string; gradient: string; tagBg: string }> = {
  Wood: { bg: "bg-sage-100", text: "text-sage-700", gradient: "from-sage-500 via-sage-600 to-sage-700", tagBg: "bg-sage-50 border border-sage-200" },
  Fire: { bg: "bg-red-100", text: "text-red-600", gradient: "from-red-400 via-red-500 to-red-600", tagBg: "bg-red-50 border border-red-200" },
  Earth: { bg: "bg-amber-100", text: "text-amber-700", gradient: "from-amber-400 via-amber-500 to-amber-600", tagBg: "bg-amber-50 border border-amber-200" },
  Metal: { bg: "bg-warm-200", text: "text-warm-700", gradient: "from-warm-400 via-warm-500 to-warm-600", tagBg: "bg-warm-100 border border-warm-300" },
  Water: { bg: "bg-blue-100", text: "text-blue-600", gradient: "from-blue-400 via-blue-500 to-blue-600", tagBg: "bg-blue-50 border border-blue-200" },
};

const elementIcons: Record<string, string> = {
  Wood: "🌳", Fire: "🔥", Earth: "⛰️", Metal: "✨", Water: "💧",
};

const animalIcons: Record<string, string> = {
  Rat: "🐀", Ox: "🐂", Tiger: "🐅", Rabbit: "🐇",
  Dragon: "🐲", Snake: "🐍", Horse: "🐴", Goat: "🐐",
  Monkey: "🐵", Rooster: "🐓", Dog: "🐕", Pig: "🐷",
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

const mbtiDimensions: Record<string, { E?: number; I?: number; N?: number; S?: number; T?: number; F?: number; J?: number; P?: number }> = {
  "ENFP": { E: 65, N: 70, F: 75, P: 80 },
  "INFP": { I: 70, N: 75, F: 80, P: 70 },
  "ENFJ": { E: 70, N: 65, F: 75, J: 70 },
  "INFJ": { I: 75, N: 80, F: 70, J: 75 },
  "ENTP": { E: 65, N: 75, T: 70, P: 75 },
  "INTP": { I: 80, N: 80, T: 75, P: 70 },
  "ENTJ": { E: 70, N: 70, T: 80, J: 75 },
  "INTJ": { I: 75, N: 75, T: 80, J: 80 },
  "ESFP": { E: 75, S: 70, F: 65, P: 75 },
  "ISFP": { I: 70, S: 65, F: 75, P: 70 },
  "ESFJ": { E: 70, S: 65, F: 70, J: 70 },
  "ISFJ": { I: 65, S: 70, F: 75, J: 75 },
  "ESTP": { E: 75, S: 75, T: 65, P: 70 },
  "ISTP": { I: 70, S: 70, T: 75, P: 75 },
  "ESTJ": { E: 65, S: 70, T: 70, J: 80 },
  "ISTJ": { I: 75, S: 75, T: 70, J: 80 },
};

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("mbti-saju-user");
    if (!storedUser) {
      router.push("/onboarding/intro");
      return;
    }
    setUserData(JSON.parse(storedUser));
  }, [router]);

  const handleReset = () => {
    localStorage.removeItem("mbti-saju-user");
    localStorage.removeItem("mbti-pending");
    localStorage.removeItem("mbti-saju-reflections");
    router.push("/onboarding/intro");
  };

  if (!userData) {
    return null;
  }

  const mbtiDescription = MBTI_DESCRIPTIONS[userData.mbtiType];
  const elStyle = elementColors[userData.birthElement] || elementColors.Earth;
  const dimensions = mbtiDimensions[userData.mbtiType] || {};

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

  // Always recompute tagline fresh (legacy users may have 2-factor stored tagline)
  const { tagline: freshTagline } = generateTagline(
    userData.mbtiType,
    userData.birthYinYang,
    userData.birthElement,
    zodiacAnimal
  );

  const handleShareProfile = async () => {
    const elIcon = elementIcons[userData.birthElement] || "";
    const anIcon = animalIcons[zodiacAnimal] || "";
    const title = mbtiDescription?.title || userData.mbtiType;

    try {
      setIsGenerating(true);
      const { generateProfileCard } = await import("@/lib/generate-profile-card");

      const mbtiTraits = mbtiDescription?.strengths || [];
      const elTraits = elementDescriptions[userData.birthElement]?.strengths || [];
      const anTraits = animalDescriptions[zodiacAnimal]?.strengths || [];
      const allTraits = Array.from(new Set([...mbtiTraits, ...elTraits, ...anTraits])).slice(0, 8);

      const blob = await generateProfileCard({
        mbtiType: userData.mbtiType,
        tagline: userData.tagline || mbtiDescription?.summary?.split('.')[0] || title,
        yinYang: userData.birthYinYang,
        element: userData.birthElement,
        elementEmoji: elIcon,
        animal: zodiacAnimal,
        animalEmoji: anIcon,
        traits: allTraits,
      });

      const file = new File([blob], "haru-profile.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Haru Profile",
          text: `I'm ${userData.mbtiType} · ${userData.birthYinYang} ${userData.birthElement} · ${zodiacAnimal}`,
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "haru-profile.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Share failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-warm-50 pb-24">
      <div className="max-w-md mx-auto">
        {/* Hero Section */}
        <div className="relative pt-8 pb-8 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #c67d5c 0%, #5a8a7a 100%)' }}>
          {/* Soft background blobs */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
          </div>

          {/* Settings button */}
          <button
            onClick={() => router.push("/settings")}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(255,255,255,0.18)' }}
            aria-label="Settings"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Content */}
          <div className="relative text-center">
            {/* Label */}
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 10 }}>
              ✦ Your Haru Archetype
            </p>

            {/* Tagline — hero */}
            <h1
              className="text-white text-center mx-auto mb-5"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 26, lineHeight: 1.3, maxWidth: 300 }}
            >
              {freshTagline}
            </h1>

            {/* Three equal pills: MBTI · Element · Animal */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span style={{ fontSize: 12, fontWeight: 700, color: 'white', background: 'rgba(255,255,255,0.18)', borderRadius: 20, padding: '5px 13px', letterSpacing: '0.04em' }}>
                {userData.mbtiType}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>·</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'white', background: 'rgba(255,255,255,0.18)', borderRadius: 20, padding: '5px 13px' }}>
                {elementIcons[userData.birthElement]} {userData.birthYinYang} {userData.birthElement}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>·</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'white', background: 'rgba(255,255,255,0.18)', borderRadius: 20, padding: '5px 13px' }}>
                {animalIcons[zodiacAnimal]} {zodiacAnimal}
              </span>
            </div>
          </div>
        </div>

        {/* Birth Date Section */}
        <div className="bg-white px-6 py-4 border-b border-warm-100">
          <div className="text-center">
            <p className="text-xs text-warm-500 uppercase tracking-wide mb-1">Born</p>
            <p className="text-base font-semibold text-warm-900 mb-1">
              {new Date(userData.birthYear, userData.birthMonth - 1, userData.birthDay).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </p>
            <p className="text-sm text-warm-600">
              {userData.birthStem} {userData.birthBranch} (Day) · {yearStem} {yearBranch} (Year)
            </p>
          </div>
        </div>

        <div className="px-4 py-6 space-y-4">
          {/* Cosmic Identity */}
          <div>
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-3 px-2">
              Your Saju Profile
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Your Element (Day Stem) */}
              <div className="bg-white rounded-2xl p-4 shadow-soft border-2 border-warm-100 hover:border-terracotta-200 transition-colors text-center">
                <div className="text-[10px] font-semibold text-warm-400 uppercase tracking-wider mb-2">
                  Your Element
                </div>
                <div className="text-3xl font-bold text-warm-800 mb-1">{userData.birthStem}</div>
                <div className="text-sm font-semibold text-warm-700">{userData.birthYinYang} {userData.birthElement}</div>
                <div className="text-[10px] text-warm-500">Day Stem</div>
              </div>

              {/* Your Animal (Year Branch) */}
              <div className="bg-white rounded-2xl p-4 shadow-soft border-2 border-warm-100 hover:border-terracotta-200 transition-colors text-center">
                <div className="text-[10px] font-semibold text-warm-400 uppercase tracking-wider mb-2">
                  Your Animal
                </div>
                <div className="text-3xl font-bold text-warm-800 mb-1">{yearBranch || "—"}</div>
                <div className="text-sm font-semibold text-warm-700">{zodiacAnimal}</div>
                <div className="text-[10px] text-warm-500">Year Branch</div>
              </div>
            </div>
          </div>

          {/* Birth Element */}
          <div className="bg-white rounded-3xl shadow-soft p-6">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
              Your Birth Element
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-soft" style={{ background: '#5a8a7a' }}>
                <span className="text-3xl">{elementIcons[userData.birthElement]}</span>
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: '#5a8a7a' }}>
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
                <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: '#eef4f2', border: '1px solid #c5ddd8', color: '#5a8a7a' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Zodiac Animal */}
          <div className="bg-white rounded-3xl shadow-soft p-6">
            <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
              Your Zodiac Animal
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-soft" style={{ background: '#7c6b9e' }}>
                <span className="text-3xl">{animalIcons[zodiacAnimal]}</span>
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: '#7c6b9e' }}>{zodiacAnimal}</p>
                <p className="text-warm-500 text-sm">Year of the {zodiacAnimal}</p>
              </div>
            </div>
            <p className="text-warm-600 text-sm leading-relaxed mb-4">
              {animalDescriptions[zodiacAnimal]?.traits}
            </p>
            <div className="flex flex-wrap gap-2">
              {animalDescriptions[zodiacAnimal]?.strengths.map((s, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: '#f3f0f8', border: '1px solid #d8ceed', color: '#7c6b9e' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* MBTI - Enhanced with Dimensions */}
          {mbtiDescription && (
            <div className="bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4">
                Your Personality
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-soft" style={{ background: '#c67d5c' }}>
                  <span className="font-bold text-xl text-white">{userData.mbtiType}</span>
                </div>
                <div>
                  <p className="font-bold text-lg text-terracotta-600">{mbtiDescription.title}</p>
                  <p className="text-warm-500 text-sm">Personality type</p>
                </div>
              </div>
              <p className="text-warm-600 text-sm leading-relaxed mb-4">
                {mbtiDescription.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {mbtiDescription.strengths.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-terracotta-50 border border-terracotta-100 text-terracotta-600">
                    {s}
                  </span>
                ))}
              </div>

              {/* MBTI Dimensions */}
              <div className="pt-4 border-t border-warm-100 space-y-3">
                <h3 className="text-xs font-semibold text-warm-600 mb-3">Your Dimensions</h3>
                
                {(dimensions.E !== undefined || dimensions.I !== undefined) && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-warm-600">
                        {dimensions.E ? 'Extraversion' : 'Introversion'}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: '#c67d5c' }}>
                        {dimensions.E || dimensions.I}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#ede8e3' }}>
                      <div style={{ width: `${dimensions.E || dimensions.I}%`, height: '100%', background: '#c67d5c', borderRadius: 9999 }} />
                    </div>
                  </div>
                )}

                {(dimensions.N !== undefined || dimensions.S !== undefined) && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-warm-600">
                        {dimensions.N ? 'Intuition' : 'Sensing'}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: '#c67d5c' }}>
                        {dimensions.N || dimensions.S}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#ede8e3' }}>
                      <div style={{ width: `${dimensions.N || dimensions.S}%`, height: '100%', background: '#c67d5c', borderRadius: 9999 }} />
                    </div>
                  </div>
                )}

                {(dimensions.F !== undefined || dimensions.T !== undefined) && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-warm-600">
                        {dimensions.F ? 'Feeling' : 'Thinking'}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: '#c67d5c' }}>
                        {dimensions.F || dimensions.T}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#ede8e3' }}>
                      <div style={{ width: `${dimensions.F || dimensions.T}%`, height: '100%', background: '#c67d5c', borderRadius: 9999 }} />
                    </div>
                  </div>
                )}

                {(dimensions.P !== undefined || dimensions.J !== undefined) && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-warm-600">
                        {dimensions.P ? 'Perceiving' : 'Judging'}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: '#c67d5c' }}>
                        {dimensions.P || dimensions.J}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#ede8e3' }}>
                      <div style={{ width: `${dimensions.P || dimensions.J}%`, height: '100%', background: '#c67d5c', borderRadius: 9999 }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Archetypes */}
          {userData && (
            <CelebrityMatches mbtiType={userData.mbtiType} />
          )}

          {/* Action Cards */}
          <div className="space-y-3 pt-2">
            {/* Share Profile */}
            <button
              onClick={handleShareProfile}
              disabled={isGenerating}
              className="w-full bg-white rounded-3xl shadow-soft p-4 flex items-center gap-3 hover:shadow-medium transition-shadow disabled:opacity-70"
            >
              <div className="w-10 h-10 bg-terracotta-50 rounded-xl flex items-center justify-center flex-shrink-0">
                {isGenerating ? (
                  <svg className="w-5 h-5 text-violet-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-terracotta-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                )}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-warm-900">
                  {isGenerating ? "Creating your card..." : "Share Your Profile"}
                </p>
                <p className="text-xs text-warm-500">
                  {isGenerating ? "This may take a moment" : "Share your Haru profile card"}
                </p>
              </div>
              {!isGenerating && (
                <svg className="w-5 h-5 text-warm-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>

            {/* How it Works */}
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
          </div>

          {/* Reset */}
          <div className="pt-2 pb-4">
            <button
              onClick={() => setShowResetModal(true)}
              className="w-full py-3 px-4 rounded-xl text-warm-500 hover:text-red-500 hover:bg-red-50 transition-colors text-sm font-medium"
            >
              Reset Profile
            </button>
          </div>
        </div>
      </div>

      <BottomNav />

      {/* Reset profile confirmation modal */}
      {showResetModal && (
        <div
          className="fixed inset-0 flex items-end justify-center px-4 pb-8"
          style={{ zIndex: 9999, background: 'rgba(0,0,0,0.4)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowResetModal(false) }}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-semibold text-warm-900 mb-2">Reset profile?</h2>
            <p className="text-sm text-warm-500 leading-relaxed mb-6">
              This will clear your personality type, birth date, and all saved reflections. You&apos;ll need to start over from the beginning.
            </p>
            <div className="space-y-2">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-2xl text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setShowResetModal(false)}
                className="w-full py-3 rounded-2xl text-sm font-medium text-warm-700 bg-warm-100 hover:bg-warm-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
