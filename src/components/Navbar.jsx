import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const lastScrollY = useRef(0);
    const location = useLocation();
    const isHome = location.pathname === '/';

    const isDark = isHome && !scrolled;

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

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/azienda', label: 'Azienda' },
        { to: '/servizi', label: 'Servizi' },
        { to: '/parco-macchine', label: 'Parco Macchine' },
        { to: '/contattaci', label: 'Contattaci' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'} ${
                isDark
                    ? 'bg-transparent'
                    : 'border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-md'
            } `}
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-20 items-center justify-between">
                    <Link to="/">
                        <img
                            src="/src/assets/logo/MBM_Logo.png"
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

                    {/* Hamburger Menu */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden"
                        aria-label="Menu"
                    >
                        <svg
                            className={`h-6 w-6 transition-colors duration-300 ${
                                isDark ? 'text-white' : 'text-slate-800'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Menu Mobile */}
                {isOpen && (
                    <div className="space-y-1 rounded-xl border border-slate-100 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-md md:hidden">
                        {navLinks.map(({ to, label }) => {
                            const active = isActive(to);
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={() => setIsOpen(false)}
                                    className={`block rounded-lg px-3 py-2.5 font-medium transition-colors ${
                                        active
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                                    }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </nav>
    );
}
