import Image from "next/image";
import Link from "next/link";
import { serviceImage } from "@/lib/images";
import { getCategory, getProvider, providerLabel, type Service } from "@/lib/data";
import { naira } from "@/lib/format";
import Avatar from "./Avatar";
import CategoryIcon from "./CategoryIcon";
import Rating from "./Rating";
import SaveButton from "./SaveButton";

export function ServiceThumb({
  categoryId,
  src,
  className = "",
  priority = false,
}: {
  categoryId: string;
  src?: string;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 300px"
          className="object-cover"
        />
      </div>
    );
  }
  const c = getCategory(categoryId);
  return (
    <div
      className={`grid place-items-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${c.tint}, ${c.color}40)` }}
      aria-hidden
    >
      <CategoryIcon name={c.icon} className="h-1/3 w-1/3 max-h-12 max-w-12" style={{ color: c.color }} strokeWidth={1.6} />
    </div>
  );
}

export default function ServiceCard({ service }: { service: Service }) {
  const provider = getProvider(service.providerId);
  if (!provider) return null;
  const label = providerLabel(provider);
  return (
    <div className="card group relative overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/providers/${provider.id}?service=${service.id}#book`} className="block">
        <div className="relative">
          <ServiceThumb categoryId={service.categoryId} src={serviceImage(service.id)} className="h-36 w-full" />
          <span className="absolute bottom-0 left-0 rounded-tr-md bg-[#1F4D3F] px-2 py-0.5 text-[11px] font-semibold text-white">
            {service.mode}
          </span>
        </div>
        <div className="space-y-2 p-3.5">
          <h3 className="line-clamp-1 text-sm font-semibold text-ink">{service.title}</h3>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Avatar name={label} size={22} />
            <span className="truncate">By {label}</span>
          </div>
          <Rating rating={service.rating} count={service.reviews} />
          <p className="pt-1 text-sm font-semibold text-ink">From {naira(service.price)}</p>
        </div>
      </Link>
      <SaveButton kind="service" id={service.id} className="absolute right-2 top-2 h-8 w-8 bg-white/90 shadow-sm hover:bg-white" />
    </div>
  );
}
