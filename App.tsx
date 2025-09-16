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
import TrainPage from './pages/TrainPage';
import HelpPage from './pages/HelpPage';
import QuizModal from './components/QuizModal';
import Challenge24hPage from './pages/challenges/Challenge24hPage';
import DigitalDiaryPage from './pages/challenges/DigitalDiaryPage';
import FakeNewsHunterPage from './pages/challenges/FakeNewsHunterPage';
import WarningSignsInfographicPage from './pages/challenges/WarningSignsInfographicPage';
import SemaphoreTechniquePage from './pages/challenges/SemaphoreTechniquePage';
import AssertivenessSimulatorPage from './pages/challenges/AssertivenessSimulatorPage';

const App = () => {
    const [currentPage, setCurrentPage] = useState('inici');
    const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
    const [currentChallengeId, setCurrentChallengeId] = useState<string | null>(null);
    const [user, setUser] = useState<User>(CURRENT_USER);
    const [modules, setModules] = useState<Modules>(MODULES_DATA);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const [redirectAfterModal, setRedirectAfterModal] = useState('moduls');

    const navigateTo = (page: string) => {
        setCurrentPage(page);
        setCurrentModuleId(null);
        setCurrentChallengeId(null);
        window.scrollTo(0, 0);
    };

    const openModule = (moduleId: string) => {
        setCurrentModuleId(moduleId);
        setCurrentPage('module-view');
        window.scrollTo(0, 0);
    };

    const startChallenge = (challengeId: string) => {
        setCurrentChallengeId(challengeId);
        setCurrentPage('challenge-view');
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

    const handleQuizFinish = (correctAnswers: number, totalQuestions: number, points: number, redirectPage: string = 'moduls') => {
        if (currentModuleId) {
            handleActivityCompletion(currentModuleId, points);
        } else {
             setUser(prevUser => ({
                ...prevUser,
                points: prevUser.points + points,
            }));
        }
        setRedirectAfterModal(redirectPage);
        setModalContent({
            title: correctAnswers === totalQuestions ? 'Excel·lent!' : 'Bon esforç!',
            scoreText: `Has encertat ${correctAnswers} de ${totalQuestions} preguntes.`,
            pointsText: `+${points} punts`,
            icon: '🎉',
            iconBgColor: 'bg-teal-100',
            iconTextColor: 'text-teal-600',
            buttonText: redirectPage === 'entrenat' ? 'Tornar a Entrena\'t' : 'Tornar als mòduls',
        });
    };
    
    const handleGenericActivityFinish = (points: number, title: string, message: string, redirectPage: string = 'moduls') => {
        if (currentModuleId) {
            handleActivityCompletion(currentModuleId, points);
        } else {
             setUser(prevUser => ({
                ...prevUser,
                points: prevUser.points + points,
            }));
        }
        setRedirectAfterModal(redirectPage);
         setModalContent({
            title: title,
            scoreText: message,
            pointsText: `+${points} punts`,
            icon: '👍',
            iconBgColor: 'bg-sky-100',
            iconTextColor: 'text-sky-600',
            buttonText: redirectPage === 'entrenat' ? 'Tornar a Entrena\'t' : 'Tornar als mòduls',
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
        startChallenge,
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
         if (currentChallengeId && currentPage === 'challenge-view') {
            switch (currentChallengeId) {
                case 'c01': return <Challenge24hPage />;
                case 'c02': return <DigitalDiaryPage />;
                case 'c03': return <FakeNewsHunterPage />;
                case 'c04': return <WarningSignsInfographicPage />;
                case 'c05': return <SemaphoreTechniquePage />;
                case 'c06': return <AssertivenessSimulatorPage />;
                default: return <TrainPage />;
            }
        }
        switch (currentPage) {
            case 'inici':
                return <HomePage />;
            case 'moduls':
                return <ModulesPage />;
            case 'entrenat':
                return <TrainPage />;
            case 'progres':
                return <ProgressPage />;
            case 'perfil':
                return <ProfilePage />;
            case 'ajuda':
                return <HelpPage />;
            default:
                return <HomePage />;
        }
    };
    
    const closeModal = () => {
        setModalContent(null);
        navigateTo(redirectAfterModal);
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