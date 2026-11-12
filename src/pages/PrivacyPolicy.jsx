import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { setConsent, useConsent } from '../utils/consent';
import '../styles/global.css';

// Aggiornare ad ogni modifica sostanziale del testo.
const LAST_UPDATE = '11 novembre 2026';

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

function Section({ id, num, title, children }) {
    return (
        <Reveal delay="d1">
            <section
                id={id}
                className="scroll-mt-28 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
            >
                <h2 className="font-display mb-5 text-2xl font-semibold text-slate-800">
                    <span className="mr-2 text-blue-600">{num}.</span>
                    {title}
                </h2>
                <div className="space-y-4 leading-relaxed text-slate-600">{children}</div>
            </section>
        </Reveal>
    );
}

function H3({ children }) {
    return <h3 className="font-display pt-2 font-semibold text-slate-800">{children}</h3>;
}

function ExtLink({ href, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700"
        >
            {children}
        </a>
    );
}

function Mail() {
    return (
        <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=info@mbmmeccanica.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
        >
            info@mbmmeccanica.com
        </a>
    );
}

function ConsentControls() {
    const consent = useConsent();
    const label =
        consent === 'accepted'
            ? 'Hai accettato il caricamento di Google Maps.'
            : consent === 'rejected'
              ? 'Hai accettato di non caricare Google Maps.'
              : 'La tua scelta non è ancora stata espressa.';
    return (
        <div className="flex flex-wrap items-center gap-4 rounded-xl bg-slate-50 p-4">
            <span className="text-sm font-medium text-slate-600">{label}</span>
            {consent !== null && (
                <button
                    type="button"
                    onClick={() => setConsent(null)}
                    className="cursor-pointer rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
                >
                    Modifica preferenze
                </button>
            )}
        </div>
    );
}

const INDEX = [
    ['titolare', 'Titolare del trattamento'],
    ['dati', 'Tipologie di dati trattati'],
    ['finalita', 'Finalità e basi giuridiche'],
    ['modalita', 'Modalità del trattamento'],
    ['conservazione', 'Tempi di conservazione'],
    ['destinatari', 'Destinatari e servizi di terze parti'],
    ['trasferimento', 'Trasferimento dei dati fuori dall’UE'],
    ['cookie', 'Cookie policy'],
    ['diritti', 'Diritti dell’interessato'],
    ['modifiche', 'Modifiche alla presente informativa'],
];

