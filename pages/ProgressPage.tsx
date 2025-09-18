import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { ALL_BADGES } from '../constants';
import type { RankingUser } from '../types';
import { getRankingList } from '../services/firestoreService';

const ProgressPage = () => {
    const appContext = useContext(AppContext);
    const [ranking, setRanking] = useState<RankingUser[]>([]);
    
    if (!appContext) return null;
    const { user, modules } = appContext;
    
    useEffect(() => {
        const fetchRanking = async () => {
            const rankingList = await getRankingList();
            setRanking(rankingList);
        };
        fetchRanking();
    }, []);

    const completedModulesCount = Object.values(modules).filter(m => m.status === 'completed').length;
    const totalModulesCount = Object.values(modules).length;

    return (
        <section className="fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">El teu progrés</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 text-center">
                    <p className="text-3xl font-bold text-sky-600">{user.points.toLocaleString('es-ES')}</p>
                    <p className="text-sm text-slate-500 mt-1">Punts totals</p>
                </div>
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 text-center">
                    <p className="text-3xl font-bold text-sky-600">{completedModulesCount}/{totalModulesCount}</p>
                    <p className="text-sm text-slate-500 mt-1">Mòduls completats</p>
                </div>
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 text-center">
                    <p className="text-3xl font-bold text-sky-600">{user.badges.length}</p>
                    <p className="text-sm text-slate-500 mt-1">Insígnies obtingudes</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-slate-700 mb-4">Les teves insígnies</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {ALL_BADGES.map(badge => {
                            const hasBadge = user.badges.includes(badge.id);
                            const colorClasses = hasBadge ? `bg-${badge.color}-100 text-${badge.color}-600` : 'bg-slate-100 text-slate-400';
                            return (
                                <div key={badge.id} className={`text-center ${hasBadge ? '' : 'opacity-50'}`}>
                                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl ${colorClasses}`}>
                                        {badge.icon}
                                    </div>
                                    <p className="text-sm font-semibold mt-2 text-slate-700">{badge.name}</p>
                                    <p className="text-xs mt-1 text-slate-500">{badge.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                     <h3 className="text-xl font-bold text-slate-700 mb-4">Rànquing</h3>
                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                         <ul className="space-y-3">
                            {ranking.map((rankedUser: RankingUser, index: number) => {
                                const isCurrentUser = rankedUser.id === user.id;
                                const rankIcon = ['🥇', '🥈', '🥉'][index] || `${index + 1}`;
                                return (
                                    <li key={rankedUser.id} className={`flex items-center p-2 rounded-lg ${isCurrentUser ? 'bg-sky-100' : ''}`}>
                                        <span className="font-bold w-8 text-center">{rankIcon}</span>
                                        <span className="flex-1 font-medium text-slate-700">{isCurrentUser ? `${rankedUser.name} (Tu)` : rankedUser.name}</span>
                                        <span className="font-bold text-sky-600">{rankedUser.points.toLocaleString('es-ES')} pts</span>
                                    </li>
                                );
                            })}
                         </ul>
                         <p className="text-xs text-slate-400 mt-4 text-center">El rànquing es basa en els usuaris actius.</p>
                     </div>
                </div>
            </div>
        </section>
    );
};

export default ProgressPage;