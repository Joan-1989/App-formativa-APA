import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import Quiz from '../../components/Quiz';
import { CHALLENGES_DATA } from '../../constants';

const FakeNewsHunterPage = () => {
    const appContext = useContext(AppContext);

    return (
         <section className="fade-in max-w-4xl mx-auto">
             <button onClick={() => appContext?.navigateTo('entrenat')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Tornar a Entrena't
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Repte: Caçador de 'Fake News'</h2>
            <p className="text-slate-500 mb-8">Posa a prova el teu sentit crític i aprèn a identificar la desinformació.</p>

            <Quiz quizData={CHALLENGES_DATA.FAKE_NEWS_HUNTER} redirectOnFinish="entrenat" />
        </section>
    );
};

export default FakeNewsHunterPage;
