import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Phone, Globe } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-water-500 to-water-600 shadow-lg shadow-water-500/20">
                        <span className="text-xl font-bold text-white">C</span>
                    </div>
                    <span className="text-lg font-bold text-slate-800 hidden sm:inline-block">
                        CleanService<span className="text-water-500">.ge</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {["Services", "Pricing", "About", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-water-600"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                        <Globe className="h-4 w-4" />
                        <span>GEO</span>
                    </button>

                    <Button size="sm" className="hidden sm:flex" variant="primary">
                        Book Now
                    </Button>

                    {/* Mobile Menu Button Placeholder */}
                    <Button size="sm" variant="ghost" className="md:hidden">
                        <span className="sr-only">Menu</span>
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
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </Button>
                </div>
            </div>
        </header>
    );
}
