import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { CONTACT, WHATSAPP_LINK } from "../lib/data";

export function Footer() {
  return (
    <footer className="border-t-2 border-gold/60 bg-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-grey">
            Real Estate Consultant, Kalwa Thane. RERA registered firm helping you buy, sell and
            rent with confidence.
          </p>
          <div className="mt-4 flex gap-3 text-xl">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform" aria-label="WhatsApp">💬</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform" aria-label="Facebook">📘</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform" aria-label="Instagram">📸</a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-grey">
            {[["/", "Home"], ["/properties", "Properties"], ["/about", "About"], ["/testimonials", "Testimonials"], ["/contact", "Contact"]].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-emerald transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Our Services</h4>
          <ul className="space-y-2 text-sm text-grey">
            {["Residential Sales", "Commercial Spaces", "Home Loans", "Rent Agreement", "Legal Help"].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Contact Info</h4>
          <ul className="space-y-3 text-sm text-grey">
            <li>📍 {CONTACT.address}</li>
            <li>📞 {CONTACT.phones.join(" / ")}</li>
            <li>✉️ {CONTACT.emails[0]}</li>
            <li>⏰ {CONTACT.hoursMorning} | {CONTACT.hoursEvening}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-grey">
        © 2025 Kushal Enterprises | RERA No. {CONTACT.rera} | All Rights Reserved
      </div>
    </footer>
  );
}
