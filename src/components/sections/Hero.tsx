import { Button } from "@/components/ui/Button";
import { CheckCircle2, Star, ShieldCheck } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Content */}
                    <div className="flex flex-col gap-6 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-water-50 border border-water-100 w-fit">
                            <span className="flex h-2 w-2 rounded-full bg-leaf-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-water-700">#1 Rated in Tbilisi</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                            Reclaim Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-water-600 to-leaf-500">Weekend</span>
                        </h1>

                        <p className="text-lg text-slate-600 md:text-xl leading-relaxed max-w-lg">
                            Professional cleaning rooted in trust. Providing corporate-level reliability for your home in Tbilisi.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                            <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-water-500/20">
                                Book in 60 Seconds
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                View Service Matrix
                            </Button>
                        </div>

                        {/* Trust Signals */}
                        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-water-500" />
                                <span>Insured & Bonded</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-leaf-500" />
                                <span>Eco-Friendly Products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-1">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] overflow-hidden">
                                            <span className="bg-gradient-to-br from-slate-300 to-slate-400 w-full h-full"></span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                                <span className="font-medium text-slate-700">4.9/5 (Google)</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual (Abstract Glass Representation for now) */}
                    <div className="relative h-[400px] lg:h-[600px] w-full hidden lg:block">
                        {/* Decorative Blobs */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-water-200/40 to-leaf-200/40 rounded-full blur-3xl -z-10 animate-pulse-slow" />

                        {/* Glass Card Mockup */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl shadow-water-500/10 flex flex-col items-center justify-center p-8 text-center rotate-[-6deg]">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-12 h-12 text-leaf-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Deep Clean Complete</h3>
                            <p className="text-slate-500 text-sm">Your apartment in Vake is sparkling clean!</p>
                            <div className="mt-8 w-full bg-white/50 rounded-xl p-3 flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-600">Total</span>
                                <span className="text-lg font-bold text-water-600">₾ 120</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
