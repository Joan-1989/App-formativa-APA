import { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

const DigitalDiaryPage = () => {
    const appContext = useContext(AppContext);
    const [text, setText] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    
    const prompt = "Durant 5 minuts, reflexiona sobre el teu ús del mòbil avui. Com t'has sentit? Hi ha hagut moments de frustració o de connexió genuïna? Què podries canviar demà?";
    const points = 150;

    const handleSave = () => {
        if (text.trim().length < 20) {
            alert('Si us plau, escriu una reflexió una mica més llarga per completar el repte.');
            return;
        }
        setIsCompleted(true);
        appContext?.handleGenericActivityFinish(points, 'Reflexió guardada!', 'L\'autoconeixement és el primer pas per al canvi.', 'entrenat');
    };

    return (
        <section className="fade-in max-w-4xl mx-auto">
             <button onClick={() => appContext?.navigateTo('entrenat')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Tornar a Entrena't
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Repte: Diari de benestar digital</h2>
            <p className="text-slate-500 mb-8">Connecta amb les teves emocions i el teu ús de la tecnologia.</p>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Activitat de reflexió</h3>
                <p className="text-slate-600 mb-4">{prompt}</p>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isCompleted}
                    rows={8}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                    placeholder="Escriu la teva reflexió aquí..."
                ></textarea>
                
                {isCompleted ? (
                    <div className="mt-4 text-center p-4 bg-teal-50 text-teal-700 rounded-lg">
                        <p className="font-semibold">La teva reflexió s'ha completat correctament.</p>
                    </div>
                ) : (
                    <div className="mt-4 text-center">
                        <button
                            onClick={handleSave}
                            className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-700 disabled:bg-slate-400 transition-colors"
                            disabled={text.trim().length < 10}
                        >
                            Guardar reflexió (+{points} punts)
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DigitalDiaryPage;
