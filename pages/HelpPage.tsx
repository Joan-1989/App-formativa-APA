import { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const HelpPage = () => {
    const appContext = useContext(AppContext);
    const [formSubmitted, setFormSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission logic
        setFormSubmitted(true);
    };

    return (
        <section className="fade-in max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Necessites ajuda?</h2>
            <p className="text-slate-500 mb-8">Estem aquí per a tu. Contacta amb nosaltres de forma confidencial.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact an expert card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
                     <img src="https://i.pravatar.cc/100?u=francesc" alt="Foto de Francesc Perendreu" className="w-24 h-24 rounded-full mb-4" />
                     <h3 className="text-xl font-bold text-slate-800">Parla amb un expert</h3>
                     <p className="text-slate-600 mt-2 mb-4 flex-grow">Sol·licita una visita online i confidencial amb el Sr. Francesc Perendreu, president d'ACENCAS Prevenció Activa.</p>
                     <a 
                        href="mailto:contacte@acencas.org?subject=Sol·licitud%20de%20visita%20online" 
                        className="w-full bg-sky-600 text-white font-semibold py-3 rounded-lg hover:bg-sky-700 transition-colors text-center">
                        Sol·licita una visita
                     </a>
                </div>

                {/* Contact form card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Envia'ns un missatge</h3>
                    {formSubmitted ? (
                        <div className="h-full flex flex-col items-center justify-center bg-teal-50 p-6 rounded-lg text-center">
                            <svg className="h-12 w-12 text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h4 className="font-semibold text-teal-800">Missatge enviat!</h4>
                            <p className="text-sm text-teal-700 mt-1">Gràcies per contactar-nos. Et respondrem el més aviat possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Nom</label>
                                <input type="text" id="name" defaultValue={appContext?.user.name} required className="w-full p-2 bg-slate-100 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Correu electrònic</label>
                                <input type="email" id="email" required className="w-full p-2 bg-slate-100 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-600 mb-1">Missatge</label>
                                <textarea id="message" rows={4} required className="w-full p-2 bg-slate-100 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-slate-700 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition-colors">
                                Enviar missatge
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HelpPage;
