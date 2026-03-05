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

export default function OnboardingQuestionsPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<MbtiScores>(getInitialScores());
  const [answerHistory, setAnswerHistory] = useState<string[]>([]);

  const progress = ((currentQuestion + 1) / MBTI_QUESTIONS.length) * 100;

  const handleAnswer = (type: string) => {
    const newScores = { ...scores, [type]: scores[type as keyof MbtiScores] + 1 };
    setScores(newScores);
    setAnswerHistory([...answerHistory, type]);

    if (currentQuestion < MBTI_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const mbtiType = calculateMbtiType(newScores);
      const description = MBTI_DESCRIPTIONS[mbtiType];
      localStorage.setItem(
        "mbti-pending",
        JSON.stringify({
          mbtiType,
          mbtiTitle: description?.title || "",
          scores: newScores,
        })
      );
      router.push("/onboarding/results");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      const lastType = answerHistory[answerHistory.length - 1];
      if (lastType) {
        setScores({ ...scores, [lastType]: scores[lastType as keyof MbtiScores] - 1 });
        setAnswerHistory(answerHistory.slice(0, -1));
      }
      setCurrentQuestion(currentQuestion - 1);
    } else {
      router.back();
    }
  };

  const question = MBTI_QUESTIONS[currentQuestion];

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ background: '#f5f3ef' }}>
      <div className="w-full max-w-md animate-fade-in">
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

            <div key={currentQuestion} className="space-y-3">
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
    </main>
  );
}
