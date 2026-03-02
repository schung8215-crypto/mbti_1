// lib/tagline.ts
// Generates a synthesized cosmic identity tagline from MBTI + Element + YinYang
// 16 MBTI × 10 element combinations = 160 unique taglines

const MBTI_ADJECTIVES: Record<string, string> = {
  INTJ: "Strategic",
  INTP: "Analytical",
  ENTJ: "Commanding",
  ENTP: "Inventive",
  INFJ: "Visionary",
  INFP: "Compassionate",
  ENFJ: "Inspiring",
  ENFP: "Creative",
  ISTJ: "Steadfast",
  ISFJ: "Nurturing",
  ESTJ: "Decisive",
  ESFJ: "Harmonious",
  ISTP: "Precise",
  ISFP: "Artful",
  ESTP: "Dynamic",
  ESFP: "Radiant",
};

// Each element × yin/yang has a distinct quality
const ELEMENT_QUALITIES: Record<string, string> = {
  "Yang Wood":  "Force",
  "Yin Wood":   "Grace",
  "Yang Fire":  "Flame",
  "Yin Fire":   "Glow",
  "Yang Earth": "Mountain",
  "Yin Earth":  "Soil",
  "Yang Metal": "Edge",
  "Yin Metal":  "Luster",
  "Yang Water": "Current",
  "Yin Water":  "Depth",
};

// Each element × yin/yang has a second, more poetic quality
// used for the profile header subtitle
const ELEMENT_ESSENCE: Record<string, string> = {
  "Yang Wood":  "growth and ambition",
  "Yin Wood":   "patience and flow",
  "Yang Fire":  "passion and radiance",
  "Yin Fire":   "warmth and intuition",
  "Yang Earth": "strength and steadiness",
  "Yin Earth":  "nurture and support",
  "Yang Metal": "clarity and precision",
  "Yin Metal":  "refinement and grace",
  "Yang Water": "momentum and depth",
  "Yin Water":  "wisdom and stillness",
};

// Animal adjective — single-word form used in the tagline
const ANIMAL_ADJECTIVES: Record<string, string> = {
  Rat:     "Quick",
  Ox:      "Steady",
  Tiger:   "Bold",
  Rabbit:  "Graceful",
  Dragon:  "Mighty",
  Snake:   "Wise",
  Horse:   "Free",
  Goat:    "Gentle",
  Monkey:  "Nimble",
  Rooster: "Sharp",
  Dog:     "Loyal",
  Pig:     "Warm",
};

// Animal essence — used in subtitle / supporting text
const ANIMAL_ESSENCE: Record<string, string> = {
  Rat:     "resourcefulness",
  Ox:      "endurance",
  Tiger:   "courage",
  Rabbit:  "elegance",
  Dragon:  "power",
  Snake:   "wisdom",
  Horse:   "freedom",
  Goat:    "gentleness",
  Monkey:  "ingenuity",
  Rooster: "precision",
  Dog:     "loyalty",
  Pig:     "warmth",
};

export interface TaglineResult {
  tagline: string;         // "The Compassionate Flame"
  subtitle: string;        // "passion and radiance meets elegance"
}

export function generateTagline(
  mbtiType: string,
  yinYang: string,
  element: string,
  animal: string
): TaglineResult {
  const adj = MBTI_ADJECTIVES[mbtiType] || "Thoughtful";
  const elementKey = `${yinYang} ${element}`;
  const quality = ELEMENT_QUALITIES[elementKey] || "Energy";
  const essence = ELEMENT_ESSENCE[elementKey] || "depth";
  const animalEss = ANIMAL_ESSENCE[animal] || "grace";
  const animalEssCap = animalEss.charAt(0).toUpperCase() + animalEss.slice(1);

  return {
    tagline: `The ${adj} ${quality} of ${animalEssCap}`,  // e.g. "The Decisive Edge of Loyalty"
    subtitle: `${essence} meets ${animalEss}`,
  };
}
