// Quiz data types
export interface QuizData {
  age?: string;
  gender?: string;
  skinTone?: number;
  skinType?: string;
  currentProducts: string[];
  hasAllergies?: boolean;
  allergies?: string[];
  preferences?: string[];
  goals?: string[];
  commitmentLevel?: string;
}

export interface FitzpatrickType {
  level: number;
  color: string;
  label: string;
  description: string;
}

export interface SkinTypeOption {
  value: string;
  label: string;
  description: string;
}

