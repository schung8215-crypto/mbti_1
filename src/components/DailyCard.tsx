"use client";

import { DailyMessage } from "@/lib/message-generator";
import EnergyMeter from "./EnergyMeter";

interface DailyCardProps {
  message: DailyMessage;
  isSaved?: boolean;
  onSaveTap?: () => void;
}

const elementIcons: Record<string, { icon: string; bg: string }> = {
  Wood: { icon: "🌿", bg: "bg-green-500/20" },
  Fire: { icon: "🔥", bg: "bg-red-500/20" },
  Earth: { icon: "⛰️", bg: "bg-amber-500/20" },
  Metal: { icon: "✨", bg: "bg-slate-400/20" },
  Water: { icon: "💧", bg: "bg-blue-500/20" },
};

const animalIcons: Record<string, string> = {
  Rat: "🐀",
  Ox: "🐂",
  Tiger: "🐅",
  Rabbit: "🐇",
  Dragon: "🐲",
  Snake: "🐍",
  Horse: "🐴",
  Goat: "🐐",
  Monkey: "🐵",
  Rooster: "🐓",
  Dog: "🐕",
  Pig: "🐷",
};

export default function DailyCard({ message, isSaved, onSaveTap }: DailyCardProps) {
  const element = elementIcons[message.todayElement] || elementIcons.Earth;
  const animal = animalIcons[message.todayAnimal] || "🐲";

  return (
    <div className="animate-fade-in">
      {/* Header card */}
      <div className="bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 rounded-3xl p-6 mb-4 shadow-glow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-violet-200 text-sm font-medium">{message.greeting}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-white/80 text-xs">{message.date}</p>
              {onSaveTap && (
                <button
                  onClick={(e) => { e.stopPropagation(); onSaveTap(); }}
                  className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-xs">{isSaved ? "Saved" : "Save"}</span>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${element.bg}`}>
              <span className="text-sm">{element.icon}</span>
              <span className="text-xs font-medium text-white">{message.todayElement}</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15">
              <span className="text-sm">{animal}</span>
              <span className="text-xs font-medium text-white">{message.todayAnimal}</span>
            </div>
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-white text-xl font-semibold leading-relaxed">
            {message.todayEnergy}
          </p>
        </div>
      </div>

      {/* Main content card */}
      <div className="bg-white rounded-3xl shadow-soft overflow-hidden">
        {/* Message section */}
        <div className="p-6 border-b border-warm-100">
          <p className="text-warm-800 leading-relaxed text-[15px]">
            {message.mainMessage}
          </p>
        </div>

        {/* Energy meters */}
        <div className="px-6 py-4 bg-warm-50/50 border-b border-warm-100">
          <div className="flex justify-around">
            <EnergyMeter
              label="Energy"
              value={message.energyLevel}
              variant="violet"
            />
            <EnergyMeter
              label="Luck"
              value={message.luck}
              variant="sage"
            />
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
                <h3 className="text-sm font-semibold text-warm-700">
                  Best for
                </h3>
              </div>
              <ul className="space-y-2">
                {message.bestFor.map((item, i) => (
                  <li key={i} className="text-sm text-warm-600 leading-snug">
                    {item}
                  </li>
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
                <h3 className="text-sm font-semibold text-warm-700">
                  Watch out
                </h3>
              </div>
              <ul className="space-y-2">
                {message.watchOutFor.map((item, i) => (
                  <li key={i} className="text-sm text-warm-600 leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
