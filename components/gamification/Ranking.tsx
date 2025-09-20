import { useState, useMemo } from 'react';
import type { RankingUser } from '../../types';

interface RankingProps {
    ranking: RankingUser[];
    currentUserId: string;
}

const Ranking = ({ ranking, currentUserId }: RankingProps) => {
    const [sortBy, setSortBy] = useState<'points' | 'name'>('points');

    const sortedRanking = useMemo(() => {
        return [...ranking].sort((a, b) => {
            if (sortBy === 'points') {
                return b.points - a.points;
            }
            return a.name.localeCompare(b.name);
        });
    }, [ranking, sortBy]);

    const getRankContent = (index: number) => {
        const rank = index + 1;
        if (rank === 1) return <span className="text-2xl">🥇</span>;
        if (rank === 2) return <span className="text-2xl">🥈</span>;
        if (rank === 3) return <span className="text-2xl">🥉</span>;
        return <span className="font-bold text-slate-500">{rank}</span>;
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-center mb-4 border-b border-slate-200 pb-2">
                <span className="text-sm text-slate-500 mr-2">Ordenar per:</span>
                <button
                    onClick={() => setSortBy('points')}
                    className={`px-3 py-1 text-sm rounded-md ${sortBy === 'points' ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'}`}
                >
                    Punts
                </button>
                <button
                    onClick={() => setSortBy('name')}
                    className={`ml-2 px-3 py-1 text-sm rounded-md ${sortBy === 'name' ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'}`}
                >
                    Nom
                </button>
            </div>
            <ul className="space-y-2">
                {sortedRanking.map((user, index) => {
                    const isCurrentUser = user.id === currentUserId;
                    const level = Math.floor(user.points / 500) + 1;

                    return (
                        <li key={user.id} className={`transition-all duration-300 ${isCurrentUser ? 'transform scale-105' : ''}`}>
                             <div className={`flex items-center p-3 rounded-xl ${isCurrentUser ? 'bg-sky-100 border-2 border-sky-500' : 'bg-slate-50'}`}>
                                <div className="w-10 text-center flex-shrink-0">{getRankContent(index)}</div>
                                <div className="flex-grow mx-3">
                                    <p className={`font-bold truncate ${isCurrentUser ? 'text-sky-800' : 'text-slate-800'}`}>
                                        {user.name} {isCurrentUser && '(Tu)'}
                                    </p>
                                    <p className="text-xs text-slate-500">Nivell {level}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-amber-600">{user.points.toLocaleString('es-ES')}</p>
                                    <p className="text-xs text-slate-500">punts</p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
             <p className="text-xs text-slate-400 mt-4 text-center">El rànquing es basa en els usuaris actius.</p>
        </div>
    );
};

export default Ranking;