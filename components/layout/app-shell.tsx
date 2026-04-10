import Link from "next/link";
import type { ReactNode } from "react";
import { Bell, BookOpen, CalendarDays, LayoutDashboard, Radar, Settings2, SlidersHorizontal } from "lucide-react";
import { destroySession } from "@/lib/auth/session";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/briefings", label: "Briefings", icon: BookOpen },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/watchlists", label: "Watchlists", icon: Radar },
  { href: "/sources", label: "Sources", icon: SlidersHorizontal },
  { href: "/templates", label: "Templates", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings2 }
];

export async function AppShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="fixed inset-0 bg-grid bg-[size:44px_44px] opacity-20" />
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-edge/70 bg-ink/85 p-6">
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan">Commodity Terminal</p>
            <h1 className="mt-3 text-2xl font-semibold">Private Intelligence</h1>
            <p className="mt-2 text-sm text-fog">Built for daily decision-making across commodities, freight, and macro risk.</p>
          </div>
          <nav className="space-y-2">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-fog transition hover:border-edge hover:bg-panel hover:text-paper">
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
          <form action={destroySession} className="mt-8">
            <button className="rounded-2xl border border-edge px-4 py-3 text-sm text-fog transition hover:bg-panel hover:text-paper">
              Sign out
            </button>
          </form>
        </aside>
        <main className="p-5 lg:p-8">
          <header className="mb-6 flex flex-col gap-3 border-b border-edge/60 pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan">Institutional View</p>
              <h2 className="mt-2 text-3xl font-semibold">{title}</h2>
              <p className="mt-2 max-w-3xl text-sm text-fog">{subtitle}</p>
            </div>
            <div className="rounded-2xl border border-edge bg-panel px-4 py-3 text-right">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-fog">Mode</p>
              <p className="text-sm text-paper">Free-first with source transparency</p>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
