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
            className={`flex flex-col items-center justify-center rounded-lg h-full transition-colors w-full ${
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
        { href: '#entrenat', label: 'Entrena\'t', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V5a3 3 0 1 0-6 0v3"/><path d="M12 19a3 3 0 0 0-6 0"/><path d="m13.5 8.5 4-4"/><path d="m13.5 15.5 4 4"/><path d="m8.5 13.5-4 4"/><path d="m8.5 10.5-4-4"/><circle cx="12" cy="12" r="3"/></svg>},
        { href: '#progres', label: 'Progrés', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> },
        { href: '#ajuda', label: 'Ajuda', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path></svg> },
    ];

    return (
        <nav className="md:hidden grid grid-cols-5 gap-1 h-20 bg-white border-t border-slate-200 p-1 flex-shrink-0">
            {navItems.map(item => (
                <MobileNavItem key={item.href} {...item} isActive={currentPage === item.href.substring(1)} />
            ))}
        </nav>
    );
};

export default BottomNav;
