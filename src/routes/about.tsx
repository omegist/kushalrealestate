import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionLabel } from "../components/SiteLayout";
import { ServicesSection, WhyChooseSection } from "../components/Sections";
import { useTeam } from "../lib/hooks";
import { CONTACT, WHATSAPP_LINK } from "../lib/data";
import office from "../assets/office-interior.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Kushal Enterprises" },
      { name: "description", content: "RERA registered real estate consultancy in Kalwa, Thane led by Anil Chandrakant Patil." },
      { property: "og:title", content: "About — Kushal Enterprises" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const STATS = [
  { n: "500+", l: "Properties", i: "🏠" },
  { n: "300+", l: "Clients", i: "😊" },
  { n: "10+", l: "Years", i: "⏰" },
  { n: "RERA", l: "Registered", i: "✅" },
];

function About() {
  const { data: team } = useTeam();
  // Filter out Anil from team section — he appears in founder section
  const teamMembers = team.filter(
    (m) => !m.name.toLowerCase().includes("anil")
  );
  // Find Anil for founder section
  const founder = team.find((m) => m.name.toLowerCase().includes("anil"));

  return (
    <SiteLayout>
      <PageHero
        label="A Few Words About"
        title="Our Firm"
        subtitle="RERA Registered Real Estate Consultancy"
        bg={office.url}
        height="h-[50vh]"
      />

      <section className="bg-navy py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="leading-relaxed text-grey">
            Welcome to Kushal Enterprises, a premier and fast-growing real estate consultancy
            dedicated to helping you find your dream property. Whether you are looking for your first
            home, a strategic commercial space, or a profitable land investment, we are here to guide
            you every step of the way.
          </p>
          <p className="mt-4 leading-relaxed text-grey">
            We believe that buying a property is not just a financial transaction, but a lifetime
            milestone. Built on the pillars of trust, transparency, and deep market expertise, Kushal
            Enterprises ensures a hassle-free property buying experience.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="bg-navy-light py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            {founder?.photo_url ? (
              <img
                src={founder.photo_url}
                alt="Anil Chandrakant Patil"
                className="w-full rounded-2xl border border-gold/20"
                style={{ objectFit: "contain", backgroundColor: "#111827", maxHeight: "320px" }}
              />
            ) : (
              <div className="glass flex h-72 items-center justify-center rounded-2xl text-grey glow-border">
                [ Anil Chandrakant Patil Photo ]
              </div>
            )}
            <div className="mt-4 inline-block rounded-full bg-gold/15 px-4 py-1.5 text-sm font-semibold text-gold">
              RERA No. {CONTACT.rera}
            </div>
          </div>
          <div>
            <SectionLabel>Founder &amp; Consultant</SectionLabel>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Anil Chandrakant Patil</h2>
            <p className="text-emerald">Real Estate Consultant</p>
            <p className="mt-4 leading-relaxed text-grey">
              With years of experience in the Thane real estate market, Anil Chandrakant Patil has
              built Kushal Enterprises on the foundation of trust, transparency, and client
              satisfaction. He has helped hundreds of families find their ideal home in Kalwa and
              surrounding areas.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-grey">
              <span>📞 9029847968</span>
              <span>📞 9326313320</span>
              <span>✉️ anilpatil_30@yahoo.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-navy py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6">
          {STATS.map((s) => (
            <div key={s.l} className="glass rounded-xl p-6 text-center">
              <div className="text-3xl">{s.i}</div>
              <div className="mt-2 font-display text-xl font-bold text-gold">{s.n}</div>
              <div className="text-xs text-grey">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM — excludes Anil */}
      <section className="bg-navy-light py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-white">Meet Our Team</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m) => (
              <div
                key={m.id}
                className="glass rounded-2xl p-6 text-center transition-all hover:glow-border"
              >
                {m.photo_url ? (
                  <img
                    src={m.photo_url}
                    alt={m.name}
                    className="mx-auto h-20 w-20 rounded-full object-cover object-top border-2 border-gold/30"
                  />
                ) : (
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 font-display text-2xl font-bold text-gold">
                    {m.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                  </div>
                )}
                <h3 className="mt-4 font-bold text-white">{m.name}</h3>
                <p className="text-sm text-emerald">{m.role}</p>
                {m.phone && <p className="mt-1 text-sm text-grey">📞 {m.phone}</p>}
                {m.phone && (
                  <a
                    href={`https://wa.me/91${m.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm text-gold hover:underline"
                  >
                    💬 WhatsApp
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
      <WhyChooseSection />

      <section className="bg-navy-light py-12 text-center">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-emerald px-7 py-3 font-semibold text-white"
        >
          Get in Touch →
        </a>
      </section>
    </SiteLayout>
  );
}
