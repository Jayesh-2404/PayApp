'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiMenu, BiX, BiRightArrowAlt } from 'react-icons/bi';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
});

export default function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group z-50 relative">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-[0_0_15px_-3px_rgba(212,246,57,0.4)] group-hover:scale-105 transition-transform duration-300">
                            P
                        </div>
                        <span className={`text-xl font-bold tracking-tight ${poppins.className}`}>PayApp.</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10 text-sm font-medium text-muted-foreground">
                        {['Features', 'Why Us', 'Testimonials'].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-primary transition-colors hover:-translate-y-0.5 transform duration-200">
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">
                            Login
                        </Link>
                        <Link href="/auth/register" className="group px-6 py-2.5 rounded-full text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_rgba(212,246,57,0.3)] flex items-center gap-1">
                            Get Started
                            <BiRightArrowAlt className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-3xl text-foreground z-50 relative hover:text-primary transition-colors p-2"
                    >
                        {isOpen ? <BiX /> : <BiMenu />}
                    </button>
                </div>
            </nav>

            {/* Full Screen Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-[#0d0d0d]/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col items-center gap-8">
                    {['Features', 'Why Us', 'Testimonials', 'Login'].map((item, index) => (
                        <Link
                            key={item}
                            href={item === 'Login' ? '/auth/login' : `#${item.toLowerCase().replace(' ', '-')}`}
                            onClick={() => setIsOpen(false)}
                            className={`text-4xl font-bold text-white hover:text-primary transition-colors transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${index * 100}ms`, transitionDuration: '500ms' }}
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        href="/auth/register"
                        onClick={() => setIsOpen(false)}
                        className={`mt-8 px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-[0_0_30px_-5px_rgba(212,246,57,0.4)] transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '400ms', transitionDuration: '500ms' }}
                    >
                        Get Started Now
                    </Link>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
            </div>
        </>
    );
}
