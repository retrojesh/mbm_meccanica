import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import { useEffect, useRef, useState } from 'react';

const font = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
.font-display { font-family: 'DM Serif Display', Georgia, serif; }
.font-body    { font-family: 'DM Sans', system-ui, sans-serif; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
.fade-up { animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.scale-in { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.d1 { animation-delay: 0.1s; opacity: 0; }
.d2 { animation-delay: 0.2s; opacity: 0; }
.d3 { animation-delay: 0.3s; opacity: 0; }
.d4 { animation-delay: 0.4s; opacity: 0; }
.gradient-text {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.gradient-bg {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}`;

function Reveal({ children, delay = '' }) {
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
        <div ref={ref} className={`${inView ? `fade-up ${delay}` : 'opacity-0'}`}>
            {children}
        </div>
    );
}

export default function Azienda() {
    return (
        <>
            <SEO
                title="Chi Siamo | MBM Meccanica"
                description="MBM Meccanica: azienda metalmeccanica di precisione a Castelvetro di Modena. Nata dalla passione dei fratelli Soufiane e Yassin Mejri. Qualità, innovazione e affidabilità."
                keywords="MBM Meccanica, chi siamo MBM Meccanica, azienda metalmeccanica Modena, metalmeccanica precisione Castelvetro di Modena"
            />
            <JsonLd />

            <div className="font-body min-h-screen bg-white text-slate-800">
                <style>{font}</style>

                {/* Hero Section */}
                <section className="px-6 pt-32 pb-20 text-center md:pt-40 md:pb-28">
                    <div className="scale-in mb-6 inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
                        <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
                            La nostra azienda
                        </p>
                    </div>
                    <h1 className="font-display mb-6 text-5xl leading-tight font-bold md:text-7xl lg:text-8xl">
                        M.B.M. <span className="gradient-text">Meccanica Srl</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-slate-600 md:text-2xl">
                        Una nuova realtà nel settore della meccanica di precisione, nata dalla
                        passione per l'ingegneria e l'innovazione.
                    </p>
                </section>

                {/* Founders' section*/}
                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <Reveal delay="d1">
                            <div className="mb-6 inline-block rounded-lg bg-blue-600/10 px-4 py-2 text-xs font-bold tracking-wider text-blue-700 uppercase">
                                Due fratelli, una stessa visione
                            </div>
                            <h2 className="font-display mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                Soufiane <span className="font-normal">e</span> Yassin Mejri
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed text-slate-600">
                                Siamo <strong>Soufiane</strong>{' '}
                                <span className="font-normal">e</span> <strong>Yassin Mejri</strong>
                                , fratelli e fondatori di M.B.M. Meccanica SRL, una nuova realtà nel
                                settore della meccanica di precisione, nata dalla nostra passione
                                per l'ingegneria e l'innovazione. Con esperienze diverse ma
                                complementari, abbiamo unito le forze per creare un'azienda
                                dinamica, focalizzata sulla qualità e sulla soddisfazione dei
                                clienti.
                            </p>
                            <p className="mb-8 leading-relaxed text-slate-600">
                                Ogni pezzo che realizziamo porta con sé la nostra dedizione alla
                                precisione e il desiderio di costruire relazioni di fiducia con i
                                clienti. Crediamo nel nostro legame familiare come motore di una
                                collaborazione basata su passione e integrità.
                            </p>
                            <div className="rounded-2xl border-l-4 border-blue-600 bg-slate-50 p-6">
                                <p className="font-display mb-1 text-xl text-slate-800 italic">
                                    "Trasformare idee e necessità in componenti che fanno la
                                    differenza."
                                </p>
                                <p className="text-sm text-slate-500">— La nostra missione</p>
                            </div>
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
                                    <div className="flex h-full w-full items-end bg-gradient-to-t from-slate-900 via-transparent to-transparent p-8">
                                        <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                                            <p className="font-display text-sm text-white">
                                                Soufiane & Yassin Mejri
                                            </p>
                                            <p className="text-xs text-blue-300">
                                                Fondatori, MBM Meccanica
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* Company values section */}
                <section className="bg-slate-50 px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <Reveal delay="d1">
                                <div className="mb-6 inline-block rounded-lg bg-blue-600/10 px-4 py-2 text-xs font-bold tracking-wider text-blue-700 uppercase">
                                    I nostri principi
                                </div>
                                <h2 className="font-display mb-6 text-4xl font-bold md:text-5xl">
                                    Valori che guidano il nostro lavoro
                                </h2>
                            </Reveal>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    delay: 'd2',
                                    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
                                    title: 'Precisione',
                                    desc: 'Ogni dettaglio conta. Lavoriamo con tolleranze micrometriche per garantire componenti perfetti.',
                                },
                                {
                                    delay: 'd3',
                                    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z',
                                    title: 'Innovazione',
                                    desc: "Sempre al passo con le tecnologie più avanzate per offrire soluzioni all'avanguardia.",
                                },
                                {
                                    delay: 'd4',
                                    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z',
                                    title: 'Affidabilità',
                                    desc: 'Costruiamo partnership trasparenti e durature con i nostri clienti.',
                                },
                            ].map((v, i) => (
                                <Reveal delay={v.delay} key={i}>
                                    <div className="group flex h-[380px] flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                                            <svg
                                                className="h-6 w-6 text-blue-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d={v.icon}
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="font-display mb-4 text-2xl font-bold text-slate-800">
                                            {v.title}
                                        </h3>
                                        <p className="flex-1 leading-relaxed text-slate-600">
                                            {v.desc}
                                        </p>
                                        <div className="mt-6 h-1 w-12 rounded-full bg-blue-600 transition-all group-hover:w-24" />
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Headquarters Section */}
                <section className="px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-16 text-center">
                            <Reveal delay="d1">
                                <div className="mb-6 inline-block rounded-lg bg-blue-600/10 px-4 py-2 text-xs font-bold tracking-wider text-blue-700 uppercase">
                                    La nostra sede
                                </div>
                                <h2 className="font-display mb-6 text-4xl font-bold md:text-5xl">
                                    Struttura e posizione
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay="d2">
                            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2845.3297536632717!2d10.947375875886053!3d44.50839869670187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fe054e0bf7e35%3A0x1ca09ac2c8a1feac!2sVia%20M.%20Buonarroti%2C%2022%2F24%2C%2041014%20Castelvetro%20di%20Modena%20MO!5e0!3m2!1sit!2sit!4v1775157069684!5m2!1sit!2sit"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Mappa MBM Meccanica"
                                    className="w-full"
                                />
                            </div>
                        </Reveal>
                        <Reveal delay="d3" className="mt-8">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                                <p className="text-slate-600">
                                    <strong className="font-bold text-slate-800">700 m²</strong> di
                                    sede operativa a Castelvetro di Modena. La nostra struttura è
                                    progettata per accogliere non solo i macchinari attuali, ma
                                    anche quelli futuri, a dimostrazione del nostro impegno per una
                                    crescita costante.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* CTA */}
                <section className="gradient-bg px-6 py-24 text-center md:py-32">
                    <Reveal>
                        <div className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm">
                            La nostra promessa
                        </div>
                        <h2 className="font-display mx-auto mb-6 max-w-3xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                            Trasformare idee e necessità in componenti che fanno la differenza.
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-white/80">
                            Ogni progetto è un'opportunità per dimostrare che la precisione, unita
                            alla passione, può fare la differenza. Siamo pronti a raccogliere le
                            vostre sfide.
                        </p>
                        <a
                            href="/servizi"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-bold text-slate-800 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                        >
                            Scopri i nostri servizi
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
