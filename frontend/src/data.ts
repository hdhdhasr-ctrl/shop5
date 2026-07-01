import { FAQItem, Testimonial, Ingredient, Benefit, ProblemCard, TimelineStep } from "./types";

export const problemCards: ProblemCard[] = [
  {
    id: "declining-energy",
    title: "Declining Cellular Energy",
    description: "As cellular batteries run dry, daily tasks feel heavier and afternoon fatigue becomes the baseline.",
    iconName: "ZapOff",
  },
  {
    id: "brain-fog",
    title: "Persistent Brain Fog",
    description: "Difficulty focusing, slow recall, and lagging cognitive momentum that hinders daily performance.",
    iconName: "Activity",
  },
  {
    id: "slow-recovery",
    title: "Slower Physical Recovery",
    description: "Muscles ache longer, and sleep is less restorative after even moderate physical exertion.",
    iconName: "BatteryLow",
  },
  {
    id: "oxidative-stress",
    title: "Unchecked Oxidative Stress",
    description: "Free radicals damage DNA and structures from within, accelerating the biological age of your tissues.",
    iconName: "ShieldAlert",
  },
  {
    id: "reduced-vitality",
    title: "Diminished Spark",
    description: "A gradual loss of the drive, passion, and enthusiasm that once powered your active lifestyle.",
    iconName: "FlameKindling",
  }
];

export const ingredientList: Ingredient[] = [
  {
    id: "nad",
    name: "Liposomal NAD+",
    dosage: "500mg",
    description: "The primary cellular fuel direct-delivery format, bypassing digestion via double-lipid bilayer shells.",
    scientificBenefit: "Supports NAD+ levels critical for ATP synthesis, DNA repair, and sirtuin (longevity genes) activation.",
    tag: "Cellular Energy",
  },
  {
    id: "resveratrol",
    name: "Trans-Resveratrol",
    dosage: "600mg",
    description: "98% highly purified active Trans-Resveratrol, acting as the perfect biological partner to NAD+.",
    scientificBenefit: "Directly activates SIRT1 proteins, working synergistically with NAD+ to speed mitochondrial repair.",
    tag: "Sirtuin Activator",
  },
  {
    id: "glutathione",
    name: "Liposomal Glutathione",
    dosage: "100mg",
    description: "The master antioxidant in its most bioavailable state, shielding delicate cellular machinery.",
    scientificBenefit: "Protects mitochondria from oxidative damage and aids natural liver detoxification pathways.",
    tag: "Master Antioxidant",
  },
  {
    id: "turmeric",
    name: "Organic Turmeric Extract",
    dosage: "100mg",
    description: "Premium standardization containing high concentrations of curcuminoids for inflammation balance.",
    scientificBenefit: "Optimizes joint mobility and helps suppress cellular inflammatory signalling cascades.",
    tag: "Inflammatory Balance",
  }
];

export const benefitsList: Benefit[] = [
  {
    id: "boost-energy",
    title: "Boost Cellular Energy",
    description: "Ignite mitochondrial power plants directly to generate steady, non-stimulant clean energy.",
    iconName: "Zap",
  },
  {
    id: "mental-focus",
    title: "Improve Mental Focus",
    description: "Clear away cognitive fog and promote neural pathways for razor-sharp productivity.",
    iconName: "Compass",
  },
  {
    id: "healthy-aging",
    title: "Healthy Aging Support",
    description: "Replenish essential coenzymes that naturally drop by 50% between ages 20 and 50.",
    iconName: "Sparkles",
  },
  {
    id: "dna-repair",
    title: "DNA Repair Support",
    description: "Help critical cellular enzymes maintain genetic integrity and overall health.",
    iconName: "HeartPulse",
  },
  {
    id: "muscle-recovery",
    title: "Speed Muscle Recovery",
    description: "Promote muscular stamina, lactic acid clearance, and faster systemic rebound post-exercise.",
    iconName: "Dumbbell",
  },
  {
    id: "antioxidant",
    title: "Antioxidant Protection",
    description: "Shield cells from everyday cellular wear-and-tear and environmental toxins.",
    iconName: "ShieldCheck",
  },
  {
    id: "immune",
    title: "Optimal Immune Support",
    description: "Reinforce cellular resilience and natural defense systems for year-round vitality.",
    iconName: "Lock",
  },
  {
    id: "joint-health",
    title: "Comfortable Joint Mobility",
    description: "Soothe connective tissues and maintain robust active flexibility as you age.",
    iconName: "Activity",
  }
];

