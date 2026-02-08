// content/stem-interactions.ts
// How each birth stem interacts with each day stem (100 combinations)
// Format: "birthStem-dayStem": "interaction message"

export const STEM_INTERACTIONS: Record<string, string> = {
  // YANG WOOD (甲) PERSON - 10 interactions
  "甲-甲": "Your bold growth energy is doubled today. You're operating at full power — use this amplified momentum to launch something significant. This is your moment to move.",
  "甲-乙": "Your strong growth meets gentle flexibility today. You have both the power to push forward and the wisdom to adapt. Let force and finesse work together.",
  "甲-丙": "Your growth energy fuels today's passion perfectly. What you initiate can catch fire quickly — your ideas have extra spark, and the momentum is real.",
  "甲-丁": "Your bold energy provides fuel for today's refined warmth. Your efforts create a lasting glow, and what you build today carries real staying power.",
  "甲-戊": "You're breaking new ground today. Your innovation meets practical resistance, and pushing through it creates something real. The tension is productive.",
  "甲-己": "Your strong growth shapes today's nurturing energy. Use your drive to cultivate something meaningful — when ambition meets care, the results speak for themselves.",
  "甲-庚": "Today's sharp clarity cuts away your excess. This might feel restrictive, but it's pruning for better growth. Let go of what's not essential — you'll be lighter for it.",
  "甲-辛": "Today's refined precision trims your rougher edges. Accept the refinement gracefully — what's being polished away was holding you back all along.",
  "甲-壬": "Today's deep flow nourishes your roots. You'll feel supported and energized, and your instincts about where to grow are especially reliable now.",
  "甲-癸": "Today's gentle intuition feeds your strength. Subtle support arrives from unexpected places — trust the quiet guidance you're receiving.",

  // YIN WOOD (乙) PERSON - 10 interactions
  "乙-甲": "Today's bold energy amplifies your adaptability. Your flexibility meets strong momentum — you can bend without breaking and still make significant moves.",
  "乙-乙": "Your graceful resilience is at its peak. You understand exactly when to yield and when to persist. Trust your natural rhythm completely.",
  "乙-丙": "Your gentle growth fuels today's bright passion. Your subtle efforts create visible results — don't underestimate the impact you're making.",
  "乙-丁": "Your flexibility feeds today's refined warmth perfectly. You're creating something elegant and lasting — quality over force wins the day.",
  "乙-戊": "Your adaptability navigates today's solid structures with ease. You can find ways through obstacles others can't — flow around resistance rather than through it.",
  "乙-己": "Your soft growth shapes today's cultivation energy. Your gentle persistence creates real change, so keep nurturing what matters most.",
  "乙-庚": "Today's sharp clarity prunes your scattered energy. This cutting away serves you well — let precision refine your focus into something powerful.",
  "乙-辛": "Today's delicate refinement polishes your grace. You're being shaped into something more beautiful — embrace the process and trust where it leads.",
  "乙-壬": "Today's powerful flow nourishes your flexibility. You're supported in ways you can feel, and your adaptability draws from deep roots now.",
  "乙-癸": "Today's quiet intuition feeds your resilience. Gentle support strengthens you from within — trust what's growing beneath the surface.",

  // YANG FIRE (丙) PERSON - 10 interactions
  "丙-甲": "Today's bold growth fuels your passionate nature. You have extra energy to burn, and your enthusiasm finds fresh fuel at every turn.",
  "丙-乙": "Today's flexible growth supports your intensity. You're well-resourced for action, and your fire has sustainable fuel to carry you through.",
  "丙-丙": "Your radiant energy meets its match. You're burning at maximum brightness. This is your day to lead, perform, and shine without hesitation.",
  "丙-丁": "Your bold warmth meets a refined glow. You have both intensity and sustainability — balance your blaze with lasting heat for the best results.",
  "丙-戊": "Your passion creates something solid today. What excites you can become tangible — your energy builds real foundations that will last.",
  "丙-己": "Your intensity nurtures growth today. Your warmth cultivates real results, and what you care about flourishes under your attention.",
  "丙-庚": "You might clash with today's structured clarity. But your warmth can soften rigid thinking — lead with heart, not just rules, and you'll find the way through.",
  "丙-辛": "Your passion shapes today's refinement. You can melt through obstacles with charm, and your intensity creates surprisingly beautiful results.",
  "丙-壬": "Today's deep flow tempers your intensity. Use this as recovery time, not push time — recharging now sets you up for what's ahead.",
  "丙-癸": "Today's gentle intuition tempers your blaze. Listen to the quieter wisdom surfacing — your emotions are especially clear right now.",

  // YIN FIRE (丁) PERSON - 10 interactions
  "丁-甲": "Today's strong growth feeds your steady warmth. You have resources for a sustained glow, and your light has plenty of fuel to keep shining.",
  "丁-乙": "Today's flexible energy nourishes your refined fire. You're well-supported for subtle influence, and your warmth draws from deep roots.",
  "丁-丙": "Today's brilliant blaze amplifies your glow. You're brighter than usual — let yourself be seen, because your light carries further now.",
  "丁-丁": "Your warm refinement is perfectly aligned. You understand exactly how much heat is needed. Your subtle influence is at its strongest.",
  "丁-戊": "Your steady warmth builds solid foundations. What you care about becomes real, and your patient energy creates results that truly last.",
  "丁-己": "Your refined glow nurtures today's cultivation energy. You're creating something beautiful and enduring — quality made visible through quiet dedication.",
  "丁-庚": "Your warmth softens today's sharp edges. You can influence through charm rather than force — your gentle heat reshapes resistance into something workable.",
  "丁-辛": "Your subtle fire refines today's precision. You're creating something polished and elegant — beauty born from warmth and careful attention.",
  "丁-壬": "Today's powerful current cools your steady glow. Rest is genuinely productive today — let yourself be replenished and trust the stillness.",
  "丁-癸": "Today's quiet intuition balances your warmth. Your emotions and light work together beautifully — let inner clarity guide your outer glow.",

  // YANG EARTH (戊) PERSON - 10 interactions
  "戊-甲": "Today's bold growth challenges your stability. Stay grounded while remaining open to new directions — your strength is great enough to absorb innovation.",
  "戊-乙": "Today's flexible energy probes your foundations. Adapt without losing your center — your stability can handle gentle shifts and come out stronger.",
  "戊-丙": "Today's passionate energy supports your grounding. You can take bold ideas and make them real — your practical nature is well-fueled and ready to build.",
  "戊-丁": "Today's refined warmth nourishes your foundation. What you build now has lasting quality — patience and inspiration are working hand in hand.",
  "戊-戊": "Your powerful stability is doubled. You're unmovable and reliable at peak strength. This is your day for building foundations that last.",
  "戊-己": "Your solid foundation meets nurturing cultivation. You have both strength and care — balance structure with flexibility, and you'll find the sweet spot.",
  "戊-庚": "Your grounding creates clarity today. What you build has refined structure, and your practical work produces surprisingly elegant results.",
  "戊-辛": "Your stability gives birth to precision. You're creating something both solid and beautiful, where form and function meet perfectly.",
  "戊-壬": "You're channeling today's powerful flow with ease. Your strength creates healthy boundaries — you can hold space for others without being overwhelmed.",
  "戊-癸": "Your grounding contains today's swirling intuition. You give feelings productive structure — emotions become clear and actionable in your steady hands.",

  // YIN EARTH (己) PERSON - 10 interactions
  "己-甲": "Today's bold energy pushes against your cultivation. Stay receptive while holding your boundaries — growth doesn't require you to lose yourself in the process.",
  "己-乙": "Today's flexible growth interacts with your nurturing nature. You're both being shaped and shaping in return — dance with the change and see where it leads.",
  "己-丙": "Today's bright passion enriches your cultivation. You're well-resourced for nurturing, and your care creates results others can see and feel.",
  "己-丁": "Today's refined warmth feeds your nurturing nature. You're creating something gently beautiful — subtle care, patiently given, always produces quality.",
  "己-戊": "Today's powerful stability amplifies your cultivation. You have both strength and softness — nurture from this grounded place and watch things bloom.",
  "己-己": "Your nurturing energy is perfectly aligned. You understand exactly what needs care and attention. Trust your cultivation instincts completely.",
  "己-庚": "Your cultivation produces clarity today. What you've nurtured shows its refined form at last — patient care always reveals hidden quality.",
  "己-辛": "Your gentle support creates delicate precision. You're cultivating something beautifully detailed — softness and patience produce true elegance.",
  "己-壬": "Your nurturing contains today's deep flow. You create space for emotions without drowning in them — your supportive boundaries are a gift.",
  "己-癸": "Your cultivation shapes today's intuition. You're giving feelings productive form — gentle structure helps sensitivity flourish rather than scatter.",

  // YANG METAL (庚) PERSON - 10 interactions
  "庚-甲": "Your sharp clarity cuts through today's scattered growth energy. You can focus momentum where it matters most — your precision shapes new directions.",
  "庚-乙": "Your decisive nature trims today's flexibility into something useful. You're refining what's adaptable — clear, confident cuts always serve growth.",
  "庚-丙": "Today's intense energy tests your structure. Stay flexible within your clarity — let passion inform your decisions without melting your resolve.",
  "庚-丁": "Today's refined warmth softens your edges. You're being shaped into something more nuanced — embrace the refinement and see what emerges.",
  "庚-戊": "Today's solid foundation supports your clarity. You're exceptionally clear-headed and productive — structure and precision are working together beautifully.",
  "庚-己": "Today's nurturing energy sharpens your focus. You're being refined through care — patient support enhances your clarity in unexpected ways.",
  "庚-庚": "Your sharp precision is at maximum power. You see exactly what needs to be done and how. This is your day for decisive action and clear cuts.",
  "庚-辛": "Your bold clarity meets refined precision. You have both decisiveness and attention to detail — balance bold moves with delicate work for the best results.",
  "庚-壬": "Your clarity enriches today's deep flow. Logic and intuition meet beautifully — sharp thinking enhances your instincts rather than fighting them.",
  "庚-癸": "Your precision channels today's subtle wisdom. You're giving intuition a clear form it can work with — structure and sensitivity make a powerful pair.",

  // YIN METAL (辛) PERSON - 10 interactions
  "辛-甲": "Your delicate precision shapes today's bold growth. You're refining raw energy with elegant cuts — improving what's emerging without diminishing its power.",
  "辛-乙": "Your refined nature polishes today's flexibility. You're creating graceful adaptation — beauty through careful, intentional shaping.",
  "辛-丙": "Today's passionate heat reshapes your precision. You're being transformed — let the intensity refine you into something even more beautiful.",
  "辛-丁": "Today's gentle warmth softens your sharper edges. You're being improved through the process — warmth creates a deeper kind of elegance.",
  "辛-戊": "Today's strong foundation supports your refinement. You're exceptionally detail-oriented and polished — stability gives you the ground to pursue perfection.",
  "辛-己": "Today's cultivation energy births your precision. You're being carefully refined — patient nurturing produces exquisite, unhurried results.",
  "辛-庚": "Today's sharp clarity amplifies your refinement. You have both power and delicacy at your disposal — combine decisive action with detailed craft.",
  "辛-辛": "Your delicate precision is perfectly aligned. You understand exactly what subtle touches are needed. Your refined instincts are flawless today.",
  "辛-壬": "Your refinement gives shape to today's deep flow. You're channeling powerful intuition into something tangible — precision in service of wisdom.",
  "辛-癸": "Your delicate touch enriches today's gentle knowing. You're weaving elegance and insight together — what emerges is both beautiful and true.",

  // YANG WATER (壬) PERSON - 10 interactions
  "壬-甲": "Your powerful flow nourishes today's bold growth. You're supporting expansion beautifully — your depth feeds new directions and makes them possible.",
  "壬-乙": "Your deep current feeds today's flexibility. You're enabling graceful adaptation — your steady support helps resilience flourish.",
  "壬-丙": "Today's intense passion challenges your flow. You might feel out of sync with the loud energy around you. Your depth is your strength — don't try to match the heat.",
  "壬-丁": "Today's refined warmth tempers your intensity. Use your cooling wisdom when things overheat — your depth offers the perspective others need.",
  "壬-戊": "Today's strong foundation channels your flow. You're being given productive direction — the right boundaries help you move more powerfully, not less.",
  "壬-己": "Today's cultivation shapes your current. Gentle structure guides your depth — you're flowing within supportive banks that bring out your best.",
  "壬-庚": "Today's sharp clarity is enriched by your depth. Your intuition gains structure, and powerful instinct meets precise thinking in a rare alignment.",
  "壬-辛": "Today's refined precision channels your flow. You're giving depth an elegant form — intuition becomes beautifully, surprisingly actionable.",
  "壬-壬": "Your powerful intuition is at peak depth. You're reading currents others can't see — trust your instincts completely, because they're exceptionally strong now.",
  "壬-癸": "Your deep flow meets gentle reflection. You have both power and subtlety at work — balance strong currents with quiet knowing for the clearest path forward.",

  // YIN WATER (癸) PERSON - 10 interactions
  "癸-甲": "Your gentle intuition nourishes today's bold growth. Your quiet support enables real expansion — subtle wisdom feeds new directions from within.",
  "癸-乙": "Your reflective nature feeds today's flexibility. You're enabling graceful adaptation — quiet knowing supports resilience in ways that matter.",
  "癸-丙": "Today's passionate energy challenges your subtlety. You don't need to match the intensity — your quiet depth is powerful in its own right.",
  "癸-丁": "Today's refined warmth tests your reflective nature. Your sensitivity is being challenged — stay cool, stay observant, and trust your inner compass.",
  "癸-戊": "Today's solid foundation directs your intuition. You're being given productive structure — the right boundaries help your sensitivity focus rather than scatter.",
  "癸-己": "Today's nurturing energy contains your reflection. Gentle structure supports your intuition — you're flowing within caring limits that bring clarity.",
  "癸-庚": "Today's sharp clarity enriches your subtlety. Your quiet knowing gains precision — gentle wisdom becomes clear and actionable.",
  "癸-辛": "Today's delicate precision channels your reflection. You're giving intuition a refined form — subtle wisdom becomes elegant, crystalline insight.",
  "癸-壬": "Today's powerful current amplifies your reflection. You're deeper than usual — your quiet knowing has strong undercurrents that won't steer you wrong.",
  "癸-癸": "Your intuitive reflection is perfectly aligned. You understand subtle truths others miss — trust your gentle knowing completely, because it's flawless today."
};
