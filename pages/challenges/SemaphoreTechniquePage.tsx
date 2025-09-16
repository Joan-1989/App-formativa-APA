import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';

type SemaphoreState = 'start' | 'green' | 'yellow' | 'red' | 'completed';

const SemaphoreTechniquePage = () => {
    const appContext = useContext(AppContext);
    const [gameState, setGameState] = useState<SemaphoreState>('start');

    const handleSelectColor = (color: 'green' | 'yellow' | 'red') => {
        setGameState(color);
    };
    
    const handleComplete = () => {
        setGameState('completed');
        appContext?.handleGenericActivityFinish(150, "Pràctica finalitzada!", "Has aplicat la tècnica del semàfor correctament.", 'entrenat');
    };

    const renderFeedback = () => {
        let title = '';
        let text = '';
        let colorClass = '';

        switch (gameState) {
            case 'green':
                title = 'Estat: Verd (Calma)';
                text = 'Segur que estàs en calma? Perdre i rebre una burla pot ser frustrant. És normal sentir una mica de tensió. Identificar correctament les emocions és clau.';
                colorClass = 'bg-slate-100 border-slate-300';
                break;
            case 'yellow':
                title = 'Estat: Groc (Tensió Creixent)';
                text = 'Bona identificació! Notes que la tensió augmenta. Aquest és el moment perfecte per actuar abans de perdre el control. Prova a respirar profundament 3 cops o a deixar el mòbil durant 5 minuts.';
                colorClass = 'bg-amber-100 border-amber-300';
                break;
            case 'red':
                title = 'Estat: Vermell (Explosió Emocional)';
                text = 'Notes que estàs a punt d\'explotar. És crucial aturar-se abans de reaccionar impulsivament. Aplica un "temps fora": allunya\'t de la situació, respira i no responguis fins que et sentis més calmat.';
                colorClass = 'bg-rose-100 border-rose-300';
                break;
            default:
                return null;
        }

        return (
            <div className={`mt-6 p-4 rounded-lg border ${colorClass}`}>
                <h4 className="font-bold text-slate-800">{title}</h4>
                <p className="text-sm text-slate-600 mt-1">{text}</p>
                 <div className="mt-4 text-center">
                    <button onClick={handleComplete} className="bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm">
                        Entès! Completar activitat (+150 punts)
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section className="fade-in max-w-4xl mx-auto">
            <button onClick={() => appContext?.navigateTo('entrenat')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Tornar a Entrena't
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Pràctica: Tècnica del Semàfor</h2>
            <p className="text-slate-500 mb-8">Aprèn a identificar i regular les teves emocions en una situació pràctica.</p>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-2">Escenari:</h3>
                <p className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-slate-600">
                    Acabes de perdre una partida important al teu videojoc preferit després de dues hores jugant. Un amic t'envia un missatge al mòbil burlant-se de la teva derrota.
                </p>
                <h3 className="font-bold text-slate-700 mt-6 mb-3">Com et sents? Tria el teu estat emocional:</h3>
                
                {gameState !== 'completed' ? (
                    <>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => handleSelectColor('green')} className="flex-1 p-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-center transition-transform hover:scale-105">
                                VERD<span className="block font-normal text-sm">Estic tranquil</span>
                            </button>
                            <button onClick={() => handleSelectColor('yellow')} className="flex-1 p-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-center transition-transform hover:scale-105">
                                GROC<span className="block font-normal text-sm">Noto tensió</span>
                            </button>
                            <button onClick={() => handleSelectColor('red')} className="flex-1 p-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-center transition-transform hover:scale-105">
                                VERMELL<span className="block font-normal text-sm">Estic a punt d'explotar</span>
                            </button>
                        </div>
                        {renderFeedback()}
                    </>
                ) : (
                    <div className="mt-6 text-center p-4 bg-teal-50 text-teal-700 rounded-lg">
                        <p className="font-semibold">Felicitats! Has completat aquesta pràctica.</p>
                        <p className="text-sm mt-1">Recorda utilitzar aquesta tècnica en el teu dia a dia.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SemaphoreTechniquePage;
