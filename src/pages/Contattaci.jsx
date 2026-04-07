import { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';

const INFO = [
    {
        label: 'WhatsApp',
        value: '+39 324 098 7230',
        href: 'https://wa.me/393240987230',
        color: 'green',
    },
    {
        label: 'Email',
        value: 'info@mbmmeccanica.com',
        href: 'mailto:info@mbmmeccanica.com',
        color: 'blue',
    },
    {
        label: 'Sede',
        value: 'Via M. Buonarroti 22/24\nCastelvetro di Modena (MO)\n41014',
        href: 'https://maps.google.com/?q=Via+M.+Buonarroti+22/24,+Castelvetro+di+Modena',
        color: 'blue',
    },
];

const ORARI = [
    { giorno: 'Lunedì – Venerdì', ore: '07:00 – 20:00', aperto: true },
    { giorno: 'Sabato', ore: 'Chiuso', aperto: false },
    { giorno: 'Domenica', ore: 'Chiuso', aperto: false },
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
    };
    return icons[type];
};

const ContactCard = ({ item, delay }) => {
    const colorClasses = {
        green: 'text-green-600',
        blue: 'text-blue-600',
    };

    return (
        <Reveal delay={delay}>
            <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
                <span className={colorClasses[item.color]}>
                    <Icon type={item.label.toLowerCase()} />
                </span>
                <div>
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
                title="Contatti | MBM Meccanica"
                description="Contatta MBM Meccanica a Castelvetro di Modena. Richiedi un preventivo per lavorazioni CNC di precisione: tornitura, fresatura e conto terzi."
                keywords="contatti MBM Meccanica, preventivo lavorazioni CNC Modena, meccanica precisione Castelvetro, WhatsApp MBM Meccanica"
            />
            <JsonLd />

            <div className="min-h-screen bg-white font-sans text-slate-800">
                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-5xl">
                        <div className="grid gap-8 md:grid-cols-2">
                            {/* Left column */}
                            <div className="space-y-4">
                                <Reveal delay="d1">
                                    <p className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase">
                                        — Contattaci
                                    </p>
                                </Reveal>
                                {INFO.map((item, i) => (
                                    <ContactCard key={item.label} item={item} delay={`d${i + 1}`} />
                                ))}
                            </div>

                            {/* Right column */}
                            <div className="space-y-4">
                                <Reveal delay="d1">
                                    <p className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase">
                                        — Orari di apertura
                                    </p>
                                </Reveal>

                                <Reveal delay="d2">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                        <ul className="divide-y divide-slate-100">
                                            {ORARI.map(({ giorno, ore, aperto }) => (
                                                <li
                                                    key={giorno}
                                                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                                                >
                                                    <span className="text-sm font-medium text-slate-700">
                                                        {giorno}
                                                    </span>
                                                    <span
                                                        className={`text-sm font-semibold ${aperto ? 'text-slate-800' : 'text-slate-400'}`}
                                                    >
                                                        {ore}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>

                                <Reveal delay="d3">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">
                                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            P.IVA
                                        </p>
                                        <p className="mt-1 font-medium text-slate-700">
                                            04125990368
                                        </p>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-24 text-center md:py-32">
                    <Reveal>
                        <h2 className="mx-auto mb-6 max-w-2xl font-serif text-4xl font-bold text-white md:text-5xl">
                            Hai un progetto?
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                                Scrivici subito.
                            </span>
                        </h2>
                        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-white/65">
                            Siamo sempre disponibili per rispondere alle tue domande, discute re i
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
                                href="mailto:info@mbmmeccanica.com"
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
