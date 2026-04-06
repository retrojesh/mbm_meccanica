import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import officina from '../assets/pages/azienda/photos/officina.jpg';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
.font-display { font-family: 'DM Serif Display', Georgia, serif; }
.font-body    { font-family: 'DM Sans', system-ui, sans-serif; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.fade-up  { animation: fadeUp  0.75s cubic-bezier(0.16,1,0.3,1) forwards; }
.fade-in  { animation: fadeIn  0.6s  ease forwards; }
.d1 { animation-delay: 0.05s; opacity: 0; }
.d2 { animation-delay: 0.15s; opacity: 0; }
.d3 { animation-delay: 0.25s; opacity: 0; }
.d4 { animation-delay: 0.35s; opacity: 0; }

.gradient-text {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.card-hover {
  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease;
}
.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -12px rgba(0,0,0,0.12);
}
.hero-scroll-arrow {
  animation: heroArrow 2s ease-in-out infinite;
}
@keyframes heroArrow {
  0%, 100% { transform: translateY(0);   opacity: 1; }
  50%       { transform: translateY(8px); opacity: 0.5; }
}
`;

function Reveal({ children, delay = '', className = '' }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.12 }
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

const SERVIZI = [
    {
        num: '01',
        title: 'Tornitura CNC',
        desc: 'Torni CNC multi-asse per la produzione di alberi, bussole, flange e componenti cilindrici con tolleranze micrometriche. Adatti a piccole serie e grandi volumi.',
    },
    {
        num: '02',
        title: 'Fresatura CNC',
        desc: 'Centri di lavoro CNC 3 e 5 assi per la realizzazione di pezzi complessi, stampi, particolari strutturali e superfici di precisione in alluminio, acciaio e leghe speciali.',
    },
    {
        num: '03',
        title: 'Conto Terzi',
        desc: 'Produciamo su commessa per aziende di ogni dimensione. Flessibilità nei volumi, rispetto delle scadenze e tracciabilità completa dalla progettazione CAD/CAM alla consegna.',
    },
];

function ServicesAccordion() {
    const [open, setOpen] = useState(0);

    return (
        <div className="border-y border-slate-200 divide-y divide-slate-200">
            {SERVIZI.map((s, i) => (
                <div key={s.num}>
                    <button
                        onClick={() => setOpen(open === i ? -1 : i)}
                        className="group flex w-full items-center gap-6 py-7 text-left"
                    >
                        <span className={`font-display flex-1 text-2xl font-bold transition-colors md:text-3xl ${
                            open === i ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'
                        }`}>
                            {s.title}
                        </span>
                        <svg
                            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m-8-8h16" />
                        </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${open === i ? 'max-h-56 pb-8' : 'max-h-0'}`}>
                        <div className="pl-14">
                            <p className="mb-5 max-w-2xl text-lg leading-relaxed text-slate-500">{s.desc}</p>
                            <Link
                                to="/servizi"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all hover:gap-3"
                            >
                                Scopri di più
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const SETTORI = [
    {
        num: '01',
        title: 'Automotive',
        desc: 'Componenti per trasmissioni, motori e sospensioni con tolleranze richieste dalle case automobilistiche.',
        icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
        color: 'text-blue-600',
        accent: 'bg-blue-600',
    },
    {
        num: '02',
        title: 'Motorsport',
        desc: 'Particolari ultraleggeri e ad altissima resistenza per auto ad alte prestazioni in edizioni limitate, dove ogni grammo e ogni decimo contano.',
        icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
        color: 'text-red-600',
        accent: 'bg-red-500',
    },
    {
        num: '03',
        title: 'Packaging',
        desc: 'Componenti per macchine confezionatrici e linee di produzione, inclusa ricambistica e prototipazione per il settore packaging.',
        icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
        color: 'text-green-600',
        accent: 'bg-green-500',
    },
    {
        num: '04',
        title: 'Meccanica industriale',
        desc: 'Pezzi di ricambio, prototipi e piccole serie per macchine utensili, impianti e attrezzature industriali.',
        icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
        color: 'text-slate-600',
        accent: 'bg-slate-500',
    },
];

