import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import ModuleCard from '../components/ModuleCard';

const ModulesPage = () => {
    const appContext = useContext(AppContext);
    
    if (!appContext) return null;
    const { modules } = appContext;

    const mobileModuleIds = Object.keys(modules).filter((id) => id.startsWith('m01'));
    const gamingModuleIds = Object.keys(modules).filter((id) => id.startsWith('m02'));
    const socialModuleIds = Object.keys(modules).filter((id) => id.startsWith('m03'));

    return (
        <section className="fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">Mòduls formatius</h2>
            
            <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-700 mb-4">Ús saludable del mòbil</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mobileModuleIds.map((id) => (
                        <ModuleCard 
                            key={id} 
                            module={modules[id]} 
                            onClick={() => appContext.openModule(id)} 
                        />
                    ))}
                </div>
            </div>

             <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-700 mb-4">Prevenció de la Ludopatia</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gamingModuleIds.map((id) => (
                        <ModuleCard 
                            key={id} 
                            module={modules[id]} 
                            onClick={() => appContext.openModule(id)} 
                        />
                    ))}
                </div>
            </div>

            <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-700 mb-4">Altres addiccions socials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {socialModuleIds.map((id) => (
                        <ModuleCard 
                            key={id} 
                            module={modules[id]} 
                            onClick={() => appContext.openModule(id)} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ModulesPage;