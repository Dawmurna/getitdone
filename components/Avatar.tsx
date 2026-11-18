const palette = ["#F26B1D", "#2F6FDE", "#16A34A", "#7C5CE0", "#E5487A", "#12A38A", "#D97706", "#475467"];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Avatar({ name, size = 40, className = "" }: { name: string; size?: number; className?: string }) {
  const color = palette[hash(name) % palette.length];
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full font-semibold text-white ${className}`}
      style={{ width: size, height: size, background: color, fontSize: Math.max(10, size * 0.36) }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
