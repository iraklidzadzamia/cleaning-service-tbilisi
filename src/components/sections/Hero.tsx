"use client";

import { Button } from "@/components/ui/Button";
import { CheckCircle2, Star, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export function Hero() {
    const { dict } = useTranslation();

    return (
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div className="flex flex-col gap-6 max-w-2xl text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-water-50 border border-water-100 w-fit mx-auto lg:mx-0">
                            <span className="flex h-2 w-2 rounded-full bg-leaf-500 animate-pulse"></span>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-water-700">{dict.hero.badge}</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
                            {dict.hero.title_part1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-water-600 to-leaf-500">{dict.hero.title_part2}</span>
                        </h1>

                        <p className="text-lg text-slate-600 md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {dict.hero.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center lg:justify-start">
                            <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl shadow-water-500/20">
                                {dict.hero.cta_primary}
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold">
                                {dict.hero.cta_secondary}
                            </Button>
                        </div>

                        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-6 text-sm text-slate-500 font-bold uppercase tracking-tight justify-center lg:justify-start">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-water-500" />
                                <span>{dict.hero.trust_insured}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-leaf-500" />
                                <span>{dict.hero.trust_eco}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                                <span className="text-slate-700">{dict.hero.trust_reviews}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[400px] lg:h-[600px] w-full hidden lg:block">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-water-200/40 to-leaf-200/40 rounded-full blur-3xl -z-10" />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[480px] bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[40px] shadow-2xl shadow-water-500/10 flex flex-col items-center justify-center p-10 text-center rotate-[-6deg] transition-transform hover:rotate-0 duration-700">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-green-200">
                                <CheckCircle2 className="w-12 h-12 text-leaf-600" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Deep Clean Complete</h3>
                            <p className="text-slate-500 text-sm font-medium">Your apartment in Vake is sparkling clean!</p>
                            <div className="mt-10 w-full bg-white/60 rounded-2xl p-4 flex items-center justify-between border border-white/80">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Total</span>
                                <span className="text-2xl font-black text-water-600">₾ 120</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
