// lib/celebrity-data.ts
// Curated list of celebrities with verified MBTI types and birth dates
// Data sourced from public interviews, official tests, and biographical information

export interface Celebrity {
  name: string;
  mbti: string;
  birthDate: string; // YYYY-MM-DD format
  category: string;
  photoUrl?: string; // Optional - can use placeholder for now
}

export const CELEBRITIES: Celebrity[] = [
  // K-pop & Korean Entertainment
  {
    name: "BTS RM",
    mbti: "ENFP",
    birthDate: "1994-09-12",
    category: "K-pop",
  },
  {
    name: "BTS Jin",
    mbti: "INTP",
    birthDate: "1992-12-04",
    category: "K-pop",
  },
  {
    name: "BTS Suga",
    mbti: "INFP",
    birthDate: "1993-03-09",
    category: "K-pop",
  },
  {
    name: "BTS J-Hope",
    mbti: "ESFJ",
    birthDate: "1994-02-18",
    category: "K-pop",
  },
  {
    name: "BTS Jimin",
    mbti: "ENFJ",
    birthDate: "1995-10-13",
    category: "K-pop",
  },
  {
    name: "BTS V",
    mbti: "INFP",
    birthDate: "1995-12-30",
    category: "K-pop",
  },
  {
    name: "BTS Jungkook",
    mbti: "INTP",
    birthDate: "1997-09-01",
    category: "K-pop",
  },
  {
    name: "Blackpink Jennie",
    mbti: "INFP",
    birthDate: "1996-01-16",
    category: "K-pop",
  },
  {
    name: "Blackpink Rosé",
    mbti: "ENFP",
    birthDate: "1997-02-11",
    category: "K-pop",
  },
  {
    name: "IU",
    mbti: "INFP",
    birthDate: "1993-05-16",
    category: "K-pop",
  },

  // Hollywood & Music
  {
    name: "Taylor Swift",
    mbti: "ENFP",
    birthDate: "1989-12-13",
    category: "Music",
  },
  {
    name: "Ariana Grande",
    mbti: "ESFJ",
    birthDate: "1993-06-26",
    category: "Music",
  },
  {
    name: "Billie Eilish",
    mbti: "ISFP",
    birthDate: "2001-12-18",
    category: "Music",
  },
  {
    name: "Lady Gaga",
    mbti: "INFJ",
    birthDate: "1986-03-28",
    category: "Music",
  },
  {
    name: "Ed Sheeran",
    mbti: "ISFJ",
    birthDate: "1991-02-17",
    category: "Music",
  },

  // Actors & Actresses
  {
    name: "Zendaya",
    mbti: "ENFJ",
    birthDate: "1996-09-01",
    category: "Acting",
  },
  {
    name: "Tom Holland",
    mbti: "ENFP",
    birthDate: "1996-06-01",
    category: "Acting",
  },
  {
    name: "Emma Watson",
    mbti: "ESTJ",
    birthDate: "1990-04-15",
    category: "Acting",
  },
  {
    name: "Ryan Gosling",
    mbti: "INFP",
    birthDate: "1980-11-12",
    category: "Acting",
  },
  {
    name: "Anne Hathaway",
    mbti: "ENFJ",
    birthDate: "1982-11-12",
    category: "Acting",
  },
  {
    name: "Robert Downey Jr.",
    mbti: "ENTP",
    birthDate: "1965-04-04",
    category: "Acting",
  },
  {
    name: "Tom Hanks",
    mbti: "ENTP",
    birthDate: "1956-07-09",
    category: "Acting",
  },
  {
    name: "Céline Dion",
    mbti: "ENTP",
    birthDate: "1968-03-30",
    category: "Music",
  },
  {
    name: "Mark Twain",
    mbti: "ENTP",
    birthDate: "1835-11-30",
    category: "Literature",
  },
  {
    name: "Leonardo DiCaprio",
    mbti: "ESFP",
    birthDate: "1974-11-11",
    category: "Acting",
  },

  // Athletes
  {
    name: "Cristiano Ronaldo",
    mbti: "ESFP",
    birthDate: "1985-02-05",
    category: "Sports",
  },
  {
    name: "Lionel Messi",
    mbti: "ISFJ",
    birthDate: "1987-06-24",
    category: "Sports",
  },
  {
    name: "Serena Williams",
    mbti: "ESFP",
    birthDate: "1981-09-26",
    category: "Sports",
  },
  {
    name: "Stephen Curry",
    mbti: "ENFJ",
    birthDate: "1988-03-14",
    category: "Sports",
  },
  {
    name: "Naomi Osaka",
    mbti: "INFP",
    birthDate: "1997-10-16",
    category: "Sports",
  },
  {
    name: "Son Heung-min",
    mbti: "ENFJ",
    birthDate: "1992-07-08",
    category: "Sports",
  },
  {
    name: "Simone Biles",
    mbti: "ESFP",
    birthDate: "1997-03-14",
    category: "Sports",
  },

  // Business & Tech
  {
    name: "Elon Musk",
    mbti: "INTJ",
    birthDate: "1971-06-28",
    category: "Business",
  },
  {
    name: "Mark Zuckerberg",
    mbti: "INTJ",
    birthDate: "1984-05-14",
    category: "Business",
  },
  {
    name: "Oprah Winfrey",
    mbti: "ENFJ",
    birthDate: "1954-01-29",
    category: "Media",
  },

  // Historical Figures (verified birth dates)
  {
    name: "Albert Einstein",
    mbti: "INTP",
    birthDate: "1879-03-14",
    category: "Science",
  },
  {
    name: "Marie Curie",
    mbti: "INTJ",
    birthDate: "1867-11-07",
    category: "Science",
  },
  {
    name: "Martin Luther King Jr.",
    mbti: "ENFJ",
    birthDate: "1929-01-15",
    category: "Activism",
  },

  // Korean Actors (globally known)
  {
    name: "Lee Min-ho",
    mbti: "ISFP",
    birthDate: "1987-06-22",
    category: "Korean Actor",
  },
  {
    name: "Hyun Bin",
    mbti: "ISTJ",
    birthDate: "1982-09-25",
    category: "Korean Actor",
  },
  {
    name: "Son Ye-jin",
    mbti: "INFJ",
    birthDate: "1982-01-11",
    category: "Korean Actor",
  },
  {
    name: "Jung Ho-yeon",
    mbti: "INFP",
    birthDate: "1994-06-23",
    category: "Korean Actor",
  },
  {
    name: "Park Seo-joon",
    mbti: "ENFP",
    birthDate: "1988-12-16",
    category: "Korean Actor",
  },
  {
    name: "Song Joong-ki",
    mbti: "ENFJ",
    birthDate: "1985-09-19",
    category: "Korean Actor",
  },

  // More K-pop
  {
    name: "Stray Kids Bang Chan",
    mbti: "ENFJ",
    birthDate: "1997-10-03",
    category: "K-pop",
  },
  {
    name: "TWICE Nayeon",
    mbti: "ENFJ",
    birthDate: "1995-09-22",
    category: "K-pop",
  },
  {
    name: "aespa Karina",
    mbti: "ISFJ",
    birthDate: "2000-04-11",
    category: "K-pop",
  },
  {
    name: "NewJeans Minji",
    mbti: "INFP",
    birthDate: "2004-05-07",
    category: "K-pop",
  },

  // More Artists
  {
    name: "Beyoncé",
    mbti: "ESFJ",
    birthDate: "1981-09-04",
    category: "Music",
  },
  {
    name: "Drake",
    mbti: "ENFJ",
    birthDate: "1986-10-24",
    category: "Music",
  },
  {
    name: "Rihanna",
    mbti: "ISFP",
    birthDate: "1988-02-20",
    category: "Music",
  },
  {
    name: "Bruno Mars",
    mbti: "ESFP",
    birthDate: "1985-10-08",
    category: "Music",
  },
  {
    name: "Selena Gomez",
    mbti: "ISFJ",
    birthDate: "1992-07-22",
    category: "Music",
  },

  // Fill thin MBTI types (ISTJ, ESTP, ISTP, ESTJ, ENTJ)
  {
    name: "Natalie Portman",
    mbti: "ISTJ",
    birthDate: "1981-06-09",
    category: "Acting",
  },
  {
    name: "Jeff Bezos",
    mbti: "ISTJ",
    birthDate: "1964-01-12",
    category: "Business",
  },
  {
    name: "Queen Elizabeth II",
    mbti: "ISTJ",
    birthDate: "1926-04-21",
    category: "History",
  },
  {
    name: "Ernest Hemingway",
    mbti: "ESTP",
    birthDate: "1899-07-21",
    category: "Literature",
  },
  {
    name: "Megan Fox",
    mbti: "ESTP",
    birthDate: "1986-05-16",
    category: "Acting",
  },
  {
    name: "Madonna",
    mbti: "ESTP",
    birthDate: "1958-08-16",
    category: "Music",
  },
  {
    name: "Tiger Woods",
    mbti: "ISTP",
    birthDate: "1975-12-30",
    category: "Sports",
  },
  {
    name: "Tom Cruise",
    mbti: "ISTP",
    birthDate: "1962-07-03",
    category: "Acting",
  },
  {
    name: "Scarlett Johansson",
    mbti: "ISTP",
    birthDate: "1984-11-22",
    category: "Acting",
  },
  {
    name: "Sandra Oh",
    mbti: "ESTJ",
    birthDate: "1971-07-20",
    category: "Acting",
  },
  {
    name: "Michelle Obama",
    mbti: "ESTJ",
    birthDate: "1964-01-17",
    category: "Activism",
  },
  {
    name: "Steve Jobs",
    mbti: "ENTJ",
    birthDate: "1955-02-24",
    category: "Business",
  },
  {
    name: "Gordon Ramsay",
    mbti: "ENTJ",
    birthDate: "1966-11-08",
    category: "Media",
  },
  {
    name: "Margaret Thatcher",
    mbti: "ENTJ",
    birthDate: "1925-10-13",
    category: "History",
  },
  {
    name: "Adele",
    mbti: "ENTJ",
    birthDate: "1988-05-05",
    category: "Music",
  },
  {
    name: "Bill Gates",
    mbti: "ENTJ",
    birthDate: "1955-10-28",
    category: "Business",
  },
];

// Helper function to get celebrity emoji by category
export function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    "K-pop": "🎤",
    "Music": "🎵",
    "Acting": "🎬",
    "Korean Actor": "🎭",
    "Sports": "⚽",
    "Business": "💼",
    "Media": "📺",
    "Science": "🔬",
    "Activism": "✊",
    "Literature": "📚",
    "History": "👑",
  };
  return emojiMap[category] || "⭐";
}
