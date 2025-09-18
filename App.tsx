import { useState, useMemo, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { onMessage } from 'firebase/messaging';
import { auth, messaging } from './firebase';
import { AppContext, AppContextType } from './contexts/AppContext';
import { MODULES_DATA } from './constants';
import type { User, Modules, ModalContent } from './types';
import { getUserData, createUserProfile, updateUserProfile, updateModuleProgress } from './services/firestoreService';
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
import AuthPage from './pages/AuthPage';


const App = () => {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    const [currentPage, setCurrentPage] = useState('inici');
    const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
    const [currentChallengeId, setCurrentChallengeId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [modules, setModules] = useState<Modules>(MODULES_DATA);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const [redirectAfterModal, setRedirectAfterModal] = useState('moduls');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                setFirebaseUser(userAuth);
                let userData = await getUserData(userAuth.uid);
                if (!userData) {
                    userData = await createUserProfile(userAuth);
                }
                setUser(userData.profile as User);
                setModules(userData.modules);
            } else {
                setFirebaseUser(null);
                setUser(null);
            }
            setIsLoadingAuth(false);
        });

        // Handle foreground notifications
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            alert(`Notificació rebuda:\n${payload.notification?.title}\n${payload.notification?.body}`);
        });

        return () => unsubscribe();
    }, []);

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
    
    const handleActivityCompletion = (moduleId: string, points: number, activityResponse?: any) => {
        if (!user) return;
        const newPoints = user.points + points;
        
        setUser(prevUser => prevUser ? ({ ...prevUser, points: newPoints }) : null);
        updateUserProfile(user.id, { points: newPoints });

        const updatedModule = {
            ...modules[moduleId],
            // Fix: Cast 'completed' to a literal type to prevent TypeScript from widening
            // the 'status' property to 'string', ensuring it matches the 'ModuleData' type.
            status: 'completed' as const,
            progress: 100,
            points: points,
            activityResponse: activityResponse || null,
        };
        setModules(prevModules => ({ ...prevModules, [moduleId]: updatedModule }));
        updateModuleProgress(user.id, moduleId, updatedModule);
    }

    const handleQuizFinish = (correctAnswers: number, totalQuestions: number, points: number, redirectPage: string = 'moduls') => {
        if (currentModuleId) {
            handleActivityCompletion(currentModuleId, points, { score: `${correctAnswers}/${totalQuestions}` });
        } else if (user) {
             const newPoints = user.points + points;
             setUser(prevUser => prevUser ? ({ ...prevUser, points: newPoints }) : null);
             updateUserProfile(user.id, { points: newPoints });
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
    
    const handleGenericActivityFinish = (points: number, title: string, message: string, redirectPage: string = 'moduls', activityResponse?: any) => {
        if (currentModuleId) {
            handleActivityCompletion(currentModuleId, points, activityResponse);
        } else if (user) {
             const newPoints = user.points + points;
             setUser(prevUser => prevUser ? ({ ...prevUser, points: newPoints }) : null);
             updateUserProfile(user.id, { points: newPoints });
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

    const updateUser = (updatedData: Partial<User>) => {
        setUser(prevUser => prevUser ? { ...prevUser, ...updatedData } : null);
    };

    const resetProgress = () => {
        setUser(currentUser => currentUser ? ({ ...currentUser, points: 0, badges: [] }) : null);
        setModules(MODULES_DATA);
        navigateTo('inici');
    };

    const appContextValue: AppContextType = useMemo(() => ({
        user: user!,
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
            case 'inici': return <HomePage />;
            case 'moduls': return <ModulesPage />;
            case 'entrenat': return <TrainPage />;
            case 'progres': return <ProgressPage />;
            case 'perfil': return <ProfilePage />;
            case 'ajuda': return <HelpPage />;
            default: return <HomePage />;
        }
    };
    
    const closeModal = () => {
        setModalContent(null);
        navigateTo(redirectAfterModal);
    };

    if (isLoadingAuth) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50">
                <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-sky-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="mt-2 text-slate-500">Carregant...</p>
                </div>
            </div>
        );
    }

    if (!firebaseUser || !user) {
        return <AuthPage />;
    }

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
