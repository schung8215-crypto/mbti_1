# MBTI + Saju Daily Horoscope App - Project Handoff

## PROJECT OVERVIEW

A daily horoscope-style app that combines:
- **MBTI personality types** (16 types)
- **Korean Saju/Chinese Bazi** (60-day sexagenary cycle)

Users get personalized daily messages based on their MBTI type and birth date.

---

## CORE CONCEPT

**User provides:**
- MBTI type (e.g., ENFP)
- Birth date (year, month, day)

**App generates daily:**
- Personalized message combining:
  1. MBTI base personality insight
  2. Today's 60-day cycle energy (stem + branch)
  3. How user's birth element interacts with today's element
  4. Energy/luck ratings
  5. "Best for" and "Watch out for" activity suggestions

**Variation:** Each user sees 60 unique messages before repetition (60-day cycle)

---

## TECHNICAL REQUIREMENTS

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL) - free tier
- **Library:** `@aharris02/bazi-calculator-by-alvamind` for saju calculations
- **Deployment:** Vercel (free tier)

### Dependencies to Install
```bash
npm install @aharris02/bazi-calculator-by-alvamind date-fns date-fns-tz
npm install @supabase/supabase-js
```

---

## DATABASE SCHEMA

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mbti_type VARCHAR(4) NOT NULL, -- e.g., 'ENFP'
  birth_year INTEGER NOT NULL,
  birth_month INTEGER NOT NULL,
  birth_day INTEGER NOT NULL,
  birth_stem VARCHAR(10) NOT NULL, -- e.g., '丙' or 'Yang Fire'
  birth_branch VARCHAR(10) NOT NULL, -- e.g., '子' or 'Rat'
  birth_element VARCHAR(10) NOT NULL, -- 'Wood', 'Fire', 'Earth', 'Metal', 'Water'
  birth_yin_yang VARCHAR(4) NOT NULL, -- 'Yang' or 'Yin'
  timezone VARCHAR(50) DEFAULT 'UTC',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## FILE STRUCTURE

```
/my-mbti-saju-app
├── /src
│   ├── /app
│   │   ├── page.tsx              # Home/daily message page
│   │   ├── onboarding/page.tsx   # MBTI + birthdate collection
│   │   └── profile/page.tsx      # User profile
│   ├── /lib
│   │   ├── bazi.ts               # Bazi calculation functions
│   │   ├── message-generator.ts  # Message assembly logic
│   │   └── supabase.ts           # Supabase client
│   ├── /content
│   │   ├── mbti-templates.ts     # 16 MBTI base templates
│   │   ├── day-descriptions.ts   # 60 day cycle descriptions
│   │   ├── stem-interactions.ts  # 100 stem interaction messages
│   │   └── activity-tags.ts      # 7 relationship type tags
│   └── /components
│       ├── DailyCard.tsx         # Main daily message display
│       ├── OnboardingFlow.tsx    # MBTI + birthdate input
│       └── EnergyMeter.tsx       # Visual energy/luck display
├── package.json
└── README.md
```

---

## CORE LOGIC

### 1. User Onboarding
```typescript
// On signup, calculate and store user's birth pillar
import { BaziCalculator } from '@aharris02/bazi-calculator-by-alvamind';

function calculateUserBirthPillar(year, month, day, timezone = 'UTC') {
  const birthDate = new Date(`${year}-${month}-${day}T12:00:00`);
  const calculator = new BaziCalculator(birthDate, timezone, true);
  const pillars = calculator.calculatePillars();
  
  return {
    stem: pillars.day.stem.name,        // Chinese character
    branch: pillars.day.branch.name,    // Chinese character
    element: pillars.day.stem.element,  // 'Fire', 'Wood', etc.
    yinYang: pillars.day.stem.yinYang   // 'Yang' or 'Yin'
  };
}
```

### 2. Daily Message Generation
```typescript
function generateDailyMessage(userData, todayData) {
  // 1. Get MBTI base template
  const mbtiBase = MBTI_TEMPLATES[userData.mbtiType];
  
  // 2. Get today's 60-day description
  const todayKey = `${todayData.stem}-${todayData.branch}`;
  const todayDescription = DAY_DESCRIPTIONS[todayKey];
  
  // 3. Get stem interaction
  const interactionKey = `${userData.birthStem}-${todayData.stem}`;
  const interaction = STEM_INTERACTIONS[interactionKey];
  
  // 4. Get activity tags based on relationship type
  const relType = determineRelationshipType(userData, todayData);
  const activities = ACTIVITY_TAGS[relType];
  
  // 5. Assemble and return
  return {
    greeting: "Good morning! ✨",
    todayEnergy: todayDescription,
    mainMessage: `${mbtiBase} ${interaction}`,
    energyLevel: activities.energyLevel,
    luck: activities.luck,
    bestFor: activities.bestFor,
    watchOutFor: activities.watchOutFor
  };
}
```

### 3. Relationship Type Determination
```typescript
function determineRelationshipType(userElement, userYinYang, todayElement, todayYinYang) {
  // Same stem = harmony
  if (userElement === todayElement && userYinYang === todayYinYang) return "harmony";
  
  // Same element, different polarity = complementary
  if (userElement === todayElement) return "complementary";
  
  // Generating cycle: Wood→Fire→Earth→Metal→Water→Wood
  const generating = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
  if (generating[userElement] === todayElement) return "generating";
  if (generating[todayElement] === userElement) return "being_generated";
  
  // Controlling cycle: Wood→Earth, Earth→Water, Water→Fire, Fire→Metal, Metal→Wood
  const controlling = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };
  if (controlling[userElement] === todayElement) return "controlling";
  if (controlling[todayElement] === userElement) return "being_controlled";
  
  return "neutral";
}
```

