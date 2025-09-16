import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

interface NavItemProps {
  href: string;
  label: string;
  // Fix: Changed icon type to JSX.Element for better prop type inference with cloneElement.
  icon: JSX.Element;
  currentPage: string;
}

const NavItem = ({ href, label, icon, currentPage }: NavItemProps) => {
    const appContext = useContext(AppContext);
    const isActive = currentPage === href.substring(1);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        appContext?.navigateTo(href.substring(1));
    };

    return (
        <a 
            href={href} 
            onClick={handleClick}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                ? 'text-white bg-sky-600' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
            {React.cloneElement(icon, { className: "h-5 w-5 mr-3"})}
            {label}
        </a>
    );
};


const Sidebar = ({ currentPage }: { currentPage: string }) => {
    const navItems = [
        { href: '#inici', label: 'Inici', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
        { href: '#moduls', label: 'Mòduls', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> },
        { href: '#entrenat', label: 'Entrena\'t', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V5a3 3 0 1 0-6 0v3"/><path d="M12 19a3 3 0 0 0-6 0"/><path d="m13.5 8.5 4-4"/><path d="m13.5 15.5 4 4"/><path d="m8.5 13.5-4 4"/><path d="m8.5 10.5-4-4"/><circle cx="12" cy="12" r="3"/></svg>},
        { href: '#progres', label: 'Progrés', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> },
        { href: '#perfil', label: 'Perfil', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
        { href: '#ajuda', label: 'Ajuda', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path></svg> },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 transition-all duration-300">
            <div className="flex items-center justify-center h-20 px-4 border-b border-slate-200">
                <img src="/assets/logo-apa.png" alt="Logo Acencas Prevenció Activa" className="h-16 object-contain" />
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(item => (
                    <NavItem key={item.href} {...item} currentPage={currentPage} />
                ))}
            </nav>
            <div className="px-4 py-6 border-t border-slate-200">
                <div className="p-4 rounded-lg text-center space-y-4">
                    <p className="text-xs text-slate-500 font-semibold">Amb la col·laboració de:</p>
                    <img src="/assets/logo-opa.png" alt="Logo Observatori Prevenció Activa" className="h-16 mx-auto object-contain" />
                    <div className="pt-4 mt-4 border-t border-slate-200">
                        <p className="text-sm text-slate-600">© 2025 ACENCAS</p>
                        <p className="text-xs text-slate-500 mt-1">Desenvolupat per Plataforma de Comunicació</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
