import { useEffect, useRef, useState } from 'react';

// Breakpoint "md" di Tailwind: sotto i 768px si usa la variante mobile.
const MOBILE_QUERY = '(max-width: 767px)';

// Quanto prima di entrare in viewport il video comincia a scaricarsi,
// così quando arriva sullo schermo è già pronto a partire.
const PRELOAD_MARGIN = '600px 0px';

// Video muto in loop che parte quando entra in viewport e si mette in pausa
// quando esce. Rispetta prefers-reduced-motion (resta fermo sul poster).
// preload="none" (default) per i video sotto la piega: il file non viene
// richiesto finché il video non arriva a PRELOAD_MARGIN dal viewport; fino ad
// allora si vede solo il poster. preload="auto" per le hero: download immediato.
// mobileSrc/mobilePoster (opzionali): video alternativo sotto il breakpoint md,
// scelto prima del primo render così il browser scarica un solo file.
export default function InViewVideo({
    src,
    poster,
    mobileSrc,
    mobilePoster,
    preload = 'none',
    className = '',
}) {
    const ref = useRef(null);
    const inViewRef = useRef(false);
    const [reduceMotion] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    const [isMobile, setIsMobile] = useState(
        () => Boolean(mobileSrc) && window.matchMedia(MOBILE_QUERY).matches
    );
    // Il src viene assegnato solo quando il video è vicino al viewport:
    // è il modo affidabile su tutti i browser per rimandare il download.
    const [isNear, setIsNear] = useState(preload !== 'none');

    useEffect(() => {
        if (!mobileSrc) return;
        const mq = window.matchMedia(MOBILE_QUERY);
        const onChange = e => setIsMobile(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, [mobileSrc]);

    // Avvicinamento al viewport: avvia il download in anticipo.
    useEffect(() => {
        const video = ref.current;
        if (!video || isNear || reduceMotion) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) setIsNear(true);
            },
            { rootMargin: PRELOAD_MARGIN }
        );
        obs.observe(video);
        return () => obs.disconnect();
    }, [isNear, reduceMotion]);

    // Visibilità effettiva: play/pausa.
    useEffect(() => {
        const video = ref.current;
        if (!video || reduceMotion) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                inViewRef.current = e.isIntersecting;
                if (e.isIntersecting) video.play().catch(() => {});
                else video.pause();
            },
            { threshold: 0.25 }
        );
        obs.observe(video);
        return () => obs.disconnect();
    }, [reduceMotion]);

    const activeSrc = isMobile ? mobileSrc : src;
    const activePoster = isMobile ? (mobilePoster ?? poster) : poster;

    // Se il video diventa visibile prima che il file sia pronto (scroll
    // veloce), il play() dell'observer fallisce: riprova appena può partire.
    const onCanPlay = () => {
        if (inViewRef.current && !reduceMotion) ref.current?.play().catch(() => {});
    };

    return (
        <video
            ref={ref}
            src={isNear ? activeSrc : undefined}
            poster={activePoster}
            muted
            loop
            playsInline
            preload={isNear ? 'auto' : 'none'}
            onCanPlay={onCanPlay}
            className={className}
        />
    );
}
