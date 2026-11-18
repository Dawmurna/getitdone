import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { categories } from "@/lib/data";
import CategoryIcon from "./CategoryIcon";

export default function CategoryGrid() {
  return (
    <section className="container-page py-12">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold text-ink">Browse by category</h2>
        <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2F5BB7] hover:underline">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/services?category=${c.id}`}
            className="card flex h-[140px] flex-col items-center justify-center gap-3 px-2 text-center transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <CategoryIcon name={c.icon} className="h-6 w-6" style={{ color: c.color }} />
            <span className="text-[13px] leading-snug text-ink">{c.name}</span>
          </Link>
        ))}
        <Link
          href="/services"
          className="card flex h-[140px] flex-col items-center justify-center gap-3 px-2 text-center transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <LayoutGrid className="h-6 w-6 text-gray-600" />
          <span className="text-[13px] leading-snug text-ink">More Categories</span>
        </Link>
      </div>
    </section>
  );
}
