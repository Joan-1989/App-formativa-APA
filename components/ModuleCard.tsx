import type { ModuleData } from '../types';

interface ModuleCardProps {
    module: ModuleData;
    onClick: () => void;
}

const ModuleCard = ({ module, onClick }: ModuleCardProps) => {
    const getStatusText = () => {
        switch(module.status) {
            case 'completed':
                return <p className="text-xs text-teal-600 mt-2 font-medium flex justify-between items-center"><span>Completat</span> {module.points && <span className="text-amber-600">+{module.points} punts</span>}</p>;
            case 'inprogress':
                return <p className="text-xs text-sky-700 mt-2 font-medium">En curs</p>;
            case 'locked':
                 return <p className="text-xs text-slate-500 mt-2 font-medium">Bloquejat</p>;
            default:
                return null;
        }
    }
    
    const getProgressBarColor = () => {
        switch(module.status) {
            case 'completed': return 'bg-teal-500';
            case 'inprogress': return 'bg-sky-600';
            default: return 'bg-slate-300';
        }
    }
    
    const iconMap = {
        '1.': <svg className="h-6 w-6 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
        '2.': <svg className="h-6 w-6 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>,
        '3.': <svg className="h-6 w-6 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
    }
    
    const moduleNumber = module.title.substring(0, 2);

    return (
        <div 
            className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-200 group transition-shadow ${module.status !== 'locked' ? 'hover:shadow-md cursor-pointer' : 'opacity-60'}`}
            onClick={module.status !== 'locked' ? onClick : undefined}
        >
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                {iconMap[moduleNumber as keyof typeof iconMap] || iconMap['1.']}
            </div>
            <h4 className="font-semibold text-slate-800">{module.title}</h4>
            <p className="text-sm text-slate-500 mt-1 mb-4 h-10">{module.subtitle}</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
                <div className={`${getProgressBarColor()} h-2 rounded-full`} style={{ width: `${module.progress}%` }}></div>
            </div>
            {getStatusText()}
        </div>
    );
};

export default ModuleCard;