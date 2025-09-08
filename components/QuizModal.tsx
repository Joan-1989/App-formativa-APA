import type { ModalContent } from '../types';

interface QuizModalProps {
    content: ModalContent;
    onClose: () => void;
}

const QuizModal = ({ content, onClose }: QuizModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full fade-in">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-5xl mb-4 ${content.iconBgColor} ${content.iconTextColor}`}>
                    {content.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{content.title}</h3>
                {content.scoreText && <p className="text-slate-600 mb-1">{content.scoreText}</p>}
                <p className="text-amber-600 font-semibold mb-6">{content.pointsText}</p>
                <button 
                    onClick={onClose} 
                    className="w-full bg-sky-600 text-white font-semibold py-3 rounded-lg hover:bg-sky-700 transition-colors"
                >
                    Tornar als mòduls
                </button>
            </div>
        </div>
    );
};

export default QuizModal;