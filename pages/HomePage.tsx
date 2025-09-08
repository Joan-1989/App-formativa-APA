import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { ALL_BADGES } from '../constants';
import type { BadgeInfo } from '../types';

const HomePage = () => {
    const appContext = useContext(AppContext);

    if (!appContext) return null;
    const { user, navigateTo, modules } = appContext;

    const completedModules = Object.values(modules).filter(m => m.status === 'completed').length;
    const totalModules = Object.values(modules).length;
    const progressPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
    const strokeDashoffset = 339.29 * (1 - progressPercentage / 100);

    const lastTwoBadges = user.badges
        .map(badgeId => ALL_BADGES.find(b => b.id === badgeId))
        .filter((b): b is BadgeInfo => !!b)
        .slice(-2);
    const nextBadge = ALL_BADGES.find(b => !user.badges.includes(b.id));


    return (
        <section className="fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Bon dia, {user.name}</h2>
            <p className="text-slate-500 mb-8">Estem contents de veure't de nou. Continuem aprenent junts.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 bg-sky-600 text-white rounded-2xl shadow-lg shadow-sky-200 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-1">El teu camí cap al benestar digital</h3>
                        <p className="text-sky-200 mb-4 max-w-md">Has completat el {progressPercentage}% de la teva formació. Felicitats pel teu progrés!</p>
                        <button onClick={() => navigateTo('moduls')} className="bg-white text-sky-600 font-semibold px-5 py-2.5 rounded-lg hover:bg-sky-50 transition-colors">
                            Continua aprenent
                        </button>
                    </div>
                    <div className="relative mt-6 md:mt-0">
                        <svg className="transform -rotate-90" width="120" height="120" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" />
                            <circle cx="60" cy="60" r="54" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeDasharray="339.29" strokeDashoffset={strokeDashoffset} />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{progressPercentage}%</span>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                     <h3 className="text-lg font-semibold text-slate-700 mb-4">Últimes insígnies</h3>
                     <div className="flex space-x-4">
                        {lastTwoBadges.map(badge => (
                            <div key={badge.id} className="flex-shrink-0 text-center">
                                <div className={`w-16 h-16 bg-${badge.color}-100 rounded-full flex items-center justify-center text-${badge.color}-600 text-3xl`}>{badge.icon}</div>
                                <p className="text-xs mt-2 text-slate-500">{badge.name}</p>
                            </div>
                        ))}
                        {nextBadge && (
                             <div className="flex-shrink-0 text-center">
                                 <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 text-3xl">🔒</div>
                                 <p className="text-xs mt-2 text-slate-400">{nextBadge.name}</p>
                             </div>
                        )}
                        {lastTwoBadges.length === 0 && !nextBadge && (
                            <p className="text-slate-500 text-sm">Comença un mòdul per guanyar la teva primera insígnia!</p>
                        )}
                     </div>
                </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4">Reptes actius</h3>
             <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center">
                   <svg className="h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-slate-800">24h sense notificacions</h4>
                    <p className="text-slate-600 text-sm mt-1">Aplica el que has après i desconnecta les alertes de xarxes socials durant un dia.</p>
                </div>
                <button className="ml-auto bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex-shrink-0">
                    Accepta el repte
                </button>
            </div>
        </section>
    );
};

export default HomePage;