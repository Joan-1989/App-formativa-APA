import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';

const Challenge24hPage = () => {
    const appContext = useContext(AppContext);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleComplete = () => {
        setIsCompleted(true);
        appContext?.handleGenericActivityFinish(200, 'Repte aconseguit!', 'Has superat les 24h sense notificacions.', 'entrenat');
    }

    return (
        <section className="fade-in max-w-4xl mx-auto">
            <button onClick={() => appContext?.navigateTo('entrenat')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Tornar a Entrena't
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Repte: 24h sense notificacions</h2>
            <p className="text-slate-500 mb-8">Recupera el teu focus i redueix l'ansietat digital.</p>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">El teu objectiu</h3>
                <p className="text-slate-600 mb-6">
                    L'objectiu és simple: sobreviure un dia sencer sense les interrupcions constants de les notificacions de les xarxes socials i aplicacions no essencials. Això t'ajudarà a ser més conscient de quantes vegades mires el mòbil per reacció en lloc de per intenció.
                </p>

                <h3 className="text-lg font-bold text-slate-800 mb-4">Com fer-ho:</h3>
                 <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
                    <li><b>Pas 1:</b> Vés a la configuració del teu mòbil.</li>
                    <li><b>Pas 2:</b> Entra a la secció de "Notificacions".</li>
                    <li><b>Pas 3:</b> Desactiva les notificacions de les aplicacions com Instagram, TikTok, Facebook, X, etc.</li>
                    <li><b>Pas 4:</b> Pots deixar activades les trucades i els missatges d'aplicacions de missatgeria directa si ho necessites per feina o família.</li>
                    <li><b>Pas 5:</b> Aguanta 24 hores! Fixa't en com et sents.</li>
                </ul>
                
                {isCompleted ? (
                     <div className="mt-4 text-center p-4 bg-teal-50 text-teal-700 rounded-lg">
                        <p className="font-semibold">Felicitats! Has completat aquest repte.</p>
                    </div>
                ) : (
                    <div className="mt-6 text-center">
                        <button 
                            onClick={handleComplete}
                            className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                            He completat el repte! (+200 punts)
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Challenge24hPage;
