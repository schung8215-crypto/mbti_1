"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Reflection {
  date: string;
  note: string;
  dayDescription: string;
  mainMessage: string;
  energyLevel: number;
  luck: number;
  element: string;
  yinYang: string;
  bestFor: string[];
  watchOutFor: string[];
  savedAt: string;
}

const elementIcons: Record<string, string> = {
  Wood: "\u{1F33F}", Fire: "\u{1F525}", Earth: "\u26F0\uFE0F", Metal: "\u2728", Water: "\u{1F4A7}",
};

const elementColors: Record<string, { bg: string; text: string; border: string }> = {
  Wood: { bg: "bg-sage-100", text: "text-sage-700", border: "border-l-sage-400" },
  Fire: { bg: "bg-red-100", text: "text-red-600", border: "border-l-red-400" },
  Earth: { bg: "bg-amber-100", text: "text-amber-700", border: "border-l-amber-400" },
  Metal: { bg: "bg-warm-200", text: "text-warm-700", border: "border-l-warm-400" },
  Water: { bg: "bg-blue-100", text: "text-blue-600", border: "border-l-blue-400" },
};

function loadReflections(): Record<string, Reflection> {
  try {
    const stored = localStorage.getItem("mbti-saju-reflections");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveReflectionsToStorage(reflections: Record<string, Reflection>) {
  localStorage.setItem("mbti-saju-reflections", JSON.stringify(reflections));
}

export default function ReflectionsPage() {
  const router = useRouter();
  const [reflections, setReflections] = useState<Record<string, Reflection>>({});
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editNote, setEditNote] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("mbti-saju-user");
    if (!storedUser) {
      router.push("/onboarding");
      return;
    }
    setReflections(loadReflections());
  }, [router]);

  const sortedDates = Object.keys(reflections).sort((a, b) => b.localeCompare(a));

  const handleToggleExpand = (date: string) => {
    if (editingDate) return;
    setExpandedDate(expandedDate === date ? null : date);
    setDeleteConfirm(null);
  };

  const handleStartEdit = (date: string) => {
    setEditNote(reflections[date].note);
    setEditingDate(date);
  };

  const handleSaveEdit = (date: string) => {
    const updated = { ...reflections };
    updated[date] = { ...updated[date], note: editNote, savedAt: new Date().toISOString() };
    saveReflectionsToStorage(updated);
    setReflections(updated);
    setEditingDate(null);
  };

  const handleCancelEdit = () => {
    setEditingDate(null);
  };

  const handleDelete = (date: string) => {
    const updated = { ...reflections };
    delete updated[date];
    saveReflectionsToStorage(updated);
    setReflections(updated);
    setDeleteConfirm(null);
    setExpandedDate(null);
  };

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  };

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
        <div className="max-w-md mx-auto">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-warm-900">My Reflections</h1>
            <p className="text-sm text-warm-500 mt-1">
              {sortedDates.length > 0
                ? `${sortedDates.length} saved insight${sortedDates.length === 1 ? "" : "s"}`
                : "Your saved insights will appear here"}
            </p>
          </div>

          {/* Empty state */}
          {sortedDates.length === 0 && (
            <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-warm-800 mb-2">No reflections yet</h2>
              <p className="text-sm text-warm-500 leading-relaxed">
                Save your first daily insight from the home page
              </p>
              <button
                onClick={() => router.push("/")}
                className="mt-5 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors"
              >
                Go to Home
              </button>
            </div>
          )}

          {/* Reflection cards */}
          <div className="space-y-3">
            {sortedDates.map((date) => {
              const r = reflections[date];
              const isExpanded = expandedDate === date;
              const isEditing = editingDate === date;
              const colors = elementColors[r.element] || elementColors.Earth;

              return (
                <div
                  key={date}
                  className={`bg-white rounded-2xl shadow-soft overflow-hidden border-l-4 ${colors.border} transition-all`}
                >
                  {/* Collapsed row */}
                  <button
                    onClick={() => handleToggleExpand(date)}
                    className="w-full p-4 flex items-center gap-3 text-left"
                  >
                    <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-base">{elementIcons[r.element] || "\u26F0\uFE0F"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-warm-900">{formatDate(date)}</p>
                        <span className={`text-xs font-medium ${colors.text}`}>{r.element}</span>
                      </div>
                      {r.note ? (
                        <p className="text-xs text-warm-500 truncate mt-0.5">{r.note}</p>
                      ) : (
                        <p className="text-xs text-warm-400 italic mt-0.5">No note</p>
                      )}
                    </div>
                    {/* Energy dots */}
                    <div className="flex gap-0.5 flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < r.energyLevel ? "bg-violet-500" : "bg-warm-200"
                          }`}
                        />
                      ))}
                    </div>
                    <svg
                      className={`w-4 h-4 text-warm-400 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-warm-100">
                      {/* Note section */}
                      <div className="pt-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-semibold text-warm-400 uppercase tracking-wider">Note</h4>
                          {!isEditing && (
                            <button
                              onClick={() => handleStartEdit(date)}
                              className="p-1.5 rounded-lg hover:bg-warm-100 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5 text-warm-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          )}
                        </div>
                        {isEditing ? (
                          <div>
                            <textarea
                              value={editNote}
                              onChange={(e) => setEditNote(e.target.value)}
                              placeholder="How were you feeling?"
                              className="w-full h-24 px-3 py-2.5 rounded-xl bg-warm-50 border border-warm-200 text-warm-800 text-sm placeholder-warm-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent"
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1.5 rounded-lg text-warm-500 hover:bg-warm-100 text-xs font-medium transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveEdit(date)}
                                className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-warm-600 leading-relaxed">
                            {r.note || <span className="text-warm-400 italic">No note added</span>}
                          </p>
                        )}
                      </div>

                      {/* Main message */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-2">Daily Message</h4>
                        <p className="text-sm text-warm-700 leading-relaxed">{r.mainMessage}</p>
                      </div>

                      {/* Day description */}
                      <div className="bg-warm-50 rounded-xl p-3 mb-4">
                        <p className="text-sm font-medium text-warm-700">{r.dayDescription}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                            {elementIcons[r.element]} {r.yinYang} {r.element}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-warm-500">Energy</span>
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full ${i < r.energyLevel ? "bg-violet-500" : "bg-warm-200"}`} />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-warm-500">Luck</span>
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full ${i < r.luck ? "bg-sage-500" : "bg-warm-200"}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Best for / Watch out */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-4 h-4 rounded-full bg-sage-100 flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <h4 className="text-xs font-semibold text-warm-600">Best for</h4>
                          </div>
                          <ul className="space-y-1">
                            {r.bestFor.map((item, i) => (
                              <li key={i} className="text-xs text-warm-500 leading-snug">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01" />
                              </svg>
                            </div>
                            <h4 className="text-xs font-semibold text-warm-600">Watch out</h4>
                          </div>
                          <ul className="space-y-1">
                            {r.watchOutFor.map((item, i) => (
                              <li key={i} className="text-xs text-warm-500 leading-snug">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Delete */}
                      <div className="pt-3 border-t border-warm-100">
                        {deleteConfirm === date ? (
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-warm-500">Delete this reflection?</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1.5 rounded-lg text-warm-500 hover:bg-warm-100 text-xs font-medium transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDelete(date)}
                                className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(date)}
                            className="flex items-center gap-1.5 text-warm-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="text-xs font-medium">Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
