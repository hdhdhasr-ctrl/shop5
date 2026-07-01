export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  text: string;
  rating: number;
  avatarSeed: string;
}

export interface Ingredient {
  id: string;
  name: string;
  dosage: string;
  description: string;
  scientificBenefit: string;
  tag: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProblemCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TimelineStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
}
