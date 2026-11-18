"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  FileCheck,
  Headphones,
  Heart,
  House,
  MapPin,
  MessageCircle,
  Search,
  Star,
  UserPlus,
  Wallet,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import Avatar from "@/components/Avatar";
import ProviderCard from "@/components/ProviderCard";
import Rating from "@/components/Rating";
import ServiceCard, { ServiceThumb } from "@/components/ServiceCard";
import {
  categories,
  conversations,
  getProvider,
  getService,
  providerLabel,
  providers,
  services,
} from "@/lib/data";
import { daysUntil, formatDate, naira } from "@/lib/format";
import { ctaImage, serviceImage } from "@/lib/images";
import { useApp, type Booking, type BookingStatus } from "@/lib/store";

type TabId = "dashboard" | "bookings" | "messages" | "saved-providers" | "saved-services" | "payments" | "reviews" | "requests";

const nav: { id: TabId; label: string; icon: LucideIcon; badge?: number }[] = [
  { id: "dashboard", label: "Dashboard", icon: House },
  { id: "bookings", label: "My Bookings", icon: CalendarDays },
  { id: "messages", label: "Messages", icon: MessageCircle, badge: 3 },
  { id: "saved-providers", label: "Saved Providers", icon: Heart },
  { id: "saved-services", label: "Saved Services", icon: Bookmark },
  { id: "payments", label: "Payments & Wallet", icon: Wallet },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "requests", label: "My Requests", icon: FileCheck },
];

const statusStyle: Record<BookingStatus, string> = {
  Confirmed: "bg-green-50 text-green-700",
  Pending: "bg-orange-50 text-orange-600",
  Completed: "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-50 text-red-600",
};

function isTab(v: string | null): v is TabId {
  return nav.some((n) => n.id === v);
}

export default function DashboardClient() {
  const { user, ready } = useApp();
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("tab");
  const tab: TabId = isTab(raw) ? raw : "dashboard";

  useEffect(() => {
    if (ready && !user) router.replace("/signin?next=/dashboard");
  }, [ready, user, router]);

  if (!ready || !user) {
    return <div className="p-16 text-center text-sm text-muted">Loading your dashboard...</div>;
  }

  return (
    <div className="container-page grid gap-6 py-6 lg:grid-cols-[230px_1fr]">
      <Sidebar active={tab} />
      <div className="min-w-0">
        {tab === "dashboard" && <Overview />}
        {tab === "bookings" && <BookingsTab />}
        {tab === "messages" && <MessagesTab />}
        {tab === "saved-providers" && <SavedProviders />}
        {tab === "saved-services" && <SavedServices />}
        {tab === "payments" && <PaymentsTab />}
        {tab === "reviews" && <ReviewsTab />}
        {tab === "requests" && <RequestsTab />}
      </div>
    </div>
  );
}

