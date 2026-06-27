import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { supabase } from "../lib/supabaseClient";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/admin/properties", label: "Properties", icon: "🏢" },
  { to: "/admin/inquiries", label: "Inquiries", icon: "📋" },
  { to: "/admin/team", label: "Team", icon: "👥" },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      setReady(true);
    })();
  }, [navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy text-grey">Loading admin…</div>
    );
  }

  return (
    <div className="flex min-h-screen bg-navy">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-navy-light p-5 md:flex">
        <div className="font-display text-lg font-bold">
          <span className="text-gold">KUSHAL</span> <span className="text-white">Admin</span>
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                path === n.to ? "bg-emerald/15 text-emerald" : "text-grey hover:bg-card hover:text-white"
              }`}
            >
              <span>{n.icon}</span> {n.label}
            </Link>
          ))}
          <button onClick={logout} className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-grey transition-colors hover:bg-card hover:text-red-400">
            🚪 Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1">
        <div className="flex items-center gap-3 overflow-x-auto border-b border-border bg-navy-light px-4 py-3 md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={`whitespace-nowrap text-sm ${path === n.to ? "text-emerald" : "text-grey"}`}>
              {n.icon} {n.label}
            </Link>
          ))}
          <button onClick={logout} className="whitespace-nowrap text-sm text-red-400">🚪</button>
        </div>
        <div className="p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
