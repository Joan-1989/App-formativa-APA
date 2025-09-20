import { useState, useMemo, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { onMessage } from 'firebase/messaging';
import { auth, messaging } from './firebase';
import { AppContext, AppContextType } from './contexts/AppContext';
import { MODULES_DATA } from './constants';
import type { User, Modules, ModalContent, Challenges } from './types';
import { getUserData, createUserProfile, updateUserProfile, updateModuleProgress, updateChallengeProgress } from './services/firestoreService';
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
import GamifiedTrivialPage from './pages/gamification/GamifiedTrivialPage';
import InteractiveStoryPage from './pages/gamification/InteractiveStoryPage';
import ChatSimulatorPage from './pages/gamification/ChatSimulatorPage';


const App = () => {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    const [currentPage, setCurrentPage] = useState('inici');
    const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
    const [currentChallengeId, setCurrentChallengeId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [modules, setModules] = useState<Modules>(MODULES_DATA);
    const [challenges, setChallenges] = useState<Challenges>({});
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const [redirectAfterModal, setRedirectAfterModal] = useState('moduls');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                setFirebaseUser(userAuth);
                let userData = await getUserData(userAuth.uid);
                if (!userData) {
                    const createdData = await createUserProfile(userAuth);
                    userData = { ...createdData, challenges: {} };
                }
                setUser(userData.profile as User);
                setModules(userData.modules);
                setChallenges(userData.challenges);
            } else {
                setFirebaseUser(null);
                setUser(null);
            }
            setIsLoadingAuth(false);
        });

        // Handle foreground notifications
        if (messaging) {
            onMessage(messaging, (payload) => {
                console.log('Message received. ', payload);
                alert(`Notificació rebuda:\n${payload.notification?.title}\n${payload.notification?.body}`);
            });
        }

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
    
    const handleCompletion = async (type: 'module' | 'challenge', id: string, points: number, activityResponse?: any) => {
        if (!user) return;

        const originalUserPoints = user.points;
        const newPoints = originalUserPoints + points;

        // Prepare optimistic updates and persistence logic based on type
        let optimisticStateUpdate: () => void;
        let revertStateUpdate: () => void;
        let saveProgress: () => Promise<void>;

        if (type === 'module') {
            const originalModuleState = modules[id];
            const progressData = {
                status: 'completed' as const, progress: 100, points,
                activityResponse: activityResponse || null,
            };
            optimisticStateUpdate = () => setModules(prev => ({ ...prev, [id]: { ...prev[id], ...progressData } }));
            revertStateUpdate = () => setModules(prev => ({ ...prev, [id]: originalModuleState }));
            saveProgress = () => updateModuleProgress(user.id, id, progressData);
        } else { // type === 'challenge'
            const originalChallengeState = challenges[id] || null; // Use null if it doesn't exist
            const progressData = {
                status: 'completed' as const, points,
                activityResponse: activityResponse || null,
            };
            optimisticStateUpdate = () => setChallenges(prev => ({ ...prev, [id]: progressData }));
            revertStateUpdate = () => {
                setChallenges(prev => {
                    const newChallenges = { ...prev };
                    if (originalChallengeState) {
                        newChallenges[id] = originalChallengeState;
                    } else {
                        delete newChallenges[id];
                    }
                    return newChallenges;
                });
            };
            saveProgress = () => updateChallengeProgress(user.id, id, progressData);
        }

        // 1. Apply optimistic UI updates
        setUser(prevUser => prevUser ? { ...prevUser, points: newPoints } : null);
        optimisticStateUpdate();

        try {
            // 2. Persist changes to Firestore
            await updateUserProfile(user.id, { points: newPoints });
            await saveProgress();
            console.log(`[SUCCESS] Progress saved for ${type} ${id}.`);
        } catch (error) {
            console.error(`Error saving ${type} progress to Firestore:`, error);
            alert("S'ha produït un error en desar el progrés. Si us plau, intenta-ho de nou.");
            
            // 3. Revert optimistic updates on failure
            setUser(prevUser => prevUser ? { ...prevUser, points: originalUserPoints } : null);
            revertStateUpdate();
        }
    };

    const handleQuizFinish = async (correctAnswers: number, totalQuestions: number, points: number, redirectPage: string = 'moduls') => {
        const activityResponse = { score: `${correctAnswers}/${totalQuestions}` };
        
        if (currentModuleId) {
            await handleCompletion('module', currentModuleId, points, activityResponse);
        } else if (currentChallengeId && user) {
            await handleCompletion('challenge', currentChallengeId, points, activityResponse);
        } else if (user) { // Fallback for activities without specific ID
             const newPoints = user.points + points;
             setUser(prev => prev ? { ...prev, points: newPoints } : null);
             await updateUserProfile(user.id, { points: newPoints });
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
    
    const handleGenericActivityFinish = async (points: number, title: string, message: string, redirectPage: string = 'moduls', activityResponse?: any) => {
        if (currentModuleId) {
            await handleCompletion('module', currentModuleId, points, activityResponse);
        } else if (currentChallengeId && user) {
            await handleCompletion('challenge', currentChallengeId, points, activityResponse);
        } else if (user) { // Fallback
            const newPoints = user.points + points;
            setUser(prev => prev ? { ...prev, points: newPoints } : null);
            await updateUserProfile(user.id, { points: newPoints });
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
        setChallenges({});
        navigateTo('inici');
    };

    const appContextValue: AppContextType = useMemo(() => ({
        user: user!,
        modules,
        challenges,
        navigateTo,
        openModule,
        startChallenge,
        handleQuizFinish,
        handleGenericActivityFinish,
        updateUser,
        resetProgress,
    }), [user, modules, challenges]);

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
                case 'g01': return <GamifiedTrivialPage />;
                case 'g02': return <InteractiveStoryPage />;
                case 'g03': return <ChatSimulatorPage />;
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