function Sidebar({ active }: { active: TabId }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" aria-label="Dashboard">
        {nav.map((n) => {
          const on = n.id === active;
          return (
            <Link
              key={n.id}
              href={n.id === "dashboard" ? "/dashboard" : `/dashboard?tab=${n.id}`}
              className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition ${
                on ? "bg-brand-soft text-brand" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <n.icon className="h-[18px] w-[18px]" />
              <span className="flex-1">{n.label}</span>
              {n.badge ? (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px] font-semibold text-white">{n.badge}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 hidden rounded-xl border border-line bg-white p-4 lg:block">
        <div className="flex items-center gap-3">
          <Headphones className="h-5 w-5" />
          <div>
            <p className="text-sm font-semibold">Need help?</p>
            <p className="text-xs text-muted">Our support team is here for you 24/7.</p>
          </div>
        </div>
        <a href="mailto:support@getitdone.app" className="btn-outline mt-4 w-full">Contact Support</a>
      </div>
    </aside>
  );
}

function useActiveBookings() {
  const { bookings } = useApp();
  return useMemo(
    () =>
      bookings
        .filter((b) => b.status === "Confirmed" || b.status === "Pending")
        .sort((a, b) => a.date.localeCompare(b.date)),
    [bookings],
  );
}

function Greeting() {
  const { user } = useApp();
  const [word, setWord] = useState("Hello");
  useEffect(() => {
    const h = new Date().getHours();
    setWord(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);
  const first = user?.name.split(" ")[0] ?? "";
  return (
    <div className="flex items-center gap-5">
      <Avatar name={user?.name ?? "User"} size={80} photo={false} />
      <div>
        <h1 className="text-2xl font-bold text-ink">{word}, {first}</h1>
        <p className="mt-1 text-sm text-muted">Here&apos;s what&apos;s happening with your services and bookings.</p>
      </div>
    </div>
  );
}

function Overview() {
  const { savedProviders, wallet } = useApp();
  const active = useActiveBookings();
  const recommended = services.filter((s) => ["s-clean-standard", "s-tailoring", "s-consulting", "s-photo"].includes(s.id));
  const next = active[0];

  const stats = [
    { icon: CalendarDays, tint: "bg-violet-50 text-violet-600", value: String(active.length), label: "Active Bookings", cta: "View all", href: "/dashboard?tab=bookings" },
    { icon: MessageCircle, tint: "bg-blue-50 text-blue-600", value: "3", label: "Unread Messages", cta: "View messages", href: "/dashboard?tab=messages" },
    { icon: Heart, tint: "bg-rose-50 text-rose-500", value: String(savedProviders.length), label: "Saved Providers", cta: "View saved", href: "/dashboard?tab=saved-providers" },
    { icon: Wallet, tint: "bg-green-50 text-green-600", value: naira(wallet), label: "Wallet Balance", cta: "Add funds", href: "/dashboard?tab=payments" },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="min-w-0 space-y-6">
        <Greeting />

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card p-4">
              <span className={`grid h-10 w-10 place-items-center rounded-lg ${s.tint}`}><s.icon className="h-5 w-5" /></span>
              <p className="mt-4 text-2xl font-bold text-ink">{s.value}</p>
              <p className="text-xs text-muted">{s.label}</p>
              <Link href={s.href} className="mt-3 inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-[#2F5BB7]">
                {s.cta} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>

        <section className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Upcoming Bookings</h2>
            <Link href="/dashboard?tab=bookings" className="inline-flex items-center gap-1 text-xs font-medium text-[#2F5BB7]">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="mt-4 space-y-3">
            {active.length === 0 && <EmptyState title="No upcoming bookings" text="Book a service and it will show up here." cta="Explore services" href="/services" />}
            {active.slice(0, 4).map((b) => <BookingRow key={b.id} booking={b} />)}
          </div>
        </section>

        <section className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Recommended for you</h2>
            <Link href="/services" className="inline-flex items-center gap-1 text-xs font-medium text-[#2F5BB7]">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {recommended.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Messages</h2>
            <Link href="/dashboard?tab=messages" className="inline-flex items-center gap-1 text-xs font-medium text-[#2F5BB7]">View all <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <ul className="mt-4 space-y-4">
            {conversations.map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <Avatar name={c.name} size={44} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="truncate text-xs text-muted">{c.snippet}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[11px] text-muted">{c.time}</span>
                  {c.unread && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Your next appointment</h2>
            <Link href="/dashboard?tab=bookings" className="inline-flex items-center gap-1 text-xs font-medium text-[#2F5BB7]">View calendar <ArrowRight className="h-3 w-3" /></Link>
          </div>
          {next ? <NextAppointment booking={next} /> : <p className="mt-4 text-sm text-muted">Nothing scheduled yet.</p>}
        </section>

        <section className="card p-5">
          <h2 className="text-base font-semibold">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            {[
              { icon: Search, title: "Book a service", text: "Find the right person for your needs", href: "/services", tint: "bg-orange-50 text-brand" },
              { icon: FileCheck, title: "Post a request", text: "Tell us what you need, and get offers", href: "/dashboard?tab=requests", tint: "bg-green-50 text-green-600" },
              { icon: LayoutGrid, title: "Explore categories", text: "Browse all service categories", href: "/services", tint: "bg-blue-50 text-blue-600" },
              { icon: UserPlus, title: "Become a provider", text: "Offer your skills and get paid", href: "/become-a-provider", tint: "bg-orange-50 text-brand" },
            ].map((a) => (
              <Link key={a.title} href={a.href} className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:bg-gray-50">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${a.tint}`}><a.icon className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{a.title}</span>
                  <span className="block truncate text-xs text-muted">{a.text}</span>
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-xl bg-[#2a1b10] p-6 text-white">
          <Image src={ctaImage} alt="" fill sizes="340px" className="object-cover object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a1b10] via-[#2a1b10]/70 to-transparent" />
          <h2 className="relative text-lg font-bold leading-snug">Turn your skills<br />into income</h2>
          <p className="relative mt-2 max-w-[190px] text-xs text-white/85">Join thousands of people already offering their services on GetItDone.</p>
          <Link href="/become-a-provider" className="btn-primary relative mt-4">Become a provider <ArrowRight className="h-4 w-4" /></Link>
        </section>
      </div>
    </div>
  );
}

function NextAppointment({ booking }: { booking: Booking }) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => setDays(daysUntil(booking.date)), [booking.date]);
  const label = days === null ? "" : days <= 0 ? "Today" : days === 1 ? "1 day to go" : `${days} days to go`;
  return (
    <div className="mt-4 flex gap-4">
      <ServiceThumb categoryId={booking.categoryId} src={serviceImage(booking.serviceId)} className="h-20 w-24 shrink-0 rounded-lg" />
      <div className="min-w-0 text-xs text-muted">
        <p className="text-sm font-semibold text-ink">{booking.serviceTitle}</p>
        <p className="mt-1">{booking.providerName}</p>
        <p className="mt-1 flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {formatDate(booking.date)} &bull; {booking.time}</p>
        <p className="mt-1 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {booking.location}</p>
        {label && <span className="mt-2 inline-block rounded-md bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-600">{label}</span>}
      </div>
    </div>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  const { cancelBooking } = useApp();
  const [open, setOpen] = useState(false);
  const canCancel = booking.status === "Confirmed" || booking.status === "Pending";
  return (
    <div className="rounded-xl border border-line p-3">
      <div className="flex gap-4">
        <ServiceThumb categoryId={booking.categoryId} src={serviceImage(booking.serviceId)} className="h-[88px] w-24 shrink-0 rounded-lg sm:w-24" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{booking.serviceTitle}</p>
              <p className="mt-0.5 truncate text-xs text-muted">{booking.providerName}</p>
            </div>
            <span className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-medium ${statusStyle[booking.status]}`}>{booking.status}</span>
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
            <CalendarDays className="h-3.5 w-3.5" /> {formatDate(booking.date)} &bull; {booking.time}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted"><MapPin className="h-3.5 w-3.5" /> {booking.location}</p>
        </div>
        <button onClick={() => setOpen((o) => !o)} className="btn-outline hidden self-center !px-4 !py-2 !text-xs sm:inline-flex">
          {open ? "Hide details" : "View details"}
        </button>
      </div>
      <button onClick={() => setOpen((o) => !o)} className="btn-outline mt-3 w-full !py-2 !text-xs sm:hidden">
        {open ? "Hide details" : "View details"}
      </button>
      {open && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3 text-xs text-gray-600">
          <div className="space-y-1">
            <p>Total: <strong className="text-ink">{naira(booking.total)}</strong></p>
            {booking.note && <p>Note: {booking.note}</p>}
          </div>
          <div className="flex gap-2">
            <Link href={`/providers/${booking.providerId}`} className="btn-outline !px-3 !py-1.5 !text-xs">View provider</Link>
            {canCancel && (
              <button onClick={() => cancelBooking(booking.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                Cancel booking
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PageTitle({ title, text }: { title: string; text?: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      {text && <p className="mt-1 text-sm text-muted">{text}</p>}
    </div>
  );
}

function EmptyState({ title, text, cta, href }: { title: string; text: string; cta?: string; href?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-white p-8 text-center">
      <p className="font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm text-muted">{text}</p>
      {cta && href && <Link href={href} className="btn-primary mt-4">{cta}</Link>}
    </div>
  );
}

function BookingsTab() {
  const { bookings } = useApp();
  const sorted = useMemo(() => [...bookings].sort((a, b) => b.date.localeCompare(a.date)), [bookings]);
  return (
    <>
      <PageTitle title="My Bookings" text="Everything you have booked, in one place." />
      <div className="space-y-3">
        {sorted.length === 0 && <EmptyState title="No bookings yet" text="When you book a service it will show up here." cta="Explore services" href="/services" />}
        {sorted.map((b) => <BookingRow key={b.id} booking={b} />)}
      </div>
    </>
  );
}

function MessagesTab() {
  return (
    <>
      <PageTitle title="Messages" text="Chat with providers about your bookings." />
      <div className="card divide-y divide-line">
        {conversations.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4">
            <Avatar name={c.name} size={48} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="truncate text-sm text-muted">{c.snippet}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-xs text-muted">{c.time}</span>
              {c.unread && <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">Demo conversations. Real-time chat needs a backend such as Supabase Realtime or Pusher.</p>
    </>
  );
}

function SavedProviders() {
  const { savedProviders } = useApp();
  const list = savedProviders.map((id) => getProvider(id)).filter((p): p is NonNullable<typeof p> => !!p);
  return (
    <>
      <PageTitle title="Saved Providers" />
      {list.length === 0 ? (
        <EmptyState title="No saved providers" text="Tap the heart on a provider profile to save them for later." cta="Find providers" href="/services" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{list.map((p) => <ProviderCard key={p.id} provider={p} />)}</div>
      )}
    </>
  );
}

function SavedServices() {
  const { savedServices } = useApp();
  const list = savedServices.map((id) => getService(id)).filter((s): s is NonNullable<typeof s> => !!s);
  return (
    <>
      <PageTitle title="Saved Services" />
      {list.length === 0 ? (
        <EmptyState title="No saved services" text="Tap the heart on any service to save it." cta="Explore services" href="/services" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{list.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
      )}
    </>
  );
}

function PaymentsTab() {
  const { wallet, addFunds, bookings } = useApp();
  const spent = bookings.filter((b) => b.status === "Confirmed" || b.status === "Completed").reduce((n, b) => n + b.total, 0);
  return (
    <>
      <PageTitle title="Payments & Wallet" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <p className="text-xs text-muted">Wallet balance</p>
          <p className="mt-1 text-3xl font-bold">{naira(wallet)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[5000, 10000, 50000].map((n) => (
              <button key={n} onClick={() => addFunds(n)} className="btn-outline !px-3 !py-1.5 !text-xs">+ {naira(n)}</button>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted">Demo only. No real money moves until a payment provider (Paystack or Flutterwave) is connected.</p>
        </div>
        <div className="card p-5">
          <p className="text-xs text-muted">Total on confirmed bookings</p>
          <p className="mt-1 text-3xl font-bold">{naira(spent)}</p>
        </div>
      </div>
    </>
  );
}

function ReviewsTab() {
  const { bookings } = useApp();
  const done = bookings.filter((b) => b.status === "Completed");
  return (
    <>
      <PageTitle title="Reviews" text="Rate providers after a job is completed." />
      {done.length === 0 ? (
        <EmptyState title="Nothing to review yet" text="Completed bookings will appear here so you can leave a review." />
      ) : (
        <div className="space-y-3">{done.map((b) => <BookingRow key={b.id} booking={b} />)}</div>
      )}
    </>
  );
}

function RequestsTab() {
  const { requests, addRequest } = useApp();
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim().length < 3) return setError("Give your request a short title.");
    if (description.trim().length < 10) return setError("Add a few details so providers know what you need.");
    setError("");
    addRequest({ title: title.trim(), categoryId, budget: budget.trim(), description: description.trim() });
    setTitle("");
    setBudget("");
    setDescription("");
  }

  return (
    <>
      <PageTitle title="My Requests" text="Tell us what you need and let providers come to you." />
      <form onSubmit={submit} className="card space-y-4 p-5">
        <div>
          <label htmlFor="r-title" className="text-xs font-medium">What do you need?</label>
          <input id="r-title" value={title} onChange={(e) => setTitle(e.target.value)} className="input mt-1.5" placeholder="e.g. Fix a leaking kitchen tap" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="r-cat" className="text-xs font-medium">Category</label>
            <select id="r-cat" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="input mt-1.5">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="r-budget" className="text-xs font-medium">Budget (optional)</label>
            <input id="r-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="input mt-1.5" placeholder="e.g. ₦20,000" />
          </div>
        </div>
        <div>
          <label htmlFor="r-desc" className="text-xs font-medium">Details</label>
          <textarea id="r-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="input mt-1.5 resize-none" />
        </div>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary">Post request</button>
      </form>

      <div className="mt-6 space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{r.title}</p>
                <p className="mt-0.5 text-xs text-muted">{categories.find((c) => c.id === r.categoryId)?.name}{r.budget ? ` • ${r.budget}` : ""}</p>
              </div>
              <span className="rounded bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-600">Open</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{r.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
