import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
      style={{ background: "rgba(10,15,30,0.95)", backdropFilter: "blur(12px)" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />

        <div className="hidden items-center gap-7 lg:flex">
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
          <Link
            to="/admin/login"
            className="rounded-md border border-gold/40 px-3 py-1 text-xs font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            Admin
          </Link>
        </div>

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-navy/98 backdrop-blur-lg lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Logo />
            <button
              className="text-white text-3xl"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-7">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-2xl font-display text-white [&.active]:text-emerald"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="rounded-md border border-gold/40 px-5 py-2 text-gold"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
