import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ServiceMatrix } from "@/components/sections/ServiceMatrix";
import { Calculator } from "@/components/sections/Calculator";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-water-50/50 via-white to-white" />

      <Header />

      <main>
        <Hero />
        <ServiceMatrix />
        <Calculator />
      </main>
    </div>
  );
}
