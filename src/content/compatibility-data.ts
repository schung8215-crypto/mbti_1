// Compatibility data for MBTI + Element matching between two people

// --- MBTI Dichotomy Interactions ---
// 4 dimensions × 3 combos each = 12 entries

export interface DichotomyInteraction {
  score: number; // 1-5
  strength: string;
  challenge: string;
  tip: string;
}

export const MBTI_DICHOTOMY: Record<string, Record<string, DichotomyInteraction>> = {
  // Energy: E/I
  EI: {
    EE: {
      score: 4,
      strength: "You both draw energy from the world around you — conversations flow and plans happen fast.",
      challenge: "With two extroverts, quiet reflection can get lost in the noise.",
      tip: "Build in moments of calm so your best ideas have room to land.",
    },
    II: {
      score: 4,
      strength: "You share a love for depth over breadth — your connection grows in quiet, meaningful moments.",
      challenge: "Neither of you may initiate plans, leading to comfortable but stagnant routines.",
      tip: "Take turns being the one who suggests something new.",
    },
    EI: {
      score: 3,
      strength: "You balance each other — one brings social energy, the other brings reflective depth.",
      challenge: "The extrovert may feel ignored; the introvert may feel drained.",
      tip: "Respect each other's recharge style — it's a feature, not a flaw.",
    },
  },
  // Information: S/N
  SN: {
    SS: {
      score: 4,
      strength: "You're grounded in reality together — practical plans come easily and details don't get missed.",
      challenge: "You may both overlook the bigger picture or resist unconventional ideas.",
      tip: "Once in a while, dream beyond what's practical — it keeps things fresh.",
    },
    NN: {
      score: 4,
      strength: "You inspire each other with ideas and possibilities — conversations can feel electric.",
      challenge: "Big ideas without follow-through can lead to a lot of talk, little action.",
      tip: "Pick one shared idea and actually do it — execution is where the magic happens.",
    },
    SN: {
      score: 3,
      strength: "One sees what is, the other sees what could be — together you cover all angles.",
      challenge: "The sensor may feel the intuitive is unrealistic; the intuitive may feel the sensor is limiting.",
      tip: "Value both perspectives — the best plans are grounded dreams.",
    },
  },
  // Decisions: T/F
  TF: {
    TT: {
      score: 4,
      strength: "You make decisions efficiently and respect each other's logic — no beating around the bush.",
      challenge: "Emotional needs can go unspoken, leading to a connection that feels functional but cool.",
      tip: "Feelings matter even when they're not logical — check in on each other.",
    },
    FF: {
      score: 4,
      strength: "You create deep emotional understanding — both of you lead with empathy and care.",
      challenge: "Hard truths may get avoided to preserve harmony, letting issues build up.",
      tip: "Kind honesty is better than comfortable silence — say the real thing, gently.",
    },
    TF: {
      score: 3,
      strength: "One brings clarity, the other brings compassion — decisions benefit from both lenses.",
      challenge: "The thinker may seem cold; the feeler may seem irrational to the other.",
      tip: "When disagreeing, lead with curiosity — 'help me see it your way.'",
    },
  },
  // Lifestyle: J/P
  JP: {
    JJ: {
      score: 4,
      strength: "You're both organized and decisive — shared plans run smoothly and expectations are clear.",
      challenge: "Two planners can clash over whose plan wins, or become too rigid together.",
      tip: "Leave room for surprise — not everything needs to be scheduled.",
    },
    PP: {
      score: 3,
      strength: "You're both flexible and spontaneous — you go with the flow and adapt easily.",
      challenge: "Important decisions and tasks may drift without anyone taking charge.",
      tip: "Agree on just a few non-negotiable commitments — freedom needs some structure to thrive.",
    },
    JP: {
      score: 3,
      strength: "One provides structure, the other provides spontaneity — life stays balanced.",
      challenge: "The judger may feel stressed by unpredictability; the perceiver may feel constrained.",
      tip: "Plan the big things, improvise the rest — meet in the middle.",
    },
  },
};

// --- Dominant Cognitive Function Map ---

export type CognitiveFunction = "Ni" | "Ne" | "Si" | "Se" | "Ti" | "Te" | "Fi" | "Fe";

export const DOMINANT_FUNCTION_MAP: Record<string, CognitiveFunction> = {
  INTJ: "Ni",
  INFJ: "Ni",
  ENTP: "Ne",
  ENFP: "Ne",
  ISTJ: "Si",
  ISFJ: "Si",
  ESTP: "Se",
  ESFP: "Se",
  INTP: "Ti",
  ISTP: "Ti",
  ENTJ: "Te",
  ESTJ: "Te",
  INFP: "Fi",
  ISFP: "Fi",
  ENFJ: "Fe",
  ESFJ: "Fe",
};

export interface FunctionInteraction {
  score: number;
  description: string;
}

// same = identical function, same_axis = same axis (e.g. Ni/Ne), different = no shared axis
export const FUNCTION_INTERACTIONS: Record<string, FunctionInteraction> = {
  same: {
    score: 5,
    description: "You process the world through the same lens — instant understanding, but also shared blind spots.",
  },
  same_axis: {
    score: 4,
    description: "You value the same things but approach them differently — complementary perspectives on a shared wavelength.",
  },
  different: {
    score: 3,
    description: "You think in fundamentally different ways — it takes effort, but you each bring what the other lacks.",
  },
};

