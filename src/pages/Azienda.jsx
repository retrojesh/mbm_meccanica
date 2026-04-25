import officina from '../assets/pages/azienda/photos/officina.jpg';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import { useEffect, useRef, useState } from 'react';
import '../styles/global.css';

function Reveal({ children, delay = '', className = '' }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => e.isIntersecting && setInView(true) && obs.disconnect(),
            { threshold: 0.1 }
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

export default function Azienda() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <SEO
                title="Chi Siamo | MBM Meccanica"
                description="MBM Meccanica: azienda metalmeccanica a Castelvetro di Modena. Nata dalla passione dei fratelli Soufiane e Yassin Mejri. Qualità, innovazione e affidabilità."
                keywords="MBM Meccanica, chi siamo MBM Meccanica, azienda metalmeccanica Modena, metalmeccanica precisione Castelvetro di Modena"
            />
            <JsonLd />

            <div className="font-body min-h-screen bg-white text-slate-800">
                {/* Hero Section */}
                <section className="relative mt-20 flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden text-center">
                    <img
                        src={officina}
                        alt="Officina MBM Meccanica"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
                    <div className="relative z-10 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
                        <h1 className="font-display mb-6 text-5xl leading-tight font-bold text-white md:text-7xl lg:text-8xl">
                            M.B.M. Meccanica Srl
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-white/75 md:text-2xl">
                            Una giovane realtà nel settore della metalmeccanica, nata dalla passione
                            per l'ingegneria e l'innovazione.
                        </p>
                    </div>
                </section>

                {/* Founders' section*/}
                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <Reveal delay="d1">
                            <div className="mb-6 inline-block px-4 py-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
                                Due fratelli, una stessa visione
                            </div>
                            <h2 className="font-display mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                Soufiane <span className="font-normal">e</span> Yassin Mejri
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed text-slate-600">
                                Siamo <strong>Soufiane</strong>{' '}
                                <span className="font-normal">e</span> <strong>Yassin Mejri</strong>
                                , fratelli e fondatori di M.B.M. Meccanica SRL, una giovane realtà
                                nel settore della meccanica industriale, nata dalla nostra passione
                                per l'ingegneria e l'innovazione. Con esperienze diverse ma
                                complementari, abbiamo unito le forze per creare un'azienda
                                dinamica, focalizzata sulla qualità e sulla soddisfazione dei
                                clienti.
                            </p>
                            <p className="mb-8 leading-relaxed text-slate-600">
                                Ogni pezzo che realizziamo porta con sé la nostra dedizione alla
                                precisione e il desiderio di costruire relazioni di fiducia con i
                                clienti.
                            </p>
                        </Reveal>
                        <Reveal delay="d2">
                            <div className="relative">
                                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 opacity-20 blur-2xl" />
                                <div
                                    className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 bg-cover bg-center shadow-2xl"
                                    style={{
                                        backgroundImage:
                                            "url('https://placehold.co/800x800/1e293b/ffffff?text=Soufiane+%26+Yassin+Mejri')",
                                    }}
                                >
                                    <div className="flex h-full w-full items-end bg-gradient-to-t from-slate-900 via-transparent to-transparent p-8"></div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Company values section */}
                <section className="px-6 py-20 md:py-28">
                    <div className="mx-auto max-w-2xl">
                        <Reveal delay="d1">
                            <div className="mb-6 inline-block px-4 py-2 text-xs font-semibold tracking-wider text-blue-700 uppercase">
                                I nostri principi
                            </div>
                            <h2 className="font-display mb-14 text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
                                Valori che guidano il nostro lavoro
                            </h2>
                        </Reveal>

                        {/* Carousel with reveal effect */}
                        <Reveal delay="d2">
                            <div className="relative min-h-[180px]">
                                {[
                                    {
                                        title: 'Precisione',
                                        desc: 'Ogni dettaglio conta. Lavoriamo con tolleranze micrometriche per garantire componenti perfetti.',
                                    },
                                    {
                                        title: 'Innovazione',
                                        desc: "Sempre al passo con le tecnologie più avanzate per offrire soluzioni all'avanguardia.",
                                    },
                                    {
                                        title: 'Affidabilità',
                                        desc: 'Costruiamo partnership trasparenti e durature con i nostri clienti.',
                                    },
                                ].map((v, i) => (
                                    <div
                                        key={i}
                                        className="absolute inset-0 transition-all duration-500 ease-out"
                                        style={{
                                            opacity: activeIndex === i ? 1 : 0,
                                            visibility: activeIndex === i ? 'visible' : 'hidden',
                                            transform: `translateX(${(i - activeIndex) * 20}px)`,
                                        }}
                                    >
                                        <div className="py-10">
                                            <div className="flex items-baseline justify-between gap-12">
                                                <h3 className="shrink-0 text-xl font-medium text-slate-900">
                                                    {v.title}
                                                </h3>
                                                <p className="max-w-xs text-right text-base leading-relaxed text-slate-500">
                                                    {v.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Dots indicator */}
                            <div className="mt-8 flex justify-center gap-2">
                                {[0, 1, 2].map(idx => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            activeIndex === idx
                                                ? 'w-8 bg-blue-600'
                                                : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* CTA */}
                <section className="gradient-bg px-6 py-24 text-center md:py-32">
                    <Reveal>
                        <div className="mb-6 px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase">
                            La nostra promessa
                        </div>
                        <h2 className="font-display mx-auto mb-6 max-w-3xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                            Trasformare idee e necessità in componenti.
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/80">
                            Ogni progetto è un'opportunità per dimostrare che la precisione, unita
                            alla passione, può fare la differenza.
                        </p>
                        <a
                            href="/servizi"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-bold text-slate-800 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                        >
                            I nostri servizi
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </a>
                    </Reveal>
                </section>
            </div>
        </>
    );
}
