export enum BadgeStatus {
  Active = 'Active',
  Retired = 'Retired',
  Program = 'Program',
}

export enum BadgeTier {
  None = 'None',
  Base = 'Base',
  Bronze = 'Bronze',
  Silver = 'Silver',
  Gold = 'Gold',
}

export interface TierRequirement {
  tier: BadgeTier;
  description: string;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  status: BadgeStatus;
  tiers?: TierRequirement[];
  earnGuide?: string[];
  proTips?: string[];
  notes?: string;
  color?: string; // Tailwind class for glow/accent
}

export interface FaqItem {
  question: string;
  answer: string;
  fix?: string;
}

export interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  public_repos: number;
  followers: number;
  bio: string | null;
}

export interface UserStats {
  mergedPRs: number;
  maxStars: number;
}
