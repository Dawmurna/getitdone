import Link from "next/link";
import { BadgeCheck, MapPin } from "lucide-react";
import type { Provider } from "@/lib/data";
import Avatar from "./Avatar";
import Rating from "./Rating";

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="card flex flex-col items-center p-5 text-center">
      <Avatar name={provider.name} size={96} />
      <h3 className="mt-3 flex items-center gap-1.5 text-base font-semibold text-ink">
        <span className="line-clamp-1">{provider.name}</span>
        {provider.verified && <BadgeCheck className="h-4 w-4 shrink-0 fill-green-500 text-white" />}
      </h3>
      <p className="mt-1 text-xs text-muted">
        {provider.title} <span className="px-1">•</span> {provider.years} years experience
      </p>
      <div className="mt-2">
        <Rating rating={provider.rating} count={provider.reviews} />
      </div>
      <p className="mt-2 flex items-center gap-1 text-xs text-muted">
        <MapPin className="h-3.5 w-3.5" /> {provider.location}
      </p>
      <Link href={`/providers/${provider.id}`} className="btn-outline mt-4 w-full">
        View profile
      </Link>
    </div>
  );
}
