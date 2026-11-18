import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ChevronRight, Clock, MapPin, MessageCircle, Send, ShieldCheck, Check } from "lucide-react";
import Avatar from "@/components/Avatar";
import BookingForm from "@/components/BookingForm";
import ReadMore from "@/components/ReadMore";
import SaveButton from "@/components/SaveButton";
import { StarRow } from "@/components/Rating";
import { ServiceThumb } from "@/components/ServiceCard";
import {
  getCategory,
  getProvider,
  providerLabel,
  providers,
  reviewsFor,
  servicesByProvider,
} from "@/lib/data";
import { naira } from "@/lib/format";

export function generateStaticParams() {
  return providers.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProvider(id);
  return { title: p ? `${providerLabel(p)} | GetItDone` : "Provider | GetItDone" };
}

export default async function ProviderPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const provider = getProvider(id);
  if (!provider) notFound();

  const list = servicesByProvider(provider.id);
  const category = getCategory(provider.categoryId);
  const reviews = reviewsFor(provider.id);
  const serviceParam = Array.isArray(sp.service) ? sp.service[0] : sp.service;
  const label = providerLabel(provider);

  return (
    <div className="container-page py-6">
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/services?category=${category.id}`} className="hover:text-brand">{category.name}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink">{label}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left column */}
        <div className="min-w-0">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative shrink-0">
              <Avatar name={label} size={144} />
              {provider.verified && (
                <span className="absolute -bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-[11px] font-semibold text-white">
                  <Check className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-ink sm:text-3xl">{label}</h1>
                  <p className="mt-1 text-sm text-muted">{provider.tagline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <SaveButton kind="provider" id={provider.id} className="h-10 w-10 border border-brand-line bg-white hover:bg-brand-soft" />
                  <Link href="/dashboard?tab=messages" className="btn-outline">Message</Link>
                  <a href="#book" className="btn-primary">Book Now</a>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <StarRow rating={1} size={16} />
                  <strong>{provider.rating.toFixed(1)}</strong>
                  <span className="text-muted">({provider.reviews} reviews)</span>
                </span>
                <span className="hidden h-4 w-px bg-line sm:block" />
                <span><strong>{provider.jobs}</strong> <span className="text-gray-600">completed jobs</span></span>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-gray-600">
                <MapPin className="h-4 w-4" /> {provider.location}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-700">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand" /> Background Checked</span>
                {provider.insured && <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand" /> Insured</span>}
                {provider.verified && <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-brand" /> Verified Business</span>}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ServiceThumb categoryId={provider.categoryId} className="col-span-2 row-span-2 aspect-[4/3] rounded-xl sm:aspect-auto sm:min-h-[260px]" />
            {[0, 1, 2, 3].map((i) => (
              <ServiceThumb key={i} categoryId={provider.categoryId} className="aspect-[4/3] rounded-xl opacity-90" />
            ))}
          </div>

          {/* Services */}
          <h2 className="mt-10 text-lg font-bold text-ink">Services Offered</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {list.map((s) => (
              <Link
                key={s.id}
                href={`/providers/${provider.id}?service=${s.id}#book`}
                scroll
                className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <ServiceThumb categoryId={s.categoryId} className="h-32 w-full" />
                <div className="p-3.5">
                  <h3 className="line-clamp-1 text-sm font-semibold">{s.title}</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted"><Clock className="h-3.5 w-3.5" /> {s.duration}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-semibold">{naira(s.price)}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Reviews */}
          <section className="card mt-10 p-5">
            <h2 className="text-lg font-bold text-ink">Reviews</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-[140px_1fr]">
              <div>
                <p className="text-xs text-muted">Rating</p>
                <p className="mt-1 text-4xl font-bold">{provider.rating.toFixed(1)}</p>
                <div className="mt-1"><StarRow rating={provider.rating} size={16} /></div>
                <p className="mt-2 text-xs text-muted">{provider.reviews} reviews</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {reviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-line p-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={r.author} size={28} />
                      <span className="text-xs font-semibold">{r.author}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <StarRow rating={r.rating} size={12} />
                      <span className="text-[11px] text-muted">{r.when}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right column */}
        <aside className="space-y-5">
          <section className="card p-5">
            <h2 className="text-base font-semibold">About the Provider</h2>
            <div className="mt-3">
              <ReadMore text={provider.bio} />
            </div>
            <dl className="mt-5 space-y-5 border-t border-line pt-5 text-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <dt className="font-medium">Service Areas</dt>
                  <dd className="mt-1 text-gray-700">{provider.location}</dd>
                  <dd className="mt-1 text-xs text-muted">Also serves: {provider.areas.join(", ")}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <dt className="font-medium">Languages</dt>
                  <dd className="mt-1 text-xs text-muted">{provider.languages.join(", ")}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <dt className="font-medium">Response Time</dt>
                  <dd className="mt-1 text-xs text-muted">{provider.response}</dd>
                </div>
              </div>
            </dl>
            <div className="mt-5 rounded-xl bg-brand-soft p-4">
              <p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-brand" /> Why choose this provider?</p>
              <ul className="mt-3 space-y-2 text-xs text-gray-700">
                {["Verified and background checked", "Consistent 5-star reviews", "Professional and friendly team", "Flexible scheduling"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-3.5 w-3.5" /> {t}</li>
                ))}
              </ul>
            </div>
          </section>

          <BookingForm providerId={provider.id} services={list} defaultServiceId={serviceParam} />

          <section className="card p-5">
            <p className="flex items-center gap-2 text-sm font-semibold"><Send className="h-4 w-4" /> Need something else?</p>
            <p className="mt-2 text-xs text-muted">You can also post a request and get quotes from multiple providers.</p>
            <Link href="/dashboard?tab=requests" className="btn-outline mt-4 w-full !text-brand">Post a Request</Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
