import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export function GlassCard({ className, hoverEffect = false, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-slate-200/50",
                hoverEffect && "transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-water-500/10",
                className
            )}
            {...props}
        />
    );
}
