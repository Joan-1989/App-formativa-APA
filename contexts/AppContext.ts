
import { createContext } from 'react';
// Fix: Import Modules type.
import type { User, Modules } from '../types';

interface AppContextType {
  user: User;
  // Fix: Add modules to the context type.
  modules: Modules;
  navigateTo: (page: string) => void;
  openModule: (moduleId: string) => void;
  handleQuizFinish: (score: number, totalQuestions: number, pointsWon: number) => void;
  handleGenericActivityFinish: (pointsWon: number, title: string, message: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);