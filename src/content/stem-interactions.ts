// content/stem-interactions.ts
// How each birth stem interacts with each day stem (100 combinations)
// Format: "birthStem-dayStem": "interaction message"

export const STEM_INTERACTIONS: Record<string, string> = {
  // YANG WOOD (甲) PERSON - 10 interactions
  "甲-甲": "Your bold growth energy is doubled today. You're operating at full power - use this amplified momentum to launch something significant. Don't hold back.",
  "甲-乙": "Your strong growth meets gentle flexibility today. You have both the power to push forward and the wisdom to adapt. Balance force with finesse.",
  "甲-丙": "Your growth energy fuels today's passion perfectly (Wood feeds Fire). What you initiate can catch fire quickly. Your ideas have extra spark right now.",
  "甲-丁": "Your bold energy provides fuel for today's refined warmth (Wood feeds Fire). Your efforts create lasting glow. What you build today has staying power.",
  "甲-戊": "You're breaking new ground today, literally (Wood challenges Earth). Your innovation meets practical application. Push through resistance to create something real.",
  "甲-己": "Your strong growth shapes today's nurturing energy (Wood challenges Earth). Use your drive to cultivate something meaningful. Force meets care productively.",
  "甲-庚": "Today's sharp clarity cuts away your excess (Metal controls Wood). This might feel restrictive, but it's pruning for better growth. Let go of what's not essential.",
  "甲-辛": "Today's refined precision trims your rougher edges (Metal controls Wood). Accept refinement gracefully. What's being polished away was holding you back.",
  "甲-壬": "Today's deep flow nourishes your roots (Water generates Wood). You'll feel supported and energized. Your instincts about growth are especially reliable now.",
  "甲-癸": "Today's gentle intuition feeds your strength (Water generates Wood). Subtle support comes from unexpected places. Trust quiet guidance.",
  
  // YIN WOOD (乙) PERSON - 10 interactions
  "乙-甲": "Today's bold energy amplifies your adaptability. Your flexibility meets strong momentum. You can bend without breaking and still make significant moves.",
  "乙-乙": "Your graceful resilience is at its peak. You understand exactly when to yield and when to persist. Trust your natural rhythm completely.",
  "乙-丙": "Your gentle growth fuels today's bright passion (Wood feeds Fire). Your subtle efforts create visible results. Don't underestimate your impact.",
  "乙-丁": "Your flexibility feeds today's refined warmth perfectly (Wood feeds Fire). You're creating something elegant and lasting. Quality over force.",
  "乙-戊": "Your adaptability navigates today's solid structures (Wood challenges Earth). You can find ways through obstacles others can't. Flow around resistance.",
  "乙-己": "Your soft growth shapes today's cultivation energy (Wood challenges Earth). Your gentle persistence creates real change. Keep nurturing what matters.",
  "乙-庚": "Today's sharp clarity prunes your scattered energy (Metal controls Wood). This cutting away serves you. Let precision refine your focus.",
  "乙-辛": "Today's delicate refinement polishes your grace (Metal controls Wood). You're being shaped into something more beautiful. Embrace the process.",
  "乙-壬": "Today's powerful flow nourishes your flexibility (Water generates Wood). You're supported in ways you can feel. Your adaptability has deep roots now.",
  "乙-癸": "Today's quiet intuition feeds your resilience (Water generates Wood). Gentle support strengthens you. Trust what's growing beneath the surface.",
  
  // YANG FIRE (丙) PERSON - 10 interactions
  "丙-甲": "Today's bold growth fuels your passionate nature (Wood generates Fire). You have extra energy to burn. Your enthusiasm finds fresh fuel.",
  "丙-乙": "Today's flexible growth supports your intensity (Wood generates Fire). You're well-resourced for action. Your fire has sustainable fuel.",
  "丙-丙": "Your radiant energy meets its match. You're burning at maximum brightness. This is your day to lead, perform, and shine without hesitation.",
  "丙-丁": "Your bold warmth meets refined glow. You have both intensity and sustainability. Balance your blaze with lasting heat.",
  "丙-戊": "Your passion creates something solid today (Fire generates Earth). What excites you can become tangible. Your energy builds real foundations.",
  "丙-己": "Your intensity nurtures growth today (Fire generates Earth). Your warmth cultivates results. What you care about flourishes under your attention.",
  "丙-庚": "You might clash with today's structured clarity (Fire controls Metal). Your warmth can soften rigid thinking. Lead with heart, not just rules.",
  "丙-辛": "Your passion shapes today's refinement (Fire controls Metal). You can melt through obstacles with charm. Your intensity creates beautiful results.",
  "丙-壬": "Today's deep flow cools your intensity (Water controls Fire). Use this as recovery time, not push time. Recharge your batteries.",
  "丙-癸": "Today's gentle intuition tempers your blaze (Water controls Fire). Listen to quieter wisdom. Your emotions are especially clear now.",
  
  // YIN FIRE (丁) PERSON - 10 interactions
  "丁-甲": "Today's strong growth feeds your steady warmth (Wood generates Fire). You have resources for sustained glow. Your light has plenty of fuel.",
  "丁-乙": "Today's flexible energy nourishes your refined fire (Wood generates Fire). You're well-supported for subtle influence. Your warmth has deep roots.",
  "丁-丙": "Today's brilliant blaze amplifies your glow. You're brighter than usual. Let yourself be seen - your light carries further now.",
  "丁-丁": "Your warm refinement is perfectly aligned. You understand exactly how much heat is needed. Your subtle influence is at its strongest.",
  "丁-戊": "Your steady warmth builds solid foundations (Fire generates Earth). What you care about becomes real. Your patient energy creates lasting results.",
  "丁-己": "Your refined glow nurtures today's cultivation energy (Fire generates Earth). You're creating something beautiful and enduring. Quality manifests.",
  "丁-庚": "Your warmth softens today's sharp edges (Fire controls Metal). You can influence through charm. Your gentle heat reshapes resistance.",
  "丁-辛": "Your subtle fire refines today's precision (Fire controls Metal). You're creating something polished and elegant. Beauty through warmth.",
  "丁-壬": "Today's powerful current cools your steady glow (Water controls Fire). Rest is productive today. Let yourself be replenished.",
  "丁-癸": "Today's quiet intuition balances your warmth (Water controls Fire). Your emotions and light work together beautifully. Inner clarity guides outer glow.",
  
  // YANG EARTH (戊) PERSON - 10 interactions
  "戊-甲": "Today's bold growth challenges your stability (Wood controls Earth). Stay grounded while remaining open to new directions. Your strength can absorb innovation.",
  "戊-乙": "Today's flexible energy probes your foundations (Wood controls Earth). Adapt without losing your center. Your stability can handle gentle shifts.",
  "戊-丙": "Today's passionate energy supports your grounding (Fire generates Earth). You can take bold ideas and make them real. Your practical nature is well-fueled.",
  "戊-丁": "Today's refined warmth nourishes your foundation (Fire generates Earth). What you build now has lasting quality. Patience meets inspiration.",
  "戊-戊": "Your powerful stability is doubled. You're unmovable and reliable at peak strength. This is your day for building foundations that last.",
  "戊-己": "Your solid foundation meets nurturing cultivation. You have both strength and care. Balance structure with flexibility.",
  "戊-庚": "Your grounding creates clarity today (Earth generates Metal). What you build has refined structure. Your practical work produces elegant results.",
  "戊-辛": "Your stability gives birth to precision (Earth generates Metal). You're creating something both solid and beautiful. Form meets function perfectly.",
  "戊-壬": "You're channeling today's powerful flow (Earth controls Water). Your strength creates healthy boundaries. You can hold space without being overwhelmed.",
  "戊-癸": "Your grounding contains today's intuition (Earth controls Water). You give feelings productive structure. Emotions become actionable.",
  
  // YIN EARTH (己) PERSON - 10 interactions
  "己-甲": "Today's bold energy pushes against your cultivation (Wood controls Earth). Stay receptive while maintaining boundaries. Growth doesn't require you to lose yourself.",
  "己-乙": "Today's flexible growth interacts with your nurturing (Wood controls Earth). You're both being shaped and shaping. Dance with change.",
  "己-丙": "Today's bright passion enriches your cultivation (Fire generates Earth). You're well-resourced for nurturing. Your care creates visible results.",
  "己-丁": "Today's refined warmth feeds your nurturing nature (Fire generates Earth). You're creating something gently beautiful. Subtle care produces quality.",
  "己-戊": "Today's powerful stability amplifies your cultivation. You have both strength and softness. Nurture from a position of groundedness.",
  "己-己": "Your nurturing energy is perfectly aligned. You understand exactly what needs care and attention. Trust your cultivation instincts completely.",
  "己-庚": "Your cultivation produces clarity today (Earth generates Metal). What you've nurtured shows its refined form. Patient care reveals quality.",
  "己-辛": "Your gentle support creates delicate precision (Earth generates Metal). You're cultivating something beautifully detailed. Softness produces elegance.",
  "己-壬": "Your nurturing contains today's deep flow (Earth controls Water). You create space for emotions without drowning. Supportive boundaries.",
  "己-癸": "Your cultivation shapes today's intuition (Earth controls Water). You're giving feelings productive form. Gentle structure helps sensitivity flourish.",
  
  // YANG METAL (庚) PERSON - 10 interactions
  "庚-甲": "Your sharp clarity cuts through today's growth energy (Metal controls Wood). You can focus scattered momentum. Your precision shapes new directions.",
  "庚-乙": "Your decisive nature trims today's flexibility (Metal controls Wood). You're refining what's adaptable. Clear cuts serve growth.",
  "庚-丙": "Today's intense energy tests your structure (Fire controls Metal). Stay flexible within your clarity. Let passion inform without melting your resolve.",
  "庚-丁": "Today's refined warmth softens your edges (Fire controls Metal). You're being shaped into something more nuanced. Embrace the refinement.",
  "庚-戊": "Today's solid foundation supports your clarity (Earth generates Metal). You're exceptionally clear-headed and productive. Structure enables precision.",
  "庚-己": "Today's nurturing energy sharpens your focus (Earth generates Metal). You're being refined through care. Patient support enhances your clarity.",
  "庚-庚": "Your sharp precision is at maximum power. You see exactly what needs to be done and how. This is your day for decisive action and clear cuts.",
  "庚-辛": "Your bold clarity meets refined precision. You have both decisiveness and detail. Balance power cuts with delicate work.",
  "庚-壬": "Your clarity enriches today's deep flow (Metal generates Water). Your logic meets intuition beautifully. Sharp thinking enhances instinct.",
  "庚-癸": "Your precision channels today's subtle wisdom (Metal generates Water). You're giving intuition clear form. Structure serves sensitivity.",
  
  // YIN METAL (辛) PERSON - 10 interactions
  "辛-甲": "Your delicate precision shapes today's bold growth (Metal controls Wood). You're refining raw energy. Elegant cuts improve what's emerging.",
  "辛-乙": "Your refined nature polishes today's flexibility (Metal controls Wood). You're creating graceful adaptation. Beauty through careful shaping.",
  "辛-丙": "Today's passionate heat reshapes your precision (Fire controls Metal). You're being transformed. Let intensity refine you into something more beautiful.",
  "辛-丁": "Today's gentle warmth melts your edges (Fire controls Metal). You're being softened and improved. Warmth creates elegance.",
  "辛-戊": "Today's strong foundation supports your refinement (Earth generates Metal). You're exceptionally detail-oriented and polished. Stability enables perfection.",
  "辛-己": "Today's cultivation energy births your precision (Earth generates Metal). You're being carefully refined. Patient nurturing produces exquisite results.",
  "辛-庚": "Today's sharp clarity amplifies your refinement. You have both power and delicacy. Combine decisive action with detailed craft.",
  "辛-辛": "Your delicate precision is perfectly aligned. You understand exactly what subtle touches are needed. Your refined instincts are flawless today.",
  "辛-壬": "Your refinement gives shape to today's deep flow (Metal generates Water). You're channeling powerful intuition. Precision serves wisdom.",
  "辛-癸": "Your delicate touch enriches today's gentle knowing (Metal generates Water). You're creating beautiful intuition. Elegance meets insight.",
  
  // YANG WATER (壬) PERSON - 10 interactions
  "壬-甲": "Your powerful flow nourishes today's bold growth (Water generates Wood). You're supporting expansion beautifully. Your depth feeds new directions.",
  "壬-乙": "Your deep current feeds today's flexibility (Water generates Wood). You're enabling graceful adaptation. Your support helps resilience flourish.",
  "壬-丙": "Today's intense passion challenges your flow (Fire controls Water). You might feel out of sync with loud energy. Your depth is your strength - don't try to match the heat.",
  "壬-丁": "Today's refined warmth evaporates your intensity (Fire controls Water). Use cooling wisdom when things overheat. Your depth offers perspective.",
  "壬-戊": "Today's strong foundation channels your flow (Earth controls Water). You're being given productive direction. Boundaries help you move powerfully.",
  "壬-己": "Today's cultivation shapes your current (Earth controls Water). Gentle structure guides your depth. You're flowing within supportive banks.",
  "壬-庚": "Today's sharp clarity is enriched by your depth (Metal generates Water). Your intuition gains structure. Powerful instinct meets precise thinking.",
  "壬-辛": "Today's refined precision channels your flow (Metal generates Water). You're giving depth elegant form. Intuition becomes beautifully actionable.",
  "壬-壬": "Your powerful intuition is at peak depth. You're reading currents others can't see. Trust your instincts completely - they're exceptionally strong now.",
  "壬-癸": "Your deep flow meets gentle reflection. You have both power and subtlety. Balance strong currents with quiet knowing.",
  
  // YIN WATER (癸) PERSON - 10 interactions
  "癸-甲": "Your gentle intuition nourishes today's bold growth (Water generates Wood). Your quiet support enables expansion. Subtle wisdom feeds new directions.",
  "癸-乙": "Your reflective nature feeds today's flexibility (Water generates Wood). You're enabling graceful adaptation. Quiet knowing supports resilience.",
  "癸-丙": "Today's passionate energy boils away your subtlety (Fire controls Water). You don't need to match the intensity. Your quiet depth is powerful.",
  "癸-丁": "Today's refined warmth evaporates your reflection (Fire controls Water). Your sensitivity is being tested. Stay cool and observant.",
  "癸-戊": "Today's solid foundation directs your intuition (Earth controls Water). You're being given productive structure. Boundaries help your sensitivity focus.",
  "癸-己": "Today's nurturing contains your reflection (Earth controls Water). Gentle structure supports your intuition. You're flowing within caring limits.",
  "癸-庚": "Today's sharp clarity enriches your subtlety (Metal generates Water). Your quiet knowing gains precision. Gentle wisdom becomes actionable.",
  "癸-辛": "Today's delicate precision channels your reflection (Metal generates Water). You're giving intuition refined form. Subtle wisdom becomes elegant insight.",
  "癸-壬": "Today's powerful current amplifies your reflection. You're deeper than usual. Your quiet knowing has strong undercurrents now.",
  "癸-癸": "Your intuitive reflection is perfectly aligned. You understand subtle truths others miss. Trust your gentle knowing completely - it's flawless today."
};
