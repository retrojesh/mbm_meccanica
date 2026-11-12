import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import InViewVideo from '../components/InViewVideo';
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
                title="Chi Siamo"
                description="MBM Meccanica: officina metalmeccanica tra Vignola e Castelvetro di Modena, nata dalla passione dei fratelli Mejri. Qualità, innovazione e affidabilità."
            />
            <JsonLd />

            <div className="font-body min-h-screen bg-white text-slate-800">
                {/* Hero Section */}
                <section className="relative mt-20 flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden text-center">
                    <InViewVideo
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        src="/video/hero-azienda.mp4"
                        poster="/video/hero-azienda-poster.webp"
                        preload="auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90" />
                    <div className="relative z-10 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
                        <h1 className="font-display mb-6 text-5xl font-bold text-white md:text-7xl lg:text-8xl">
                            M.B.M. Meccanica Srl
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-white/75 md:text-2xl">
                            Una giovane realtà nel settore della metalmeccanica, con sede legale a
                            Vignola e officina a Castelvetro di Modena, nata dalla passione per
                            l'ingegneria e l'innovazione.
                        </p>
                    </div>
                </section>

                {/* Founders' section*/}
                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:max-w-7xl xl:gap-24 2xl:gap-32">
                        <Reveal delay="d1">
                            <h2 className="font-display mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                                Soufiane e <span className="whitespace-nowrap">Yassine Mejri</span>
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed text-slate-600">
                                Siamo <strong>Soufiane</strong>{' '}
                                <span className="font-normal">e</span>{' '}
                                <strong>Yassine Mejri</strong>, fratelli e fondatori di M.B.M.
                                Meccanica SRL, una giovane realtà nel settore della meccanica
                                industriale, nata dalla nostra passione per l'ingegneria e
                                l'innovazione. Con esperienze diverse ma complementari, abbiamo
                                unito le forze per creare un'azienda dinamica, focalizzata sulla
                                qualità e sulla soddisfazione dei clienti.
                            </p>
                            <p className="mb-8 leading-relaxed text-slate-600">
                                Cerchiamo di fare bene ogni pezzo che passa dalle nostre macchine, e
                                di costruire un rapporto di fiducia con chi ce lo affida.
                            </p>
                        </Reveal>
                        <Reveal delay="d2">
                            <div className="relative">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.08)] lg:aspect-square">
                                    <img
                                        src="/img/chi-siamo.webp"
                                        alt="Soufiane e Yassine Mejri, fondatori di M.B.M. Meccanica, nell'officina di Castelvetro di Modena"
                                        width={1600}
                                        height={1066}
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 h-full w-full object-cover object-[14%_50%] lg:object-[38%_50%]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Company values section */}
                <section className="px-6 py-20 md:py-28">
                    <div className="mx-auto max-w-2xl">
                        <Reveal delay="d1">
                            <div className="eyebrow mb-6 text-blue-700">I nostri principi</div>
                            <h2 className="font-display mb-14 text-4xl font-bold text-slate-900 md:text-5xl">
                                Valori che guidano il nostro lavoro
                            </h2>
                        </Reveal>

                        {/* Carousel with reveal effect */}
                        <Reveal delay="d2">
                            <div className="relative min-h-[180px]">
                                {[
                                    {
                                        title: 'Precisione',
                                        desc: 'Ogni dettaglio conta. Lavoriamo con tolleranze micrometriche e controlliamo ogni pezzo prima della consegna.',
                                    },
                                    {
                                        title: 'Innovazione',
                                        desc: 'Aggiorniamo macchinari e metodi di lavoro per affrontare lavorazioni sempre più complesse.',
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
                                                <h3 className="font-display shrink-0 text-xl font-medium text-slate-900">
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
                        <h2 className="font-display mx-auto mb-6 max-w-3xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                            Trasformare idee e necessità in componenti.
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/80">
                            Raccontaci il tuo progetto: troviamo insieme il modo migliore per
                            realizzarlo.
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
