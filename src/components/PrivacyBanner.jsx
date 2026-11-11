import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setConsent, useConsent } from '../utils/consent';

// Banner del consenso: compare finché il visitatore non sceglie.
// "Accetta" abilita i contenuti di terze parti (Google Maps), "Rifiuta" no.
// La scelta si può cambiare dalla pagina Privacy.
export default function PrivacyBanner() {
    const consent = useConsent();
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (consent !== null) return;
        // Piccolo ritardo per effetto più scenografico
        const t = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(t);
    }, [consent]);

    const choose = value => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
            setConsent(value);
        }, 500);
    };

    if (!isVisible || (consent !== null && !isClosing)) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 z-50 w-full transition-all duration-500 ease-out ${
                isClosing
                    ? 'translate-y-full opacity-0'
                    : 'animate-bounce-up translate-y-0 opacity-100'
            }`}
        >
            <div className="border-t border-blue-500/30 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-5 text-white shadow-2xl">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-3">
                        {/* Icona animata */}
                        <div className="animate-pulse">
                            <svg
                                className="h-5 w-5 text-blue-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <p className="text-center text-sm sm:text-left">
                            Questo sito non usa cookie di profilazione né strumenti di tracciamento.
                            Con il tuo consenso mostriamo la mappa di Google Maps, che può
                            installare cookie di terze parti. Puoi cambiare scelta in qualsiasi
                            momento dalla{' '}
                            <Link
                                to="/privacy"
                                className="font-medium text-blue-300 underline transition-colors hover:text-blue-200"
                            >
                                Privacy e cookie policy
                            </Link>
                            .
                        </p>
                    </div>
                    {/* Stessa evidenza per i due bottoni: rifiutare deve essere facile quanto accettare. */}
                    <div className="flex shrink-0 gap-3">
                        <button
                            type="button"
                            onClick={() => choose('rejected')}
                            className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
                        >
                            Rifiuta
                        </button>
                        <button
                            type="button"
                            onClick={() => choose('accepted')}
                            className="cursor-pointer rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
                        >
                            Accetta
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS per animazione bounce-up personalizzata */}
            <style>{`
        @keyframes bounceUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          60% {
            transform: translateY(-10px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-bounce-up {
          animation: bounceUp 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }
      `}</style>
        </div>
    );
}
