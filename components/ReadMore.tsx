"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ReadMore({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className={`text-sm leading-relaxed text-gray-600 ${open ? "" : "line-clamp-4"}`}>{text}</p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#2F5BB7]"
      >
        {open ? "Show less" : "Read more"}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
