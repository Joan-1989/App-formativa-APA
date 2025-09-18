import { useState, useContext } from 'react';
import type { ReflectionJournalData } from '../types';
import { AppContext } from '../contexts/AppContext';

interface ReflectionJournalProps {
    journalData: ReflectionJournalData;
}

const ReflectionJournal = ({ journalData }: ReflectionJournalProps) => {
    const appContext = useContext(AppContext);
    const [text, setText] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSave = () => {
        if (text.trim().length < 20) {
            alert('Si us plau, escriu una reflexió una mica més llarga.');
            return;
        }
        setIsCompleted(true);
        appContext?.handleGenericActivityFinish(
            journalData.points, 
            'Reflexió guardada!', 
            'Gràcies per compartir els teus pensaments.',
            'moduls',
            { journalText: text }
        );
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Diari de reflexió</h3>
            <p className="text-slate-600 mb-4">{journalData.prompt}</p>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isCompleted}
                rows={6}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                placeholder="Escriu la teva reflexió aquí..."
            ></textarea>
            
            {isCompleted ? (
                <div className="mt-4 text-center p-4 bg-teal-50 text-teal-700 rounded-lg">
                    <p className="font-semibold">La teva reflexió s'ha completat correctament.</p>
                </div>
            ) : (
                <div className="mt-4 text-center">
                    <button
                        onClick={handleSave}
                        className="bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-700 disabled:bg-slate-400 transition-colors"
                        disabled={text.trim().length < 10}
                    >
                        Guardar i continuar
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReflectionJournal;