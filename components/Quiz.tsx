import { useState, useContext, useEffect } from 'react';
import type { QuizData } from '../types';
import { AppContext } from '../contexts/AppContext';

interface QuizProps {
    quizData: QuizData;
    redirectOnFinish?: string;
}

const Quiz = ({ quizData, redirectOnFinish = 'moduls' }: QuizProps) => {
    const appContext = useContext(AppContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string>('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [explanation, setExplanation] = useState<string>('');

    const currentQuestion = quizData.questions[currentQuestionIndex];

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setFeedback('');
        setExplanation('');
        setIsAnswered(false);
    }, [quizData]);
    
    const showNextQuestionOrFinish = () => {
         if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnswered(false);
            setSelectedAnswer(null);
            setFeedback('');
            setExplanation('');
        } else {
            appContext?.handleQuizFinish(score, quizData.questions.length, score * quizData.pointsPerCorrect, redirectOnFinish);
        }
    }

    const handleSelectAnswer = (selectedIndex: number) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setSelectedAnswer(selectedIndex);
        const isCorrect = selectedIndex === currentQuestion.answer;
        
        let finalScore = score;
        if (isCorrect) {
            finalScore++;
            setScore(finalScore);
            setFeedback('Correcte!');
        } else {
            setFeedback(`Incorrecte.`);
        }
        
        if (currentQuestion.explanation) {
            setExplanation(currentQuestion.explanation);
        }

        setTimeout(() => {
            if (currentQuestionIndex < quizData.questions.length - 1) {
                showNextQuestionOrFinish();
            } else {
                 appContext?.handleQuizFinish(finalScore, quizData.questions.length, finalScore * quizData.pointsPerCorrect, redirectOnFinish);
            }
        }, explanation ? 4000 : 2000);
    };
    
    return (
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Qüestionari</h3>
            <p className="text-sm text-slate-500 mb-6">Pregunta {currentQuestionIndex + 1} de {quizData.questions.length}</p>
            <p className="font-semibold text-slate-700 mb-4">{currentQuestion.q}</p>
            <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                    let buttonClass = 'w-full text-left p-4 bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:cursor-not-allowed';
                    if (isAnswered) {
                        if (index === currentQuestion.answer) {
                            buttonClass += ' bg-teal-100 text-teal-800 ring-2 ring-teal-500';
                        } else if (index === selectedAnswer) {
                            buttonClass += ' bg-rose-100 text-rose-800 ring-2 ring-rose-500';
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
                <div className={`mt-4 text-sm font-semibold p-3 rounded-lg ${isAnswered && selectedAnswer === currentQuestion.answer ? 'bg-teal-50 text-teal-700' : 'bg-rose-50 text-rose-700'}`}>
                    <p className="font-bold">{feedback}</p>
                    {explanation && <p className="mt-1 font-normal">{explanation}</p>}
                </div>
            )}
        </div>
    );
};

export default Quiz;