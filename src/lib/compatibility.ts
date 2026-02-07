import {
  MBTI_DICHOTOMY,
  DOMINANT_FUNCTION_MAP,
  FUNCTION_INTERACTIONS,
  getFunctionInteractionType,
  ELEMENT_COMPATIBILITY,
  RELATIONSHIP_ACTIVITIES,
  getScoreLabel,
  type DichotomyInteraction,
  type ElementCompatibility,
  type RelationshipActivities,
} from "@/content/compatibility-data";

// --- Element cycle logic (copied from message-generator.ts to stay self-contained) ---

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

function determineRelationshipType(
  el1: string,
  yy1: string,
  el2: string,
  yy2: string
): RelationshipType {
  if (el1 === el2 && yy1 === yy2) return "harmony";
  if (el1 === el2) return "complementary";
  if (GENERATING_CYCLE[el1] === el2) return "generating";
  if (GENERATING_CYCLE[el2] === el1) return "being_generated";
  if (CONTROLLING_CYCLE[el1] === el2) return "controlling";
  if (CONTROLLING_CYCLE[el2] === el1) return "being_controlled";
  return "neutral";
}

// --- MBTI Compatibility ---

export interface MbtiDimensionResult {
  dimension: string;
  label: string;
  combo: string; // e.g. "E + I"
  letter1: string;
  letter2: string;
  interaction: DichotomyInteraction;
}

export interface MbtiCompatibilityResult {
  dimensions: MbtiDimensionResult[];
  functionInteraction: {
    type: "same" | "same_axis" | "different";
    score: number;
    description: string;
    func1: string;
    func2: string;
  };
  averageScore: number;
}

const DIMENSION_LABELS = ["Energy", "Information", "Decisions", "Lifestyle"];
const DIMENSION_KEYS = ["EI", "SN", "TF", "JP"];
const DIMENSION_INDICES = [0, 1, 2, 3]; // E/I, S/N, T/F, J/P positions in MBTI string

export function calculateMbtiCompatibility(
  type1: string,
  type2: string
): MbtiCompatibilityResult {
  const dimensions: MbtiDimensionResult[] = DIMENSION_INDICES.map((idx) => {
    const letter1 = type1[idx];
    const letter2 = type2[idx];
    const dimKey = DIMENSION_KEYS[idx];

    // Determine the combo key: same letters → doubled (EE, SS, TT, JJ), different → mixed (EI, SN, TF, JP)
    let comboKey: string;
    if (letter1 === letter2) {
      comboKey = letter1 + letter1;
    } else {
      comboKey = dimKey; // The mixed key is always the dimension key (EI, SN, TF, JP)
    }

    const interaction = MBTI_DICHOTOMY[dimKey][comboKey];

    return {
      dimension: dimKey,
      label: DIMENSION_LABELS[idx],
      combo: `${letter1} + ${letter2}`,
      letter1,
      letter2,
      interaction,
    };
  });

  // Dominant function comparison
  const func1 = DOMINANT_FUNCTION_MAP[type1];
  const func2 = DOMINANT_FUNCTION_MAP[type2];
  const funcType = getFunctionInteractionType(func1, func2);
  const funcInteraction = FUNCTION_INTERACTIONS[funcType];

  const allScores = [...dimensions.map((d) => d.interaction.score), funcInteraction.score];
  const averageScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;

  return {
    dimensions,
    functionInteraction: {
      type: funcType,
      score: funcInteraction.score,
      description: funcInteraction.description,
      func1,
      func2,
    },
    averageScore,
  };
}

// --- Element Compatibility ---

export interface ElementCompatibilityResult {
  relationshipType: RelationshipType;
  compatibility: ElementCompatibility;
  activities: RelationshipActivities;
}

export function calculateElementCompatibility(
  el1: string,
  yy1: string,
  el2: string,
  yy2: string
): ElementCompatibilityResult {
  const relationshipType = determineRelationshipType(el1, yy1, el2, yy2);
  const compatibility = ELEMENT_COMPATIBILITY[relationshipType];
  const activities = RELATIONSHIP_ACTIVITIES[relationshipType];

  return { relationshipType, compatibility, activities };
}

// --- Overall Score ---

export function calculateOverallScore(mbtiAvg: number, elementScore: number): number {
  // 60% MBTI + 40% Element
  return mbtiAvg * 0.6 + elementScore * 0.4;
}

// --- Full Report ---

export interface CompatibilityReport {
  overallScore: number;
  scoreLabel: string;
  mbti: MbtiCompatibilityResult;
  element: ElementCompatibilityResult;
  strengths: string[];
  challenges: string[];
  activities: string[];
  communicationTip: string;
}

export function generateCompatibilityReport(
  person1: { mbtiType: string; birthElement: string; birthYinYang: string },
  person2: { mbtiType: string; birthElement: string; birthYinYang: string }
): CompatibilityReport {
  const mbti = calculateMbtiCompatibility(person1.mbtiType, person2.mbtiType);
  const element = calculateElementCompatibility(
    person1.birthElement,
    person1.birthYinYang,
    person2.birthElement,
    person2.birthYinYang
  );

  const overallScore = calculateOverallScore(mbti.averageScore, element.compatibility.score);
  const scoreLabel = getScoreLabel(overallScore);

  // Gather strengths from best-scoring dimensions + element
  const strengths: string[] = [];
  const challenges: string[] = [];

  // Add element strength/challenge
  strengths.push(element.compatibility.strength);
  challenges.push(element.compatibility.challenge);

  // Add top MBTI dimension strengths/challenges
  const sortedDims = [...mbti.dimensions].sort(
    (a, b) => b.interaction.score - a.interaction.score
  );
  // Top 2 strengths, bottom 2 challenges
  sortedDims.slice(0, 2).forEach((d) => strengths.push(d.interaction.strength));
  sortedDims.slice(-2).forEach((d) => challenges.push(d.interaction.challenge));

  return {
    overallScore,
    scoreLabel,
    mbti,
    element,
    strengths,
    challenges,
    activities: element.activities.activities,
    communicationTip: element.activities.communicationTip,
  };
}
