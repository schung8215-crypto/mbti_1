// MBTI Test Questions - 12 questions (3 per dichotomy)

export interface MbtiQuestion {
  id: number;
  question: string;
  dichotomy: "EI" | "SN" | "TF" | "JP";
  optionA: {
    text: string;
    type: "E" | "S" | "T" | "J";
  };
  optionB: {
    text: string;
    type: "I" | "N" | "F" | "P";
  };
}

export const MBTI_QUESTIONS: MbtiQuestion[] = [
  // E vs I (Extroversion vs Introversion)
  {
    id: 1,
    question: "After a long week, you prefer to recharge by:",
    dichotomy: "EI",
    optionA: {
      text: "Going out with friends or attending social events",
      type: "E",
    },
    optionB: {
      text: "Spending quiet time alone or with one close person",
      type: "I",
    },
  },
  {
    id: 2,
    question: "In group discussions, you typically:",
    dichotomy: "EI",
    optionA: {
      text: "Share your thoughts as they come to mind",
      type: "E",
    },
    optionB: {
      text: "Listen first and speak after reflecting",
      type: "I",
    },
  },
  {
    id: 3,
    question: "You feel most energized when:",
    dichotomy: "EI",
    optionA: {
      text: "Interacting with many different people",
      type: "E",
    },
    optionB: {
      text: "Having deep conversations with a few people",
      type: "I",
    },
  },

  // S vs N (Sensing vs Intuition)
  {
    id: 4,
    question: "When learning something new, you prefer:",
    dichotomy: "SN",
    optionA: {
      text: "Step-by-step instructions with practical examples",
      type: "S",
    },
    optionB: {
      text: "Understanding the big picture and theory first",
      type: "N",
    },
  },
  {
    id: 5,
    question: "You tend to focus more on:",
    dichotomy: "SN",
    optionA: {
      text: "What is real and present right now",
      type: "S",
    },
    optionB: {
      text: "Future possibilities and what could be",
      type: "N",
    },
  },
  {
    id: 6,
    question: "When describing an experience, you usually:",
    dichotomy: "SN",
    optionA: {
      text: "Share specific details and facts",
      type: "S",
    },
    optionB: {
      text: "Focus on impressions and underlying meanings",
      type: "N",
    },
  },

  // T vs F (Thinking vs Feeling)
  {
    id: 7,
    question: "When making important decisions, you rely more on:",
    dichotomy: "TF",
    optionA: {
      text: "Logic, analysis, and objective criteria",
      type: "T",
    },
    optionB: {
      text: "Personal values and how it affects people",
      type: "F",
    },
  },
  {
    id: 8,
    question: "When a friend is upset, you're more likely to:",
    dichotomy: "TF",
    optionA: {
      text: "Help them analyze the problem and find solutions",
      type: "T",
    },
    optionB: {
      text: "Listen with empathy and validate their feelings",
      type: "F",
    },
  },
  {
    id: 9,
    question: "In disagreements, you prioritize:",
    dichotomy: "TF",
    optionA: {
      text: "Being fair and finding the truth",
      type: "T",
    },
    optionB: {
      text: "Maintaining harmony and understanding feelings",
      type: "F",
    },
  },

  // J vs P (Judging vs Perceiving)
  {
    id: 10,
    question: "Your workspace and living space tend to be:",
    dichotomy: "JP",
    optionA: {
      text: "Organized with everything in its place",
      type: "J",
    },
    optionB: {
      text: "Flexible with things where you last used them",
      type: "P",
    },
  },
  {
    id: 11,
    question: "When working on projects, you prefer to:",
    dichotomy: "JP",
    optionA: {
      text: "Plan ahead and finish before the deadline",
      type: "J",
    },
    optionB: {
      text: "Stay flexible and work in bursts of energy",
      type: "P",
    },
  },
  {
    id: 12,
    question: "You feel more comfortable when:",
    dichotomy: "JP",
    optionA: {
      text: "Things are decided and settled",
      type: "J",
    },
    optionB: {
      text: "Options are kept open for as long as possible",
      type: "P",
    },
  },
];

export interface MbtiScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export function calculateMbtiType(scores: MbtiScores): string {
  const ei = scores.E >= scores.I ? "E" : "I";
  const sn = scores.S >= scores.N ? "S" : "N";
  const tf = scores.T >= scores.F ? "T" : "F";
  const jp = scores.J >= scores.P ? "J" : "P";

  return `${ei}${sn}${tf}${jp}`;
}

export function getInitialScores(): MbtiScores {
  return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
}
