export type ArtStyle = "minimalism" | "journey" | "museum" | "reflection" | "theater";

export interface ProfessorCritique {
  grade: string;
  formalCritique: string;
  emotionalResonance: string;
  creativeSuggestion: string;
  materialsInsight: string;
}

export interface ArtPiece {
  id: string;
  title: string;
  style: ArtStyle;
  medium: string;
  imageUrl: string;
  reflection: string;
  emotion: string;
  date: string;
  professorCritique?: ProfessorCritique;
  isVideo?: boolean;
  videoUrl?: string;
  description?: string;
  analysis?: string;
  interpretation?: string;
  evaluation?: string;
  cultureStudy?: string;
  externalLink?: string;
}

export interface StyleSection {
  id: ArtStyle;
  name: string;
  tagline: string;
  description: string;
  materialsUsed: string[];
  keyCharacteristics: string[];
  themeColor: {
    primary: string;
    text: string;
    accent: string;
    lightBg: string;
    border: string;
    accentBg: string;
  };
  learningObjectives: string;
}

export interface EmotionPaletteResult {
  recommendedStyle: string;
  styleDescription: string;
  materials: string;
  brushwork: string;
  colors: {
    hex: string;
    name: string;
    meaning: string;
  }[];
  conceptualPrompt: string;
}
