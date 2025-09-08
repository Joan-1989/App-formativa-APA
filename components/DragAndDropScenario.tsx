import { useState, useContext } from 'react';
import type { DragDropScenarioData, DragDropItem } from '../types';
import { AppContext } from '../contexts/AppContext';

interface DragAndDropScenarioProps {
    scenarioData: DragDropScenarioData;
}

const DragAndDropScenario = ({ scenarioData }: DragAndDropScenarioProps) => {
    const appContext = useContext(AppContext);
    const [unclassifiedItems, setUnclassifiedItems] = useState(scenarioData.items);
    const [classifiedItems, setClassifiedItems] = useState<{[key: string]: DragDropItem[]}>({
        [scenarioData.dropZones[0].id]: [],
        [scenarioData.dropZones[1].id]: [],
    });
    const [isCompleted, setIsCompleted] = useState(false);
    const [feedback, setFeedback] = useState<{[key: string]: 'correct' | 'incorrect'}>({});

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: DragDropItem) => {
        e.dataTransfer.setData("itemId", item.id);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, zoneId: string) => {
        const itemId = e.dataTransfer.getData("itemId");
        const item = unclassifiedItems.find(i => i.id === itemId) || 
                     Object.values(classifiedItems).flat().find(i => i.id === itemId);

        if (item) {
            setUnclassifiedItems(prev => prev.filter(i => i.id !== itemId));
            setClassifiedItems(prev => {
                const newItems = {...prev};
                // Remove from other zones before adding to the new one
                Object.keys(newItems).forEach(key => {
                    newItems[key] = newItems[key].filter(i => i.id !== itemId);
                });
                newItems[zoneId] = [...newItems[zoneId], item];
                return newItems;
            });
        }
    };
    
    const handleCheckAnswers = () => {
        setIsCompleted(true);
        let allCorrect = true;
        const newFeedback: {[key: string]: 'correct' | 'incorrect'} = {};

        scenarioData.dropZones.forEach(zone => {
            classifiedItems[zone.id].forEach(item => {
                if (item.type === zone.accepts) {
                    newFeedback[item.id] = 'correct';
                } else {
                    newFeedback[item.id] = 'incorrect';
                    allCorrect = false;
                }
            });
        });
        
        if (unclassifiedItems.length > 0) allCorrect = false;

        setFeedback(newFeedback);

        if (allCorrect) {
            appContext?.handleGenericActivityFinish(scenarioData.points, 'Ben fet!', 'Has classificat tots els elements correctament.');
        } else {
             appContext?.handleGenericActivityFinish(0, 'Revisa-ho de nou', 'Alguns elements no estan classificats correctament. Intenta-ho una altra vegada quan vulguis.');
        }
    };

    const getFeedbackClass = (itemId: string) => {
        if (!isCompleted) return '';
        if (feedback[itemId] === 'correct') return 'border-teal-500 bg-teal-50';
        if (feedback[itemId] === 'incorrect') return 'border-rose-500 bg-rose-50';
        return '';
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Activitat pràctica</h3>
            <p className="text-slate-600 mb-6">{scenarioData.prompt}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div onDragOver={e => e.preventDefault()} onDrop={e => handleDrop(e, 'unclassified')} className="md:col-span-1 bg-slate-50 p-4 rounded-lg min-h-[150px]">
                    <h4 className="font-semibold text-slate-600 mb-3 text-center">Elements per classificar</h4>
                    <div className="space-y-2">
                        {unclassifiedItems.map(item => (
                            <div key={item.id} draggable={!isCompleted} onDragStart={e => handleDragStart(e, item)}
                                className="p-3 bg-white border border-slate-300 rounded-md cursor-grab shadow-sm">
                                {item.content}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    {scenarioData.dropZones.map(zone => (
                        <div key={zone.id} onDragOver={e => e.preventDefault()} onDrop={e => handleDrop(e, zone.id)}
                             className="bg-slate-50 p-4 rounded-lg min-h-[150px]">
                            <h4 className="font-semibold text-slate-600 mb-3 text-center">{zone.title}</h4>
                             <div className="space-y-2">
                                {classifiedItems[zone.id].map(item => (
                                    <div key={item.id} draggable={!isCompleted} onDragStart={e => handleDragStart(e, item)}
                                        className={`p-3 bg-white border-2 border-dashed rounded-md cursor-grab shadow-sm transition-colors ${getFeedbackClass(item.id)}`}>
                                        {item.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {!isCompleted && (
                 <div className="mt-6 text-center">
                    <button onClick={handleCheckAnswers} className="bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors">
                        Comprova les respostes
                    </button>
                </div>
            )}
        </div>
    );
};

export default DragAndDropScenario;