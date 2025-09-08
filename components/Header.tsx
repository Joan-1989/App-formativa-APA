import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const Header = () => {
    const appContext = useContext(AppContext);
    
    return (
        <header className="flex md:hidden items-center justify-between h-16 bg-white border-b border-slate-200 px-4 flex-shrink-0">
            <img src="/assets/logo-apa.png" alt="Logo Acencas Prevenció Activa" className="h-12 object-contain" />
            <div className="text-slate-600 font-medium">{appContext?.user.name}</div>
        </header>
    );
};

export default Header;