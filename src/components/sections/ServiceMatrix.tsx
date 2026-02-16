import { Check, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

const services = [
    {
        name: "Standard",
        price: "from 2₾/m²",
        description: "Perfect for maintaining a tidy home.",
        features: [
            { name: "Dusting surfaces", included: true },
            { name: "Vacuuming & Mopping", included: true },
            { name: "Bathroom sanitation", included: true },
            { name: "Kitchen surfaces", included: true },
            { name: "Window cleaning", included: false },
            { name: "Inside cabinets", included: false },
            { name: "Deep stain removal", included: false },
        ],
        popular: false,
    },
    {
        name: "Deep Clean",
        price: "from 4₾/m²",
        description: "Thorough cleaning for neglected spaces.",
        features: [
            { name: "Dusting surfaces", included: true },
            { name: "Vacuuming & Mopping", included: true },
            { name: "Bathroom sanitation", included: true },
            { name: "Kitchen surfaces", included: true },
            { name: "Window cleaning", included: true },
            { name: "Inside cabinets", included: true },
            { name: "Deep stain removal", included: true },
        ],
        popular: true,
    },
    {
        name: "Renovation",
        price: "from 6₾/m²",
        description: "Specialized post-construction cleanup.",
        features: [
            { name: "Dust removal (walls/ceilings)", included: true },
            { name: "Paint spot removal", included: true },
            { name: "Heavy duty scrubbing", included: true },
            { name: "Debris removal", included: true },
            { name: "Window cleaning", included: true },
            { name: "Inside cabinets", included: true },
            { name: "Deep stain removal", included: true },
        ],
        popular: false,
    },
];

export function ServiceMatrix() {
    return (
        <section id="pricing" className="py-20 bg-slate-50 relative">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Transparent Pricing. No Surprises.
                    </h2>
                    <p className="text-lg text-slate-600">
                        Choose the package that fits your needs. All plans include our 100% satisfaction guarantee.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {services.map((service) => (
                        <GlassCard
                            key={service.name}
                            className={`p-8 relative ${service.popular ? 'border-water-500 ring-2 ring-water-500/20' : ''}`}
                            hoverEffect={true}
                        >
                            {service.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-water-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900">{service.name}</h3>
                                <div className="mt-2 text-3xl font-bold text-water-600">{service.price}</div>
                                <p className="mt-2 text-sm text-slate-500">{service.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {service.features.map((feature) => (
                                    <li key={feature.name} className="flex items-start gap-3">
                                        {feature.included ? (
                                            <Check className="w-5 h-5 text-leaf-500 shrink-0" />
                                        ) : (
                                            <X className="w-5 h-5 text-slate-300 shrink-0" />
                                        )}
                                        <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                                            {feature.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className="w-full"
                                variant={service.popular ? "primary" : "outline"}
                            >
                                Choose {service.name}
                            </Button>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
