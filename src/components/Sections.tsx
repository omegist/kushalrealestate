import { SectionLabel } from "./SiteLayout";
import { SERVICES, WHY_CHOOSE } from "../lib/data";

export function ServicesSection() {
  return (
    <section className="bg-navy-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <SectionLabel>What We Offer</SectionLabel>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">Our Services</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="glass group rounded-xl border-b-2 border-b-transparent p-6 transition-all hover:border-b-emerald hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/15 text-2xl text-emerald">
                {s.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-gold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-grey">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="bg-navy py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl font-bold text-white sm:text-4xl">
          Why Choose Kushal Enterprises?
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {WHY_CHOOSE.map((w) => (
            <div key={w.title} className="glass rounded-xl p-8 text-center transition-all hover:glow-border">
              <div className="text-4xl">{w.icon}</div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-grey">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
