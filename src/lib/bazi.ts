import { BaziCalculator } from "@aharris02/bazi-calculator-by-alvamind";

export interface Pillar {
  stem: string;
  branch: string;
  element: string;
  yinYang: string;
}

// Fallback data for when calculation fails
const FALLBACK_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const FALLBACK_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const STEM_ELEMENTS: Record<string, { element: string; yinYang: string }> = {
  "甲": { element: "Wood", yinYang: "Yang" },
  "乙": { element: "Wood", yinYang: "Yin" },
  "丙": { element: "Fire", yinYang: "Yang" },
  "丁": { element: "Fire", yinYang: "Yin" },
  "戊": { element: "Earth", yinYang: "Yang" },
  "己": { element: "Earth", yinYang: "Yin" },
  "庚": { element: "Metal", yinYang: "Yang" },
  "辛": { element: "Metal", yinYang: "Yin" },
  "壬": { element: "Water", yinYang: "Yang" },
  "癸": { element: "Water", yinYang: "Yin" },
};

/**
 * Calculate the day pillar using the traditional sexagenary cycle algorithm
 * This is a fallback when the library fails
 */
function calculateDayPillarFallback(year: number, month: number, day: number): Pillar {
  // Julian Day Number calculation for sexagenary cycle
  // The cycle repeats every 60 days
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // Calculate stem and branch indices
  // Day stem cycles every 10 days, branch cycles every 12 days
  // Using a known reference point: Jan 1, 2000 was 甲子 (stem index 0, branch index 0)
  const referenceJdn = 2451545; // Jan 1, 2000
  const daysSinceReference = jdn - referenceJdn;

  const stemIndex = ((daysSinceReference % 10) + 10) % 10;
  const branchIndex = ((daysSinceReference % 12) + 12) % 12;

  const stem = FALLBACK_STEMS[stemIndex];
  const branch = FALLBACK_BRANCHES[branchIndex];
  const stemInfo = STEM_ELEMENTS[stem];

  return {
    stem,
    branch,
    element: stemInfo.element,
    yinYang: stemInfo.yinYang,
  };
}

/**
 * Validate date inputs
 */
function isValidDate(year: number, month: number, day: number): boolean {
  if (!year || !month || !day) return false;
  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Check if the date is actually valid
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day;
}

// Zodiac animals in order, indexed by (year - 4) % 12
const ZODIAC_ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];

/**
 * Simple year-based zodiac animal lookup (does not account for Chinese New Year cutoff).
 * Used as a fallback when the library is unavailable.
 */
function getZodiacAnimalByYear(year: number): string {
  return ZODIAC_ANIMALS[((year - 4) % 12 + 12) % 12];
}

export function calculateUserBirthPillar(
  year: number,
  month: number,
  day: number,
  timezone: string = "UTC"
): { birthStem: string; birthBranch: string; birthElement: string; birthYinYang: string; birthAnimal: string; yearStem: string; yearBranch: string } {
  console.log(`[Bazi] Calculating birth pillar for: ${year}-${month}-${day}, timezone: ${timezone}`);

  // Validate inputs
  if (!isValidDate(year, month, day)) {
    console.error(`[Bazi] Invalid date: ${year}-${month}-${day}`);
    const fallback = calculateDayPillarFallback(year || 2000, month || 1, day || 1);
    return {
      birthStem: fallback.stem,
      birthBranch: fallback.branch,
      birthElement: fallback.element,
      birthYinYang: fallback.yinYang,
      birthAnimal: getZodiacAnimalByYear(year || 2000),
      yearStem: "",
      yearBranch: "",
    };
  }

  try {
    // Try multiple date formats
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T12:00:00`;
    console.log(`[Bazi] Date string: ${dateStr}`);

    const birthDate = new Date(dateStr);
    console.log(`[Bazi] Parsed date: ${birthDate.toISOString()}`);

    // Verify the date parsed correctly
    if (isNaN(birthDate.getTime())) {
      throw new Error("Invalid date parsing result");
    }

    const calculator = new BaziCalculator(birthDate, "male", timezone, true);
    const pillars = calculator.calculatePillars();

    console.log(`[Bazi] Pillars result:`, JSON.stringify(pillars, null, 2));

    // Check if pillars and day exist
    if (!pillars) {
      throw new Error("calculatePillars returned null or undefined");
    }

    if (!pillars.day) {
      throw new Error("pillars.day is null or undefined");
    }

    if (!pillars.day.chinese) {
      throw new Error("pillars.day.chinese is null or undefined");
    }

    // The public Pillar type has: chinese (e.g. "甲子"), element, animal, branch.element
    // Extract stem (first char) and branch (second char) from the chinese string
    const dayStem = pillars.day.chinese[0];
    const dayBranch = pillars.day.chinese[1];
    const stemInfo = STEM_ELEMENTS[dayStem];

    // Year pillar animal is the zodiac animal people commonly know
    const yearAnimal = pillars.year?.animal || getZodiacAnimalByYear(year);
    const yearStem = pillars.year?.chinese?.[0] || "";
    const yearBranch = pillars.year?.chinese?.[1] || "";

    return {
      birthStem: dayStem,
      birthBranch: dayBranch,
      birthElement: stemInfo?.element || pillars.day.element || "Earth",
      birthYinYang: stemInfo?.yinYang || "Yang",
      birthAnimal: yearAnimal,
      yearStem,
      yearBranch,
    };
  } catch (error) {
    console.error(`[Bazi] Error calculating birth pillar:`, error);
    console.log(`[Bazi] Using fallback calculation`);

    // Use fallback calculation
    const fallback = calculateDayPillarFallback(year, month, day);
    return {
      birthStem: fallback.stem,
      birthBranch: fallback.branch,
      birthElement: fallback.element,
      birthYinYang: fallback.yinYang,
      birthAnimal: getZodiacAnimalByYear(year),
      yearStem: "",
      yearBranch: "",
    };
  }
}

/**
 * Fast day pillar calculation for any date using pure math.
 * Used by the calendar to compute pillars for an entire month efficiently.
 */
export function getDayPillar(year: number, month: number, day: number): Pillar {
  return calculateDayPillarFallback(year, month, day);
}

export function getTodayPillar(timezone: string = "UTC"): Pillar {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  console.log(`[Bazi] Getting today's pillar for: ${year}-${month}-${day}`);

  try {
    const calculator = new BaziCalculator(today, "male", timezone, true);
    const pillars = calculator.calculatePillars();

    console.log(`[Bazi] Today's pillars:`, JSON.stringify(pillars, null, 2));

    if (!pillars || !pillars.day || !pillars.day.chinese) {
      throw new Error("Invalid pillars structure");
    }

    const todayStem = pillars.day.chinese[0];
    const todayBranch = pillars.day.chinese[1];
    const todayStemInfo = STEM_ELEMENTS[todayStem];

    return {
      stem: todayStem,
      branch: todayBranch,
      element: todayStemInfo?.element || pillars.day.element || "Earth",
      yinYang: todayStemInfo?.yinYang || "Yang",
    };
  } catch (error) {
    console.error(`[Bazi] Error getting today's pillar:`, error);
    console.log(`[Bazi] Using fallback calculation`);

    return calculateDayPillarFallback(year, month, day);
  }
}
