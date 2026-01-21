// Kategorien für KI-News
export type Category =
  | 'politik'
  | 'wissenschaft'
  | 'biologie'
  | 'medizin'
  | 'krieg'
  | 'china'
  | 'roboter'
  | 'allgemein';

export interface CategoryInfo {
  id: Category;
  name: string;
  emoji: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'politik', name: 'Politik', emoji: '🏛️', description: 'KI-Regulierung, Gesetze, EU AI Act' },
  { id: 'wissenschaft', name: 'Wissenschaft', emoji: '🔬', description: 'Forschung, Paper, Durchbrüche' },
  { id: 'biologie', name: 'Biologie', emoji: '🧬', description: 'KI in Genetik, Bioinformatik' },
  { id: 'medizin', name: 'Medizin', emoji: '🏥', description: 'Diagnostik, Medikamente, Healthcare' },
  { id: 'krieg', name: 'KI im Krieg', emoji: '⚔️', description: 'Militär-KI, Drohnen, Cyberwarfare' },
  { id: 'china', name: 'China', emoji: '🇨🇳', description: 'Chinesische KI-Entwicklung' },
  { id: 'roboter', name: 'Humanoide Roboter', emoji: '🤖', description: 'Boston Dynamics, Tesla Bot, etc.' },
  { id: 'allgemein', name: 'Allgemein', emoji: '📰', description: 'Generelle KI-News' },
];

// Artikel
export interface Article {
  id: string;
  edition_id: string;
  category: Category;
  headline: string;
  summary: string;
  content: string; // Ausführlicher Text (4-6 Sätze)
  key_points?: string[]; // Kernaussagen als Bullet-Points
  source_url: string;
  source_name: string;
  image_url?: string;
  is_top_story: boolean;
  created_at: string;
}

// Tägliche Ausgabe
export interface Edition {
  id: string;
  date: string;
  top_story_id: string;
  created_at: string;
  articles: Article[];
  concept?: ConceptOfTheDay;
  prompt?: PromptOfTheDay;
}

// KI-Konzept des Tages
export interface ConceptOfTheDay {
  id: string;
  edition_id: string;
  title: string;
  explanation: string;
  practical_examples: string[];
  created_at: string;
}

// Prompt des Tages
export interface PromptOfTheDay {
  id: string;
  edition_id: string;
  prompt_text: string;
  explanation: string;
  use_case: string;
  example_output: string;
  created_at: string;
}

// RSS-Quelle
export interface RssSource {
  id: string;
  name: string;
  url: string;
  category: Category;
  language: 'de' | 'en';
  active: boolean;
}
