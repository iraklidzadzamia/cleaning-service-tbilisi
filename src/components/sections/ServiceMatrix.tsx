"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTranslation } from "@/context/LanguageContext";

export function ServiceMatrix() {
    const { dict } = useTranslation();

    const services = [
        {
            id: "standard",
            name: dict.pricing.standard.name,
            price: dict.pricing.standard.price,
            description: dict.pricing.standard.desc,
            features: [
                { name: dict.pricing.features.dusting, included: true },
                { name: dict.pricing.features.vacuuming, included: true },
                { name: dict.pricing.features.bathroom, included: true },
                { name: dict.pricing.features.kitchen, included: true },
                { name: dict.pricing.features.windows, included: false },
                { name: dict.pricing.features.cabinets, included: false },
                { name: dict.pricing.features.stains, included: false },
            ],
            popular: false,
        },
        {
            id: "deep",
            name: dict.pricing.deep.name,
            price: dict.pricing.deep.price,
            description: dict.pricing.deep.desc,
            features: [
                { name: dict.pricing.features.dusting, included: true },
                { name: dict.pricing.features.vacuuming, included: true },
                { name: dict.pricing.features.bathroom, included: true },
                { name: dict.pricing.features.kitchen, included: true },
                { name: dict.pricing.features.windows, included: true },
                { name: dict.pricing.features.cabinets, included: true },
                { name: dict.pricing.features.stains, included: true },
            ],
            popular: true,
        },
        {
            id: "renovation",
            name: dict.pricing.renovation.name,
            price: dict.pricing.renovation.price,
            description: dict.pricing.renovation.desc,
            features: [
                { name: dict.pricing.features.renovation_dust, included: true },
                { name: dict.pricing.features.paint, included: true },
                { name: dict.pricing.features.scrubbing, included: true },
                { name: dict.pricing.features.debris, included: true },
                { name: dict.pricing.features.windows, included: true },
                { name: dict.pricing.features.cabinets, included: true },
                { name: dict.pricing.features.stains, included: true },
            ],
            popular: false,
        },
    ];

    return (
        <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
                        {dict.pricing.title}
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        {dict.pricing.description}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {services.map((service) => (
                        <GlassCard
                            key={service.id}
                            className={`p-10 relative flex flex-col ${service.popular ? 'border-water-500 ring-4 ring-water-500/10' : 'border-slate-100'}`}
                            hoverEffect={true}
                        >
                            {service.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-water-500 to-water-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-water-500/30">
                                    {dict.pricing.popular}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-slate-900 mb-1">{service.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{dict.pricing.from}</span>
                                    <span className="text-4xl font-black text-water-600">{service.price.split(' ')[1]}</span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{service.description}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {service.features.map((feature) => (
                                    <li key={feature.name} className="flex items-start gap-4">
                                        <div className={cn(
                                            "mt-0.5 rounded-full p-0.5",
                                            feature.included ? "bg-leaf-50 text-leaf-600" : "bg-slate-50 text-slate-300"
                                        )}>
                                            {feature.included ? (
                                                <Check className="w-4 h-4 stroke-[3px]" />
                                            ) : (
                                                <X className="w-4 h-4 stroke-[3px]" />
                                            )}
                                        </div>
                                        <span className={cn(
                                            "text-sm font-bold tracking-tight",
                                            feature.included ? "text-slate-700" : "text-slate-400"
                                        )}>
                                            {feature.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className="w-full h-14 text-md font-bold"
                                variant={service.popular ? "primary" : "outline"}
                            >
                                {dict.pricing.choose} {service.name}
                            </Button>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
