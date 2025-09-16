import { useContext } from 'react';
import type { ModuleData } from '../types';
import { AppContext } from '../contexts/AppContext';
import Quiz from '../components/Quiz';
import DragAndDropScenario from '../components/DragAndDropScenario';
import ReflectionJournal from '../components/ReflectionJournal';

interface ModuleViewPageProps {
    moduleId: string;
    moduleData: ModuleData;
}

const ModuleViewPage = ({ moduleData }: ModuleViewPageProps) => {
    const appContext = useContext(AppContext);

    if (!moduleData) {
        return <div className="text-center p-8">Mòdul no trobat.</div>;
    }

    const renderActivity = () => {
        if (!moduleData.activity) {
            return (
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <p className="text-center text-slate-500">Aquesta píndola no té una activitat associada.</p>
                </div>
            );
        }
        
        switch (moduleData.activity.type) {
            case 'quiz':
                return <Quiz quizData={moduleData.activity} />;
            case 'drag-drop-scenario':
                return <DragAndDropScenario scenarioData={moduleData.activity} />;
            case 'reflection-journal':
                 return <ReflectionJournal journalData={moduleData.activity} />;
            default:
                return null;
        }
    };

    return (
        <section className="fade-in max-w-4xl mx-auto">
            <button onClick={() => appContext?.navigateTo('moduls')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                 <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                 Tornar als mòduls
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{moduleData.title}</h2>
            <p className="text-slate-500 mb-6">{moduleData.subtitle}</p>

            {moduleData.content && (
                <div className="prose prose-slate max-w-none bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 space-y-4">
                    {moduleData.content.map((paragraph, index) => (
                        <p key={index} className="text-slate-600">{paragraph}</p>
                    ))}
                </div>
            )}
            
            <div className="aspect-video bg-slate-800 rounded-2xl mb-8 flex items-center justify-center text-white">
                <p>Espai reservat per al vídeo</p>
            </div>
            
            {renderActivity()}
        </section>
    );
};

export default ModuleViewPage;
