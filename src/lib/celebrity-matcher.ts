// lib/celebrity-matcher.ts
// Matches celebrities by MBTI + Saju, with category diversity enforcement
import { CELEBRITIES, Celebrity, getCategoryEmoji } from "./celebrity-data";
import { calculateUserBirthPillar } from "./bazi";

interface UserProfile {
  mbtiType: string;
  birthElement: string;
  birthYinYang: string;
  birthAnimal: string;
}

export type MatchTier = "perfect" | "close" | "personality";

interface CelebrityMatch extends Celebrity {
  matchType: MatchTier;
  categoryEmoji: string;
}

// ─── Category diversity selection ────────────────────────────────
// Given a list of matches, pick up to 3 from DIFFERENT categories.
// If not enough diversity, fill from same category.

function selectWithDiversity(matches: CelebrityMatch[]): CelebrityMatch[] {
  if (matches.length <= 3) return matches;

  const selected: CelebrityMatch[] = [];
  const usedCategories = new Set<string>();

  // Pass 1: one per category (best tier first within each)
  for (const match of matches) {
    if (selected.length >= 3) break;
    if (!usedCategories.has(match.category)) {
      selected.push(match);
      usedCategories.add(match.category);
    }
  }

  // Pass 2: fill remaining slots if < 3 (allow repeated categories)
  if (selected.length < 3) {
    const selectedNames = new Set(selected.map((m) => m.name));
    for (const match of matches) {
      if (selected.length >= 3) break;
      if (!selectedNames.has(match.name)) {
        selected.push(match);
        selectedNames.add(match.name);
      }
    }
  }

  return selected;
}

// ─── Main export ─────────────────────────────────────────────────

export function getCelebrityMatches(userProfile: UserProfile): CelebrityMatch[] {
  const tierOrder: MatchTier[] = ["perfect", "close", "personality"];
  const allMatches: CelebrityMatch[] = [];

  CELEBRITIES.forEach((celebrity) => {
    if (celebrity.mbti !== userProfile.mbtiType) return;

    let matchType: MatchTier = "personality";

    try {
      const [year, month, day] = celebrity.birthDate.split("-").map(Number);
      const celebPillar = calculateUserBirthPillar(year, month, day);

      if (
        celebPillar.birthElement === userProfile.birthElement &&
        celebPillar.birthAnimal === userProfile.birthAnimal
      ) {
        matchType = "perfect";
      } else if (
        celebPillar.birthElement === userProfile.birthElement ||
        celebPillar.birthAnimal === userProfile.birthAnimal
      ) {
        matchType = "close";
      }
    } catch {
      // If birth pillar calculation fails, still include as personality match
    }

    allMatches.push({
      ...celebrity,
      matchType,
      categoryEmoji: getCategoryEmoji(celebrity.category),
    });
  });

  // Sort: perfect → close → personality
  const sorted = tierOrder.flatMap((tier) =>
    allMatches.filter((m) => m.matchType === tier)
  );

  return selectWithDiversity(sorted);
}

export function getMatchTypeLabel(matchType: MatchTier): string {
  const labels = {
    perfect: "Perfect profile match",
    close: "Close profile match",
    personality: "Personality match",
  };
  return labels[matchType];
}
