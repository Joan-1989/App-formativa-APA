import { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    AuthError
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                if (!email || !password) {
                    setError('Si us plau, omple tots els camps.');
                    setIsLoading(false);
                    return;
                }
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                 if (!name || !email || !password) {
                    setError('Si us plau, omple tots els camps.');
                    setIsLoading(false);
                    return;
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (userCredential.user) {
                    await updateProfile(userCredential.user, { displayName: name });
                    // Trigger a re-render or state update in App.tsx by reloading, not ideal but works for now.
                    // A better approach would be to lift state up or use a global state manager.
                    // Forcing a reload to make sure the displayName is reflected everywhere.
                    window.location.reload();
                }
            }
        } catch (err) {
            const authError = err as AuthError;
            switch (authError.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setError('Correu electrònic o contrasenya incorrectes.');
                    break;
                case 'auth/email-already-in-use':
                    setError('Aquest correu electrònic ja està en ús.');
                    break;
                case 'auth/weak-password':
                    setError('La contrasenya ha de tenir almenys 6 caràcters.');
                    break;
                default:
                    setError('Ha ocorregut un error. Si us plau, torna a intentar-ho.');
                    console.error(authError);
                    break;
            }
            setIsLoading(false);
        }
        // No need to setIsLoading(false) on success, as the component will unmount
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <img src="/assets/logo-apa.png" alt="Logo Acencas Prevenció Activa" className="h-20 mx-auto object-contain mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800">{isLogin ? 'Inicia sessió' : 'Crea un compte'}</h2>
                    <p className="text-slate-500">
                        {isLogin ? 'Entra per continuar aprenent.' : 'Registra\'t per començar el teu camí.'}
                    </p>
                </div>
                <form onSubmit={handleAuthAction} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-600">Nom</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-600">Correu electrònic</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-slate-600">Contrasenya</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                             className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>
                    
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-sky-400"
                        >
                            {isLoading ? 'Processant...' : (isLogin ? 'Accedir' : 'Registrar-se')}
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <button onClick={() => {setIsLogin(!isLogin); setError('');}} className="font-medium text-sky-600 hover:text-sky-500">
                        {isLogin ? 'No tens un compte? Registra\'t' : 'Ja tens un compte? Inicia sessió'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;