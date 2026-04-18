import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
.font-display { font-family: 'DM Serif Display', Georgia, serif; }
.font-body    { font-family: 'DM Sans', system-ui, sans-serif; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.d1 { animation-delay: 0.05s; opacity: 0; }
.d2 { animation-delay: 0.15s; opacity: 0; }
.d3 { animation-delay: 0.25s; opacity: 0; }
.d4 { animation-delay: 0.35s; opacity: 0; }
`;

function Reveal({ children, delay = '', className = '' }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} className={`${className} ${inView ? `fade-up ${delay}` : 'opacity-0'}`}>
            {children}
        </div>
    );
}

export default function PrivacyPage() {
    return (
        <>
            <SEO
                title="Privacy Policy | MBM Meccanica"
                description="Informativa sulla privacy del sito MBM Meccanica. Nessuna raccolta di dati personali, solo cookie tecnici e mappa Google Maps."
                keywords="privacy policy MBM Meccanica, trattamento dati, cookie"
            />
            <style>{css}</style>

            <div className="font-body min-h-screen bg-white text-slate-800">
                {/* Hero */}
                <section className="relative overflow-hidden px-6 pt-36 pb-20 md:pt-48 md:pb-24">
                    <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl filter" />
                    <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-100 opacity-20 blur-3xl filter" />

                    <div className="relative mx-auto max-w-4xl text-center">
                        <div className="fade-up d1">
                            <p className="mb-4 text-sm font-bold tracking-widest text-blue-600 uppercase">
                                Trasparenza e conformità
                            </p>
                        </div>
                        <h1 className="font-display fade-up d2 mb-6 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
                            Privacy Policy
                        </h1>
                        <div className="fade-up d3">
                            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-500">
                                Questo sito non raccoglie dati personali tramite moduli o strumenti
                                proprietari
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contenuto */}
                <section className="px-6 pb-24 md:pb-32">
                    <div className="mx-auto max-w-3xl">
                        <div className="space-y-8">
                            {/* Nessun modulo */}
                            <Reveal delay="d1">
                                <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                                    <div className="mb-4 flex items-center gap-3">
                                        <h2 className="font-display text-2xl font-semibold text-slate-800">
                                            Nessuna raccolta di dati personali
                                        </h2>
                                    </div>
                                    <p className="leading-relaxed text-slate-600">
                                        Questo sito web{' '}
                                        <strong>non contiene moduli di contatto</strong>, sistemi di
                                        registrazione, newsletter o strumenti di analytics
                                        proprietari. Non raccogliamo attivamente alcun dato
                                        personale.
                                    </p>
                                </div>
                            </Reveal>

                            {/* Contatti volontari */}
                            <Reveal delay="d2">
                                <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                                    <h2 className="font-display mb-4 text-2xl font-semibold text-slate-800">
                                        Contatti volontari
                                    </h2>
                                    <p className="mb-4 leading-relaxed text-slate-600">
                                        Nella pagina <strong>Contattaci</strong> sono presenti link
                                        a:
                                    </p>
                                    <ul className="mb-4 space-y-2">
                                        <li className="flex items-center gap-2 text-slate-600">
                                            Email:{' '}
                                            <code className="rounded bg-slate-100 px-2 py-0.5 text-sm">
                                                info@mbmmeccanica.com
                                            </code>
                                        </li>
                                        <li className="flex items-center gap-2 text-slate-600">
                                            WhatsApp:{' '}
                                            <code className="rounded bg-slate-100 px-2 py-0.5 text-sm">
                                                +39 324 098 7230
                                            </code>
                                        </li>
                                    </ul>
                                    <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                                        Cliccando su questi link, l'utente esce dal nostro sito e
                                        interagisce direttamente con servizi di terze parti. I dati
                                        eventualmente forniti non vengono raccolti né memorizzati da
                                        questo sito.
                                    </p>
                                </div>
                            </Reveal>

                            {/* Google Maps */}
                            <Reveal delay="d3">
                                <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                                    <h2 className="font-display mb-4 text-2xl font-semibold text-slate-800">
                                        Google Maps
                                    </h2>
                                    <p className="leading-relaxed text-slate-600">
                                        Il sito incorpora una mappa Google Maps per mostrare la
                                        posizione della sede. Google potrebbe raccogliere dati (es.
                                        indirizzo IP, dati di navigazione) attraverso questo
                                        servizio. Per maggiori informazioni, consulta la{' '}
                                        <a
                                            href="https://policies.google.com/privacy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            privacy policy di Google
                                        </a>
                                        .
                                    </p>
                                </div>
                            </Reveal>

                            {/* Cookie */}
                            <Reveal delay="d4">
                                <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                                    <h2 className="font-display mb-4 text-2xl font-semibold text-slate-800">
                                        Cookie e tracciamento
                                    </h2>
                                    <p className="leading-relaxed text-slate-600">
                                        Il sito non utilizza cookie di profilazione, marketing o
                                        analytics proprietari. Vengono utilizzati esclusivamente
                                        cookie tecnici di sessione, necessari al funzionamento base
                                        del sito.
                                    </p>
                                </div>
                            </Reveal>

                            {/* Dati di navigazione */}
                            <Reveal delay="d1">
                                <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                                    <h2 className="font-display mb-4 text-2xl font-semibold text-slate-800">
                                        Dati di navigazione
                                    </h2>
                                    <p className="leading-relaxed text-slate-600">
                                        Il sistema di hosting potrebbe registrare temporaneamente
                                        indirizzi IP e dati di connessione per finalità di sicurezza
                                        e manutenzione. Questi dati non vengono utilizzati per
                                        identificare o profilare l'utente e non vengono ceduti a
                                        terzi.
                                    </p>
                                </div>
                            </Reveal>

                            {/* Titolare e diritti */}
                            <Reveal delay="d2">
                                <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-8 shadow-sm">
                                    <h2 className="font-display mb-4 text-2xl font-semibold text-slate-800">
                                        Titolare e contatti
                                    </h2>
                                    <p className="mb-4 leading-relaxed text-slate-600">
                                        <strong>MBM Meccanica</strong>
                                        <br />
                                        Sede legale: Via Renzo Boni 54, 41058 Vignola (MO)
                                        <br />
                                        Sede operativa: Via M. Buonarroti 22/24, 41014 Castelvetro
                                        di Modena (MO)
                                        <br />
                                        P.IVA: 04125990368
                                    </p>
                                    <p className="leading-relaxed text-slate-600">
                                        Per qualsiasi domanda relativa alla privacy, scrivi a:
                                        <br />
                                        <span className="mt-2 inline-block rounded-xl border border-blue-100 bg-white px-4 py-2 font-mono text-blue-700">
                                            info@mbmmeccanica.com
                                        </span>
                                    </p>
                                </div>
                            </Reveal>

                            {/* Data e link home */}
                            <div className="pt-8 text-center">
                                <p className="mb-4 text-sm text-slate-400">
                                    Data ultimo aggiornamento: aprile 2026
                                </p>
                                <Link
                                    to="/"
                                    className="group inline-flex items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700"
                                >
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Torna alla home
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
