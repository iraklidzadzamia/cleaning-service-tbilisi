"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Globe, Menu } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function Header() {
    const { language, setLanguage, dict } = useTranslation();

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
                    {[
                        { id: "services", label: dict.common.services },
                        { id: "pricing", label: dict.common.pricing },
                        { id: "about", label: dict.common.about },
                        { id: "contact", label: dict.common.contact },
                    ].map((item) => (
                        <Link
                            key={item.id}
                            href={`#${item.id}`}
                            className="text-sm font-bold text-slate-600 transition-colors hover:text-water-600"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                    >
                        <Globe className="h-4 w-4 text-water-500" />
                        <span className="uppercase tracking-wider">{language === "ru" ? "RU" : "EN"}</span>
                    </button>

                    <Button size="sm" className="hidden sm:flex" variant="primary">
                        {dict.common.book_now}
                    </Button>

                    <Button size="sm" variant="ghost" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
