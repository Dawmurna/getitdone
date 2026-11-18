"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, ChevronDown, Heart, Menu, Search, X } from "lucide-react";
import { useApp } from "@/lib/store";
import Logo from "./Logo";
import Avatar from "./Avatar";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Explore Services" },
  { href: "/become-a-provider", label: "Become a Provider" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { user, ready, signOut } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");

  const loggedIn = ready && !!user;

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    router.push(q.trim() ? `/services?q=${encodeURIComponent(q.trim())}` : "/services");
  }

  function handleSignOut() {
    signOut();
    setMenu(false);
    setOpen(false);
    router.push("/");
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-page flex h-[72px] items-center gap-6">
        <Logo />

        {loggedIn ? (
          <>
            <form onSubmit={onSearch} className="relative hidden max-w-xl flex-1 md:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for services, people or skills..."
                className="h-10 w-full rounded-lg bg-gray-100 pl-11 pr-4 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-brand/30"
              />
            </form>
            <nav className="ml-auto hidden items-center gap-6 text-sm font-medium text-ink lg:flex">
              <Link href="/services" className="hover:text-brand">Explore Services</Link>
              <Link href="/become-a-provider" className="hover:text-brand">Become a Provider</Link>
            </nav>
            <div className="ml-auto flex items-center gap-3 lg:ml-0">
              <Link href="/dashboard?tab=messages" className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-gray-100" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute right-0.5 top-0 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-semibold text-white">3</span>
              </Link>
              <Link href="/dashboard?tab=saved-providers" className="hidden h-9 w-9 place-items-center rounded-full hover:bg-gray-100 sm:grid" aria-label="Saved providers">
                <Heart className="h-5 w-5" />
              </Link>
              <div className="relative hidden md:block">
                <button onClick={() => setMenu((m) => !m)} className="flex items-center gap-1.5" aria-haspopup="menu" aria-expanded={menu}>
                  <Avatar name={user?.name ?? "User"} size={40} />
                  <ChevronDown className="h-4 w-4" />
                </button>
                {menu && (
                  <div className="absolute right-0 top-12 w-48 rounded-xl border border-line bg-white p-1.5 text-sm shadow-lg" role="menu">
                    <div className="px-3 py-2 text-xs text-muted">{user?.email}</div>
                    <Link href="/dashboard" onClick={() => setMenu(false)} className="block rounded-lg px-3 py-2 hover:bg-gray-50">Dashboard</Link>
                    <Link href="/dashboard?tab=bookings" onClick={() => setMenu(false)} className="block rounded-lg px-3 py-2 hover:bg-gray-50">My bookings</Link>
                    <button onClick={handleSignOut} className="block w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50">Sign out</button>
                  </div>
                )}
              </div>
              <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </>
        ) : (
          <>
            <nav className="mx-auto hidden items-center gap-8 text-sm font-medium md:flex">
              {publicLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`border-b-2 py-6 transition ${isActive(l.href) ? "border-brand text-ink" : "border-transparent text-gray-700 hover:text-brand"}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-4 md:ml-0">
              <Link href="/services" aria-label="Search" className="hidden md:block">
                <Search className="h-5 w-5" />
              </Link>
              <Link href="/signin" className="hidden text-sm font-medium md:block">Sign In</Link>
              <Link href="/join" className="btn-primary hidden md:inline-flex">Join</Link>
              <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </>
        )}
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <div className="container-page space-y-1 py-3 text-sm">
            <form onSubmit={onSearch} className="mb-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services..."
                className="h-10 w-full rounded-lg bg-gray-100 px-4 text-sm outline-none"
              />
            </form>
            {publicLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium hover:bg-gray-50">
                {l.label}
              </Link>
            ))}
            {loggedIn ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium hover:bg-gray-50">Dashboard</Link>
                <button onClick={handleSignOut} className="block w-full rounded-lg px-3 py-2.5 text-left font-medium text-red-600 hover:bg-red-50">Sign out</button>
              </>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link href="/signin" onClick={() => setOpen(false)} className="btn-outline flex-1">Sign In</Link>
                <Link href="/join" onClick={() => setOpen(false)} className="btn-primary flex-1">Join</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
