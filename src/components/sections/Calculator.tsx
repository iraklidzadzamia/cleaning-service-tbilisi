"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
    Square,
    Home,
    Bath,
    ChefHat,
    Calendar,
    PlusCircle,
    CheckCircle2,
    ArrowRight,
    Info
} from "lucide-react";

// --- Pricing Logic Constants (Based on Strategy) ---
const BASE_RATE_PER_SQM = 1.5; // Final rate will depend on service type
const ROOM_SURCHARGE = 15; // Kitchens/Bathrooms extra complexity
const SERVICE_MODIFIERS = {
    standard: 1,
    deep: 1.8,
    renovation: 2.5,
};
const FREQUENCY_DISCOUNTS = {
    once: 0,
    weekly: 0.20,    // 20% Off
    biweekly: 0.15,  // 15% Off
    monthly: 0.10,   // 10% Off
};

const EXTRAS_LIST = [
    { id: "windows", name: "Windows (Inside)", price: 30, icon: <Square className="w-4 h-4" /> },
    { id: "oven", name: "Oven Deep Clean", price: 25, icon: <ChefHat className="w-4 h-4" /> },
    { id: "fridge", name: "Fridge Inside", price: 20, icon: <PlusCircle className="w-4 h-4" /> },
    { id: "cabinets", name: "Inside Cabinets", price: 40, icon: <PlusCircle className="w-4 h-4" /> },
    { id: "balcony", name: "Balcony", price: 20, icon: <PlusCircle className="w-4 h-4" /> },
];

