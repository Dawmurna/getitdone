"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { categories, locations } from "@/lib/data";

const perks = ["Get more customers", "Set your own rates", "Manage bookings easily", "Grow your reputation"];

export default function BecomeProviderPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (String(f.get("name") ?? "").trim().length < 2 || !String(f.get("phone") ?? "").trim()) {
      setError("Please add your name and a phone number.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <div className="container-page grid gap-10 py-14 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-ink">Turn your skills into income</h1>
        <p className="mt-4 max-w-md text-gray-700">
          Join thousands of people already offering their services on GetItDone. Tell us what you do and we will get
          your profile ready.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-soft"><Check className="h-3.5 w-3.5 text-brand" /></span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {sent ? (
        <div className="card self-start p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green-100"><Check className="h-6 w-6 text-green-600" /></div>
          <h2 className="mt-4 text-xl font-semibold">Application received</h2>
          <p className="mt-2 text-sm text-muted">Thanks for applying. In this demo the form is not saved anywhere yet.</p>
          <Link href="/" className="btn-primary mt-6">Back to home</Link>
        </div>
      ) : (
        <form onSubmit={submit} className="card space-y-4 self-start p-7">
          <div>
            <label htmlFor="name" className="text-xs font-medium">Full name</label>
            <input id="name" name="name" className="input mt-1.5" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="text-xs font-medium">Phone number</label>
              <input id="phone" name="phone" type="tel" className="input mt-1.5" />
            </div>
            <div>
              <label htmlFor="location" className="text-xs font-medium">Location</label>
              <select id="location" name="location" className="input mt-1.5">
                {locations.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="category" className="text-xs font-medium">What do you do?</label>
            <select id="category" name="category" className="input mt-1.5">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="about" className="text-xs font-medium">Tell us about your work</label>
            <textarea id="about" name="about" rows={4} className="input mt-1.5 resize-none" />
          </div>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full py-3">Apply to become a provider</button>
        </form>
      )}
    </div>
  );
}
