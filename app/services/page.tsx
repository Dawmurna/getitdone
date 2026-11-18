import Link from "next/link";
import { Search } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { categories, getCategory, getProvider, locations, services } from "@/lib/data";

export const metadata = { title: "Explore Services | GetItDone" };

type SP = Record<string, string | string[] | undefined>;

function one(v: string | string[] | undefined): string {
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

export default async function ServicesPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = one(sp.q).trim();
  const loc = one(sp.loc);
  const category = one(sp.category);
  const sort = one(sp.sort) || "rating";

  const needle = q.toLowerCase();
  let results = services.filter((s) => {
    const p = getProvider(s.providerId);
    if (!p) return false;
    if (category && s.categoryId !== category) return false;
    if (loc && s.mode !== "Remote" && p.location !== loc) return false;
    if (needle) {
      const hay = [s.title, p.name, p.business ?? "", p.title, getCategory(s.categoryId).name].join(" ").toLowerCase();
      if (!needle.split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  });

  results = [...results].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "popular") return b.reviews - a.reviews;
    return b.rating - a.rating || b.reviews - a.reviews;
  });

  const activeCategory = category ? categories.find((c) => c.id === category) : undefined;

  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-ink">{activeCategory ? activeCategory.name : "Explore services"}</h1>
      <p className="mt-1 text-sm text-muted">Find skilled people for the job, then book in minutes.</p>

      <form method="get" className="mt-6 grid gap-3 rounded-xl border border-line bg-white p-3 shadow-card md:grid-cols-[1fr_200px_180px_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input name="q" defaultValue={q} placeholder="What do you need help with?" className="input pl-10" />
        </label>
        <select name="loc" defaultValue={loc} className="input">
          <option value="">Any location</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <select name="sort" defaultValue={sort} className="input">
          <option value="rating">Top rated</option>
          <option value="popular">Most reviewed</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
        {category && <input type="hidden" name="category" value={category} />}
        <button type="submit" className="btn-primary">Search</button>
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link href="/services" className={`rounded-full border px-4 py-1.5 text-xs font-medium ${!category ? "border-brand bg-brand-soft text-brand" : "border-line bg-white text-gray-700 hover:bg-gray-50"}`}>
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/services?category=${c.id}`}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium ${category === c.id ? "border-brand bg-brand-soft text-brand" : "border-line bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        {results.length} {results.length === 1 ? "service" : "services"} found
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      ) : (
        <div className="card mt-4 p-10 text-center">
          <p className="font-semibold text-ink">No services match your search</p>
          <p className="mt-1 text-sm text-muted">Try a different keyword or location, or post a request and let providers come to you.</p>
          <Link href="/dashboard?tab=requests" className="btn-primary mt-5">Post a request</Link>
        </div>
      )}
    </div>
  );
}
