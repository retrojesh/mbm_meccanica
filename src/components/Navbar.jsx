import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo/MBM_Logo.webp';

// Stesso easing delle animazioni del sito (fade-up, slide-in)
const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const lastScrollY = useRef(0);
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Con il menu aperto la barra è sempre piena (logo scuro su bianco)
    const isDark = isHome && !scrolled && !isOpen;

    const isActive = path => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname === path;
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY < 60) {
                setVisible(true);
            } else if (currentY > lastScrollY.current) {
                setVisible(false);
                setIsOpen(false);
            } else {
                setVisible(true);
            }

            setScrolled(currentY > 20);
            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mentre il menu è aperto: blocca lo scroll della pagina, chiude con Esc
    // e quando lo schermo passa alla versione desktop (es. rotazione del telefono)
    useEffect(() => {
        if (!isOpen) return;
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';
        const close = () => setIsOpen(false);
        const onKey = e => e.key === 'Escape' && close();
        const desktop = window.matchMedia('(min-width: 768px)');
        const onResize = e => e.matches && close();
        window.addEventListener('keydown', onKey);
        desktop.addEventListener('change', onResize);
        return () => {
            document.body.style.overflow = overflow;
            window.removeEventListener('keydown', onKey);
            desktop.removeEventListener('change', onResize);
        };
    }, [isOpen]);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/azienda', label: 'Azienda' },
        { to: '/servizi', label: 'Servizi' },
        { to: '/parco-macchine', label: 'Parco Macchine' },
        { to: '/contattaci', label: 'Contattaci' },
    ];

    // Linee dell'hamburger: si trasformano in una X
    const bar = `absolute left-0 h-0.5 w-6 rounded-full transition-all duration-500 ${EASE} motion-reduce:transition-none ${
        isDark ? 'bg-white' : 'bg-slate-800'
    }`;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out ${visible || isOpen ? 'translate-y-0' : '-translate-y-full'} ${
                    isOpen
                        ? 'border-b border-slate-100 bg-white'
                        : isDark
                          ? 'bg-transparent'
                          : 'border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-md'
                } `}
            >
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex h-20 items-center justify-between">
                        <Link to="/" onClick={() => setIsOpen(false)}>
                            <img
                                src={logo}
                                alt="M.B.M. Meccanica"
                                className={`h-10 w-auto transition-all duration-300 ${
                                    isDark ? 'brightness-0 invert' : ''
                                }`}
                            />
                        </Link>

                        {/* Menu Desktop */}
                        <div className="hidden gap-10 md:flex">
                            {navLinks.map(({ to, label }) => {
                                const active = isActive(to);
                                return (
                                    <Link
                                        key={to}
                                        to={to}
                                        className={`group relative font-medium transition-colors duration-200 ${
                                            isDark
                                                ? `text-white hover:text-blue-300 ${active ? 'text-blue-300' : ''}`
                                                : `text-slate-700 hover:text-blue-600 ${active ? 'text-blue-600' : ''}`
                                        }`}
                                    >
                                        {label}
                                        <span
                                            className={`absolute right-0 -bottom-1 left-0 h-0.5 rounded-full transition-all duration-200 ${
                                                active || 'scale-x-0 group-hover:scale-x-100'
                                            } ${isDark ? 'bg-blue-300' : 'bg-blue-600'}`}
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Hamburger animato: le tre linee diventano una X */}
                        <button
                            onClick={() => setIsOpen(o => !o)}
                            className="-mr-2 p-2 md:hidden"
                            aria-label={isOpen ? 'Chiudi il menu' : 'Apri il menu'}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className="relative block h-4 w-6">
                                <span
                                    className={`${bar} ${isOpen ? 'top-[7px] rotate-45' : 'top-0'}`}
                                />
                                <span
                                    className={`${bar} top-[7px] ${isOpen ? 'scale-x-0 opacity-0' : ''}`}
                                />
                                <span
                                    className={`${bar} ${isOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'}`}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Menu Mobile: pannello a tutto schermo. Sta fuori dal <nav> perché
                il transform della barra romperebbe il position: fixed */}
            <div
                id="mobile-menu"
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white px-6 pt-20 transition-all duration-500 ${EASE} motion-reduce:transition-none md:hidden ${
                    isOpen ? 'visible opacity-100' : 'invisible -translate-y-4 opacity-0'
                }`}
            >
                <ul className="mt-6 border-t border-slate-200">
                    {navLinks.map(({ to, label }, i) => {
                        const active = isActive(to);
                        return (
                            <li
                                key={to}
                                className={`border-b border-slate-200 transition-all duration-700 ${EASE} motion-reduce:transition-none ${
                                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                }`}
                                style={{ transitionDelay: isOpen ? `${120 + i * 60}ms` : '0ms' }}
                            >
                                <Link
                                    to={to}
                                    onClick={() => setIsOpen(false)}
                                    aria-current={active ? 'page' : undefined}
                                    className="group block py-4"
                                >
                                    <span
                                        className={`font-display text-3xl font-bold transition-colors ${
                                            active
                                                ? 'text-blue-600'
                                                : 'text-slate-900 group-hover:text-blue-600'
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div
                    className={`mt-auto pt-8 pb-8 transition-all duration-700 ${EASE} motion-reduce:transition-none ${
                        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                    style={{
                        transitionDelay: isOpen ? `${120 + navLinks.length * 60}ms` : '0ms',
                    }}
                >
                    <Link
                        to="/contattaci"
                        onClick={() => setIsOpen(false)}
                        className="block rounded-full bg-blue-600 px-8 py-4 text-center font-bold text-white transition-all hover:bg-blue-500"
                    >
                        Richiedi preventivo
                    </Link>
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Via M. Buonarroti 22/24, Castelvetro di Modena (MO)
                    </p>
                </div>
            </div>
        </>
    );
}