---

## CONTENT FILES

### MBTI Templates (16 total)

See `mbti-templates.ts` - these are the base personality descriptions for each type.

Example:
```typescript
export const MBTI_TEMPLATES = {
  "ENFP": "Your natural enthusiasm and openness to possibility make you a catalyst for change. Today, your curiosity and people-focused energy",
  "INTJ": "Your strategic mind and preference for systems give you clarity others miss. Today, your analytical nature and long-term vision",
  // ... 14 more
};
```

### Day Descriptions (60 total)

See `day-descriptions.ts` - descriptions for each of the 60 stem-branch combinations.

Example:
```typescript
export const DAY_DESCRIPTIONS = {
  "甲-子": "Bold new beginnings with strategic timing",
  "甲-丑": "Steady growth through patient effort",
  // ... 58 more
};
```

### Stem Interactions (100 total)

See `stem-interactions.ts` - how each birth stem interacts with each day stem.

Example:
```typescript
export const STEM_INTERACTIONS = {
  "甲-甲": "Your bold growth energy is doubled today. You're operating at full power...",
  "甲-乙": "Your strong growth meets gentle flexibility today...",
  // ... 98 more
};
```

### Activity Tags (7 types)

See `activity-tags.ts` - practical guidance based on relationship type.

Example:
```typescript
export const ACTIVITY_TAGS = {
  "harmony": {
    energyLevel: 5,
    luck: 4,
    bestFor: ["Leading with confidence", "Major decisions in your area of strength"],
    watchOutFor: ["Overconfidence or excess", "Ignoring alternative perspectives"]
  },
  // ... 6 more types
};
```

---

## MVP FEATURES

### Phase 1 (Launch)
- ✅ User onboarding (MBTI + birthdate input)
- ✅ Daily personalized message generation
- ✅ Energy/luck visual display
- ✅ Clean, minimal UI
- ✅ Mobile responsive

### Phase 2 (Future)
- ⏳ Gunghap (compatibility checker with friends)
- ⏳ Message history/archive
- ⏳ Push notifications
- ⏳ User preferences customization

---

## UI/UX GUIDELINES

### Design Style
- **Minimal and clean**
- **Modern, not mystical** - this isn't zodiac astrology
- **Daily habit app aesthetic** (think Headspace or Calm, not Co-Star)
- **Professional but warm**

### Color Palette Suggestion
- Primary: Deep blues/purples (trust, wisdom)
- Accents: Soft golds or teals (energy)
- Background: Off-white or light gray
- Text: Dark gray (not pure black)

### Key UI Components

**Daily Card:**
```
┌─────────────────────────────┐
│  Good morning! ✨           │
│                             │
│  Thursday, Feb 6            │
│  Bold new beginnings        │
│  with strategic timing      │
│                             │
│  [Personal Message]         │
│  Your enthusiasm meets...   │
│                             │
│  Energy: ●●●●○              │
│  Luck: ●●●●○                │
│                             │
│  Best for:                  │
│  • Creative work            │
│  • Social connections       │
│                             │
│  Watch out for:             │
│  • Overcommitting           │
└─────────────────────────────┘
```

---

## IMPLEMENTATION STEPS

1. **Setup**
   - Create Next.js project
   - Install dependencies
   - Set up Supabase project and get credentials
   - Create `.env.local` with Supabase keys

2. **Database**
   - Create users table in Supabase
   - Set up Supabase client in `/lib/supabase.ts`

3. **Content Files**
   - Create all 4 content files with templates
   - Export as TypeScript objects

4. **Core Logic**
   - Implement bazi calculation wrapper (`/lib/bazi.ts`)
   - Implement message generator (`/lib/message-generator.ts`)

5. **UI Components**
   - Build onboarding flow
   - Build daily card component
   - Build energy/luck visual display

6. **Pages**
   - Onboarding page
   - Home page (daily message)
   - Profile page (optional for MVP)

7. **Testing**
   - Test with multiple MBTI types
   - Test with different birth dates
   - Verify 60-day cycle variation

8. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Connect Supabase

---

## IMPORTANT NOTES

1. **No user authentication for MVP** - just store user data in localStorage or a simple cookie for now. Add auth later if needed.

2. **Timezone handling** - For MVP, just use UTC or user's browser timezone.

3. **Content updates** - All content is hardcoded in TypeScript files. This is fine for MVP. Can move to CMS later.

4. **Mobile first** - Design for mobile, enhance for desktop.

5. **Performance** - Message generation is lightweight, no need for caching initially.

---

## HANDOFF CHECKLIST

When you start with Claude Code, provide:
- [ ] This entire document
- [ ] Request Next.js + Supabase setup
- [ ] Ask to implement in phases (setup → content → logic → UI)
- [ ] Test each phase before moving to next

---

## SAMPLE OPENING PROMPT FOR CLAUDE CODE

"I want to build a daily horoscope app combining MBTI and Korean Saju. I have the complete architecture and content system designed. Let's build this as a Next.js app with Supabase.

Start by:
1. Creating the Next.js project structure
2. Setting up Supabase connection
3. Creating the 4 content files with all templates

I'll provide the content in the next message. Let's work methodically through setup, content, logic, then UI."

---

Good luck! 🚀
