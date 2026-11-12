import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import { useConsent } from '../utils/consent';

// Google Maps viene caricato solo con il consenso del visitatore:
// finché non lo dà, nessun dato (IP, cookie) viene inviato a Google.
const MAP_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2845.3297536632717!2d10.947375875886053!3d44.50839869670187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fe054e0bf7e35%3A0x1ca09ac2c8a1feac!2sVia%20M.%20Buonarroti%2C%2022%2F24%2C%2041014%20Castelvetro%20di%20Modena%20MO!5e0!3m2!1sit!2sit!4v1775157069684!5m2!1sit!2sit';
const MAP_LINK = 'https://maps.google.com/?q=Via+M.+Buonarroti+22/24,+Castelvetro+di+Modena';
// Apre la composizione di Gmail in una nuova scheda invece del client di posta predefinito.
const GMAIL_COMPOSE_LINK = 'https://mail.google.com/mail/?view=cm&fs=1&to=info@mbmmeccanica.com';

// Con il consenso dato dal banner la mappa compare subito; altrimenti
// il visitatore può caricarla con un click (vale solo per questa visita).
function MapEmbed() {
    const consent = useConsent();
    const [loaded, setLoaded] = useState(false);
    if (loaded || consent === 'accepted') {
        return (
            <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                title="Mappa MBM Meccanica"
                className="w-full"
            />
        );
    }
    return (
        <div className="flex h-[450px] w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 to-slate-100 px-6 text-center">
            <p className="font-display text-xl font-semibold text-slate-800">
                Via M. Buonarroti 22/24, Castelvetro di Modena (MO)
            </p>
            <p className="max-w-md text-sm leading-relaxed text-slate-500">
                Caricando la mappa, Google potrebbe raccogliere alcuni dati di navigazione.{' '}
                <Link to="/privacy" className="text-blue-600 underline hover:text-blue-700">
                    Privacy e cookie policy
                </Link>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    type="button"
                    onClick={() => setLoaded(true)}
                    className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                    Mostra la mappa
                </button>
                <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
                >
                    Apri in Google Maps
                </a>
            </div>
        </div>
    );
}

// Griglia 2×2 su desktop: WhatsApp | Orari, Email | Sede.
// Su mobile restano impilate nell'ordine dell'array.
const INFO = [
    {
        label: 'WhatsApp',
        value: '+39 324 098 7230',
        href: 'https://wa.me/393240987230',
        color: 'green',
        placement: 'md:col-start-1 md:row-start-1',
    },
    {
        label: 'Email',
        value: 'info@mbmmeccanica.com',
        href: GMAIL_COMPOSE_LINK,
        color: 'blue',
        placement: 'md:col-start-1 md:row-start-2',
    },
    {
        label: 'Sede legale',
        icon: 'sede',
        value: 'Via M. Buonarroti 22/24\n41014 Castelvetro di Modena (MO)',
        href: MAP_LINK,
        color: 'blue',
        placement: 'md:col-start-2 md:row-start-2',
    },
];

const ORARI = [
    { giorno: 'Lun – Ven', ore: '07:00 – 20:00', aperto: true },
    { giorno: 'Sab – Dom', ore: 'Chiuso', aperto: false },
];

const ANIMATIONS = {
    fadeUp: 'animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]',
    scaleIn: 'animate-[scaleIn_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]',
};

const DELAY_MAP = {
    d1: 'delay-[0.05s]',
    d2: 'delay-[0.15s]',
    d3: 'delay-[0.25s]',
    d4: 'delay-[0.35s]',
};

const Reveal = ({ children, delay = '', className = '' }) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => e.isIntersecting && (setInView(true), obs.disconnect()),
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const animationClass = inView ? `${ANIMATIONS.fadeUp} ${DELAY_MAP[delay] || ''}` : 'opacity-0';

    return (
        <div ref={ref} className={`${className} ${animationClass}`}>
            {children}
        </div>
    );
};

