import { useEffect, useState } from "react";
import { WHATSAPP_LINK } from "../lib/data";

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="pulse-ring group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl shadow-lg transition-transform hover:scale-110"
        aria-label="Chat with us on WhatsApp"
      >
        💬
        <span className="absolute right-16 hidden whitespace-nowrap rounded-md bg-card px-3 py-1 text-xs text-white group-hover:block">
          Chat with us
        </span>
      </a>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-xl text-white shadow-lg transition-transform hover:scale-110 animate-fade-in"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
}
