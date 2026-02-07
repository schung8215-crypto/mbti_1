"use client";

import { useRouter } from "next/navigation";

const elementData = [
  { name: "Wood", icon: "\u{1F33F}", color: "bg-green-500/15 text-green-700", desc: "Growth & Creativity" },
  { name: "Fire", icon: "\u{1F525}", color: "bg-red-500/15 text-red-600", desc: "Passion & Energy" },
  { name: "Earth", icon: "\u26F0\uFE0F", color: "bg-amber-500/15 text-amber-700", desc: "Stability & Nurture" },
  { name: "Metal", icon: "\u2728", color: "bg-slate-400/15 text-slate-700", desc: "Precision & Clarity" },
  { name: "Water", icon: "\u{1F4A7}", color: "bg-blue-500/15 text-blue-600", desc: "Wisdom & Flow" },
];

const dichotomies = [
  { pair: ["E", "I"], left: "Extraversion", right: "Introversion", desc: "Where you get energy", icon: "\u26A1" },
  { pair: ["S", "N"], left: "Sensing", right: "Intuition", desc: "How you take in info", icon: "\u{1F50D}" },
  { pair: ["T", "F"], left: "Thinking", right: "Feeling", desc: "How you make decisions", icon: "\u{1F9E0}" },
  { pair: ["J", "P"], left: "Judging", right: "Perceiving", desc: "How you approach life", icon: "\u{1F3AF}" },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen pb-12">
      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-warm-600 hover:text-warm-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
      </header>

      <div className="px-4 md:px-6">
        <div className="max-w-md mx-auto space-y-4">
          {/* Page title */}
          <div className="text-center py-4 animate-fade-in">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-warm-900 tracking-tight">How It Works</h1>
            <p className="text-warm-500 text-sm mt-1">The science and wisdom behind your daily insights</p>
          </div>

          {/* Section 1: MBTI */}
          <div className="bg-white rounded-3xl shadow-soft overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-sage-500 to-sage-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">01</span>
                </div>
                <h2 className="text-lg font-bold text-white">Your MBTI Type</h2>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-warm-700 text-sm leading-relaxed">
                MBTI (Myers-Briggs Type Indicator) identifies your personality across four dimensions.
                Your answers to our questions revealed your preferences on each:
              </p>

              {/* 4 Dichotomies */}
              <div className="space-y-3">
                {dichotomies.map((d) => (
                  <div key={d.pair.join("")} className="bg-warm-50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{d.icon}</span>
                      <span className="text-xs font-semibold text-warm-500 uppercase tracking-wider">{d.desc}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sage-100 rounded-full">
                          <span className="font-bold text-sage-700 text-sm">{d.pair[0]}</span>
                          <span className="text-sage-600 text-xs">{d.left}</span>
                        </div>
                      </div>
                      <span className="text-warm-300 text-xs font-medium">or</span>
                      <div className="flex-1 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-100 rounded-full">
                          <span className="font-bold text-violet-700 text-sm">{d.pair[1]}</span>
                          <span className="text-violet-600 text-xs">{d.right}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-warm-500 text-xs leading-relaxed">
                Together, these four letters (e.g. ENFP, INTJ) form one of 16 unique personality types,
                describing how you think, interact, and make decisions.
              </p>
            </div>
          </div>

          {/* Section 2: Saju */}
          <div className="bg-white rounded-3xl shadow-soft overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-violet-500 to-violet-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">02</span>
                </div>
                <h2 className="text-lg font-bold text-white">What is Saju?</h2>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-warm-700 text-sm leading-relaxed">
                Saju is a Korean wisdom tradition rooted in centuries of Eastern philosophy.
                Based on your birth date, it maps your unique energy using a system of
                <strong> Heavenly Stems</strong> and <strong>Earthly Branches</strong>.
              </p>

              {/* 60-Day Cycle Visual */}
              <div className="bg-warm-50 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-warm-800 mb-3">The 60-Day Cycle</h3>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-2xl">{"\u2600\uFE0F"}</span>
                    </div>
                    <p className="text-xs font-semibold text-warm-700">10 Stems</p>
                    <p className="text-[10px] text-warm-500">Heavenly</p>
                  </div>
                  <div className="text-warm-300 text-2xl font-light">{"\u00D7"}</div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-2xl">{"\u{1F30F}"}</span>
                    </div>
                    <p className="text-xs font-semibold text-warm-700">12 Branches</p>
                    <p className="text-[10px] text-warm-500">Earthly</p>
                  </div>
                  <div className="text-warm-300 text-2xl font-light">=</div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-2xl">{"\u{1F504}"}</span>
                    </div>
                    <p className="text-xs font-semibold text-warm-700">60 Days</p>
                    <p className="text-[10px] text-warm-500">Unique cycle</p>
                  </div>
                </div>
                <p className="text-warm-500 text-xs mt-4 text-center leading-relaxed">
                  10 Heavenly Stems and 12 Earthly Branches combine to create
                  a 60-day cycle, each day carrying its own unique energy.
                </p>
              </div>

              {/* Five Elements */}
              <div>
                <h3 className="text-sm font-semibold text-warm-800 mb-3">The Five Elements</h3>
                <div className="grid grid-cols-5 gap-2">
                  {elementData.map((el) => (
                    <div key={el.name} className="text-center">
                      <div className={`w-full aspect-square rounded-2xl ${el.color} flex items-center justify-center mb-1.5`}>
                        <span className="text-xl">{el.icon}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-warm-700">{el.name}</p>
                      <p className="text-[9px] text-warm-500 leading-tight">{el.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Element Interactions */}
              <div className="bg-warm-50 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-warm-800 mb-3">How Elements Interact</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sage-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-warm-800">Generating Cycle</p>
                      <p className="text-xs text-warm-500 leading-relaxed">
                        Wood feeds Fire, Fire creates Earth, Earth bears Metal, Metal collects Water, Water nourishes Wood
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-warm-800">Controlling Cycle</p>
                      <p className="text-xs text-warm-500 leading-relaxed">
                        Wood parts Earth, Earth dams Water, Water quenches Fire, Fire melts Metal, Metal chops Wood
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-warm-500 text-xs leading-relaxed">
                Your birth date gives you a core element that stays with you for life.
                Each day brings a different element, creating a unique dynamic with your own.
              </p>
            </div>
          </div>

          {/* Section 3: How We Combine Them */}
          <div className="bg-white rounded-3xl shadow-soft overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">03</span>
                </div>
                <h2 className="text-lg font-bold text-white">How We Combine Them</h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Formula visual */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-sage-50 rounded-2xl p-4">
                  <div className="w-10 h-10 bg-sage-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-sage-800">Your MBTI</p>
                    <p className="text-xs text-warm-500">Your personality &mdash; how you think and act</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-6 h-6 bg-warm-100 rounded-full flex items-center justify-center">
                    <span className="text-warm-400 text-xs font-bold">+</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-violet-50 rounded-2xl p-4">
                  <div className="w-10 h-10 bg-violet-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-violet-800">Your Birth Element</p>
                    <p className="text-xs text-warm-500">Your core energy &mdash; from your Saju birth chart</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-6 h-6 bg-warm-100 rounded-full flex items-center justify-center">
                    <span className="text-warm-400 text-xs font-bold">+</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-amber-50 rounded-2xl p-4">
                  <div className="w-10 h-10 bg-amber-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Today&apos;s Element</p>
                    <p className="text-xs text-warm-500">Today&apos;s energy &mdash; from the 60-day cycle</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-6 h-6 bg-warm-100 rounded-full flex items-center justify-center">
                    <span className="text-warm-400 text-xs font-bold">=</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-sage-50 rounded-2xl p-4 ring-1 ring-violet-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-sage-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-900">Your Daily Insight</p>
                    <p className="text-xs text-warm-500">A unique message just for you, every day</p>
                  </div>
                </div>
              </div>

              <p className="text-warm-500 text-xs leading-relaxed mt-2">
                With 16 MBTI types and 60 daily energy cycles, you&apos;ll see 60 unique messages
                before any repetition &mdash; each one tailored to who you are and the energy of the day.
              </p>
            </div>
          </div>

          {/* Section 4: Disclaimer */}
          <div className="bg-warm-100 rounded-3xl p-6 animate-slide-up">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-warm-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-warm-700 mb-1">A note on our approach</h3>
                <p className="text-warm-600 text-xs leading-relaxed">
                  This app combines personality psychology with traditional Korean wisdom for
                  self-reflection and daily guidance. It&apos;s designed for entertainment and
                  personal growth purposes. Enjoy the insights, and use them as a starting point
                  for understanding yourself better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