export default function PrivacyPage() {
    return (
        <>
            <SEO
                title="Privacy e Cookie Policy"
                description="Informativa privacy e cookie del sito MBM Meccanica ai sensi del GDPR: dati trattati, finalità, servizi di terze parti, diritti dell'utente e gestione del consenso."
            />

            <div className="font-body min-h-screen bg-white text-slate-800">
                {/* Hero */}
                <section className="relative overflow-hidden px-6 pt-32 pb-10 md:pt-40 md:pb-12">
                    <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl filter" />
                    <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-cyan-100 opacity-20 blur-3xl filter" />

                    <div className="relative mx-auto max-w-4xl text-center">
                        <div className="fade-up d1">
                            <p className="eyebrow mb-4 text-blue-600">Trasparenza e conformità</p>
                        </div>
                        <h1 className="font-display fade-up d2 mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
                            Privacy e Cookie Policy
                        </h1>
                        <div className="fade-up d3">
                            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-500">
                                Come trattiamo i dati personali di chi visita questo sito, ai sensi
                                del Regolamento (UE) 2016/679 (GDPR).
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contenuto */}
                <section className="px-6 pb-16 md:pb-24">
                    <div className="mx-auto max-w-3xl space-y-8">
                        {/* Premessa e indice */}
                        <Reveal delay="d1">
                            <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-8 leading-relaxed text-slate-600">
                                <p>
                                    La presente informativa descrive le modalità di trattamento dei
                                    dati personali degli utenti che consultano il sito{' '}
                                    <strong>www.mbmmeccanica.com</strong> (il “Sito”), resa ai sensi
                                    dell’art. 13 del Regolamento (UE) 2016/679 (“GDPR”) e del D.Lgs.
                                    196/2003 (“Codice Privacy”), come modificato dal D.Lgs.
                                    101/2018.
                                </p>
                                <p>
                                    L’informativa riguarda esclusivamente il Sito e non si estende
                                    ad altri siti web eventualmente raggiungibili tramite link.
                                </p>
                                <nav aria-label="Indice dell'informativa">
                                    <p className="mb-2 font-semibold text-slate-800">Indice</p>
                                    <ol className="list-decimal space-y-1 pl-5">
                                        {INDEX.map(([id, label]) => (
                                            <li key={id}>
                                                <a
                                                    href={`#${id}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                    </ol>
                                </nav>
                            </div>
                        </Reveal>

                        <Section id="titolare" num={1} title="Titolare del trattamento">
                            <p>
                                <strong>M.B.M. Meccanica Srl</strong>
                                <br />
                                Sede legale: Via Renzo Boni 54, 41058 Vignola (MO)
                                <br />
                                Sede operativa: Via M. Buonarroti 22/24, 41014 Castelvetro di Modena
                                (MO)
                                <br />
                                P.IVA: 04125990368
                                <br />
                                Email: <Mail />
                            </p>
                            <p>
                                Il Titolare non ha nominato un Responsabile della protezione dei
                                dati (DPO), non essendo tenuto a farlo ai sensi dell’art. 37 GDPR.
                            </p>
                        </Section>

                        <Section id="dati" num={2} title="Tipologie di dati trattati">
                            <H3>Dati di navigazione</H3>
                            <p>
                                I sistemi informatici che ospitano il Sito acquisiscono, nel corso
                                del loro normale funzionamento, alcuni dati la cui trasmissione è
                                implicita nell’uso dei protocolli di comunicazione di Internet: ad
                                esempio l’indirizzo IP, la data e l’ora della richiesta, la risorsa
                                richiesta, il codice di risposta del server, il tipo di browser e il
                                sistema operativo. Si tratta di informazioni che non sono raccolte
                                per essere associate a interessati identificati.
                            </p>
                            <H3>Dati forniti volontariamente dall’utente</H3>
                            <p>
                                Il Sito non contiene moduli di contatto, aree riservate, newsletter
                                né strumenti di statistica. Se l’utente sceglie di contattare il
                                Titolare tramite email o WhatsApp, il Titolare acquisisce i dati che
                                l’utente decide di comunicare (ad esempio nome, azienda, recapiti,
                                contenuto del messaggio ed eventuali allegati come disegni tecnici).
                            </p>
                            <p>
                                Il conferimento di questi dati è facoltativo; in sua assenza,
                                tuttavia, non è possibile dare seguito alla richiesta.
                            </p>
                            <H3>Dati raccolti da servizi di terze parti</H3>
                            <p>
                                Solo previo consenso dell’utente, il Sito mostra una mappa di Google
                                Maps, che può raccogliere dati di navigazione e utilizzare cookie. I
                                dettagli sono riportati nella{' '}
                                <a href="#cookie" className="text-blue-600 underline">
                                    Cookie policy
                                </a>
                                .
                            </p>
                        </Section>

                        <Section id="finalita" num={3} title="Finalità e basi giuridiche">
                            <ul className="list-disc space-y-3 pl-5">
                                <li>
                                    <strong>Funzionamento e sicurezza del Sito</strong> (dati di
                                    navigazione): legittimo interesse del Titolare a garantire
                                    l’erogazione del Sito e a prevenire abusi e attacchi informatici
                                    (art. 6, par. 1, lett. f GDPR).
                                </li>
                                <li>
                                    <strong>
                                        Risposta a richieste di informazioni e preventivi
                                    </strong>
                                    : esecuzione di misure precontrattuali adottate su richiesta
                                    dell’interessato (art. 6, par. 1, lett. b GDPR).
                                </li>
                                <li>
                                    <strong>Gestione del rapporto commerciale</strong>, qualora alla
                                    richiesta segua un ordine: esecuzione del contratto e
                                    adempimento degli obblighi di legge, ad esempio contabili e
                                    fiscali (art. 6, par. 1, lett. b e c GDPR).
                                </li>
                                <li>
                                    <strong>Visualizzazione della mappa Google Maps</strong>:
                                    consenso dell’utente, revocabile in qualsiasi momento (art. 6,
                                    par. 1, lett. a GDPR).
                                </li>
                            </ul>
                            <p>
                                I dati non sono utilizzati per finalità di marketing, non sono
                                oggetto di profilazione né di processi decisionali automatizzati.
                            </p>
                        </Section>

                        <Section id="modalita" num={4} title="Modalità del trattamento">
                            <p>
                                Il trattamento è effettuato con strumenti informatici e telematici,
                                nel rispetto dei principi di liceità, correttezza, trasparenza e
                                minimizzazione dei dati. Il Titolare adotta misure tecniche e
                                organizzative adeguate (art. 32 GDPR) per prevenire la perdita dei
                                dati, usi illeciti o non corretti e accessi non autorizzati.
                            </p>
                        </Section>

                        <Section id="conservazione" num={5} title="Tempi di conservazione">
                            <ul className="list-disc space-y-3 pl-5">
                                <li>
                                    <strong>Dati di navigazione</strong>: per il tempo previsto
                                    dalle politiche del fornitore di hosting e comunque non oltre
                                    quanto necessario per finalità di sicurezza.
                                </li>
                                <li>
                                    <strong>Richieste di contatto</strong>: per il tempo necessario
                                    a gestire la richiesta. Se segue un rapporto commerciale, per la
                                    sua durata e successivamente per i termini previsti dalla legge
                                    (ad esempio 10 anni per la documentazione contabile, ai sensi
                                    dell’art. 2220 c.c.).
                                </li>
                                <li>
                                    <strong>Scelta sul consenso</strong>: memorizzata nel browser
                                    dell’utente finché non viene modificata o finché l’utente non
                                    cancella i dati di navigazione.
                                </li>
                            </ul>
                        </Section>

                        <Section
                            id="destinatari"
                            num={6}
                            title="Destinatari e servizi di terze parti"
                        >
                            <p>
                                I dati non sono diffusi né ceduti a terzi per loro finalità
                                commerciali. Possono venirne a conoscenza, nei limiti di quanto
                                necessario, i seguenti soggetti:
                            </p>
                            <ul className="list-disc space-y-3 pl-5">
                                <li>
                                    <strong>Netlify, Inc.</strong> (Stati Uniti), fornitore del
                                    servizio di hosting del Sito, in qualità di responsabile del
                                    trattamento.{' '}
                                    <ExtLink href="https://www.netlify.com/privacy/">
                                        Privacy policy di Netlify
                                    </ExtLink>
                                </li>
                                <li>
                                    <strong>Google Ireland Limited / Google LLC</strong>, per la
                                    mappa Google Maps, in qualità di titolare autonomo e solo previo
                                    consenso.{' '}
                                    <ExtLink href="https://policies.google.com/privacy">
                                        Privacy policy di Google
                                    </ExtLink>
                                </li>
                                <li>
                                    <strong>WhatsApp Ireland Limited</strong>, se l’utente sceglie
                                    di contattare il Titolare tramite WhatsApp, in qualità di
                                    titolare autonomo.{' '}
                                    <ExtLink href="https://www.whatsapp.com/legal/privacy-policy-eea">
                                        Privacy policy di WhatsApp
                                    </ExtLink>
                                </li>
                                <li>
                                    Il fornitore del servizio di posta elettronica del Titolare e,
                                    ove necessario, consulenti e professionisti (ad esempio in
                                    ambito contabile e fiscale), vincolati alla riservatezza.
                                </li>
                            </ul>
                        </Section>

                        <Section
                            id="trasferimento"
                            num={7}
                            title="Trasferimento dei dati fuori dall’UE"
                        >
                            <p>
                                Alcuni fornitori sopra indicati hanno sede o server negli Stati
                                Uniti. In tali casi il trasferimento avviene sulla base della
                                decisione di adeguatezza della Commissione europea relativa
                                all’EU-U.S. Data Privacy Framework, per i fornitori che vi
                                aderiscono, oppure delle Clausole Contrattuali Standard approvate
                                dalla Commissione europea (art. 46 GDPR).
                            </p>
                        </Section>

                        <Section id="cookie" num={8} title="Cookie policy">
                            <p>
                                I cookie sono piccoli file di testo che i siti visitati salvano nel
                                browser dell’utente. Strumenti analoghi, come il{' '}
                                <em>local storage</em>, svolgono una funzione simile. Il Sito
                                utilizza questi strumenti in modo molto limitato.
                            </p>

                            <H3>Strumenti tecnici (non richiedono consenso)</H3>
                            <p>
                                Il Sito non installa cookie propri. Per ricordare la scelta espressa
                                nel banner utilizza il <em>local storage</em> del browser (voce{' '}
                                <code className="rounded bg-slate-100 px-1.5">consent</code>). Si
                                tratta di uno strumento tecnico strettamente necessario, per il
                                quale non è richiesto il consenso (art. 122 Codice Privacy e Linee
                                guida del Garante del 10 giugno 2021).
                            </p>
                            <p>
                                I caratteri tipografici sono ospitati direttamente sul Sito: la loro
                                visualizzazione non comporta collegamenti a servizi esterni.
                            </p>

                            <H3>Servizi di terze parti (richiedono consenso)</H3>
                            <p>
                                <strong>Google Maps</strong> (Google Ireland Limited): servizio di
                                visualizzazione di mappe, presente nella pagina Contatti. Quando la
                                mappa viene caricata, Google può raccogliere l’indirizzo IP e altri
                                dati di navigazione e installare cookie. La mappa viene caricata
                                solo se l’utente presta il consenso tramite il banner oppure se
                                sceglie di aprirla con l’apposito pulsante.
                            </p>

                            <H3>Come gestire le preferenze</H3>
                            <p>
                                L’utente può modificare o revocare la propria scelta in qualsiasi
                                momento con il pulsante qui sotto. È inoltre possibile cancellare
                                cookie e dati dei siti dalle impostazioni del proprio browser.
                            </p>
                            <ConsentControls />
                        </Section>

                        <Section id="diritti" num={9} title="Diritti dell’interessato">
                            <p>
                                In qualsiasi momento l’utente può esercitare i diritti previsti
                                dagli artt. 15-22 GDPR, e in particolare:
                            </p>
                            <ul className="list-disc space-y-2 pl-5">
                                <li>accedere ai propri dati personali e ottenerne copia;</li>
                                <li>chiederne la rettifica o l’integrazione;</li>
                                <li>
                                    chiederne la cancellazione o la limitazione del trattamento;
                                </li>
                                <li>ricevere i dati in un formato strutturato (portabilità);</li>
                                <li>
                                    opporsi al trattamento basato sul legittimo interesse del
                                    Titolare;
                                </li>
                                <li>
                                    revocare il consenso prestato, senza pregiudicare la liceità del
                                    trattamento effettuato prima della revoca.
                                </li>
                            </ul>
                            <p>
                                Le richieste possono essere inviate a <Mail />. Il Titolare risponde
                                senza ingiustificato ritardo e comunque entro un mese dal
                                ricevimento.
                            </p>
                            <p>
                                L’utente ha inoltre il diritto di proporre reclamo al{' '}
                                <ExtLink href="https://www.garanteprivacy.it">
                                    Garante per la protezione dei dati personali
                                </ExtLink>{' '}
                                o all’autorità di controllo dello Stato membro in cui risiede o
                                lavora.
                            </p>
                        </Section>

                        <Section
                            id="modifiche"
                            num={10}
                            title="Modifiche alla presente informativa"
                        >
                            <p>
                                Il Titolare può modificare la presente informativa, ad esempio in
                                seguito a novità normative o all’introduzione di nuovi servizi sul
                                Sito. Le modifiche sono pubblicate su questa pagina, con
                                l’indicazione della data di ultimo aggiornamento.
                            </p>
                        </Section>

                        {/* Data e link home */}
                        <div className="pt-8 text-center">
                            <p className="mb-4 text-sm text-slate-400">
                                Ultimo aggiornamento: {LAST_UPDATE}
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
                </section>
            </div>
        </>
    );
}
