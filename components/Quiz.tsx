import { useState, useContext, useEffect } from 'react';
import type { QuizData } from '../types';
import { AppContext } from '../contexts/AppContext';

interface QuizProps {
    quizData: QuizData;
}

const Quiz = ({ quizData }: QuizProps) => {
    const appContext = useContext(AppContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string>('');
    const [isAnswered, setIsAnswered] = useState(false);

    const currentQuestion = quizData.questions[currentQuestionIndex];

    useEffect(() => {
        // Reset state when quizData changes
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setFeedback('');
        setIsAnswered(false);
    }, [quizData]);

    const handleSelectAnswer = (selectedIndex: number) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setSelectedAnswer(selectedIndex);
        const isCorrect = selectedIndex === currentQuestion.answer;

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback('Correcte!');
        } else {
            setFeedback(`Incorrecte. La resposta correcta era l'opció ${currentQuestion.answer + 1}.`);
        }

        setTimeout(() => {
            if (currentQuestionIndex < quizData.questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setIsAnswered(false);
                setSelectedAnswer(null);
                setFeedback('');
            } else {
                appContext?.handleQuizFinish(score + (isCorrect ? 1 : 0), quizData.questions.length, (score + (isCorrect ? 1 : 0)) * quizData.pointsPerCorrect);
            }
        }, 2000);
    };
    
    return (
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Qüestionari</h3>
            <p className="text-sm text-slate-500 mb-6">Pregunta {currentQuestionIndex + 1} de {quizData.questions.length}</p>
            <p className="font-semibold text-slate-700 mb-4">{currentQuestion.q}</p>
            <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                    let buttonClass = 'w-full text-left p-4 bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500';
                    if (isAnswered) {
                        if (index === currentQuestion.answer) {
                            buttonClass += ' bg-teal-100 text-teal-800';
                        } else if (index === selectedAnswer) {
                            buttonClass += ' bg-rose-100 text-rose-800';
                        }
                    } else {
                         buttonClass += ' hover:bg-sky-100';
                    }

                    return (
                        <button 
                            key={index} 
                            onClick={() => handleSelectAnswer(index)} 
                            disabled={isAnswered}
                            className={buttonClass}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
            {feedback && (
                <div className={`mt-4 text-sm font-semibold ${feedback === 'Correcte!' ? 'text-teal-600' : 'text-rose-600'}`}>
                    {feedback}
                </div>
            )}
        </div>
    );
};

export default Quiz;