"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/LanguageContext";
import {
    Square,
    Home,
    Bath,
    ChefHat,
    Calendar,
    PlusCircle,
    ArrowRight,
    Info
} from "lucide-react";

// --- Pricing Logic Constants ---
const BASE_RATE_PER_SQM = 1.5;
const ROOM_SURCHARGE = 15;
const SERVICE_MODIFIERS = {
    standard: 1,
    deep: 1.8,
    renovation: 2.5,
};
const FREQUENCY_DISCOUNTS = {
    once: 0,
    weekly: 0.20,
    biweekly: 0.15,
    monthly: 0.10,
};

export function Calculator() {
    const { dict } = useTranslation();

    const EXTRAS_LIST = [
        { id: "windows", name: dict.pricing.features.windows || "Windows", price: 30, icon: <Square className="w-4 h-4" /> },
        { id: "oven", name: "Oven Deep Clean", price: 25, icon: <ChefHat className="w-4 h-4" /> },
        { id: "fridge", name: "Fridge Inside", price: 20, icon: <PlusCircle className="w-4 h-4" /> },
        { id: "cabinets", name: dict.pricing.features.cabinets || "Cabinets", price: 40, icon: <PlusCircle className="w-4 h-4" /> },
        { id: "balcony", name: "Balcony", price: 20, icon: <PlusCircle className="w-4 h-4" /> },
    ];

    const [sqm, setSqm] = useState(50);
    const [serviceType, setServiceType] = useState<keyof typeof SERVICE_MODIFIERS>("standard");
    const [bathrooms, setBathrooms] = useState(1);
    const [kitchens, setKitchens] = useState(1);
    const [frequency, setFrequency] = useState<keyof typeof FREQUENCY_DISCOUNTS>("once");
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let price = sqm * BASE_RATE_PER_SQM * SERVICE_MODIFIERS[serviceType];
        price += (bathrooms + kitchens) * ROOM_SURCHARGE;
        selectedExtras.forEach(extraId => {
            const extra = EXTRAS_LIST.find(e => e.id === extraId);
            if (extra) price += extra.price;
        });
        const discount = price * FREQUENCY_DISCOUNTS[frequency];
        price -= discount;
        setTotalPrice(Math.round(price));
    }, [sqm, serviceType, bathrooms, kitchens, frequency, selectedExtras, dict]);

    const toggleExtra = (id: string) => {
        setSelectedExtras(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    };

    return (
        <section id="booking" className="py-24 bg-white relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
                        {dict.calculator.title} <span className="text-water-600">{dict.calculator.subtitle}</span>
                    </h2>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed">
                        {dict.calculator.description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        <GlassCard className="p-10 border-slate-100">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <label className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        <Square className="w-4 h-4 text-water-500" />
                                        {dict.calculator.apt_size} ({sqm} m²)
                                    </label>
                                    <input type="range" min="20" max="300" step="5" value={sqm} onChange={(e) => setSqm(parseInt(e.target.value))} className="w-full h-2 bg-water-100 rounded-lg appearance-none cursor-pointer accent-water-500" />
                                </div>

                                <div className="space-y-6">
                                    <label className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        <Home className="w-4 h-4 text-water-500" />
                                        {dict.calculator.service_type}
                                    </label>
                                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                                        {(Object.keys(SERVICE_MODIFIERS) as Array<keyof typeof SERVICE_MODIFIERS>).map((type) => (
                                            <button key={type} onClick={() => setServiceType(type)} className={cn("flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all", serviceType === type ? "bg-white text-water-600 shadow-xl shadow-water-500/10" : "text-slate-400 hover:text-slate-600")}>
                                                {dict.pricing[type].name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        <Bath className="w-4 h-4 text-water-500" />
                                        {dict.calculator.rooms}
                                    </label>
                                    <div className="flex gap-4">
                                        <div className="flex-1 flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-3 px-5 text-[10px] font-black tracking-widest shadow-sm">
                                            <span className="text-slate-400 uppercase">{dict.calculator.baths}</span>
                                            <div className="flex items-center gap-4 font-black">
                                                <button onClick={() => setBathrooms(Math.max(1, bathrooms - 1))} className="text-water-500 text-lg">-</button>
                                                <span className="text-slate-900 text-sm">{bathrooms}</span>
                                                <button onClick={() => setBathrooms(bathrooms + 1)} className="text-water-500 text-lg">+</button>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-3 px-5 text-[10px] font-black tracking-widest shadow-sm">
                                            <span className="text-slate-400 uppercase">{dict.calculator.kitchens}</span>
                                            <div className="flex items-center gap-4 font-black">
                                                <button onClick={() => setKitchens(Math.max(1, kitchens - 1))} className="text-water-500 text-lg">-</button>
                                                <span className="text-slate-900 text-sm">{kitchens}</span>
                                                <button onClick={() => setKitchens(kitchens + 1)} className="text-water-500 text-lg">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        <Calendar className="w-4 h-4 text-water-500" />
                                        {dict.calculator.frequency}
                                    </label>
                                    <select value={frequency} onChange={(e) => setFrequency(e.target.value as any)} className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-water-500/10 shadow-sm appearance-none">
                                        <option value="once">{dict.calculator.once}</option>
                                        <option value="weekly">{dict.calculator.weekly}</option>
                                        <option value="biweekly">{dict.calculator.biweekly}</option>
                                        <option value="monthly">{dict.calculator.monthly}</option>
                                    </select>
                                </div>
                            </div>
                        </GlassCard>

                        <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 ml-4">{dict.calculator.extras}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                                {EXTRAS_LIST.map((extra) => (
                                    <button key={extra.id} onClick={() => toggleExtra(extra.id)} className={cn("flex flex-col items-center gap-4 p-6 rounded-[32px] border transition-all duration-500 group", selectedExtras.includes(extra.id) ? "bg-water-50 border-water-500 text-water-700 shadow-2xl shadow-water-500/10 scale-105" : "bg-white border-slate-100 text-slate-400 hover:border-water-200 hover:shadow-xl hover:shadow-slate-200/50")}>
                                        <div className={cn("w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110", selectedExtras.includes(extra.id) ? "bg-water-500 text-white shadow-xl shadow-water-500/40" : "bg-slate-50")}>
                                            {extra.icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight transition-colors group-hover:text-slate-600">{extra.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 sticky top-28">
                        <GlassCard className="p-10 border-water-500/50 bg-white/40">
                            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center justify-between">
                                {dict.calculator.summary}
                                <span className="text-[10px] font-black uppercase tracking-widest bg-leaf-500/10 text-leaf-600 px-3 py-1 rounded-full">{dict.calculator.secure}</span>
                            </h3>

                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-slate-400">{dict.pricing[serviceType].name} ({sqm}m²)</span>
                                    <span className="text-slate-900">₾ {Math.round(sqm * BASE_RATE_PER_SQM * SERVICE_MODIFIERS[serviceType])}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-slate-400 uppercase tracking-tighter text-[11px]">{bathrooms + kitchens} {dict.calculator.rooms}</span>
                                    <span className="text-slate-900">₾ {(bathrooms + kitchens) * ROOM_SURCHARGE}</span>
                                </div>
                                {selectedExtras.length > 0 && (
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-400 uppercase tracking-tighter text-[11px]">{selectedExtras.length} {dict.calculator.selected_extras}</span>
                                        <span className="text-slate-900">₾ {selectedExtras.reduce((acc, id) => acc + (EXTRAS_LIST.find(e => e.id === id)?.price || 0), 0)}</span>
                                    </div>
                                )}
                                {frequency !== "once" && (
                                    <div className="flex justify-between text-sm pt-4 border-t border-slate-100">
                                        <span className="text-leaf-600 font-black uppercase tracking-widest text-[10px]">{dict.calculator.discount}</span>
                                        <span className="font-black text-leaf-600">- ₾ {Math.round((totalPrice / (1 - FREQUENCY_DISCOUNTS[frequency])) * FREQUENCY_DISCOUNTS[frequency])}</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-8 border-t-2 border-slate-100">
                                <div className="flex items-center justify-between mb-10">
                                    <span className="text-lg font-black text-slate-900 uppercase tracking-widest">{dict.calculator.total}</span>
                                    <div className="text-right">
                                        <div className="text-5xl font-black text-water-600 tracking-tighter">₾ {totalPrice}</div>
                                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">{dict.calculator.vat}</div>
                                    </div>
                                </div>
                                <Button className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-2xl shadow-water-500/30" variant="primary">
                                    {dict.calculator.complete}
                                    <ArrowRight className="ml-3 w-6 h-6" />
                                </Button>
                            </div>
                            <div className="mt-8 p-5 bg-slate-50/50 rounded-3xl flex items-start gap-4 border border-slate-200/50">
                                <Info className="w-5 h-5 text-water-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">{dict.calculator.disclaimer}</p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
