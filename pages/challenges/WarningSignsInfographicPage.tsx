import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';

const WarningSignsInfographicPage = () => {
    const appContext = useContext(AppContext);
    const [isCompleted, setIsCompleted] = useState(false);

    const signs = [
        { icon: '⏳', title: 'Pèrdua de la noció del temps', text: 'Passar molt més temps del previst en una activitat.' },
        { icon: ' secretive', title: 'Mentir o amagar', text: 'Ocultar la durada o la freqüència de la conducta a familiars o amics.' },
        { icon: '💸', title: 'Problemes financers', text: 'Gastar més diners del que es pot permetre o demanar-ne per continuar.' },
        { icon: '🎭', title: 'Canvis d\'humor', text: 'Irritabilitat, ansietat o tristesa quan no es pot realitzar l\'activitat.' },
        { icon: '🏃‍♂️', title: 'Abandonament de responsabilitats', text: 'Descuidar la feina, els estudis o les tasques familiars.' },
        { icon: '💔', title: 'Aïllament social', text: 'Preferir l\'activitat a passar temps amb amics o família.' },
    ];
    
    const handleComplete = () => {
        setIsCompleted(true);
        appContext?.handleGenericActivityFinish(100, "Informació apresa!", "Has revisat els principals senyals d'alerta.", 'entrenat');
    };

    return (
         <section className="fade-in max-w-4xl mx-auto">
            <button onClick={() => appContext?.navigateTo('entrenat')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Tornar a Entrena't
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Infogràfic: Senyals d'Alerta</h2>
            <p className="text-slate-500 mb-8">Reconèixer aquests signes és el primer pas per demanar ajuda.</p>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {signs.map((sign, index) => (
                        <div key={index} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <div className="text-4xl mb-3">{sign.icon}</div>
                            <h4 className="font-bold text-slate-700">{sign.title}</h4>
                            <p className="text-sm text-slate-500 mt-1">{sign.text}</p>
                        </div>
                    ))}
                </div>

                {isCompleted ? (
                     <div className="mt-8 text-center p-4 bg-teal-50 text-teal-700 rounded-lg">
                        <p className="font-semibold">Felicitats! Has completat aquesta activitat.</p>
                    </div>
                ) : (
                    <div className="mt-8 text-center">
                        <button 
                            onClick={handleComplete}
                            className="bg-rose-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors">
                            He llegit i entès (+100 punts)
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WarningSignsInfographicPage;
