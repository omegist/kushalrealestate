import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border shadow-lg" : "border-b border-transparent"
      }`}
      style={{ background: "rgba(10,15,30,0.97)", backdropFilter: "blur(16px)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
            <img
              src="/src/assets/logo.png"
              alt="Kushal Enterprises Logo"
              className="h-full w-full object-contain"
              style={{ mixBlendMode: "lighten" }}
            />
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-bold text-gold tracking-wide">KUSHAL</span>
              <span className="font-display text-xl font-bold text-white tracking-wide">ENTERPRISES</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald mt-0.5">
              Real Estate Consultant
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-sm font-medium text-grey transition-colors hover:text-white [&.active]:text-white"
              activeProps={{ className: "active" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded bg-emerald" />
                  )}
                </>
              )}
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden text-white text-2xl p-1"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-navy/99 backdrop-blur-lg lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 border border-gold/30">
                <span className="text-xl">🏠</span>
              </div>
              <div className="flex flex-col leading-none">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-xl font-bold text-gold">KUSHAL</span>
                  <span className="font-display text-xl font-bold text-white">ENTERPRISES</span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald mt-0.5">
                  Real Estate Consultant
                </span>
              </div>
            </Link>
            <button
              className="text-white text-3xl"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-2xl font-display font-bold text-white hover:text-gold transition-colors [&.active]:text-emerald"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
