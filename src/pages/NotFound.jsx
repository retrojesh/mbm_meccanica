import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/global.css';

const QUICK_LINKS = [
    { to: '/azienda', label: 'Azienda' },
    { to: '/servizi', label: 'Servizi' },
    { to: '/parco-macchine', label: 'Parco Macchine' },
    { to: '/contattaci', label: 'Contattaci' },
];

export default function NotFound() {
    return (
        <>
            <SEO
                title="Pagina non trovata"
                description="La pagina che stai cercando non esiste o è stata spostata. Torna alla home di MBM Meccanica o contattaci per assistenza."
                noindex
            />

            <main className="font-body flex min-h-screen items-center bg-white text-slate-800">
                <section className="relative w-full overflow-hidden px-6 pt-36 pb-24 md:pt-44 md:pb-28">
                    <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl filter" />
                    <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-100 opacity-20 blur-3xl filter" />

                    <div className="relative mx-auto max-w-3xl text-center">
                        <div className="fade-up d1">
                            <p className="eyebrow mb-4 text-blue-600">Errore 404</p>
                        </div>

                        <div className="fade-up d1" aria-hidden="true">
                            <p className="font-display gradient-text mb-2 text-7xl leading-none font-bold md:text-8xl lg:text-9xl">
                                404
                            </p>
                        </div>

                        <h1 className="font-display fade-up d2 mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                            Pagina non trovata
                        </h1>

                        <div className="fade-up d3">
                            <p className="mx-auto max-w-xl text-xl leading-relaxed text-slate-500">
                                La pagina che cerchi non esiste o è stata spostata. Controlla
                                l&apos;indirizzo oppure riparti da uno dei collegamenti qui sotto.
                            </p>
                        </div>

                        <div className="fade-up d4 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg"
                            >
                                Torna alla home
                            </Link>
                            <Link
                                to="/contattaci"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-10 py-4 font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
                            >
                                Contattaci
                            </Link>
                        </div>

                        <div className="fade-up d4 mt-12 border-t border-slate-100 pt-8">
                            <p className="mb-4 text-sm text-slate-400">Oppure vai direttamente a</p>
                            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                                {QUICK_LINKS.map(({ to, label }) => (
                                    <li key={to}>
                                        <Link
                                            to={to}
                                            className="font-semibold text-slate-600 underline-offset-4 transition-colors hover:text-blue-600 hover:underline"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
