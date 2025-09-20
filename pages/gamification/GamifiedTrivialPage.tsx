import { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

interface Question {
    q: string;
    options: string[];
    answer: number;
    explanation: string;
}

const TRIVIAL_QUESTIONS: Question[] = [
    {
        q: "Quina tècnica és útil per gestionar un impuls de compra sobtat?",
        options: ["Comprar-ho immediatament per no perdre l'oferta", "Esperar 24 hores abans de prendre la decisió", "Buscar més ofertes similars per comparar"],
        answer: 1,
        explanation: "La regla de les 24 hores és una eina eficaç de 'mindful shopping'. Ajuda a distingir entre un desig impulsiu i una necessitat real, reduint les compres compulsives."
    },
    {
        q: "Quin d'aquests elements de les apps de 'ultra fast fashion' NO està dissenyat per crear urgència?",
        options: ["Comptadors regressius ('l'oferta acaba en...')", "Descripcions detallades del material del producte", "Alertes de 'poques unitats en estoc'"],
        answer: 1,
        explanation: "Els comptadors regressius i les alertes d'escassetat són 'dark patterns' que activen el FOMO (Fear Of Missing Out) per fomentar la compra impulsiva. La descripció del producte és informativa."
    },
    {
        q: "L'anomenada 'gamificació' a les apps de compres utilitza mecàniques de videojocs per...",
        options: ["Assegurar la qualitat dels productes", "Educar sobre consum responsable", "Fomentar la compra impulsiva i l'ús recurrent de l'app"],
        answer: 2,
        explanation: "La gamificació, amb recompenses constants i aleatòries com les ruletes de la fortuna, transforma l'experiència de compra en un joc addictiu per mantenir l'usuari captivat."
    },
    {
        q: "Què és el 'doomscrolling'?",
        options: ["Navegar per notícies positives per millorar l'estat d'ànim", "Consumir grans quantitats de notícies negatives de forma passiva", "Planificar les teves compres online amb antelació"],
        answer: 1,
        explanation: "El 'doomscrolling' és l'hàbit de passar temps excessiu llegint notícies negatives, la qual cosa pot augmentar l'ansietat i empitjorar l'estat d'ànim."
    }
];

const POINTS_PER_CORRECT = 50;

const GamifiedTrivialPage = () => {
    const appContext = useContext(AppContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    
    const currentQuestion = TRIVIAL_QUESTIONS[currentQuestionIndex];
    const progressPercentage = (currentQuestionIndex / TRIVIAL_QUESTIONS.length) * 100;

    const handleSelectAnswer = (selectedIndex: number) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setSelectedAnswer(selectedIndex);
        
        if (selectedIndex === currentQuestion.answer) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < TRIVIAL_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setIsAnswered(false);
                setSelectedAnswer(null);
            } else {
                const finalScore = selectedIndex === currentQuestion.answer ? score + 1 : score;
                appContext?.handleQuizFinish(finalScore, TRIVIAL_QUESTIONS.length, finalScore * POINTS_PER_CORRECT, 'entrenat');
            }
        }, 3000);
    };

    return (
        <section className="fade-in max-w-2xl mx-auto">
            <button onClick={() => appContext?.navigateTo('entrenat')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Tornar a Entrena't
            </button>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Trivial de benestar digital</h2>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-sky-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-1">Pregunta {currentQuestionIndex + 1} de {TRIVIAL_QUESTIONS.length}</p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-lg">
                    <p className="font-semibold text-slate-700 text-center text-lg">{currentQuestion.q}</p>
                </div>

                <div className="space-y-3 mt-6">
                    {currentQuestion.options.map((option, index) => {
                        let buttonClass = 'w-full text-left p-4 rounded-lg transition-all duration-300 transform focus:outline-none disabled:cursor-not-allowed font-medium';
                        if (isAnswered) {
                            if (index === currentQuestion.answer) {
                                buttonClass += ' bg-teal-500 text-white scale-105';
                            } else if (index === selectedAnswer) {
                                buttonClass += ' bg-rose-500 text-white';
                            } else {
                                buttonClass += ' bg-slate-200 text-slate-500';
                            }
                        } else {
                            buttonClass += ' bg-slate-100 hover:bg-sky-100 hover:text-sky-800';
                        }
                        return (
                            <button key={index} onClick={() => handleSelectAnswer(index)} disabled={isAnswered} className={buttonClass}>
                                {option}
                            </button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-200 fade-in">
                        <p className="text-sm text-sky-800"><span className="font-bold">Explicació:</span> {currentQuestion.explanation}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GamifiedTrivialPage;