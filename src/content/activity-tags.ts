// content/activity-tags.ts
// Activity suggestions based on the relationship type between birth and day elements

export interface ActivityTag {
  energyLevel: number; // 1-5
  luck: number; // 1-5
  bestFor: string[];
  watchOutFor: string[];
}

export const ACTIVITY_TAGS: Record<string, ActivityTag> = {
  // Same stem (e.g., Yang Wood + Yang Wood)
  harmony: {
    energyLevel: 5,
    luck: 4,
    bestFor: [
      "Leading with confidence",
      "Major decisions in your area of strength",
      "Doubling down on what you do best",
      "Bold moves that require conviction"
    ],
    watchOutFor: [
      "Overconfidence or excess",
      "Ignoring alternative perspectives",
      "Going too far in one direction",
      "Forgetting to balance yourself"
    ]
  },
  
  // Same element, different polarity (e.g., Yang Wood + Yin Wood)
  complementary: {
    energyLevel: 4,
    luck: 4,
    bestFor: [
      "Finding balance between force and finesse",
      "Projects requiring both power and subtlety",
      "Collaboration and partnership",
      "Integrating different approaches"
    ],
    watchOutFor: [
      "Internal conflict between push and pause",
      "Overthinking the balance",
      "Diluting your natural strengths",
      "Trying to be everything at once"
    ]
  },
  
  // You support today (e.g., Wood person on Fire day)
  generating: {
    energyLevel: 4,
    luck: 4,
    bestFor: [
      "Helping others succeed",
      "Enabling projects to grow",
      "Generous acts and support",
      "Fueling momentum in your community",
      "Planting seeds for future rewards"
    ],
    watchOutFor: [
      "Giving too much and depleting yourself",
      "Not saving energy for your own needs",
      "Expecting immediate returns",
      "Supporting the wrong causes"
    ]
  },
  
  // Today supports you (e.g., Fire person on Wood day)
  being_generated: {
    energyLevel: 5,
    luck: 5,
    bestFor: [
      "Starting new projects",
      "Taking risks with confidence",
      "Following your instincts",
      "Major initiatives and launches",
      "Asking for what you need",
      "Trusting you're supported"
    ],
    watchOutFor: [
      "Taking support for granted",
      "Overextending because you feel invincible",
      "Forgetting to acknowledge helpers",
      "Waste or excess"
    ]
  },
  
  // You challenge today (e.g., Wood person on Earth day)
  controlling: {
    energyLevel: 3,
    luck: 3,
    bestFor: [
      "Breaking through obstacles",
      "Disrupting what's stuck",
      "Innovation and fresh thinking",
      "Constructive challenge and debate",
      "Reshaping outdated structures"
    ],
    watchOutFor: [
      "Unnecessary conflict",
      "Being too forceful or aggressive",
      "Breaking what doesn't need breaking",
      "Ignoring valid resistance",
      "Burning bridges"
    ]
  },
  
  // Today challenges you (e.g., Wood person on Metal day)
  being_controlled: {
    energyLevel: 2,
    luck: 3,
    bestFor: [
      "Refinement and editing",
      "Letting go of excess",
      "Accepting criticism gracefully",
      "Discipline and focus",
      "Strategic retreat or pruning",
      "Learning from constraints"
    ],
    watchOutFor: [
      "Feeling defeated or restricted",
      "Resisting necessary change",
      "Taking criticism too personally",
      "Giving up too easily",
      "Defensiveness"
    ]
  },
  
  // No direct relationship
  neutral: {
    energyLevel: 3,
    luck: 3,
    bestFor: [
      "Routine tasks and maintenance",
      "Steady progress without drama",
      "Observing and learning",
      "Flexibility and adaptability",
      "Low-stakes experimentation"
    ],
    watchOutFor: [
      "Coasting without direction",
      "Lack of motivation",
      "Missing opportunities",
      "Playing it too safe",
      "Drifting aimlessly"
    ]
  }
};
