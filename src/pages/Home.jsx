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
@keyframes slideRight {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.fade-up  { animation: fadeUp  0.75s cubic-bezier(0.16,1,0.3,1) forwards; }
.fade-in  { animation: fadeIn  0.6s  ease forwards; }
.d1 { animation-delay: 0.05s; opacity: 0; }
.d2 { animation-delay: 0.15s; opacity: 0; }
.d3 { animation-delay: 0.25s; opacity: 0; }
.d4 { animation-delay: 0.35s; opacity: 0; }
.d5 { animation-delay: 0.45s; opacity: 0; }

.gradient-text {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.gradient-bg {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}
.card-hover {
  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease;
}
.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px -12px rgba(0,0,0,0.18);
}
.bar-slide {
  transform-origin: left;
  animation: slideRight 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
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

function CountUp({ target, suffix = '', duration = 1800 }) {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const step = (now) => {
                        const p = Math.min((now - start) / duration, 1);
                        const ease = 1 - Math.pow(1 - p, 3);
                        setValue(Math.round(ease * target));
                        if (p < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                    obs.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target, duration]);
    return <span ref={ref}>{value}{suffix}</span>;
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
                                className="rounded-full bg-blue-600 px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30"
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

                
                <section className="gradient-bg px-6 py-16">
                    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
                        {[
                            { value: 700,   suffix: ' m²',    label: 'Capannone operativo' },
                            { value: 5,     suffix: '+',      label: 'Settori industriali' },
                            { value: 1,     suffix: ' μm',    label: 'Tolleranza minima' },
                            { value: 100,   suffix: '%',      label: 'Made in Italy' },
                        ].map((s, i) => (
                            <div key={i} className="text-center">
                                <p className="font-display mb-1 text-4xl font-bold text-white md:text-5xl">
                                    <CountUp target={s.value} suffix={s.suffix} />
                                </p>
                                <p className="text-sm text-slate-400 uppercase tracking-wide">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                
                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        {/* Intestazione */}
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

                        
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    delay: 'd1',
                                    label: 'Tornitura CNC',
                                    desc: 'Torni CNC multi-asse per la produzione di alberi, bussole, flange e componenti cilindrici con tolleranze micrometriche. Adatti a piccole serie e grandi volumi.',
                                    icon: (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    ),
                                    accent: 'from-blue-600 to-blue-800',
                                },
                                {
                                    delay: 'd2',
                                    label: 'Fresatura CNC',
                                    desc: 'Centri di lavoro CNC 3 e 5 assi per la realizzazione di pezzi complessi, stampi, particolari strutturali e superfici di precisione in alluminio, acciaio e leghe speciali.',
                                    icon: (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                    ),
                                    accent: 'from-cyan-600 to-blue-700',
                                },
                                {
                                    delay: 'd3',
                                    label: 'Conto Terzi',
                                    desc: 'Produciamo su commessa per aziende di ogni dimensione. Flessibilità nei volumi, rispetto delle scadenze e tracciabilità completa dalla progettazione CAD/CAM alla consegna.',
                                    icon: (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    ),
                                    accent: 'from-slate-700 to-slate-900',
                                },
                            ].map((s) => (
                                <Reveal delay={s.delay} key={s.label}>
                                    <div className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
                                        {/* Banda colorata superiore */}
                                        <div className={`bg-gradient-to-r ${s.accent} p-7`}>
                                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {s.icon}
                                                </svg>
                                            </div>
                                            <h3 className="font-display text-2xl font-bold text-white">{s.label}</h3>
                                        </div>
                                        {/* Corpo */}
                                        <div className="flex flex-1 flex-col p-7">
                                            <p className="flex-1 leading-relaxed text-slate-600">{s.desc}</p>
                                            <Link
                                                to="/servizi"
                                                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all group-hover:gap-3"
                                            >
                                                Scopri di più
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                
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
                                    700 m² di tecnologia e precisione
                                </h2>
                                <p className="mb-8 text-lg leading-relaxed text-white/75">
                                    Una struttura moderna a Castelvetro di Modena, con temperatura
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

                
                <section className="bg-slate-50 px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <Reveal delay="d1">
                                <p className="mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase">— Settori di applicazione</p>
                                <h2 className="font-display mb-4 text-4xl font-bold md:text-5xl">
                                    Dove lavora la nostra precisione
                                </h2>
                                <p className="mx-auto max-w-xl text-lg text-slate-500">
                                    Componenti per il motorsport, il packaging industriale
                                    e la meccanica di precisione conto terzi.
                                </p>
                            </Reveal>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    delay: 'd1',
                                    title: 'Automotive',
                                    desc: 'Componenti per trasmissioni, motori e sospensioni con tolleranze richieste dalle case automobilistiche.',
                                    icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
                                    color: 'text-blue-600',
                                    bg: 'bg-blue-50',
                                },
                                {
                                    delay: 'd2',
                                    title: 'Motorsport',
                                    desc: 'Particolari ultraleggeri e ad altissima resistenza per auto ad alte prestazioni in edizioni limitate, dove ogni grammo e ogni decimo contano.',
                                    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
                                    color: 'text-red-600',
                                    bg: 'bg-red-50',
                                },
                                {
                                    delay: 'd3',
                                    title: 'Packaging',
                                    desc: 'Componenti per macchine confezionatrici e linee di produzione, inclusa ricambistica e prototipazione per il settore packaging.',
                                    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
                                    color: 'text-green-600',
                                    bg: 'bg-green-50',
                                },
                                {
                                    delay: 'd4',
                                    title: 'Meccanica industriale',
                                    desc: 'Pezzi di ricambio, prototipi e piccole serie per macchine utensili, impianti e attrezzature industriali.',
                                    icon: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
                                    color: 'text-slate-600',
                                    bg: 'bg-slate-100',
                                },
                            ].map((s) => (
                                <Reveal delay={s.delay} key={s.title}>
                                    <div className="card-hover group flex h-full flex-col rounded-2xl bg-white p-7 shadow-md">
                                        <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${s.bg}`}>
                                            <svg className={`h-6 w-6 ${s.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                                            </svg>
                                        </div>
                                        <h3 className="font-display mb-3 text-xl font-bold text-slate-800">{s.title}</h3>
                                        <p className="flex-1 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                                        <div className={`mt-5 h-0.5 w-8 rounded-full ${s.bg} transition-all group-hover:w-16`} style={{ backgroundColor: 'currentColor' }}>
                                            <div className={`h-full w-full rounded-full ${s.color.replace('text-', 'bg-')}`} />
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                    </div>
                </section>

<section className="gradient-bg px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <Reveal delay="d1">
                                <p className="mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase">— Il nostro metodo</p>
                                <h2 className="font-display mb-4 text-4xl font-bold text-white md:text-5xl">
                                    Dal disegno al pezzo finito
                                </h2>
                                <p className="mx-auto max-w-xl text-lg text-white/60">
                                    Un processo strutturato e trasparente per garantire qualità
                                    e rispetto delle tempistiche.
                                </p>
                            </Reveal>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    step: '01',
                                    delay: 'd1',
                                    title: 'Analisi & Preventivo',
                                    desc: 'Valutiamo il disegno tecnico o il campione fisico e prepariamo un preventivo dettagliato in tempi rapidi.',
                                },
                                {
                                    step: '02',
                                    delay: 'd2',
                                    title: 'Progettazione CAD/CAM',
                                    desc: 'Il nostro team elabora il percorso utensile ottimale per ridurre i tempi ciclo e massimizzare la qualità.',
                                },
                                {
                                    step: '03',
                                    delay: 'd3',
                                    title: 'Lavorazione CNC',
                                    desc: 'I nostri centri CNC eseguono il programma con tolleranze micrometriche su acciaio, alluminio e leghe speciali.',
                                },
                                {
                                    step: '04',
                                    delay: 'd4',
                                    title: 'Controllo & Consegna',
                                    desc: 'Ogni pezzo è misurato con strumentazione di precisione prima della consegna, con documentazione completa.',
                                },
                            ].map((s) => (
                                <Reveal delay={s.delay} key={s.step}>
                                    <div className="relative">
                                        <p className="font-display mb-3 text-6xl font-bold text-white/10 leading-none select-none">
                                            {s.step}
                                        </p>
                                        <div className="mb-1 h-0.5 w-10 rounded-full bg-blue-500" />
                                        <h3 className="font-display mb-3 text-xl font-bold text-white">{s.title}</h3>
                                        <p className="text-sm leading-relaxed text-white/60">{s.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                
                {/* ── VIDEO SECTION — sostituire hero.mp4 con video di lavorazione CNC ── */}
                <section className="relative h-[70vh] w-full overflow-hidden">
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
                            <p className="mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase">— Perché scegliere MBM</p>
                            <h2 className="font-display mb-6 max-w-xl text-4xl font-bold leading-tight text-white md:text-5xl">
                                Standard elevati,<br />
                                consegne puntuali.
                            </h2>
                            <p className="mb-8 max-w-md text-lg leading-relaxed text-white/70">
                                Siamo una realtà giovane e dinamica con l'ambizione di diventare
                                il partner di riferimento per la meccanica di precisione in Emilia-Romagna.
                                Ogni commessa è seguita direttamente dai fondatori.
                            </p>
                            <Link
                                to="/contattaci"
                                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30"
                            >
                                Parlaci del tuo progetto
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </Reveal>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    8. CTA FINALE
                ══════════════════════════════════════════════════ */}
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
                                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30"
                            >
                                Richiedi preventivo
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
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

