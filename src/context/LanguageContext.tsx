"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ru from "@/dictionaries/ru.json";
import en from "@/dictionaries/en.json";

type Dictionary = typeof ru;
type Language = "ru" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("ru"); // Default to Russian as per user request

    const dict = language === "ru" ? ru : en;

    // Optional: Load from localStorage if desired
    useEffect(() => {
        const saved = localStorage.getItem("lang") as Language;
        if (saved && (saved === "ru" || saved === "en")) {
            setLanguage(saved);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, dict }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useTranslation must be used within a LanguageProvider");
    }
    return context;
}
