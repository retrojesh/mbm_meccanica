import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

import pezzo1 from '../assets/pages/parco-macchine/pezzi/pezzo-1.webp';
import pezzo2 from '../assets/pages/parco-macchine/pezzi/pezzo-2.webp';
import pezzo3 from '../assets/pages/parco-macchine/pezzi/pezzo-3.webp';
import pezzo4 from '../assets/pages/parco-macchine/pezzi/pezzo-4.webp';
import pezzo5 from '../assets/pages/parco-macchine/pezzi/pezzo-5.webp';
import pezzo6 from '../assets/pages/parco-macchine/pezzi/pezzo-6.webp';
import pezzo8 from '../assets/pages/parco-macchine/pezzi/pezzo-8.webp';
import pezzo9 from '../assets/pages/parco-macchine/pezzi/pezzo-9.webp';
import pezzo10 from '../assets/pages/parco-macchine/pezzi/pezzo-10.webp';
import pezzo11 from '../assets/pages/parco-macchine/pezzi/pezzo-11.webp';

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
.font-display { font-family: 'DM Serif Display', Georgia, serif; }
.font-body    { font-family: 'DM Sans', system-ui, sans-serif; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes imgFade { from { opacity: 0; } to { opacity: 1; } }
.img-fade { animation: imgFade 0.35s ease; }
.d1 { animation-delay: 0.05s; opacity: 0; }
.d2 { animation-delay: 0.12s; opacity: 0; }
.d3 { animation-delay: 0.19s; opacity: 0; }
.d4 { animation-delay: 0.26s; opacity: 0; }
.gradient-text {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.gradient-bg {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}
`;

const PEZZI = [pezzo1, pezzo2, pezzo3, pezzo4, pezzo5, pezzo6, pezzo8, pezzo9, pezzo10, pezzo11];

const TIPI_PEZZO = [
    'Prototipi',
    'Collari',
    'Alberi',
    'Porta satelliti',
    'Scatole differenziali',
    'Ruote',
    'Corpi riduttori',
    'Pistoni',
    'Supporti',
    'Flange',
];

const MACCHINE = [
    {
        cat: 'Tornitura',
        nome: 'DMG CTX 410',
        brand: 'Gildemeister',
        specs: [
            { label: 'Ø tornitura max', value: '320 mm' },
            { label: 'Lunghezza max', value: '600 mm' },
            { label: 'Capacità barra', value: 'Ø 65 mm' },
            { label: 'Corsa Y', value: '± 40 mm' },
            { label: 'Mandrino', value: '5.000 giri/min' },
            { label: 'Torretta', value: '12 posizioni' },
        ],
    },
    {
        cat: 'Tornitura',
        nome: 'DMG Mori NLX 2000Y/500',
        brand: 'DMG Mori',
        specs: [
            { label: 'Ø tornitura max', value: '275 mm' },
            { label: 'Lunghezza max', value: '510 mm' },
            { label: 'Capacità barra', value: 'Ø 65 mm' },
            { label: 'Corsa Y', value: '± 50 mm' },
            { label: 'Mandrino', value: '5.000 giri/min' },
            { label: 'Torretta', value: '20 posizioni' },
        ],
    },
    {
        cat: 'Fresatura 5 assi',
        nome: 'Sigma Flexy',
        brand: 'Sigma',
        specs: [
            { label: 'Lunghezza max X', value: '2.200 mm' },
            { label: 'Lunghezza max Y', value: '700 mm' },
            { label: 'Corsa X', value: '2.300 mm' },
            { label: 'Corsa Y', value: '± 720 mm' },
            { label: 'Corsa Z', value: '650 mm' },
            { label: 'Asse C', value: '360° continuo' },
        ],
    },
    {
        cat: 'Fresatura 3 assi',
        nome: 'G.F. HSM 800',
        brand: 'Georg Fischer',
        specs: [
            { label: 'Lunghezza max X', value: '1.000 mm' },
            { label: 'Lunghezza max Y', value: '700 mm' },
            { label: 'Corsa X', value: '800 mm' },
            { label: 'Corsa Y', value: '700 mm' },
            { label: 'Corsa Z', value: '500 mm' },
            { label: 'Mandrino', value: '24.000 giri/min' },
        ],
    },
];

function Reveal({ children, delay = '', className = '' }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => e.isIntersecting && setInView(true) && obs.disconnect(),
            { threshold: 0.08 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div ref={ref} className={`${inView ? `fade-up ${delay}` : 'opacity-0'} ${className}`}>
            {children}
        </div>
    );
}

function PezziCarousel() {
    const n = PEZZI.length;
    // 2 cloni per lato → looping fluido anche tenendo premuto ai bordi
    const SLIDES = [PEZZI[n - 2], PEZZI[n - 1], ...PEZZI, PEZZI[0], PEZZI[1]];
    const total = SLIDES.length; // n + 4
    const INIT = 2;

    const [active, setActive] = useState(0);

    const viRef = useRef(INIT);
    const swRef = useRef(0); // slideWidth in px (= containerWidth * 0.6)
    const cwRef = useRef(0); // containerWidth in px
    const containerRef = useRef(null);
    const stripRef = useRef(null);
    const dragging = useRef(false);
    const animating = useRef(false);
    const startX = useRef(0);
    const dragX = useRef(0);
    const timer = useRef(null);

    // Centra la slide vi: (containerWidth - slideWidth) / 2 - vi * slideWidth
    const tx = (vi, pxOffset = 0) =>
        (cwRef.current - swRef.current) / 2 - vi * swRef.current + pxOffset;

    const applyPos = (vi, pxOffset = 0, animated = true) => {
        if (!stripRef.current) return;
        stripRef.current.style.transition = animated
            ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none';
        stripRef.current.style.transform = `translateX(${tx(vi, pxOffset)}px)`;
    };

    const wrapAfter = () => {
        const vi = viRef.current;
        if (vi <= 1) {
            const nv = vi + n;
            viRef.current = nv;
            applyPos(nv, 0, false);
        } else if (vi >= n + 2) {
            const nv = vi - n;
            viRef.current = nv;
            applyPos(nv, 0, false);
        }
    };

    const slideTo = (vi, animated = true) => {
        if (animating.current && animated) return;
        animating.current = animated;
        viRef.current = vi;
        applyPos(vi, 0, animated);
        setActive((((vi - INIT) % n) + n) % n);
        if (animated)
            setTimeout(() => {
                animating.current = false;
                wrapAfter();
            }, 410);
    };

    const startTimer = () => {
        clearInterval(timer.current);
        timer.current = setInterval(() => slideTo(viRef.current + 1, true), 4000);
    };

    // Imposta dimensioni in pixel e si aggiorna al resize
    useEffect(() => {
        const resize = () => {
            if (!containerRef.current || !stripRef.current) return;
            const cw = containerRef.current.offsetWidth;
            cwRef.current = cw;
            const sw = cw * 0.6;
            swRef.current = sw;
            stripRef.current.style.width = `${total * sw}px`;
            Array.from(stripRef.current.children).forEach(el => {
                el.style.width = `${sw}px`;
            });
            applyPos(viRef.current, 0, false);
        };
        resize();
        startTimer();
        window.addEventListener('resize', resize);
        return () => {
            clearInterval(timer.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    const onPointerDown = e => {
        if (animating.current) return;
        dragging.current = true;
        dragX.current = 0;
        startX.current = e.clientX;
        clearInterval(timer.current);
        e.currentTarget.setPointerCapture(e.pointerId);
        applyPos(viRef.current, 0, false);
    };

    const onPointerMove = e => {
        if (!dragging.current) return;
        dragX.current = e.clientX - startX.current;
        applyPos(viRef.current, dragX.current, false);
    };

    const onPointerUp = () => {
        if (!dragging.current) return;
        dragging.current = false;
        const diff = dragX.current;
        if (diff < -50) slideTo(viRef.current + 1, true);
        else if (diff > 50) slideTo(viRef.current - 1, true);
        else applyPos(viRef.current, 0, true);
        startTimer();
    };

    return (
        <section className="bg-slate-50 px-6 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                <Reveal delay="d1">
                    <h2 className="font-display mb-2 text-3xl font-bold text-slate-900 md:text-4xl">
                        Alcuni dei nostri prodotti finiti
                    </h2>
                    <div className="mb-12 h-px bg-blue-600" />
                </Reveal>

                <Reveal delay="d2">
                    <div className="flex items-start gap-6 md:gap-10">
                        <div ref={containerRef} className="min-w-0 flex-1">
                            <div
                                className="h-[330px] w-full cursor-grab overflow-hidden select-none active:cursor-grabbing"
                                onPointerDown={onPointerDown}
                                onPointerMove={onPointerMove}
                                onPointerUp={onPointerUp}
                                onPointerCancel={onPointerUp}
                                style={{ touchAction: 'none' }}
                            >
                                <div ref={stripRef} className="flex h-full">
                                    {SLIDES.map((src, i) => (
                                        <div key={i} className="h-full shrink-0 px-3">
                                            <img
                                                src={src}
                                                alt=""
                                                draggable="false"
                                                className="h-full w-full rounded-xl object-cover"
                                                style={
                                                    src === PEZZI[2]
                                                        ? { objectPosition: 'center 37%' }
                                                        : src === PEZZI[4]
                                                          ? { objectPosition: 'center 85%' }
                                                          : undefined
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center gap-2">
                                {PEZZI.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            slideTo(i + INIT, true);
                                            startTimer();
                                        }}
                                        className={`rounded-full transition-all duration-300 ${
                                            active === i
                                                ? 'h-2.5 w-6 bg-blue-600'
                                                : 'h-2.5 w-2.5 border border-slate-400 hover:border-slate-600'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="hidden w-44 shrink-0 md:block lg:w-52">
                            <ul className="mb-8 space-y-2.5">
                                {TIPI_PEZZO.map(tipo => (
                                    <li
                                        key={tipo}
                                        className="flex items-center gap-2.5 text-slate-600"
                                    >
                                        <svg
                                            className="h-2.5 w-2.5 shrink-0 text-blue-600"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5l12 7-12 7V5z" />
                                        </svg>
                                        <span className="text-sm">{tipo}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/contattaci"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-xs font-bold tracking-wider text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-blue-500"
                            >
                                Contattaci qui
                                <svg
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default function ParcoMacchine() {
    return (
        <>
            <SEO
                title="Parco Macchine | Fresatura CNC e Tornitura CNC"
                description="Fresatura CNC e tornitura CNC di alta precisione con progettazione CAD/CAM. MBM Meccanica realizza componenti per automotive, motorsport e packaging a Castelvetro di Modena. Conto terzi e su commessa."
                keywords="fresatura CNC Modena, tornitura CNC Modena, fresatura CNC Castelvetro, tornitura CNC Castelvetro, lavorazioni CNC Emilia Romagna, CAD CAM Modena, fresatura di precisione, tornitura di precisione, lavorazioni meccaniche conto terzi, officina CNC Modena, componenti meccanici motorsport, lavorazioni settore packaging, prototipazione meccanica Modena, fresatura 5 assi Modena"
            />
            <style>{css}</style>

            <div className="font-body bg-white text-slate-800">
                <section className="mt-20 px-6 pt-20 pb-24 md:pt-28 md:pb-32">
                    <div className="mx-auto max-w-6xl">
                        <Reveal delay="d1">
                            <p className="mb-3 text-xs font-bold tracking-widest text-blue-600 uppercase">
                                Parco macchine
                            </p>
                            <h1 className="font-display mb-4 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                Tecnologia CNC
                                <br />
                                <span> al servizio della precisione </span>
                            </h1>
                            <p className="mb-16 max-w-2xl text-lg leading-relaxed text-slate-500">
                                Quattro centri di lavoro CNC per tornitura e fresatura multi-asse,
                                tutti equipaggiati con software CAD/CAM e post processor dedicato.
                            </p>
                        </Reveal>

                        <div className="divide-y divide-slate-100">
                            {MACCHINE.map((m, i) => (
                                <Reveal key={m.nome} delay="d1">
                                    <div
                                        className={`flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                                    >
                                        {/* Foto */}
                                        <div className="flex h-64 w-full shrink-0 items-center justify-center bg-slate-100 md:h-auto md:w-1/2">
                                            <div className="flex flex-col items-center gap-2 text-slate-300">
                                                <svg
                                                    className="h-10 w-10"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1}
                                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                <span className="text-xs">foto in arrivo</span>
                                            </div>
                                        </div>

                                        {/* Specs */}
                                        <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-12 md:py-14">
                                            <span className="mb-3 text-xs font-bold tracking-widest text-blue-600 uppercase">
                                                {m.cat}
                                            </span>
                                            <h2 className="font-display mb-1 text-3xl font-bold text-slate-900">
                                                {m.nome}
                                            </h2>
                                            <p className="mb-8 text-sm text-slate-400">{m.brand}</p>

                                            <div className="grid grid-cols-2 gap-x-8">
                                                {m.specs.map(s => (
                                                    <div
                                                        key={s.label}
                                                        className="border-b border-slate-100 py-3"
                                                    >
                                                        <p className="mb-0.5 text-xs text-slate-400">
                                                            {s.label}
                                                        </p>
                                                        <p className="text-sm font-semibold text-slate-900 tabular-nums">
                                                            {s.value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <PezziCarousel />
            </div>
        </>
    );
}
