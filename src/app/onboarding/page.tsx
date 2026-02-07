"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingFlow from "@/components/OnboardingFlow";
import { calculateUserBirthPillar } from "@/lib/bazi";
import { saveUser } from "@/lib/supabase";

export default function OnboardingPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleComplete = async (data: {
    mbtiType: string;
    birthYear: number;
    birthMonth: number;
    birthDay: number;
  }) => {
    setSaving(true);

    const birthPillar = calculateUserBirthPillar(
      data.birthYear,
      data.birthMonth,
      data.birthDay
    );

    const userData = {
      mbti_type: data.mbtiType,
      birth_year: data.birthYear,
      birth_month: data.birthMonth,
      birth_day: data.birthDay,
      birth_stem: birthPillar.birthStem,
      birth_branch: birthPillar.birthBranch,
      birth_element: birthPillar.birthElement,
      birth_yin_yang: birthPillar.birthYinYang,
    };

    // Save to Supabase
    const savedUser = await saveUser(userData);

    // Also save to localStorage for quick access
    const localData = {
      ...data,
      birthStem: birthPillar.birthStem,
      birthBranch: birthPillar.birthBranch,
      birthElement: birthPillar.birthElement,
      birthYinYang: birthPillar.birthYinYang,
      birthAnimal: birthPillar.birthAnimal,
      yearStem: birthPillar.yearStem,
      yearBranch: birthPillar.yearBranch,
      supabaseId: savedUser?.id,
    };
    localStorage.setItem("mbti-saju-user", JSON.stringify(localData));

    router.push("/");
  };

  if (saving) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-violet-200 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-warm-600">Setting up your profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <OnboardingFlow onComplete={handleComplete} />
      </div>
    </main>
  );
}
