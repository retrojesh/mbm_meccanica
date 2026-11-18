import { useEffect, useRef, useState } from 'react';

// Breakpoint "md" di Tailwind: sotto i 768px si usa la variante mobile.
const MOBILE_QUERY = '(max-width: 767px)';

// Video muto in loop che parte quando entra in viewport e si mette in pausa
// quando esce. Rispetta prefers-reduced-motion (resta fermo sul poster).
// preload="none" (default) per i video sotto la piega; "auto" per le hero.
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
    const [isMobile, setIsMobile] = useState(
        () => Boolean(mobileSrc) && window.matchMedia(MOBILE_QUERY).matches
    );
    useEffect(() => {
        if (!mobileSrc) return;
        const mq = window.matchMedia(MOBILE_QUERY);
        const onChange = e => setIsMobile(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, [mobileSrc]);
    const activeSrc = isMobile ? mobileSrc : src;
    const activePoster = isMobile ? (mobilePoster ?? poster) : poster;
    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) video.play().catch(() => {});
                else video.pause();
            },
            { threshold: 0.25 }
        );
        obs.observe(video);
        return () => obs.disconnect();
    }, []);
    return (
        <video
            ref={ref}
            src={activeSrc}
            poster={activePoster}
            muted
            loop
            playsInline
            preload={preload}
            className={className}
        />
    );
}
