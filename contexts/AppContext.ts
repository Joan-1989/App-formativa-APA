import { createContext } from 'react';
import type { User, Modules, Challenges } from '../types';

export interface AppContextType {
    user: User;
    modules: Modules;
    challenges: Challenges;
    navigateTo: (page: string) => void;
    openModule: (moduleId: string) => void;
    startChallenge: (challengeId: string) => void;
    handleQuizFinish: (correctAnswers: number, totalQuestions: number, points: number, redirectPage?: string) => void;
    handleGenericActivityFinish: (points: number, title: string, message: string, redirectPage?: string, activityResponse?: any) => void;
    updateUser: (updatedUser: Partial<User>) => void;
    resetProgress: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);