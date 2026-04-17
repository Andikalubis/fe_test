import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
            <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.64 5H8.4a2 2 0 0 0-1.9 1.3L5 10 3 8" />
                            <path d="M7 14h.01" />
                            <path d="M17 14h.01" />
                            <rect width="18" height="8" x="3" y="10" rx="2" />
                            <path d="M5 18v2" />
                            <path d="M19 18v2" />
                        </svg>
                        <h1 className="text-xl font-bold tracking-wide">ParkirModern</h1>
                    </Link>
                    <nav className="flex space-x-6 font-medium">
                        <Link
                            to="/"
                            className={`transition-colors ${location.pathname === '/' ? 'text-white border-b-2 border-white pb-1' : 'text-blue-200 hover:text-white'}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/details"
                            className={`transition-colors ${location.pathname === '/details' ? 'text-white border-b-2 border-white pb-1' : 'text-blue-200 hover:text-white'}`}
                        >
                            Detail Pesanan
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-1">
                {children}
            </main>

            <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
                &copy; {new Date().getFullYear()} ParkirModern by Equanimity. All rights reserved.
            </footer>
        </div>
    );
};
