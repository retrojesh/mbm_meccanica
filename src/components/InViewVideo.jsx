import { useEffect, useRef } from 'react';

// Video muto in loop che parte quando entra in viewport e si mette in pausa
// quando esce. Rispetta prefers-reduced-motion (resta fermo sul poster).
// preload="none" (default) per i video sotto la piega; "auto" per le hero.
export default function InViewVideo({ src, poster, preload = 'none', className = '' }) {
    const ref = useRef(null);
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
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload={preload}
            className={className}
        />
    );
}