const Icon = ({ type }) => {
    const icons = {
        whatsapp: (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.032 2.001c-5.516 0-10 4.484-10 10 0 1.852.504 3.588 1.38 5.081L2.25 21.75l4.716-1.139a9.942 9.942 0 004.96 1.389c5.516 0 10-4.484 10-10s-4.484-10-10-10zm0 18.4c-1.644 0-3.25-.447-4.628-1.292l-.332-.198-2.8.676.674-2.73-.216-.346a8.38 8.38 0 01-1.384-4.61c0-4.612 3.756-8.368 8.368-8.368 4.612 0 8.368 3.756 8.368 8.368 0 4.613-3.756 8.368-8.368 8.368zm4.588-6.267c-.252-.126-1.49-.736-1.721-.82-.23-.084-.398-.126-.566.126-.168.252-.652.82-.8.988-.147.168-.294.19-.546.063-.252-.126-1.065-.392-2.028-1.252-.75-.67-1.256-1.498-1.403-1.751-.147-.253-.016-.39.11-.516.113-.113.252-.294.378-.44.126-.147.168-.252.252-.42.084-.168.042-.315-.021-.44-.063-.126-.566-1.364-.776-1.868-.204-.49-.412-.423-.566-.431-.147-.008-.315-.008-.483-.008s-.442.063-.672.315c-.231.252-.882.862-.882 2.102s.903 2.439 1.029 2.607c.126.168 1.775 2.71 4.297 3.799 2.522 1.089 2.522.726 2.977.68.455-.046 1.47-.601 1.677-1.181.207-.58.207-1.077.147-1.18-.06-.105-.22-.168-.462-.294z" />
            </svg>
        ),
        email: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
            </svg>
        ),
        sede: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
            </svg>
        ),
        orari: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    };
    return icons[type];
};

// Contenuto centrato in verticale: icona e testi allineati allo stesso modo in tutte le card
const CARD_BASE =
    'flex h-full items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm';
const ICON_BOX = 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl';
const ICON_COLORS = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
};

const ContactCard = ({ item, delay }) => {
    return (
        <Reveal delay={delay} className={item.placement}>
            <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`group ${CARD_BASE} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
                <span className={`${ICON_BOX} ${ICON_COLORS[item.color]}`}>
                    <Icon type={item.icon ?? item.label.toLowerCase()} />
                </span>
                <div className="min-w-0">
                    <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        {item.label}
                    </p>
                    <p className="text-base font-medium whitespace-pre-line text-slate-800">
                        {item.value}
                    </p>
                </div>
            </a>
        </Reveal>
    );
};

export default function Contatti() {
    return (
        <>
            <SEO
                title="Contatti"
                description="Contatta MBM Meccanica a Castelvetro di Modena. Richiedi un preventivo per lavorazioni CNC di precisione: tornitura, fresatura e conto terzi."
            />
            <JsonLd />

            <div className="min-h-screen bg-white font-sans text-slate-800">
                <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
                    <div className="mx-auto max-w-5xl">
                        <div className="mx-auto mb-10 max-w-3xl text-center">
                            <Reveal>
                                <h1 className="font-display mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
                                    Richiedi un preventivo per le tue lavorazioni
                                </h1>
                            </Reveal>
                        </div>

                        {/* 4 card uguali: righe della stessa altezza (auto-rows-fr) */}
                        <div className="grid gap-4 md:auto-rows-fr md:grid-cols-2">
                            {INFO.map((item, i) => (
                                <ContactCard key={item.label} item={item} delay={`d${i + 1}`} />
                            ))}

                            <Reveal delay="d4" className="md:col-start-2 md:row-start-1">
                                <div className={CARD_BASE}>
                                    <span className={`${ICON_BOX} ${ICON_COLORS.blue}`}>
                                        <Icon type="orari" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Orari di apertura
                                        </p>
                                        {/* Giorni e orari in due colonne allineate */}
                                        <ul className="grid grid-cols-[auto_auto] justify-start gap-x-6">
                                            {ORARI.map(({ giorno, ore, aperto }) => (
                                                <li
                                                    key={giorno}
                                                    className="col-span-2 grid grid-cols-subgrid text-base font-medium"
                                                >
                                                    <span className="text-slate-800">{giorno}</span>
                                                    <span
                                                        className={`tabular-nums ${aperto ? 'text-slate-800' : 'text-slate-400'}`}
                                                    >
                                                        {ore}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Map Section */}
                        <div className="mt-16 md:mt-20">
                            <Reveal delay="d1">
                                <div className="mb-8 text-center">
                                    <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
                                        La nostra sede
                                    </h2>
                                </div>
                            </Reveal>
                            <Reveal delay="d2">
                                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                                    <MapEmbed />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-16 text-center md:py-24">
                    <Reveal>
                        <h2 className="font-display mx-auto mb-6 max-w-2xl text-4xl font-bold text-white md:text-5xl">
                            Mettiamoci in contatto
                        </h2>
                        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-white/65">
                            Siamo sempre disponibili per rispondere alle tue domande, discutere i
                            tuoi progetti o fornirti un preventivo personalizzato. Non esitare a
                            metterti in contatto con noi!
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <a
                                href="https://wa.me/393240987230"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg sm:w-auto"
                            >
                                <Icon type="whatsapp" /> Scrivici su WhatsApp
                            </a>
                            <a
                                href={GMAIL_COMPOSE_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg sm:w-auto"
                            >
                                <Icon type="email" /> Invia una email
                            </a>
                        </div>
                    </Reveal>
                </section>
            </div>

            <style>{`
                @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </>
    );
}
