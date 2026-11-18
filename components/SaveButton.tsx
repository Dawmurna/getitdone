"use client";

import { Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

export default function SaveButton({
  kind,
  id,
  className = "",
  withLabel = false,
}: {
  kind: "provider" | "service";
  id: string;
  className?: string;
  withLabel?: boolean;
}) {
  const { user, savedProviders, savedServices, toggleSaveProvider, toggleSaveService } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const saved = (kind === "provider" ? savedProviders : savedServices).includes(id);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push(`/signin?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (kind === "provider") toggleSaveProvider(id);
    else toggleSaveService(id);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save"}
      className={`grid place-items-center rounded-lg transition ${className}`}
    >
      <Heart className={`h-[18px] w-[18px] ${saved ? "fill-brand text-brand" : "text-brand"}`} />
      {withLabel && <span className="sr-only">{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
