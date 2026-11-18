import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, MapPin, MessageCircle, Search, Users } from "lucide-react";
import CategoryGrid from "@/components/CategoryGrid";
import ProviderCard from "@/components/ProviderCard";
import ServiceCard from "@/components/ServiceCard";
import { locations, providers, services } from "@/lib/data";

const popular = ["Plumber", "Event planner", "Tailor", "Fitness coach", "Business consultant", "Photographer"];

const steps = [
  { icon: Search, title: "1. Search", text: "Find the right person or service for your needs." },
  { icon: Users, title: "2. Connect", text: "View profiles, compare rates, check reviews and message." },
  { icon: CalendarDays, title: "3. Book", text: "Choose a time, confirm details and make payment." },
  { icon: Check, title: "4. Get it done", text: "Relax while your provider handles the rest." },
];

export default function HomePage() {
  const popularServices = services.filter((s) =>
    ["s-plumbing", "s-event", "s-tailoring", "s-fitness", "s-consulting"].includes(s.id),
  );
  const topProviders = providers
    .filter((p) => ["tunde-adeyemi", "blessing-okafor", "amina-yusuf", "daniel-chukwudi", "folake-adeyemi"].includes(p.id));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#241810] via-[#3a2916] to-[#6b4423] text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-40 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <p className="text-lg text-white/90">Find the right people to help you</p>
          <h1 className="mt-2 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Get things done
            <br />
            <span className="text-brand">your way</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">
            Connect with skilled professionals, artisans, and experts who can help you achieve your goals, from home
            services to business support, events, education and more.
          </p>

          <form action="/services" method="get" className="mt-8 flex max-w-3xl flex-col gap-2 rounded-xl bg-white p-2 sm:flex-row sm:items-center">
            <label className="flex flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 text-gray-500" />
              <input name="q" placeholder="What do you need help with?" className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-gray-400" />
            </label>
            <label className="relative flex items-center gap-3 border-t border-line px-3 sm:w-64 sm:border-l sm:border-t-0">
              <MapPin className="h-5 w-5 text-gray-500" />
              <select name="loc" defaultValue="" className="h-11 w-full appearance-none bg-transparent pr-6 text-sm text-gray-500 outline-none">
                <option value="">Location (optional)</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-gray-500" />
            </label>
            <button type="submit" className="btn-primary h-11 px-8">Search</button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-white/85">Popular searches:</span>
            {popular.map((p) => (
              <Link key={p} href={`/services?q=${encodeURIComponent(p)}`} className="rounded-full bg-black/40 px-4 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-black/60">
                {p}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CategoryGrid />

      {/* Popular services */}
      <section className="container-page py-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">Popular services</h2>
            <p className="mt-1 text-sm text-muted">Handpicked services to help you get things done.</p>
          </div>
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F5BB7] hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {popularServices.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Top providers */}
      <section className="container-page py-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">Top rated providers</h2>
            <p className="mt-1 text-sm text-muted">Trusted by thousands. Loved for their skills, professionalism and results.</p>
          </div>
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F5BB7] hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {topProviders.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container-page">
        <div className="rounded-2xl bg-brand-soft px-6 py-8 sm:px-10">
          <h2 className="text-xl font-bold text-ink">How it works</h2>
          <p className="mt-1 text-sm text-muted">Getting help is simple and straightforward.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.title}>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-line">
                  <s.icon className="h-5 w-5 text-brand" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="container-page pt-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2a1b10] via-[#4a2f18] to-[#6b4423] px-6 py-10 text-white sm:px-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-brand/30 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-bold">Ready to share your skills?</h2>
              <p className="mt-2 max-w-md text-sm text-white/85">
                Join our community of service providers and start earning from what you do best.
              </p>
              <Link href="/become-a-provider" className="btn-primary mt-6">
                Become a provider <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="space-y-3 text-sm">
              {["Get more customers", "Set your own rates", "Manage bookings easily", "Grow your reputation"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-white/70">
                    <Check className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
