import { MBTI_TEMPLATES } from "@/content/mbti-templates";
import { DAY_DESCRIPTIONS } from "@/content/day-descriptions";
import { STEM_INTERACTIONS } from "@/content/stem-interactions";
import { ACTIVITY_TAGS, ActivityTag } from "@/content/activity-tags";
import { Pillar } from "./bazi";

export interface DailyMessage {
  greeting: string;
  date: string;
  todayEnergy: string;
  mainMessage: string;
  energyLevel: number;
  luck: number;
  bestFor: string[];
  watchOutFor: string[];
  todayElement: string;
  todayYinYang: string;
  todayAnimal: string;
}

interface UserData {
  mbtiType: string;
  birthStem: string;
  birthBranch: string;
  birthElement: string;
  birthYinYang: string;
}

type RelationshipType =
  | "harmony"
  | "complementary"
  | "generating"
  | "being_generated"
  | "controlling"
  | "being_controlled"
  | "neutral";

const GENERATING_CYCLE: Record<string, string> = {
  Wood: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Wood",
};

const CONTROLLING_CYCLE: Record<string, string> = {
  Wood: "Earth",
  Earth: "Water",
  Water: "Fire",
  Fire: "Metal",
  Metal: "Wood",
};

// Map Chinese branch characters to English zodiac animals
const BRANCH_TO_ANIMAL: Record<string, string> = {
  "子": "Rat",
  "丑": "Ox",
  "寅": "Tiger",
  "卯": "Rabbit",
  "辰": "Dragon",
  "巳": "Snake",
  "午": "Horse",
  "未": "Goat",
  "申": "Monkey",
  "酉": "Rooster",
  "戌": "Dog",
  "亥": "Pig",
};

function determineRelationshipType(
  userElement: string,
  userYinYang: string,
  todayElement: string,
  todayYinYang: string
): RelationshipType {
  if (userElement === todayElement && userYinYang === todayYinYang) {
    return "harmony";
  }

  if (userElement === todayElement) {
    return "complementary";
  }

  if (GENERATING_CYCLE[userElement] === todayElement) {
    return "generating";
  }

  if (GENERATING_CYCLE[todayElement] === userElement) {
    return "being_generated";
  }

  if (CONTROLLING_CYCLE[userElement] === todayElement) {
    return "controlling";
  }

  if (CONTROLLING_CYCLE[todayElement] === userElement) {
    return "being_controlled";
  }

  return "neutral";
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 17) return "Good afternoon!";
  return "Good evening!";
}

function formatDate(): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  return new Date().toLocaleDateString("en-US", options);
}

export function generateDailyMessage(
  userData: UserData,
  todayPillar: Pillar
): DailyMessage {
  const mbtiBase = MBTI_TEMPLATES[userData.mbtiType] || "";

  const dayKey = `${todayPillar.stem}-${todayPillar.branch}`;
  const todayDescription = DAY_DESCRIPTIONS[dayKey] || "A day of balance and flow";

  const interactionKey = `${userData.birthStem}-${todayPillar.stem}`;
  const interaction = STEM_INTERACTIONS[interactionKey] || "";

  const relationType = determineRelationshipType(
    userData.birthElement,
    userData.birthYinYang,
    todayPillar.element,
    todayPillar.yinYang
  );

  const activities: ActivityTag = ACTIVITY_TAGS[relationType];

  const mainMessage = `${mbtiBase} ${interaction}`.trim();

  // Convert branch to animal name
  const todayAnimal = BRANCH_TO_ANIMAL[todayPillar.branch] || "Dragon";

  return {
    greeting: getGreeting(),
    date: formatDate(),
    todayEnergy: todayDescription,
    mainMessage,
    energyLevel: activities.energyLevel,
    luck: activities.luck,
    bestFor: activities.bestFor.slice(0, 3),
    watchOutFor: activities.watchOutFor.slice(0, 2),
    todayElement: todayPillar.element,
    todayYinYang: todayPillar.yinYang,
    todayAnimal,
  };
}
