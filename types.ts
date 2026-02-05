
export enum Language {
  EN = 'EN',
  ZH = 'ZH',
  JA = 'JA',
  KO = 'KO'
}

export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export enum CourseStatus {
  LOCKED = 'LOCKED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface AvatarConfig {
  baseSeed: string; // Random seed for face/hair
  hatId: string | null;
  outfitId: string | null;
  accessoryId: string | null;
}

export interface AvatarItem {
  id: string;
  type: 'HAT' | 'OUTFIT' | 'ACCESSORY';
  name: string;
  assetValue: string; // The value passed to the avatar API (e.g., 'winterHat01')
  thumbnail: string; // Icon for UI
  description?: string;
}

export interface User {
  id: string;
  name: string;
  avatarConfig: AvatarConfig;
  points: number;
  level: number;
  subscriptionType: 'FREE' | 'INDIVIDUAL' | 'FAMILY';
  dailyLogin: boolean;
  unlockedAbilities: string[]; // IDs of unlocked abilities
  inventory: string[]; // IDs of unlocked items
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatarConfig: AvatarConfig; // Changed from simple string URL to config
  isUser: boolean;
}

export interface Ability {
  id: string;
  name: string;
  icon: string;
  description: string;
  requiredCourseId: string; // The course that unlocks this
  unlocked: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string; 
  pointsReward: number;
  itemRewardId?: string; // Optional item reward
  status: CourseStatus;
  category: string;
  // Map Coordinates (0-100 percentage)
  mapX: number;
  mapY: number;
  // ID of the next course(s) this connects to
  unlocks: string[];
}

export interface RewardItem {
  id: string;
  name: string;
  cost: number;
  image: string;
  stock: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  grandPrize: string;
  endDate: string;
  image: string;
  status: 'ACTIVE' | 'ENDED';
}

export interface Task {
  id: string;
  title: string;
  reward: number;
  completed: boolean;
}
