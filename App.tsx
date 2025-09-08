import { useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import ModuleViewPage from './pages/ModuleViewPage';
import QuizModal from './components/QuizModal';
import { AppContext } from './contexts/AppContext';
// Fix: Import CURRENT_USER to resolve reference error.
import { MODULES_DATA, CURRENT_USER } from './constants';
import type { User, ModalContent, Modules } from './types';

// A simple deep copy function for state updates
const deepCopy = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

const App = () => {
    const [page, setPage] = useState('inici');
    const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
    const [user, setUser] = useState<User>(CURRENT_USER);
    const [modules, setModules] = useState<Modules>(deepCopy(MODULES_DATA));
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);

    const navigateTo = useCallback((newPage: string) => {
        setPage(newPage);
        window.location.hash = newPage;
    }, []);

    const openModule = useCallback((moduleId: string) => {
        setCurrentModuleId(moduleId);
        navigateTo('module-view');
    }, [navigateTo]);
    
    const handleActivityCompletion = useCallback((moduleId: string, pointsWon: number) => {
        setUser(prevUser => ({...prevUser, points: prevUser.points + pointsWon}));
        setModules(prevModules => {
            const newModules = deepCopy(prevModules);
            if (newModules[moduleId]) {
                newModules[moduleId].status = 'completed';
                newModules[moduleId].progress = 100;
                newModules[moduleId].points = pointsWon;
            }
            return newModules;
        });
    }, []);

    const handleQuizFinish = useCallback((score: number, totalQuestions: number, pointsWon: number) => {
        const success = score / totalQuestions > 0.7;
        setModalContent({
            title: success ? 'Excel·lent!' : 'Bon intent!',
            scoreText: `Has respost correctament ${score} de ${totalQuestions} preguntes.`,
            pointsText: `+${pointsWon} punts!`,
            icon: success ? '🎉' : '👍',
            iconBgColor: success ? 'bg-teal-100' : 'bg-amber-100',
            iconTextColor: success ? 'text-teal-600' : 'text-amber-600'
        });
        if (currentModuleId && success) {
            handleActivityCompletion(currentModuleId, pointsWon);
        }
    }, [currentModuleId, handleActivityCompletion]);

    const handleGenericActivityFinish = useCallback((pointsWon: number, title: string, message: string) => {
        setModalContent({
            title: title,
            scoreText: message,
            pointsText: `+${pointsWon} punts!`,
            icon: '✅',
            iconBgColor: 'bg-teal-100',
            iconTextColor: 'text-teal-600',
        });
        if (currentModuleId) {
            handleActivityCompletion(currentModuleId, pointsWon);
        }
    }, [currentModuleId, handleActivityCompletion]);

    const closeQuizModal = useCallback(() => {
        setModalContent(null);
        navigateTo('moduls');
    }, [navigateTo]);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && ['inici', 'moduls', 'progres', 'perfil', 'module-view'].includes(hash)) {
                setPage(hash);
            } else if (!hash) {
                setPage('inici');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial load

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const contextValue = useMemo(() => ({
        user,
        modules,
        navigateTo,
        openModule,
        handleQuizFinish,
        handleGenericActivityFinish,
    }), [user, modules, navigateTo, openModule, handleQuizFinish, handleGenericActivityFinish]);

    const renderPage = () => {
        switch (page) {
            case 'inici':
                return <HomePage />;
            case 'moduls':
                return <ModulesPage />;
            case 'progres':
                return <ProgressPage />;
            case 'perfil':
                return <ProfilePage />;
            case 'module-view':
                return currentModuleId && modules[currentModuleId] ? (
                    <ModuleViewPage 
                        moduleId={currentModuleId} 
                        moduleData={modules[currentModuleId]} 
                    />
                ) : <ModulesPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="flex h-screen overflow-hidden">
                <Sidebar currentPage={page} />
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">
                        {renderPage()}
                    </div>
                    <BottomNav currentPage={page} />
                </main>
            </div>
            {modalContent && <QuizModal content={modalContent} onClose={closeQuizModal} />}
        </AppContext.Provider>
    );
};

export default App;