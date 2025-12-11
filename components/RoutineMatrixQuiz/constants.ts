import { FitzpatrickType, SkinTypeOption } from './types';

// Fitzpatrick scale data
export const fitzpatrickScale: FitzpatrickType[] = [
  { level: 1, color: '#f7ead2', label: 'Type I', description: 'Pale white, always burns, never tans' },
  { level: 2, color: '#f3d6bf', label: 'Type II', description: 'White, usually burns, tans minimally' },
  { level: 3, color: '#d6bc9f', label: 'Type III', description: 'Beige, sometimes mild burn, gradually tans' },
  { level: 4, color: '#c29a73', label: 'Type IV', description: 'Moderate brown, rarely burns, tans easily' },
  { level: 5, color: '#8b6f47', label: 'Type V', description: 'Dark brown, very rarely burns, tans very easily' },
  { level: 6, color: '#4a3728', label: 'Type VI', description: 'Deeply pigmented dark brown to black, never burns' },
];

export const skinTypes: SkinTypeOption[] = [
  { value: 'normal', label: 'Normal', description: 'Balanced, not too oily or dry' },
  { value: 'dry', label: 'Dry', description: 'Feels tight, may flake' },
  { value: 'oily', label: 'Oily', description: 'Shiny, prone to breakouts' },
  { value: 'combination', label: 'Combination', description: 'Oily T-zone, dry elsewhere' },
  { value: 'sensitive', label: 'Sensitive', description: 'Easily irritated, reactive' },
];

export const skinGoals: string[] = [
  'Anti-aging', 'Acne control', 'Hyperpigmentation', 'Hydration',
  'Brightening', 'Even skin tone', 'Minimize pores', 'Redness reduction',
  'Dark spots', 'Fine lines', 'Texture improvement', 'Sun damage repair'
];

export const ingredientPreferences: string[] = [
  'Alcohol-free', 'Fragrance-free', 'Paraben-free', 'Sulfate-free',
  'Cruelty-free', 'Vegan', 'Kosher friendly', 'Pregnancy-safe',
  'Halal', 'Non-comedogenic', 'Hypoallergenic'
];

