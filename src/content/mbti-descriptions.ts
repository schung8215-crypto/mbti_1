// Detailed MBTI type descriptions for results page

export interface MbtiDescription {
  type: string;
  title: string;
  summary: string;
  characteristics: string[];
  strengths: string[];
  worldView: string;
}

export const MBTI_DESCRIPTIONS: Record<string, MbtiDescription> = {
  INTJ: {
    type: "INTJ",
    title: "The Architect",
    summary:
      "Your strategic mind and preference for systems give you clarity others miss. You see patterns where others see chaos, and your analytical nature combined with long-term vision makes you a natural planner and problem-solver.",
    characteristics: [
      "Strategic and analytical thinker",
      "Independent and self-confident",
      "High standards for yourself and others",
      "Prefers deep knowledge over broad knowledge",
      "Values competence and logic",
    ],
    strengths: ["Strategic planning", "Problem-solving", "Independent thinking"],
    worldView:
      "You see the world as a complex system to be understood and optimized. Every challenge is a puzzle waiting to be solved with the right strategy.",
  },

  INTP: {
    type: "INTP",
    title: "The Logician",
    summary:
      "Your love of understanding how things work makes you an elegant problem-solver. You're driven by intellectual curiosity and the need for logical coherence, always seeking to understand the underlying principles of everything.",
    characteristics: [
      "Analytical and objective",
      "Inventive and creative thinker",
      "Values precision and accuracy",
      "Loves theoretical concepts",
      "Independent and reserved",
    ],
    strengths: ["Abstract thinking", "Innovation", "Logical analysis"],
    worldView:
      "You see the world as an endless source of fascinating puzzles. Truth and understanding are your guiding stars, and you're always building mental models to explain how things work.",
  },

  ENTJ: {
    type: "ENTJ",
    title: "The Commander",
    summary:
      "Your decisive leadership and drive to optimize systems create momentum everywhere you go. You have a natural ability to see inefficiencies and organize people and resources to achieve ambitious goals.",
    characteristics: [
      "Natural leader and organizer",
      "Strategic and long-term thinker",
      "Direct and confident communicator",
      "Driven to achieve and succeed",
      "Values efficiency and competence",
    ],
    strengths: ["Leadership", "Strategic vision", "Decision-making"],
    worldView:
      "You see the world as full of opportunities to create order and achieve meaningful goals. Every situation can be improved with the right leadership and strategy.",
  },

  ENTP: {
    type: "ENTP",
    title: "The Debater",
    summary:
      "Your quick wit and love of intellectual sparring keep things interesting. You're an innovative thinker who thrives on challenge and loves exploring new possibilities and ideas from every angle.",
    characteristics: [
      "Quick-witted and clever",
      "Loves intellectual challenges",
      "Adaptable and resourceful",
      "Enjoys playing devil's advocate",
      "Energized by new ideas",
    ],
    strengths: ["Innovation", "Persuasion", "Creative problem-solving"],
    worldView:
      "You see the world as a playground of ideas waiting to be explored and debated. Every convention is worth questioning, and every problem has an unconventional solution.",
  },

  INFJ: {
    type: "INFJ",
    title: "The Advocate",
    summary:
      "Your deep insight into people and vision for meaningful change guide you through life. You combine empathy with strategic thinking, always working toward a greater purpose and helping others grow.",
    characteristics: [
      "Deeply empathetic and insightful",
      "Idealistic with strong values",
      "Private but deeply caring",
      "Creative and visionary",
      "Seeks meaningful connections",
    ],
    strengths: ["Empathy", "Vision", "Inspiring others"],
    worldView:
      "You see beyond the surface to understand people's true potential. The world is full of meaning waiting to be discovered, and you're driven to help others find their path.",
  },

  INFP: {
    type: "INFP",
    title: "The Mediator",
    summary:
      "Your authentic values and emotional depth create genuine connection with others. You have a rich inner world and a deep desire to understand yourself and help others live authentically.",
    characteristics: [
      "Idealistic and empathetic",
      "Creative and imaginative",
      "Values authenticity deeply",
      "Sensitive and introspective",
      "Driven by personal values",
    ],
    strengths: ["Creativity", "Empathy", "Authenticity"],
    worldView:
      "You see the world through a lens of meaning and possibility. Every person has a story worth understanding, and beauty can be found in unexpected places.",
  },

  ENFJ: {
    type: "ENFJ",
    title: "The Protagonist",
    summary:
      "Your natural charisma and care for others' growth inspire everyone around you. You have a gift for understanding what people need and bringing out the best in them.",
    characteristics: [
      "Charismatic and inspiring",
      "Genuinely cares about others",
      "Natural teacher and mentor",
      "Organized and reliable",
      "Seeks harmony and growth",
    ],
    strengths: ["Leadership", "Empathy", "Communication"],
    worldView:
      "You see the potential in everyone and feel called to help them realize it. The world is a community to be nurtured, and every interaction is a chance to make a positive impact.",
  },

  ENFP: {
    type: "ENFP",
    title: "The Campaigner",
    summary:
      "Your natural enthusiasm and openness to possibility make you a catalyst for change. You see life as full of exciting connections and possibilities, and your energy is contagious.",
    characteristics: [
      "Enthusiastic and creative",
      "Warm and genuinely caring",
      "Sees possibilities everywhere",
      "Values freedom and authenticity",
      "Excellent at connecting with people",
    ],
    strengths: ["Creativity", "Communication", "Inspiring others"],
    worldView:
      "You see the world as an adventure full of fascinating people and exciting possibilities. Every day brings new opportunities for connection and discovery.",
  },

  ISTJ: {
    type: "ISTJ",
    title: "The Logistician",
    summary:
      "Your reliability and respect for proven methods create order and stability. You take your responsibilities seriously and can be counted on to follow through on your commitments.",
    characteristics: [
      "Dependable and thorough",
      "Practical and fact-oriented",
      "Values tradition and loyalty",
      "Organized and methodical",
      "Strong sense of duty",
    ],
    strengths: ["Reliability", "Organization", "Attention to detail"],
    worldView:
      "You see the world as a place that works best with clear rules and proven systems. Stability and reliability are the foundations of a well-functioning society.",
  },

  ISFJ: {
    type: "ISFJ",
    title: "The Defender",
    summary:
      "Your caring attention to detail and loyalty to those you love create stability and warmth. You notice what others need and quietly work to take care of the people and traditions you value.",
    characteristics: [
      "Warm and considerate",
      "Reliable and hardworking",
      "Observant and detail-oriented",
      "Loyal and committed",
      "Values harmony and cooperation",
    ],
    strengths: ["Supportiveness", "Reliability", "Practical care"],
    worldView:
      "You see the world through the lens of care and responsibility. The small, thoughtful acts of service are what hold communities and relationships together.",
  },

  ESTJ: {
    type: "ESTJ",
    title: "The Executive",
    summary:
      "Your direct approach and commitment to efficiency get things done. You're a natural organizer who values clear standards and isn't afraid to take charge to achieve results.",
    characteristics: [
      "Organized and efficient",
      "Direct and honest",
      "Strong-willed and decisive",
      "Values tradition and order",
      "Natural administrator",
    ],
    strengths: ["Organization", "Leadership", "Dedication"],
    worldView:
      "You see the world as a place that needs clear leadership and honest effort. With the right structure and hard work, any goal can be achieved.",
  },

  ESFJ: {
    type: "ESFJ",
    title: "The Consul",
    summary:
      "Your warmth and attentiveness to others' needs strengthen every community you're part of. You have a gift for making people feel welcome and bringing groups together.",
    characteristics: [
      "Warm and caring",
      "Loyal and dependable",
      "Enjoys helping others",
      "Values harmony and cooperation",
      "Socially aware and connected",
    ],
    strengths: ["Caring for others", "Organization", "Building community"],
    worldView:
      "You see the world as a network of relationships to be nurtured. Everyone deserves to feel valued and cared for, and you work to make that happen.",
  },

  ISTP: {
    type: "ISTP",
    title: "The Virtuoso",
    summary:
      "Your hands-on problem-solving and cool-headed adaptability shine in any crisis. You learn by doing and have a natural talent for understanding how things work.",
    characteristics: [
      "Practical and observant",
      "Calm under pressure",
      "Adaptable and spontaneous",
      "Values efficiency",
      "Independent and reserved",
    ],
    strengths: ["Problem-solving", "Adaptability", "Technical skills"],
    worldView:
      "You see the world as a hands-on puzzle to be figured out through direct experience. The best solutions come from rolling up your sleeves and getting to work.",
  },

  ISFP: {
    type: "ISFP",
    title: "The Adventurer",
    summary:
      "Your appreciation for beauty and living in the present moment brings joy to everyday life. You experience the world through your senses and express yourself through action rather than words.",
    characteristics: [
      "Gentle and sensitive",
      "Creative and artistic",
      "Values personal freedom",
      "Lives in the present moment",
      "Loyal to values and people",
    ],
    strengths: ["Creativity", "Empathy", "Aesthetic sense"],
    worldView:
      "You see the world as full of beauty and experiences to be savored. Life is best lived authentically, in harmony with your values and the present moment.",
  },

  ESTP: {
    type: "ESTP",
    title: "The Entrepreneur",
    summary:
      "Your bold action and sharp awareness of your surroundings help you seize opportunities others miss. You're energetic, pragmatic, and thrive in the moment.",
    characteristics: [
      "Energetic and action-oriented",
      "Observant and realistic",
      "Adaptable and resourceful",
      "Enjoys taking risks",
      "Direct and straightforward",
    ],
    strengths: ["Quick thinking", "Persuasion", "Crisis management"],
    worldView:
      "You see the world as full of opportunities to seize right now. Action beats overthinking, and the best results come from jumping in and adapting as you go.",
  },

  ESFP: {
    type: "ESFP",
    title: "The Entertainer",
    summary:
      "Your spontaneous joy and ability to engage others light up every room you enter. You live for the moment and have a gift for making everyday life feel like a celebration.",
    characteristics: [
      "Spontaneous and playful",
      "Warm and generous",
      "Observant and practical",
      "Loves being around people",
      "Lives fully in the present",
    ],
    strengths: ["People skills", "Adaptability", "Bringing joy"],
    worldView:
      "You see the world as a stage full of possibilities for fun, connection, and adventure. Life is meant to be enjoyed, and every moment is a chance to create happiness.",
  },
};
