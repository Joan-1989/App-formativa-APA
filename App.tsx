import { useState, useMemo } from 'react';
import { AppContext, AppContextType } from './contexts/AppContext';
import { CURRENT_USER, MODULES_DATA } from './constants';
import type { User, Modules, ModalContent } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';
import ModuleViewPage from './pages/ModuleViewPage';
import QuizModal from './components/QuizModal';

const App = () => {
    const [currentPage, setCurrentPage] = useState('inici');
    const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
    const [user, setUser] = useState<User>(CURRENT_USER);
    const [modules, setModules] = useState<Modules>(MODULES_DATA);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);

    const navigateTo = (page: string) => {
        setCurrentPage(page);
        setCurrentModuleId(null);
        window.scrollTo(0, 0);
    };

    const openModule = (moduleId: string) => {
        setCurrentModuleId(moduleId);
        setCurrentPage('module-view');
        window.scrollTo(0, 0);
    };
    
    const handleActivityCompletion = (moduleId: string, points: number) => {
        setUser(prevUser => ({
            ...prevUser,
            points: prevUser.points + points,
        }));
        setModules(prevModules => {
            const newModules = { ...prevModules };
            if (newModules[moduleId]) {
                newModules[moduleId] = {
                    ...newModules[moduleId],
                    status: 'completed',
                    progress: 100,
                    points: points,
                };
            }
            return newModules;
        });
    }

    const handleQuizFinish = (correctAnswers: number, totalQuestions: number, points: number) => {
        if (currentModuleId) {
            handleActivityCompletion(currentModuleId, points);
        }
        setModalContent({
            title: correctAnswers === totalQuestions ? 'Excel·lent!' : 'Bon esforç!',
            scoreText: `Has encertat ${correctAnswers} de ${totalQuestions} preguntes.`,
            pointsText: `+${points} punts`,
            icon: '🎉',
            iconBgColor: 'bg-teal-100',
            iconTextColor: 'text-teal-600',
        });
    };
    
    const handleGenericActivityFinish = (points: number, title: string, message: string) => {
        if (currentModuleId) {
            handleActivityCompletion(currentModuleId, points);
        }
         setModalContent({
            title: title,
            scoreText: message,
            pointsText: `+${points} punts`,
            icon: '👍',
            iconBgColor: 'bg-sky-100',
            iconTextColor: 'text-sky-600',
        });
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    const resetProgress = () => {
        setUser(currentUser => ({
            ...currentUser,
            points: 0,
            badges: [],
        }));
        setModules(MODULES_DATA);
        navigateTo('inici');
    };

    const appContextValue: AppContextType = useMemo(() => ({
        user,
        modules,
        navigateTo,
        openModule,
        handleQuizFinish,
        handleGenericActivityFinish,
        updateUser,
        resetProgress,
    }), [user, modules]);

    const renderPage = () => {
        if (currentModuleId && currentPage === 'module-view') {
            const moduleData = modules[currentModuleId];
            return <ModuleViewPage moduleId={currentModuleId} moduleData={moduleData} />;
        }
        switch (currentPage) {
            case 'inici':
                return <HomePage />;
            case 'moduls':
                return <ModulesPage />;
            case 'progres':
                return <ProgressPage />;
            case 'perfil':
                return <ProfilePage />;
            default:
                return <HomePage />;
        }
    };
    
    const closeModal = () => {
        setModalContent(null);
        navigateTo('moduls');
    };

    return (
        <AppContext.Provider value={appContextValue}>
            <div className="flex h-screen bg-slate-50 font-sans">
                <Sidebar currentPage={currentPage} />
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-6 md:p-8">
                        {renderPage()}
                    </main>
                    <BottomNav currentPage={currentPage} />
                </div>
                 {modalContent && <QuizModal content={modalContent} onClose={closeModal} />}
            </div>
        </AppContext.Provider>
    );
};

export default App;