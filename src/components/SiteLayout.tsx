import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingButtons } from "./FloatingButtons";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
      {children}
    </span>
  );
}

export function PageHero({
  label,
  title,
  subtitle,
  bg,
  height = "h-[50vh]",
}: {
  label: string;
  title: string;
  subtitle?: string;
  bg?: string;
  height?: string;
}) {
  return (
    <section
      className={`relative flex ${height} min-h-[320px] items-center justify-center pt-20`}
      style={{
        backgroundImage: bg
          ? `linear-gradient(rgba(10,15,30,0.75), rgba(10,15,30,0.92)), url(${bg})`
          : "linear-gradient(135deg, #0a0f1e, #0d1526)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="px-4 text-center animate-fade-in">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-3 font-display text-5xl font-bold text-white sm:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-grey max-w-xl mx-auto">{subtitle}</p>}
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
}