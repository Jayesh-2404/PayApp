"use client";

interface MobileMenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
    return (
        <button
            onClick={onClick}
            className="md:hidden p-2 -ml-2 rounded-xl text-foreground hover:bg-accent transition-colors relative z-50"
            aria-label="Toggle menu"
        >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <span
                    className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                />
                <span
                    className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                        }`}
                />
                <span
                    className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""
                        }`}
                />
            </div>
        </button>
    );
}
