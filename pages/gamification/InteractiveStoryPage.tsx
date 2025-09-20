import { useState, useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

type Scene = {
    id: number;
    image: string;
    text: string;
    options: { text: string; nextSceneId: number; wellnessEffect: number }[];
};

const STORY_DATA: Scene[] = [
    {
        id: 1,
        image: '/assets/story-1.png',
        text: "Són les 10 de la nit. Estàs al sofà després d'un llarg dia de feina. El teu mòbil vibra. Què fas?",
        options: [
            { text: "L'agafo i faig 'scroll' per desconnectar.", nextSceneId: 2, wellnessEffect: -10 },
            { text: "El deixo en silenci i agafo un llibre.", nextSceneId: 3, wellnessEffect: 15 },
        ]
    },
    {
        id: 2,
        image: '/assets/story-2.png',
        text: "Passa una hora volant. Sents els ulls cansats i una mica d'ansietat per una notícia que has llegit. Són les 11. Què fas?",
        options: [
            { text: "Continuo navegant, potser trobo alguna cosa interessant.", nextSceneId: 4, wellnessEffect: -20 },
            { text: "El deixo, conscient que no m'està ajudant.", nextSceneId: 3, wellnessEffect: 10 },
        ]
    },
    {
        id: 3,
        image: '/assets/story-3.png',
        text: "Llegeixes una estona i comences a sentir son. La teva ment està més tranquil·la. És hora d'anar a dormir.",
        options: [
            { text: "Faig una última ullada ràpida al mòbil des del llit.", nextSceneId: 4, wellnessEffect: -15 },
            { text: "Deixo el mòbil carregant lluny del llit i apago el llum.", nextSceneId: 5, wellnessEffect: 20 },
        ]
    },
    {
        id: 4,
        image: '/assets/story-4.png',
        text: "La llum blava de la pantalla i el flux constant d'informació t'activen la ment. Et costa adormir-te i el son no és reparador.",
        options: [
            { text: "Finalitzar la història.", nextSceneId: 99, wellnessEffect: 0 },
        ]
    },
    {
        id: 5,
        image: '/assets/story-5.png',
        text: "Dorms profundament i et despertes amb més energia i la ment més clara l'endemà.",
        options: [
            { text: "Finalitzar la història.", nextSceneId: 99, wellnessEffect: 0 },
        ]
    }
];

const InteractiveStoryPage = () => {
    const appContext = useContext(AppContext);
    const [currentSceneId, setCurrentSceneId] = useState(1);
    const [wellnessScore, setWellnessScore] = useState(50);
    const [path, setPath] = useState<number[]>([1]);

    const currentScene = STORY_DATA.find(scene => scene.id === currentSceneId)!;

    const handleOptionClick = (nextSceneId: number, wellnessEffect: number) => {
        if (nextSceneId === 99) {
            const finalScore = wellnessScore + wellnessEffect;
            const points = Math.max(0, Math.round(finalScore / 100 * 200)); // Max 200 points
            appContext?.handleGenericActivityFinish(points, "Història finalitzada!", `El teu nivell de benestar final és de ${finalScore}%.`, 'entrenat');
            return;
        }

        setWellnessScore(prev => Math.max(0, Math.min(100, prev + wellnessEffect)));
        setPath(prev => [...prev, nextSceneId]);
        setCurrentSceneId(nextSceneId);
    };

    const getWellnessColor = () => {
        if (wellnessScore > 70) return 'bg-teal-500';
        if (wellnessScore > 40) return 'bg-amber-500';
        return 'bg-rose-500';
    };

    return (
        <section className="fade-in max-w-2xl mx-auto">
            <button onClick={() => appContext?.navigateTo('entrenat')} className="flex items-center text-sm text-sky-600 font-semibold mb-6 hover:underline">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Tornar a Entrena't
            </button>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 text-center">Una decisió nocturna</h2>
                    <div className="mt-2">
                        <p className="text-sm text-center text-slate-600">Nivell de benestar: {wellnessScore}%</p>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-1">
                            <div className={`${getWellnessColor()} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${wellnessScore}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <img src={currentScene.image} alt="Escena de la història" className="w-full h-48 object-cover rounded-lg mb-4" />
                    <p className="text-slate-600 mb-6 text-lg text-center">{currentScene.text}</p>
                    
                    <div className="space-y-3">
                        {currentScene.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option.nextSceneId, option.wellnessEffect)}
                                className="w-full text-center p-4 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors transform hover:scale-105"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveStoryPage;