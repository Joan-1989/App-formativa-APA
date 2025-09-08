import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

interface MobileNavItemProps {
  href: string;
  label: string;
  // Fix: Changed icon type to JSX.Element for better prop type inference with cloneElement.
  icon: JSX.Element;
  isActive: boolean;
}

const MobileNavItem = ({ href, label, icon, isActive }: MobileNavItemProps) => {
    const appContext = useContext(AppContext);
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        appContext?.navigateTo(href.substring(1));
    };

    return (
        <a 
            href={href} 
            onClick={handleClick}
            className={`flex flex-col items-center justify-center rounded-lg h-full transition-colors ${
                isActive ? 'text-sky-600 bg-sky-50' : 'text-slate-500'
            }`}
        >
            {React.cloneElement(icon, { className: "h-6 w-6 mb-1"})}
            <span className="text-xs font-medium">{label}</span>
        </a>
    );
};

const BottomNav = ({ currentPage }: { currentPage: string }) => {
    const navItems = [
        { href: '#inici', label: 'Inici', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
        { href: '#moduls', label: 'Mòduls', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> },
        { href: '#progres', label: 'Progrés', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> },
        { href: '#perfil', label: 'Perfil', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
    ];

    return (
        <nav className="md:hidden grid grid-cols-4 gap-2 h-20 bg-white border-t border-slate-200 p-2 flex-shrink-0">
            {navItems.map(item => (
                <MobileNavItem key={item.href} {...item} isActive={currentPage === item.href.substring(1)} />
            ))}
        </nav>
    );
};

export default BottomNav;