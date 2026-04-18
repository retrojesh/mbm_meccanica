import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import progettazioneImg from '../assets/pages/servizi/progettazione.jpg';

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
.delay-1 { animation-delay: 0.05s; opacity: 0; }
.delay-2 { animation-delay: 0.15s; opacity: 0; }
.delay-3 { animation-delay: 0.25s; opacity: 0; }
.delay-4 { animation-delay: 0.35s; opacity: 0; }

.gradient-text {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.service-card {
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}
.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px -15px rgba(37, 99, 235, 0.2);
}

.image-placeholder {
  transition: all 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}
.image-placeholder:hover {
  transform: scale(1.02);
}

.hover-lift {
  transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}
.hover-lift:hover {
  transform: translateY(-4px);
}
`;

// Hook: detects when element enters viewport
function useInView(threshold = 0.15, triggerOnce = true) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (triggerOnce) {
                        observer.disconnect();
                    }
                } else if (!triggerOnce) {
                    setInView(false);
                }
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, triggerOnce]);

    return [ref, inView];
}

function Reveal({ children, delay = '', className = '' }) {
    const [ref, inView] = useInView(0.15, true);

    return (
        <div ref={ref} className={`${className} ${inView ? `fade-up ${delay}` : 'opacity-0'}`}>
            {children}
        </div>
    );
}

const SERVIZI = [
    {
        title: 'Fresatura e Tornitura di Alta Precisione',
        short: 'Lavorazioni adatte a pezzi unici, prototipi e lotti di medie dimensioni con tolleranze micrometriche.',
        detail: [
            'Centri di lavoro CNC 3 e 5 assi per geometrie complesse',
            'Torni multi-asse per componenti cilindrici di precisione',
            'Materiali: alluminio, acciaio inox, leghe speciali, ottone',
            'Qualità costante dal pezzo singolo ai lotti ripetitivi',
        ],
        tag: 'CNC · 5 assi · Tolleranze µm',
        image: null,
    },
    {
        title: 'Lavorazione su Misura',
        short: 'Soluzioni progettate per soddisfare le esigenze specifiche del cliente, con supporto tecnico diretto.',
        detail: [
            'Dal disegno tecnico al componente finito senza intermediari',
            'Simulazione CAD/CAM preventiva per ottimizzare il ciclo',
            'Supporto diretto con i fondatori: risposte rapide e competenti',
            'Finiture superficiali, trattamenti termici e controlli dimensionali',
        ],
        tag: 'CAD/CAM · Su commessa · Supporto tecnico',
        image: progettazioneImg,
    },
    {
        title: 'Prototipazione Rapida',
        short: "Ideale per lo sviluppo di nuovi prodotti e l'innovazione industriale.",
        detail: [
            'Dal file 3D al prototipo fisico in tempi ridottissimi',
            'Validazione geometrie e test accoppiamenti prima della serie',
            'Iterazioni rapide nello stesso ciclo produttivo',
            'Collaborazione con uffici tecnici e startup in tutta Italia',
        ],
        tag: 'Prototipo · Iterazione rapida · R&D',
        image: null,
    },
    {
        title: 'Ricambistica Industriale',
        short: 'Produzione di componenti per manutenzione e sostituzione in diversi settori.',
        detail: [
            'Riproduciamo componenti fuori produzione o non più reperibili',
            'Reverse engineering su pezzi originali anche deteriorati',
            'Lotti piccoli e medi con tempi di consegna certi',
            'Settori: automotive, food & beverage, macchine utensili',
        ],
        tag: 'Reverse engineering · OEM · Manutenzione',
        image: null,
    },
];

// Service block with alternating layout
function ServiceBlock({ s, reverse, index }) {
    const [ref, inView] = useInView(0.2, true);
    const delayClass = `delay-${(index % 3) + 1}`;

    return (
        <div
            ref={ref}
            className="grid items-center gap-12 border-b border-slate-100 py-20 last:border-none last:pb-4 md:grid-cols-2 md:gap-20 md:py-28"
        >
            <div className={`${reverse ? 'md:order-2' : ''}`}>
                <div className="mb-5">
                    <span
                        className={`inline-block px-3 py-1.5 text-xs font-bold tracking-widest text-blue-600 uppercase ${inView ? `fade-up ${delayClass}` : 'opacity-0'}`}
                    >
                        {s.tag}
                    </span>
                </div>
                <h3
                    className={`font-display mb-5 text-3xl leading-tight font-bold text-slate-900 md:text-4xl ${inView ? `fade-up ${delayClass}` : 'opacity-0'}`}
                >
                    {s.title}
                </h3>
                <p
                    className={`mb-8 text-lg leading-relaxed text-slate-500 ${inView ? `fade-up delay-2` : 'opacity-0'}`}
                >
                    {s.short}
                </p>
                <ul className="space-y-4">
                    {s.detail.map((d, i) => (
                        <li
                            key={i}
                            className={`flex items-start gap-3 text-base leading-relaxed text-slate-600 ${inView ? `fade-up delay-${Math.min(i + 2, 4)}` : 'opacity-0'}`}
                        >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                            {d}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`${reverse ? 'md:order-1' : ''}`}>
                <div
                    className={`relative h-[360px] overflow-hidden rounded-2xl shadow-md ${inView ? `fade-up delay-2` : 'opacity-0'}`}
                >
                    {s.image ? (
                        <img
                            src={s.image}
                            alt={s.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                            <svg
                                className="h-20 w-20 text-slate-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.8}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="mt-4 text-sm font-medium text-slate-400">
                                Immagine {s.title}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Servizi() {
    return (
        <>
            <SEO
                title="Servizi di Lavorazione CNC di Alta Precisione | MBM Meccanica"
                description="Fresatura CNC e tornitura CNC di alta precisione con progettazione CAD/CAM. MBM Meccanica realizza componenti per automotive, motorsport e packaging. Preventivi personalizzati."
                keywords="fresatura CNC Modena, tornitura CNC Modena, lavorazioni CNC Emilia Romagna, CAD CAM Modena, fresatura di precisione, tornitura di precisione, officina CNC Modena, componenti meccanici motorsport, prototipazione meccanica Modena, fresatura 5 assi Modena"
            />
            <style>{css}</style>

            <div className="font-body min-h-screen bg-white text-slate-800">
                {/* Hero */}
                <section className="relative overflow-hidden px-6 pt-36 pb-20 md:pt-48 md:pb-24">
                    <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl filter"></div>
                    <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-100 opacity-20 blur-3xl filter"></div>

                    <div className="relative mx-auto max-w-5xl">
                        <div className="fade-up delay-1" style={{ opacity: 0 }}>
                            <p className="mb-4 text-sm font-bold tracking-widest text-blue-600 uppercase">
                                LE NOSTRE COMPETENZE
                            </p>
                        </div>
                        <h1
                            className="font-display fade-up mb-6 text-5xl leading-tight font-bold delay-1 md:text-6xl lg:text-7xl"
                            style={{ opacity: 0 }}
                        >
                            Lavorazioni CNC
                            <br />
                            <span className="gradient-text">di alta precisione</span>
                        </h1>
                        <div className="fade-up delay-2" style={{ opacity: 0, maxWidth: '32rem' }}>
                            <p className="text-xl leading-relaxed text-slate-500">
                                Dalla progettazione CAD/CAM al pezzo finito: gestiamo ogni fase con
                                tecnologia avanzata e controllo qualità rigoroso.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="px-6">
                    <div className="mx-auto max-w-5xl">
                        <Reveal delay="delay-1">
                            <p className="mb-3 text-sm font-bold tracking-widest text-blue-600 uppercase">
                                — COSA OFFRIAMO
                            </p>
                            <h2 className="font-display mb-12 text-4xl font-bold text-slate-900 md:text-5xl">
                                I nostri servizi
                            </h2>
                        </Reveal>

                        {SERVIZI.map((s, i) => (
                            <ServiceBlock key={s.title} s={s} reverse={i % 2 !== 0} index={i} />
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-slate-200 bg-white px-6 py-20 md:py-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <Reveal delay="delay-1">
                            <p className="mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase">
                                La tecnologia dietro ogni lavorazione
                            </p>
                            <h2 className="font-display mx-auto mb-6 max-w-2xl text-4xl font-bold text-slate-800 md:text-5xl lg:text-6xl">
                                Vuoi sapere
                                <br />
                                con cosa lavoriamo?
                            </h2>
                            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-slate-500">
                                Scopri il nostro parco macchine: centri di lavoro CNC 5 assi e torni
                                multi-asse di ultima generazione per garantire precisione su ogni
                                commessa.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/parco-macchine"
                                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg"
                                >
                                    Scopri il parco macchine
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                                <Link
                                    to="/contattaci"
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-10 py-4 font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
                                >
                                    Richiedi un preventivo
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>
        </>
    );
}
