import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const TrainPage = () => {
    const appContext = useContext(AppContext);

    const challengesList = [
        {
            id: 'g01',
            title: "Trivial gamificat",
            description: "Posa a prova els teus coneixements sobre benestar emocional i prevenció d'addiccions.",
            icon: <svg className="h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>,
            color: 'purple',
        },
        {
            id: 'g02',
            title: "Història interactiva",
            description: "Pren decisions sobre l'ús del mòbil i el descans digital en una aventura narrativa.",
            icon: <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
            color: 'green',
        },
        {
            id: 'g03',
            title: "Simulador de xat",
            description: "Practica converses sobre hàbits digitals i gestió de l'estrès amb un coach virtual.",
            icon: <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
            color: 'blue',
        },
        {
            id: 'c04',
            title: "Infogràfic: Senyals d'Alerta",
            description: "Aprèn a identificar els principals senyals d'alerta de les addiccions comportamentals amb aquest recurs visual.",
            icon: <svg className="h-8 w-8 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>,
            color: 'rose',
        },
        {
            id: 'c05',
            title: "Pràctica: Tècnica del Semàfor",
            description: "Posa a prova la teva gestió emocional en una simulació interactiva per aprendre a controlar els impulsos.",
            icon: <svg className="h-8 w-8 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 01-7.5 0c-1.42 0-2.798.347-4.006.967a2.126 2.126 0 01-2.123-2.123V6.262a2.126 2.126 0 012.123-2.123h13.752a2.126 2.126 0 012.123 2.123v8.368a2.126 2.126 0 01-2.123 2.123c-1.208-.62-2.586-.967-4.006-.967z" /></svg>,
            color: 'amber',
        },
        {
            id: 'c06',
            title: "Joc de Rol: Conversa Assertiva",
            description: "Practica com respondre a la pressió de grup en un simulador de conversa i aprèn a dir 'no' de forma efectiva.",
            icon: <svg className="h-8 w-8 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            color: 'sky',
        },
        {
            id: 'c03',
            title: "Repte: Caçador de 'Fake News'",
            description: "Posa a prova el teu sentit crític i aprèn a identificar la desinformació en aquest qüestionari.",
            icon: <svg className="h-8 w-8 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            color: 'teal',
        },
        {
            id: 'c02',
            title: 'Repte: Diari de benestar digital',
            description: 'Connecta amb les teves emocions i el teu ús de la tecnologia a través de la reflexió guiada.',
            icon: <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>,
            color: 'indigo',
        },
        {
            id: 'c01',
            title: 'Repte: 24h sense notificacions',
            description: 'Recupera el teu focus i redueix l\'ansibilitat digital desconnectant de les alertes constants.',
            icon: <svg className="h-8 w-8 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>,
            color: 'orange',
        },
    ];

    if (!appContext) return null;
    const { startChallenge, challenges: userChallenges } = appContext;

    return (
        <section className="fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Entrena't</h2>
            <p className="text-slate-500 mb-8">Posa a prova els teus coneixements amb aquests reptes i activitats pràctiques.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challengesList.map(challenge => {
                    const progress = userChallenges[challenge.id];
                    const isCompleted = progress?.status === 'completed';
                    
                    return (
                        <div 
                            key={challenge.id}
                            onClick={isCompleted ? undefined : () => startChallenge(challenge.id)}
                            className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group transition-all duration-300 relative ${isCompleted ? 'opacity-70 bg-slate-50' : 'hover:shadow-md cursor-pointer'}`}
                        >
                            {isCompleted && (
                                <div className="absolute top-4 right-4 bg-teal-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            )}
                            <div className={`w-16 h-16 bg-${challenge.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                                {challenge.icon}
                            </div>
                            <h3 className="font-bold text-slate-800 text-lg">{challenge.title}</h3>
                            <p className="text-sm text-slate-500 mt-2 h-20">{challenge.description}</p>
                            
                            {isCompleted ? (
                                <span className="mt-4 inline-block text-sm font-semibold text-teal-600">
                                    Completat (+{progress.points} punts)
                                </span>
                            ) : (
                                <span className={`mt-4 inline-block text-sm font-semibold text-${challenge.color}-700 group-hover:underline`}>
                                    Començar repte →
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default TrainPage;