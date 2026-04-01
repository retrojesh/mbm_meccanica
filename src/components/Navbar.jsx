import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="absolute top-0 left-0 z-50 w-full bg-transparent">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-20 items-center justify-between">
                    <div className="text-xl font-medium tracking-wide text-white">
                        M.B.M. Meccanica
                    </div>

                    <div className="hidden gap-10 md:flex">
                        <Link
                            to="/"
                            className="font-medium text-white transition-colors duration-200 hover:text-blue-300"
                        >
                            Home
                        </Link>
                        <a
                            href="azienda"
                            className="font-medium text-white transition-colors duration-200 hover:text-blue-300"
                        >
                            Azienda
                        </a>
                        <Link
                            to="/servizi"
                            className="font-medium text-white transition-colors duration-200 hover:text-blue-300"
                        >
                            Servizi
                        </Link>
                        <Link
                            to="/contattaci"
                            className="font-medium text-white transition-colors duration-200 hover:text-blue-300"
                        >
                            Contattaci
                        </Link>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        <svg
                            className="h-6 w-6 text-white"
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

                {isOpen && (
                    <div className="space-y-3 rounded-lg bg-black/50 px-4 py-4 backdrop-blur-md md:hidden">
                        <Link
                            to="/"
                            className="block py-2 font-medium text-white hover:text-blue-300"
                        >
                            Home
                        </Link>
                        <a
                            href="azienda"
                            className="block py-2 font-medium text-white hover:text-blue-300"
                        >
                            Azienda
                        </a>
                        <Link
                            to="/servizi"
                            className="block py-2 font-medium text-white hover:text-blue-300"
                        >
                            Servizi
                        </Link>
                        <Link
                            to="/contattaci"
                            className="block py-2 font-medium text-white hover:text-blue-300"
                        >
                            Contattaci
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
