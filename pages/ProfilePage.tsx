import { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import type { User } from '../types';

const ProfilePage = () => {
    const appContext = useContext(AppContext);

    // State for user editing
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(appContext?.user.name || '');

    // State for preferences
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    if (!appContext) return null;
    const { user, updateUser, resetProgress } = appContext;

    const handleNameEdit = () => {
        setIsEditingName(true);
    };

    const handleNameSave = () => {
        if (editedName.trim() && updateUser) {
            const updatedUser: User = { ...user, name: editedName.trim() };
            updateUser(updatedUser);
        }
        setIsEditingName(false);
    };

    const handleNameCancel = () => {
        setEditedName(user.name);
        setIsEditingName(false);
    };
    
    const handleResetProgress = () => {
        if (window.confirm("Estàs segur que vols restablir tot el teu progrés? Aquesta acció no es pot desfer.")) {
            if (resetProgress) {
                resetProgress();
            }
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <section className="fade-in max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">El teu perfil</h2>
            
            {/* User Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-3xl font-bold flex-shrink-0">
                        {getInitials(user.name)}
                    </div>
                    <div className="flex-grow">
                        {isEditingName ? (
                            <input 
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="text-xl font-bold text-slate-800 w-full p-2 border border-sky-300 rounded-md"
                                autoFocus
                            />
                        ) : (
                            <h3 className="text-xl font-bold text-slate-800 flex items-center">
                                {user.name}
                                <button onClick={handleNameEdit} className="ml-3 text-slate-500 hover:text-sky-600">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
                                </button>
                            </h3>
                        )}
                        <p className="text-amber-600 font-semibold">{user.points.toLocaleString('es-ES')} punts</p>
                    </div>
                </div>
                {isEditingName && (
                    <div className="flex justify-end space-x-2 mt-4">
                        <button onClick={handleNameCancel} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">Cancel·lar</button>
                        <button onClick={handleNameSave} className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700">Desar</button>
                    </div>
                )}
            </div>

            {/* Preferences Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
                 <h4 className="text-lg font-semibold text-slate-700 mb-4">Preferències</h4>
                 <ul className="divide-y divide-slate-200">
                    <li className="flex items-center justify-between py-3">
                        <span className="text-slate-600">Notificacions per correu electrònic</span>
                        <button onClick={() => setEmailNotifications(!emailNotifications)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? 'bg-sky-600' : 'bg-slate-300'}`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </li>
                    <li className="flex items-center justify-between py-3">
                        <span className="text-slate-600">Tema fosc</span>
                        <button onClick={() => setDarkMode(!darkMode)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-sky-600' : 'bg-slate-300'}`}>
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </li>
                 </ul>
            </div>

            {/* Danger Zone Card */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-200">
                 <h4 className="text-lg font-semibold text-rose-700 mb-4">Zona de perill</h4>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-700">Restablir progrés</p>
                            <p className="text-sm text-slate-500">Això esborrarà tots els teus punts, insígnies i progrés dels mòduls.</p>
                        </div>
                        <button onClick={handleResetProgress} className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 flex-shrink-0">
                            Restablir
                        </button>
                    </div>
                     <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div>
                            <p className="font-medium text-slate-700">Tancar sessió</p>
                            <p className="text-sm text-slate-500">Tanca la sessió actual al teu dispositiu.</p>
                        </div>
                        <button className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 flex-shrink-0">
                            Tancar sessió
                        </button>
                    </div>
                 </div>
            </div>
        </section>
    );
};

export default ProfilePage;