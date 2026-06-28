import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, SectionLabel } from "../components/SiteLayout";
import { ServicesSection, WhyChooseSection } from "../components/Sections";
import { PropertyCard } from "../components/PropertyCard";
import { useProperties } from "../lib/hooks";
import { TESTIMONIALS, WHATSAPP_LINK, CONTACT } from "../lib/data";
import office from "../assets/storefront.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kushal Enterprises | Real Estate in Kalwa, Thane" },
      { name: "description", content: "Find your dream property in Thane. RERA registered consultancy for buying, selling & renting in Kalwa, Thane." },
      { property: "og:title", content: "Kushal Enterprises | Find Your Dream Property in Thane" },
      { property: "og:image", content: office.url },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const STATS = [
  { n: "500+", l: "Properties Listed", i: "🏠" },
  { n: "300+", l: "Happy Clients", i: "😊" },
  { n: "10+", l: "Years of Service", i: "⏰" },
  { n: "RERA", l: "Certified", i: "✅" },
];

function Home() {
  const { data } = useProperties();

  // Use ALL properties for marquee — show every listing
  // Duplicate twice for seamless infinite loop
  const marqueeItems = data.length > 0
    ? [...data, ...data]
    : [];

  return (
    <SiteLayout>
      {/* HERO */}
      <section
        className="relative flex min-h-screen items-center justify-center pt-20"
        style={{
          backgroundImage: `linear-gradient(rgba(10,15,30,0.55), rgba(10,15,30,0.75)), url(${office.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 py-16 text-center animate-fade-in">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-[11px] font-semibold text-emerald">
            ✓ RERA Registered — A51700014818
          </span>
          <h1
            className="mt-4 font-display font-bold leading-[1.1] text-white"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            Find Your Dream
            <br />
            <span className="text-gold">Property in Thane</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-grey/90">
            Trusted real estate consultancy helping families buy, sell &amp; rent in Kalwa, Thane since over a decade
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/properties"
              className="rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Explore Properties →
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/70 px-6 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center backdrop-blur-sm"
              >
                <div className="font-display text-3xl font-bold text-gold">{s.n}</div>
                <div className="mt-1 text-xs font-medium text-grey">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      {/* MARQUEE */}
      <section className="bg-navy-light py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <SectionLabel>Featured Listings</SectionLabel>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">Latest Properties</h2>
        </div>
        {marqueeItems.length > 0 ? (
          <div className="marquee-wrap mt-12 overflow-hidden">
            <div className="marquee-track" style={{ gap: "1.5rem" }}>
              {marqueeItems.map((p, i) => (
                <div key={`${p.id}-${i}`} className="w-[330px] shrink-0">
                  <PropertyCard property={p} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center text-grey">
            <p>No properties listed yet.</p>
            <Link to="/properties" className="mt-4 inline-block text-emerald underline">
              View all properties
            </Link>
          </div>
        )}
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-navy py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionLabel>About Us</SectionLabel>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              Welcome to Kushal Enterprises – Your Trusted Real Estate Partner
            </h2>
            <p className="mt-4 leading-relaxed text-grey">
              Welcome to Kushal Enterprises, a premier and fast-growing real estate consultancy
              dedicated to helping you find your dream property. Whether you are looking for your
              first home, a strategic commercial space, or a profitable land investment, we are here
              to guide you every step of the way.
            </p>
            <p className="mt-4 leading-relaxed text-grey">
              We believe that buying a property is not just a financial transaction, but a lifetime
              milestone. Built on the pillars of trust, transparency, and deep market expertise,
              Kushal Enterprises ensures a hassle-free property buying experience.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-block rounded-full bg-emerald px-6 py-2.5 font-semibold text-white transition-transform hover:scale-105"
            >
              Read More About Us →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {STATS.map((s) => (
              <div
                key={s.l}
                className="glass flex flex-col items-center justify-center rounded-xl p-6 text-center"
              >
                <div className="text-3xl">{s.i}</div>
                <div className="mt-2 font-display text-2xl font-bold text-gold">{s.n}</div>
                <div className="mt-1 text-xs text-grey">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
      <WhyChooseSection />

      {/* TESTIMONIALS PREVIEW */}
      <section className="bg-navy-light py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <SectionLabel>Client Stories</SectionLabel>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              What Our Clients Say
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.slice(0, 2).map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #10b981, #f59e0b)" }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="mt-3 text-white/90">Call us today for a free consultation</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${CONTACT.phones[0]}`}
              className="rounded-full bg-navy px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
            >
              📞 Call Now: {CONTACT.phones[0]}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-navy px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h3 className="font-display text-2xl font-bold text-white">Home Loan Partners</h3>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["SBI", "HDFC", "ICICI", "LIC", "AXIS BANK"].map((b) => (
              <span
                key={b}
                className="glass rounded-full px-6 py-2.5 text-sm font-semibold text-grey"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export function TestimonialCard({ text, name }: { text: string; name: string }) {
  return (
    <div className="glass rounded-2xl p-7 transition-all hover:glow-border">
      <div className="font-display text-5xl leading-none text-gold">"</div>
      <p className="mt-2 italic leading-relaxed text-white">{text}</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald font-bold text-white">
          {name[0]}
        </div>
        <div>
          <div className="font-semibold text-gold">{name}</div>
          <div className="text-xs text-grey">Verified Client</div>
        </div>
      </div>
    </div>
  );
}
