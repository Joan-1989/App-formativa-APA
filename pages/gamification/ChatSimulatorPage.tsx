import { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../contexts/AppContext';

interface Message {
    id: number;
    sender: 'coach' | 'user';
    avatar: string;
    text: string;
}

interface Choice {
    text: string;
    response: string;
    feedback: string;
    points: number;
}

const ChatSimulatorPage = () => {
    const appContext = useContext(AppContext);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 'coach', avatar: '🤖', text: "Hola! Sóc el teu coach de benestar digital. He notat que el teu temps de pantalla ha augmentat. Com et sents últimament?" }
    ]);
    const [choices, setChoices] = useState<Choice[]>([
        { text: "Una mica estressat, la veritat.", response: "Entenc. Molts cops fem servir el mòbil per evadir l'estrès, però pot acabar generant-ne més. Què et semblaria si provem una petita pausa digital de 15 minuts ara mateix?", feedback: "Reconèixer l'estrès és un gran primer pas. Bona feina.", points: 20 },
        { text: "Bé, sense problemes.", response: "Està bé sentir-se així. De vegades no som conscients de com ens afecta. Un bon exercici és apuntar com et sents abans i després d'una llarga sessió amb el mòbil. Potser t'emportes una sorpresa!", feedback: "Ser honest amb un mateix és important, fins i tot si creus que tot va bé.", points: 10 },
    ]);
    const [isCompleted, setIsCompleted] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleChoice = (choice: Choice) => {
        const userMessage: Message = { id: Date.now(), sender: 'user', avatar: '🙂', text: choice.text };
        const coachResponse: Message = { id: Date.now() + 1, sender: 'coach', avatar: '🤖', text: choice.response };
        const coachFeedback: Message = { id: Date.now() + 2, sender: 'coach', avatar: '🤖', text: `Feedback: ${choice.feedback}` };
        
        setMessages(prev => [...prev, userMessage]);
        
        setTimeout(() => {
            setMessages(prev => [...prev, coachResponse]);
        }, 1000);

        setTimeout(() => {
            setMessages(prev => [...prev, coachFeedback]);
            setIsCompleted(true);
            appContext?.handleGenericActivityFinish(choice.points, "Conversa finalitzada!", "Has practicat una conversa important sobre hàbits digitals.", 'entrenat');
        }, 2500);

        setChoices([]);
    };

    return (
        <section className="fade-in max-w-2xl mx-auto">
            <button onClick={() => appContext?.navigateTo('entrenat')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Tornar a Entrena't
            </button>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col h-[32rem]">
                <div className="p-3 bg-slate-100 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-slate-800 text-center">Simulador de xat</h2>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'coach' && <span className="text-2xl">{msg.avatar}</span>}
                            <div className={`max-w-xs p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            {msg.sender === 'user' && <span className="text-2xl">{msg.avatar}</span>}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                
                {!isCompleted && (
                    <div className="p-4 border-t border-slate-200 space-y-2">
                        {choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => handleChoice(choice)}
                                className="w-full text-sm text-center p-3 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-sky-100 transition-colors"
                            >
                                {choice.text}
                            </button>
                        ))}
                    </div>
                )}
                 {isCompleted && (
                     <div className="p-4 border-t border-slate-200 text-center bg-teal-50 text-teal-700 font-semibold text-sm">
                        Activitat completada!
                     </div>
                )}
            </div>
        </section>
    );
};

export default ChatSimulatorPage;