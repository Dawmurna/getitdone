import { Star } from "lucide-react";

export default function Rating({ rating, count, className = "" }: { rating: number; count?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-sm ${className}`}>
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted">({count})</span>}
    </span>
  );
}

export function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </span>
  );
}
