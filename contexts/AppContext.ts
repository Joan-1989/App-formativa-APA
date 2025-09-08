import { createContext } from 'react';
import type { User, Modules } from '../types';

export interface AppContextType {
    user: User;
    modules: Modules;
    navigateTo: (page: string) => void;
    openModule: (moduleId: string) => void;
    handleQuizFinish: (correctAnswers: number, totalQuestions: number, points: number) => void;
    handleGenericActivityFinish: (points: number, title: string, message: string) => void;
    updateUser: (updatedUser: User) => void;
    resetProgress: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);