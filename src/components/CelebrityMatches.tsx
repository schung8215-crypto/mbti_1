"use client";

import { useState } from "react";

interface Archetype {
  emoji: string;
  label: string;
}

const ARCHETYPES: Record<string, Archetype[]> = {
  INFP: [
    { emoji: "🪶", label: "The Poet" },
    { emoji: "🌿", label: "The Gentle Idealist" },
    { emoji: "🕯️", label: "The Quiet Healer" },
    { emoji: "🌊", label: "The Dreamer" },
    { emoji: "📝", label: "The Deep Feeler" },
    { emoji: "🌙", label: "The Inner World" },
  ],
  INFJ: [
    { emoji: "🔮", label: "The Insight Keeper" },
    { emoji: "🌙", label: "The Calm Guide" },
    { emoji: "🧵", label: "The Pattern Seer" },
    { emoji: "🕊️", label: "The Quiet Counsel" },
    { emoji: "🌿", label: "The Empath" },
    { emoji: "🏛️", label: "The Vision Holder" },
  ],
  ENFP: [
    { emoji: "✨", label: "The Spark" },
    { emoji: "🌻", label: "The Warm Explorer" },
    { emoji: "📖", label: "The Story Starter" },
    { emoji: "🎨", label: "The Creative" },
    { emoji: "🌈", label: "The Possibility Seeker" },
    { emoji: "💫", label: "The Energy Giver" },
  ],
  ENFJ: [
    { emoji: "💛", label: "The Encourager" },
    { emoji: "🤝", label: "The Connector" },
    { emoji: "🌟", label: "The Steady Lead" },
    { emoji: "🌱", label: "The Nurturer" },
    { emoji: "🏛️", label: "The Guide" },
    { emoji: "💬", label: "The Motivator" },
  ],
  INTJ: [
    { emoji: "🏛️", label: "The Architect" },
    { emoji: "🗝️", label: "The Strategic Mind" },
    { emoji: "🔭", label: "The Long-View Planner" },
    { emoji: "🧮", label: "The Systems Designer" },
    { emoji: "🌑", label: "The Lone Visionary" },
    { emoji: "⚔️", label: "The Precision Thinker" },
  ],
  INTP: [
    { emoji: "🔬", label: "The Curious Analyst" },
    { emoji: "🧩", label: "The Systems Thinker" },
    { emoji: "⚙️", label: "The Quiet Inventor" },
    { emoji: "🗺️", label: "The Theorist" },
    { emoji: "📐", label: "The Logician" },
    { emoji: "🔭", label: "The Deep Questioner" },
  ],
  ENTJ: [
    { emoji: "🏗️", label: "The Builder" },
    { emoji: "🦁", label: "The Clear Commander" },
    { emoji: "🌱", label: "The Growth Driver" },
    { emoji: "📊", label: "The Visionary Director" },
    { emoji: "⚔️", label: "The Strategist" },
    { emoji: "🏔️", label: "The Trailblazer" },
  ],
  ENTP: [
    { emoji: "💡", label: "The Challenger" },
    { emoji: "🔥", label: "The Idea Engine" },
    { emoji: "🎲", label: "The Playful Debater" },
    { emoji: "⚡", label: "The Innovator" },
    { emoji: "🧪", label: "The Pioneer" },
    { emoji: "🌀", label: "The Devil's Advocate" },
  ],
  ISFP: [
    { emoji: "🎨", label: "The Aesthetic Soul" },
    { emoji: "🌸", label: "The Gentle Creator" },
    { emoji: "🖌️", label: "The Present-Moment Artist" },
    { emoji: "🍃", label: "The Free Spirit" },
    { emoji: "🌿", label: "The Quiet Observer" },
    { emoji: "🎵", label: "The Feeling Maker" },
  ],
  ISTP: [
    { emoji: "🔧", label: "The Problem Solver" },
    { emoji: "🗻", label: "The Calm Technician" },
    { emoji: "🎯", label: "The Practical Improviser" },
    { emoji: "⚙️", label: "The Quiet Craftsman" },
    { emoji: "🛠️", label: "The Hands-On Thinker" },
    { emoji: "🔩", label: "The Grounded Fixer" },
  ],
  ESFP: [
    { emoji: "🌈", label: "The Bright Spirit" },
    { emoji: "🎉", label: "The Moment Maker" },
    { emoji: "☀️", label: "The Social Sunbeam" },
    { emoji: "🎭", label: "The Performer" },
    { emoji: "🌺", label: "The Energy Giver" },
    { emoji: "💫", label: "The Spark of Joy" },
  ],
  ESTP: [
    { emoji: "🏎️", label: "The Bold Mover" },
    { emoji: "🔩", label: "The Quick Fixer" },
    { emoji: "⚡", label: "The Risk Tester" },
    { emoji: "🎯", label: "The Action Taker" },
    { emoji: "🏆", label: "The Opportunist" },
    { emoji: "🌊", label: "The Adapter" },
  ],
  ISFJ: [
    { emoji: "🏡", label: "The Quiet Support" },
    { emoji: "🤍", label: "The Guardian Heart" },
    { emoji: "🌼", label: "The Gentle Organizer" },
    { emoji: "📋", label: "The Thoughtful Keeper" },
    { emoji: "🕊️", label: "The Steady Presence" },
    { emoji: "🌿", label: "The Caring Protector" },
  ],
  ISTJ: [
    { emoji: "⚖️", label: "The Steady Keeper" },
    { emoji: "🏗️", label: "The Reliable Builder" },
    { emoji: "📋", label: "The Order Maker" },
    { emoji: "🗂️", label: "The Methodical Mind" },
    { emoji: "🏛️", label: "The Tradition Holder" },
    { emoji: "🔐", label: "The Trustworthy Foundation" },
  ],
  ESFJ: [
    { emoji: "🌺", label: "The Harmonizer" },
    { emoji: "🤗", label: "The Caring Host" },
    { emoji: "💌", label: "The Community Builder" },
    { emoji: "💛", label: "The Warm Connector" },
    { emoji: "🏡", label: "The Social Anchor" },
    { emoji: "🌟", label: "The Heart of the Room" },
  ],
  ESTJ: [
    { emoji: "📊", label: "The Organizer" },
    { emoji: "🏅", label: "The Standards Setter" },
    { emoji: "🏆", label: "The Responsible Lead" },
    { emoji: "📋", label: "The System Keeper" },
    { emoji: "⚖️", label: "The Fair Director" },
    { emoji: "🏗️", label: "The Dependable Executor" },
  ],
};

function pickThreeRandom(pool: Archetype[]): Archetype[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function CelebrityMatches({ mbtiType }: { mbtiType: string }) {
  const [archetypes] = useState<Archetype[]>(() => {
    const pool = ARCHETYPES[mbtiType];
    if (!pool) return [];
    return pickThreeRandom(pool);
  });

  if (archetypes.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-soft p-6">
      <h2 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-4 text-center">
        Archetypes Like Yours
      </h2>

      <div className="flex justify-center gap-4">
        {archetypes.map((archetype, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center shadow-soft mb-2">
              <span className="text-3xl">{archetype.emoji}</span>
            </div>
            <p className="text-xs font-semibold text-warm-800 text-center max-w-[80px] leading-tight">
              {archetype.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