export const timelineSteps: TimelineStep[] = [
  {
    step: 1,
    title: "Take Capsules Daily",
    subtitle: "Just 2 softgels in the morning",
    description: "Take two Liposomal Complex capsules with a glass of water, ideally with your first meal.",
  },
  {
    step: 2,
    title: "Liposomal Absorption",
    subtitle: "Bypassing destructive stomach acid",
    description: "Phospholipid bilayers protect nutrients, yielding up to 10x higher absorption into the bloodstream.",
  },
  {
    step: 3,
    title: "Cellular Energy Production",
    subtitle: "Fueling the mitochondria",
    description: "Cells convert NAD+ directly into ATP (the primary currency of human energy and biological action).",
  },
  {
    step: 4,
    title: "More Energy, Focus & Resilience",
    subtitle: "Experience the youthful difference",
    description: "Sustained daily focus, reduced fatigue, faster recovery times, and proactive cellular defense.",
  }
];

export const statsList = [
  { value: "97%", label: "Feel More Daily Energy", desc: "Reported sustained vitality without coffee jitters" },
  { value: "94%", label: "Improved Mental Focus", desc: "Felt significant reduction in daytime brain fog" },
  { value: "91%", label: "Would Recommend/Buy Again", desc: "Confirmed long-term satisfaction under regular use" },
  { value: "4.9★", label: "Average Rating", desc: "Verified customer score across over 1,500 active orders" }
];

export const testimonialsList: Testimonial[] = [
  {
    id: "t1",
    name: "Michael",
    age: 42,
    text: "I finally have sustainable, clean energy throughout the entire day. No afternoon slumps or brain fog. Feels like someone turned the lights back on in my brain.",
    rating: 5,
    avatarSeed: "Michael",
  },
  {
    id: "t2",
    name: "Sarah",
    age: 38,
    text: "My focus improved dramatically within the first week. I run a full-time business and have two kids; this is my secret weapon for staying sharp.",
    rating: 5,
    avatarSeed: "Sarah",
  },
  {
    id: "t3",
    name: "David",
    age: 51,
    text: "I recover much faster after physical workouts. I used to be sore for days, but now my body bounces back quickly. Truly premium supplement.",
    rating: 5,
    avatarSeed: "David",
  },
  {
    id: "t4",
    name: "Emily",
    age: 46,
    text: "I simply feel younger. My skin looks healthier, my joints feel lubricated, and my stamina is back to what it was in my early thirties. Highly absorbable!",
    rating: 5,
    avatarSeed: "Emily",
  }
];

export const faqsList: FAQItem[] = [
  {
    id: "q1",
    question: "What is NAD+ and why is it important?",
    answer: "NAD+ (Nicotinamide Adenine Dinucleotide) is an essential coenzyme found in every living cell. It plays a critical role in cellular metabolism, converting nutrients into ATP (cellular energy), activating sirtuins (longevity genes), and driving DNA repair. Our bodies' natural NAD+ levels decline dramatically as we age—dropping by up to 50% between ages 20 and 50."
  },
  {
    id: "q2",
    question: "Why choose Liposomal delivery over traditional capsules?",
    answer: "Standard supplements suffer from heavy digestive degradation. Stomach acid and digestive enzymes destroy fragile molecules, leaving as little as 10% bioavailable. Liposomal delivery wraps NAD+ and Resveratrol in a protective outer layer of microscopic lipid spheres (liposomes). These liposomes bypass stomach acid unscathed and merge directly with cell membranes for up to 10X higher absorption."
  },
  {
    id: "q3",
    question: "How and when should I take it?",
    answer: "We recommend taking 2 capsules daily, preferably with your first meal in the morning. This aligns with your body's natural circadian rhythms of NAD+ production and cellular activity. Staying consistent daily is key to allowing active ingredients to saturate cellular reserves."
  },
  {
    id: "q4",
    question: "How long before I see results?",
    answer: "While many customers report feeling increased mental clarity and energy within the first 1-2 weeks, cellular restoration is an ongoing process. The deep structural biological benefits (such as DNA repair support, cellular defense, and cardiovascular optimization) typically manifest with continuous daily use over 30 to 90 days."
  },
  {
    id: "q5",
    question: "Is this supplement safe and third-party tested?",
    answer: "Absolutely. Our Liposomal Complex is manufactured in an FDA-registered, cGMP-certified facility in the USA. We test every single batch for heavy metals, microbial purity, and active dosage concentration. It contains zero artificial fillers, is Non-GMO, gluten-free, dairy-free, and soy-free."
  },
  {
    id: "q6",
    question: "Can both men and women take this supplement?",
    answer: "Yes. Cellular aging and NAD+ decline affect everyone universally. This advanced complex is designed to restore natural cellular coenzymes for both men and women who want to support clean energy, cognitive acuity, healthy aging, and physical recovery."
  }
];
