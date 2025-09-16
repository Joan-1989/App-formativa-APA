import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';

interface Message {
    sender: 'friend' | 'user' | 'feedback';
    text: string;
    style?: 'passive' | 'assertive' | 'aggressive';
}

type GameState = 'initial' | 'responded' | 'completed';

const AssertivenessSimulatorPage = () => {
    const appContext = useContext(AppContext);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'friend', text: "Ei! Vaig a fer una aposta per al partit d'aquesta nit, t'hi apuntes? És segur que guanyem!" }
    ]);
    const [gameState, setGameState] = useState<GameState>('initial');

    const options = [
        { style: 'passive', text: "Uhm, no ho sé... suposo que si tu ho dius..." },
        { style: 'assertive', text: "Gràcies per pensar en mi, però prefereixo no apostar. Que tinguis sort!" },
        { style: 'aggressive', text: "Estàs boig? Deixa de molestar-me amb aquestes coses." }
    ];

    const handleResponse = (style: 'passive' | 'assertive' | 'aggressive', text: string) => {
        const userMessage: Message = { sender: 'user', text, style };
        let friendResponse: Message;
        let feedbackMessage: Message;

        switch (style) {
            case 'passive':
                friendResponse = { sender: 'friend', text: "Genial! T'apunto 20€. Ja veuràs com guanyem!" };
                feedbackMessage = { sender: 'feedback', style: 'passive', text: "Aquesta és una resposta passiva. No has expressat clarament els teus desitjos, la qual cosa pot portar-te a situacions incòmodes." };
                break;
            case 'aggressive':
                friendResponse = { sender: 'friend', text: "Ei, tranquil! Només preguntava..." };
                feedbackMessage = { sender: 'feedback', style: 'aggressive', text: "Aquesta és una resposta agressiva. Has expressat la teva posició, però de manera hostil, cosa que podria danyar la teva amistat." };
                break;
            case 'assertive':
            default:
                friendResponse = { sender: 'friend', text: "Ah, d'acord, cap problema! Parlem després." };
                feedbackMessage = { sender: 'feedback', style: 'assertive', text: "Excel·lent! Aquesta és una resposta assertiva. Has estat clar, ferm i respectuós, defensant la teva posició sense atacar l'altra persona." };
                break;
        }

        setMessages(prev => [...prev, userMessage, friendResponse, feedbackMessage]);
        setGameState('responded');
    };
    
    const handleComplete = () => {
        setGameState('completed');
        appContext?.handleGenericActivityFinish(175, "Bon treball!", "Has practicat les teves habilitats de comunicació.", 'entrenat');
    }

    return (
        <section className="fade-in max-w-4xl mx-auto">
            <button onClick={() => appContext?.navigateTo('entrenat')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Tornar a Entrena't
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Joc de Rol: Conversa Assertiva</h2>
            <p className="text-slate-500 mb-8">Practica com respondre a la pressió de grup en un entorn segur.</p>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="p-4 h-96 overflow-y-auto bg-slate-50 space-y-4">
                    {messages.map((msg, index) => {
                        if (msg.sender === 'feedback') {
                            const feedbackColors = {
                                passive: 'bg-amber-100 border-amber-300 text-amber-800',
                                assertive: 'bg-teal-100 border-teal-300 text-teal-800',
                                aggressive: 'bg-rose-100 border-rose-300 text-rose-800'
                            };
                            return (
                                <div key={index} className={`p-3 rounded-lg border text-sm ${feedbackColors[msg.style!]}`}>
                                    <span className="font-bold">Feedback:</span> {msg.text}
                                </div>
                            )
                        }
                        const isUser = msg.sender === 'user';
                        return (
                            <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isUser ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {gameState === 'initial' && (
                    <div className="p-4 border-t border-slate-200 space-y-2">
                         <p className="text-sm font-semibold text-slate-600 mb-2">Com respons?</p>
                        {options.map(opt => (
                            <button key={opt.style} onClick={() => handleResponse(opt.style as any, opt.text)}
                                className="w-full text-left p-3 bg-slate-100 rounded-lg hover:bg-sky-100 transition-colors text-sm text-slate-700">
                                {opt.text}
                            </button>
                        ))}
                    </div>
                )}
                
                {gameState === 'responded' && (
                     <div className="p-4 border-t border-slate-200 text-center">
                        <button onClick={handleComplete} className="bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-700">
                            Finalitzar simulació (+175 punts)
                        </button>
                     </div>
                )}
                
                {gameState === 'completed' && (
                     <div className="p-4 border-t border-slate-200 text-center bg-teal-50 text-teal-700 font-semibold">
                        Activitat completada!
                     </div>
                )}
            </div>
        </section>
    );
};

export default AssertivenessSimulatorPage;
