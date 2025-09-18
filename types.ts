import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  name: string;
  points: number;
  badges: string[];
  createdAt: Timestamp;
}

export interface BadgeInfo {
  id: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
}

export interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface QuizData {
  type: 'quiz';
  pointsPerCorrect: number;
  questions: Question[];
}

export interface DragDropItem {
    id: string;
    content: string;
    type: 'risk' | 'healthy';
}

export interface DragDropScenarioData {
    type: 'drag-drop-scenario';
    prompt: string;
    points: number;
    items: DragDropItem[];
    dropZones: { id: string; title: string; accepts: 'risk' | 'healthy' }[];
}

export interface ReflectionJournalData {
    type: 'reflection-journal';
    prompt: string;
    points: number;
}

export type ActivityData = QuizData | DragDropScenarioData | ReflectionJournalData;


export interface ModuleData {
  title: string;
  subtitle: string;
  content?: string[];
  videoUrl?: string;
  activity: ActivityData | null;
  status: 'completed' | 'inprogress' | 'locked';
  progress: number;
  points?: number;
  activityResponse?: any; // To store user's specific response, e.g., journal text
}

export interface Modules {
  [key: string]: ModuleData;
}

export interface RankingUser {
    id:string;
    name: string;
    points: number;
}

export interface ModalContent {
    title: string;
    scoreText?: string;
    pointsText: string;
    icon: string;
    iconBgColor: string;
    iconTextColor: string;
    buttonText?: string;
}