function SettoriCarousel() {
    const [active, setActive] = useState(0);
    const [animating, setAnimating] = useState(false);

    const goTo = (idx) => {
        if (idx === active) return;
        setAnimating(true);
        setTimeout(() => {
            setActive(idx);
            setAnimating(false);
        }, 200);
    };

    useEffect(() => {
        const t = setInterval(() => {
            goTo((active + 1) % SETTORI.length);
        }, 4000);
        return () => clearInterval(t);
    }, [active]);

    const s = SETTORI[active];

    return (
        <div className="mx-auto max-w-6xl">
            <div className="mb-16">
                <Reveal delay="d1">
                    <p className="mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase">— Settori di applicazione</p>
                    <h2 className="font-display text-4xl font-bold md:text-5xl">
                        Dove lavora la nostra precisione
                    </h2>
                </Reveal>
            </div>

            <Reveal delay="d2">
                <div className="grid items-start gap-12 md:grid-cols-5">
                    {/* Lista settori */}
                    <div className="md:col-span-2 flex flex-col gap-1">
                        {SETTORI.map((item, i) => (
                            <button
                                key={item.num}
                                onClick={() => goTo(i)}
                                className={`group flex items-center gap-4 border-l-2 px-4 py-4 text-left transition-all duration-200 ${
                                    active === i
                                        ? 'border-blue-500 text-slate-900'
                                        : 'border-transparent text-slate-400 hover:border-slate-300 hover:text-slate-700'
                                }`}
                            >
                                <span className={`transition-all ${active === i ? 'font-semibold' : 'font-medium'}`}>
                                    {item.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Contenuto attivo */}
                    <div className="md:col-span-3">
                        <div
                            className="flex h-64 flex-col justify-center rounded-2xl border border-slate-100 bg-white p-10 shadow-sm transition-opacity duration-200"
                            style={{ opacity: animating ? 0 : 1 }}
                        >
                            <h3 className="font-display mb-4 text-3xl font-bold text-slate-900">{s.title}</h3>
                            <p className="text-lg leading-relaxed text-slate-500">{s.desc}</p>
                            <div className="mt-8 flex gap-1.5">
                                {SETTORI.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i)}
                                        className={`h-1 rounded-full transition-all duration-300 ${
                                            active === i ? 'w-8 bg-slate-900' : 'w-4 bg-slate-200'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}


export default function Home() {
    return (
        <>
            <SEO
                title="Lavorazioni CNC di Precisione a Castelvetro di Modena"
                description="MBM Meccanica: fresatura CNC e tornitura CNC a Castelvetro di Modena. Lavorazioni di precisione per automotive, Formula 1 e settore alimentare. Conto terzi e su commessa con progettazione CAD/CAM."
                keywords="MBM Meccanica, metalmeccanica Castelvetro di Modena, metalmeccanica Modena, officina meccanica Modena, lavorazioni meccaniche di precisione, lavorazioni conto terzi Modena, lavorazioni su commessa Modena, officina meccanica Emilia Romagna, componenti meccanici automotive, lavorazioni settore alimentare, componenti Formula 1, metalmeccanica Emilia Romagna"
            />
            <JsonLd />
            <style>{css}</style>

            <div className="font-body bg-white text-slate-800">

                {/* 1 — Hero */}
                <section className="relative h-svh w-full overflow-hidden">
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/video/hero.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />

                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                        <div className="fade-in d1 mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                            <p className="text-xs font-semibold tracking-widest text-blue-300 uppercase">
                                Castelvetro di Modena · dal 2024
                            </p>
                        </div>
                        <h1 className="font-display fade-up d2 mb-6 text-5xl leading-tight font-bold text-white md:text-7xl lg:text-8xl">
                            Precisione <br />
                            <span className="gradient-text">che si vede.</span>
                        </h1>
                        <p className="fade-up d3 mx-auto mb-10 max-w-xl text-lg text-white/75 md:text-xl">
                            Tornitura e fresatura CNC di alta precisione per il settore
                            packaging, motorsport e meccanica di precisione.
                        </p>
                        <div className="fade-up d4 flex flex-wrap justify-center gap-4">
                            <Link
                                to="/servizi"
                                className="rounded-full bg-blue-600 px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg"
                            >
                                Scopri i servizi
                            </Link>
                            <Link
                                to="/contattaci"
                                className="rounded-full border border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
                            >
                                Richiedi preventivo
                            </Link>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
                        <svg className="hero-scroll-arrow h-6 w-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </section>

                {/* 2 — Servizi */}
                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 max-w-2xl">
                            <Reveal delay="d1">
                                <p className="mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase">— Cosa facciamo</p>
                                <h2 className="font-display mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                                    Lavorazioni CNC<br />
                                    di alta precisione
                                </h2>
                                <p className="text-lg leading-relaxed text-slate-500">
                                    Dal grezzo al pezzo finito: gestiamo l'intero ciclo produttivo
                                    con tecnologia CNC avanzata e controllo qualità rigoroso.
                                </p>
                            </Reveal>
                        </div>

                        <Reveal delay="d2">
                            <ServicesAccordion />
                        </Reveal>
                    </div>
                </section>

                {/* 3 — Officina / foto */}
                <section className="relative overflow-hidden">
                    <img
                        src={officina}
                        alt="Officina MBM Meccanica"
                        className="h-[520px] w-full object-cover object-center md:h-[640px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center px-8 md:px-20">
                        <div className="max-w-lg">
                            <Reveal delay="d1">
                                <p className="mb-3 text-xs font-bold tracking-widest text-blue-400 uppercase">
                                    La nostra officina
                                </p>
                                <h2 className="font-display mb-5 text-4xl font-bold leading-tight text-white md:text-5xl">
                                    Un'officina moderna,<br />costruita per crescere
                                </h2>
                                <p className="mb-8 text-lg leading-relaxed text-white/75">
                                    700 m² a Castelvetro di Modena, con temperatura
                                    controllata a 20° tutto l'anno, progettata per ospitare
                                    macchinari CNC di ultima generazione e crescere con le esigenze dei clienti.
                                </p>
                                <Link
                                    to="/azienda"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
                                >
                                    Conosci la nostra storia
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* 4 — Settori */}
                <section className="bg-slate-50 px-6 py-32 md:py-40">
                    <SettoriCarousel />
                </section>

                {/* 5 — Video lavorazione */}
                <section className="relative h-[60vh] w-full overflow-hidden">
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/video/lavorazione.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-slate-900/20" />
                    <div className="relative z-10 flex h-full items-center px-8 md:px-20">
                        <Reveal delay="d1">
                            <h2 className="font-display mb-4 max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl">
                                Standard elevati,<br />
                                consegne puntuali.
                            </h2>
                            <p className="max-w-md text-lg leading-relaxed text-white/70">
                                Siamo una realtà giovane e dinamica con l'ambizione di diventare
                                il partner di riferimento per la meccanica di precisione in Emilia-Romagna.
                                Ogni commessa è seguita direttamente dai fondatori.
                            </p>
                        </Reveal>
                    </div>
                </section>

                {/* 6 — CTA finale */}
                <section className="bg-white px-6 py-24 text-center md:py-32">
                    <Reveal>
                        <p className="mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase">— Iniziamo a lavorare insieme</p>
                        <h2 className="font-display mx-auto mb-6 max-w-3xl text-4xl font-bold text-slate-800 md:text-5xl lg:text-6xl">
                            Hai un progetto?<br />
                            Parliamone subito.
                        </h2>
                        <p className="mx-auto mb-10 max-w-xl text-xl leading-relaxed text-slate-500">
                            Inviaci il disegno tecnico o descrivi il componente: prepareremo
                            un preventivo personalizzato in tempi rapidi.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to="/contattaci"
                                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg"
                            >
                                Richiedi preventivo
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/azienda"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-10 py-4 font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
                            >
                                Scopri chi siamo
                            </Link>
                            <Link
                                to="/servizi"
                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-10 py-4 font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
                            >
                                Tutti i servizi
                            </Link>
                        </div>
                    </Reveal>
                </section>

            </div>
        </>
    );
}
