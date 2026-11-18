import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="GetItDone home">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[5px] border-brand bg-white">
        <span className="h-3 w-3 rounded-full bg-brand" />
      </span>
      <span className="leading-tight">
        <span className="block text-[22px] font-bold tracking-tight text-ink">GetItDone</span>
        <span className="hidden text-[9px] text-muted sm:block">Real people. Real skills. Real help.</span>
      </span>
    </Link>
  );
}