export function Calculator() {
    const [sqm, setSqm] = useState(50);
    const [serviceType, setServiceType] = useState<keyof typeof SERVICE_MODIFIERS>("standard");
    const [bathrooms, setBathrooms] = useState(1);
    const [kitchens, setKitchens] = useState(1);
    const [frequency, setFrequency] = useState<keyof typeof FREQUENCY_DISCOUNTS>("once");
    const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Calculate Price on any input change
    useEffect(() => {
        let price = sqm * BASE_RATE_PER_SQM * SERVICE_MODIFIERS[serviceType];

        // Add room surcharges
        price += (bathrooms + kitchens) * ROOM_SURCHARGE;

        // Add extras
        selectedExtras.forEach(extraId => {
            const extra = EXTRAS_LIST.find(e => e.id === extraId);
            if (extra) price += extra.price;
        });

        // Apply frequency discount
        const discount = price * FREQUENCY_DISCOUNTS[frequency];
        price -= discount;

        setTotalPrice(Math.round(price));
    }, [sqm, serviceType, bathrooms, kitchens, frequency, selectedExtras]);

    const toggleExtra = (id: string) => {
        setSelectedExtras(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <section id="booking" className="py-24 bg-white relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        Get an <span className="text-water-600">Instant</span> Quote
                    </h2>
                    <p className="text-lg text-slate-600">
                        Customize your cleaning plan. Our algorithm calculates the best price based on your specific requirements in Tbilisi.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">

                    {/* Settings Panel */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <GlassCard className="p-8">
                            <div className="grid md:grid-cols-2 gap-8">

                                {/* Area Input */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <Square className="w-4 h-4 text-water-500" />
                                        APARTMENT SIZE ({sqm} m²)
                                    </label>
                                    <input
                                        type="range"
                                        min="20"
                                        max="300"
                                        step="5"
                                        value={sqm}
                                        onChange={(e) => setSqm(parseInt(e.target.value))}
                                        className="w-full h-2 bg-water-100 rounded-lg appearance-none cursor-pointer accent-water-500"
                                    />
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>20 m²</span>
                                        <span>300 m²</span>
                                    </div>
                                </div>

                                {/* Service Type */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <Home className="w-4 h-4 text-water-500" />
                                        SERVICE TYPE
                                    </label>
                                    <div className="flex bg-slate-100 p-1 rounded-xl">
                                        {Object.keys(SERVICE_MODIFIERS).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setServiceType(type as any)}
                                                className={cn(
                                                    "flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                                                    serviceType === type
                                                        ? "bg-white text-water-600 shadow-sm"
                                                        : "text-slate-500 hover:text-slate-700"
                                                )}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rooms */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <Bath className="w-4 h-4 text-water-500" />
                                        BATHROOMS & KITCHENS
                                    </label>
                                    <div className="flex gap-4">
                                        <div className="flex-1 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2 px-4">
                                            <span className="text-xs text-slate-500 font-medium">BATHS</span>
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => setBathrooms(Math.max(1, bathrooms - 1))} className="text-water-500 hover:text-water-700 font-bold">-</button>
                                                <span className="text-sm font-bold text-slate-700">{bathrooms}</span>
                                                <button onClick={() => setBathrooms(bathrooms + 1)} className="text-water-500 hover:text-water-700 font-bold">+</button>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2 px-4">
                                            <span className="text-xs text-slate-500 font-medium">KITCHENS</span>
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => setKitchens(Math.max(1, kitchens - 1))} className="text-water-500 hover:text-water-700 font-bold">-</button>
                                                <span className="text-sm font-bold text-slate-700">{kitchens}</span>
                                                <button onClick={() => setKitchens(kitchens + 1)} className="text-water-500 hover:text-water-700 font-bold">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Frequency */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <Calendar className="w-4 h-4 text-water-500" />
                                        FREQUENCY
                                    </label>
                                    <select
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value as any)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-water-500/20"
                                    >
                                        <option value="once">One-time cleaning</option>
                                        <option value="weekly">Weekly (20% Off)</option>
                                        <option value="biweekly">Every 2 Weeks (15% Off)</option>
                                        <option value="monthly">Monthly (10% Off)</option>
                                    </select>
                                </div>

                            </div>
                        </GlassCard>

                        {/* Extras Selection */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Extra Services</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {EXTRAS_LIST.map((extra) => (
                                    <button
                                        key={extra.id}
                                        onClick={() => toggleExtra(extra.id)}
                                        className={cn(
                                            "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300",
                                            selectedExtras.includes(extra.id)
                                                ? "bg-water-50 border-water-500 text-water-700 shadow-lg shadow-water-500/10 scale-[1.02]"
                                                : "bg-white border-slate-100 text-slate-500 hover:border-water-200"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                            selectedExtras.includes(extra.id) ? "bg-water-500 text-white" : "bg-slate-50 text-slate-400"
                                        )}>
                                            {extra.icon}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-tight text-center leading-tight">
                                            {extra.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Checkout Summary Card */}
                    <div className="lg:col-span-4 sticky top-28">
                        <GlassCard className="p-8 border-water-500/50 relative overflow-hidden">
                            {/* Background Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-water-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                                Booking Summary
                                <span className="text-[10px] bg-leaf-500/10 text-leaf-600 px-2 py-0.5 rounded-full">Secure</span>
                            </h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">{serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Clean ({sqm}m²)</span>
                                    <span className="font-bold text-slate-700">₾ {Math.round(sqm * BASE_RATE_PER_SQM * SERVICE_MODIFIERS[serviceType])}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">{bathrooms + kitchens} Base Rooms</span>
                                    <span className="font-bold text-slate-700">₾ {(bathrooms + kitchens) * ROOM_SURCHARGE}</span>
                                </div>
                                {selectedExtras.length > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">{selectedExtras.length} Extras selected</span>
                                        <span className="font-bold text-slate-700">
                                            ₾ {selectedExtras.reduce((acc, id) => acc + (EXTRAS_LIST.find(e => e.id === id)?.price || 0), 0)}
                                        </span>
                                    </div>
                                )}
                                {frequency !== "once" && (
                                    <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
                                        <span className="text-leaf-600 font-medium">Recurring Discount</span>
                                        <span className="font-bold text-leaf-600">
                                            - ₾ {Math.round((totalPrice / (1 - FREQUENCY_DISCOUNTS[frequency])) * FREQUENCY_DISCOUNTS[frequency])}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-slate-200">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-lg font-bold text-slate-900">Total Price</span>
                                    <div className="text-right">
                                        <div className="text-4xl font-black text-water-600">₾ {totalPrice}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">VAT Included</div>
                                    </div>
                                </div>

                                <Button className="w-full h-14 text-lg" variant="primary">
                                    Complete Booking
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>

                            <div className="mt-8 p-4 bg-slate-50 rounded-2xl flex items-start gap-3">
                                <Info className="w-5 h-5 text-water-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Prices are estimates for standard conditions in Tbilisi. Final price may vary based on actual on-site inspection.
                                </p>
                            </div>
                        </GlassCard>
                    </div>

                </div>
            </div>
        </section>
    );
}