export function getFunctionInteractionType(f1: CognitiveFunction, f2: CognitiveFunction): "same" | "same_axis" | "different" {
  if (f1 === f2) return "same";
  // Same axis: Ni/Ne, Si/Se, Ti/Te, Fi/Fe
  const axis1 = f1.charAt(0); // N, S, T, F
  const axis2 = f2.charAt(0);
  if (axis1 === axis2) return "same_axis";
  return "different";
}

// --- Element Compatibility ---

export interface ElementCompatibility {
  title: string;
  score: number; // 1-5
  description: string;
  strength: string;
  challenge: string;
}

export const ELEMENT_COMPATIBILITY: Record<string, ElementCompatibility> = {
  harmony: {
    title: "Perfect Harmony",
    score: 5,
    description: "You share the same element and polarity — your energies resonate deeply. You understand each other's rhythms intuitively.",
    strength: "Natural understanding and shared values make cooperation effortless.",
    challenge: "You may amplify each other's weaknesses since you share the same blind spots.",
  },
  complementary: {
    title: "Balanced Duality",
    score: 4,
    description: "Same element, different polarity — you're two sides of the same coin. One pushes outward while the other draws inward.",
    strength: "You complement each other naturally, balancing action with reflection.",
    challenge: "Your different paces can cause friction if you don't appreciate the contrast.",
  },
  generating: {
    title: "Natural Support",
    score: 4,
    description: "Your energy naturally fuels theirs — you're a source of inspiration and strength for them.",
    strength: "You have a natural gift for empowering this person and helping them grow.",
    challenge: "You may give too much and forget to replenish your own energy.",
  },
  being_generated: {
    title: "Nourishing Bond",
    score: 5,
    description: "Their energy naturally feeds yours — being around them feels replenishing and supportive.",
    strength: "They bring out your best qualities and make you feel energized.",
    challenge: "Be mindful not to take their support for granted or become dependent.",
  },
  controlling: {
    title: "Growth Through Challenge",
    score: 3,
    description: "Your energy naturally shapes theirs — you push them to refine and improve, even if it feels intense.",
    strength: "You help each other grow through constructive challenge and honest feedback.",
    challenge: "Too much pressure can feel controlling — balance honesty with gentleness.",
  },
  being_controlled: {
    title: "Transformative Tension",
    score: 2,
    description: "Their energy naturally challenges yours — they push you toward growth, even when it's uncomfortable.",
    strength: "This relationship forces you to evolve and strengthen your weak areas.",
    challenge: "You may feel restricted or pressured — set healthy boundaries.",
  },
  neutral: {
    title: "Independent Orbits",
    score: 3,
    description: "Your elements don't directly interact — you move in independent orbits with room to be yourselves.",
    strength: "Neither of you overwhelms the other — there's natural space and freedom.",
    challenge: "You may need to make extra effort to find common ground and deepen your bond.",
  },
};

// --- Activities & Communication Tips per Element Relationship ---

export interface RelationshipActivities {
  activities: string[];
  communicationTip: string;
}

export const RELATIONSHIP_ACTIVITIES: Record<string, RelationshipActivities> = {
  harmony: {
    activities: ["Shared hobbies", "Creative projects", "Travel together", "Deep conversations", "Learning something new together"],
    communicationTip: "You already speak the same language — use that to explore deeper topics you'd normally avoid.",
  },
  complementary: {
    activities: ["Yin-yang workouts", "Cooking together", "Balanced planning sessions", "Nature walks", "Art & music"],
    communicationTip: "Appreciate your different tempos — one's calm is the other's anchor, and vice versa.",
  },
  generating: {
    activities: ["Mentoring moments", "Joint volunteering", "Building something together", "Brainstorming sessions", "Team sports"],
    communicationTip: "Share your energy generously but set boundaries — you can inspire without depleting yourself.",
  },
  being_generated: {
    activities: ["Learning from each other", "Adventure trips", "Trying their hobbies", "Celebrating wins together", "Wellness activities"],
    communicationTip: "Express gratitude often — acknowledging their support strengthens the bond.",
  },
  controlling: {
    activities: ["Friendly competition", "Debate nights", "Fitness challenges", "Strategy games", "Problem-solving together"],
    communicationTip: "Frame feedback as suggestions, not corrections — the goal is growth, not control.",
  },
  being_controlled: {
    activities: ["Personal growth workshops", "Journaling together", "Mindfulness practice", "Trying new skills", "Setting goals together"],
    communicationTip: "Speak up about your needs calmly — boundaries aren't walls, they're doorways to respect.",
  },
  neutral: {
    activities: ["Exploring new places", "Movie nights", "Casual dining", "Board games", "Shared playlists"],
    communicationTip: "Be curious about their world — asking genuine questions bridges any natural distance.",
  },
};

// --- Score Labels (all positive framing) ---

export function getScoreLabel(score: number): string {
  if (score >= 4.5) return "Extraordinary Connection";
  if (score >= 3.5) return "Strong Connection";
  if (score >= 2.5) return "Growing Connection";
  if (score >= 1.5) return "Unique Connection";
  return "Intriguing Connection";
}
