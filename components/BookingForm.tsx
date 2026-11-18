"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarDays, Check, ChevronDown, Clock, ShieldCheck } from "lucide-react";
import { getProvider, providerLabel, timeSlots, type Service } from "@/lib/data";
import { addDays, naira } from "@/lib/format";
import { locationFor, useApp, type Booking } from "@/lib/store";

export default function BookingForm({
  providerId,
  services,
  defaultServiceId,
}: {
  providerId: string;
  services: Service[];
  defaultServiceId?: string;
}) {
  const { user, addBooking } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const initial = services.find((s) => s.id === defaultServiceId)?.id ?? services[0]?.id ?? "";
  const [serviceId, setServiceId] = useState(initial);
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [time, setTime] = useState(timeSlots[1]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<Booking | null>(null);

  useEffect(() => {
    setMinDate(addDays(0));
    setDate((d) => d || addDays(3));
  }, []);

  useEffect(() => {
    setServiceId(initial);
  }, [initial]);

  const service = services.find((s) => s.id === serviceId);
  const provider = getProvider(providerId);
  if (!service || !provider) return null;

  const fee = Math.round(service.price * 0.1);
  const total = service.price + fee;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!service || !provider) return;
    if (!date) {
      setError("Please choose a date.");
      return;
    }
    if (minDate && date < minDate) {
      setError("Please choose a date that is today or later.");
      return;
    }
    if (!user) {
      router.push(`/signin?next=${encodeURIComponent(`${pathname}?service=${service.id}#book`)}`);
      return;
    }
    const booking = addBooking({
      serviceId: service.id,
      serviceTitle: service.title,
      providerId: provider.id,
      providerName: providerLabel(provider),
      categoryId: service.categoryId,
      date,
      time,
      location: locationFor(service.mode),
      total,
      note: note.trim() || undefined,
    });
    setDone(booking);
  }

  if (done) {
    return (
      <div id="book" className="card scroll-mt-24 p-5">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Booking request sent</h2>
        <p className="mt-1 text-sm text-gray-600">
          {done.serviceTitle} with {done.providerName} on {done.date} ({done.time}). The provider will confirm shortly.
        </p>
        <p className="mt-3 text-sm text-muted">Payments are not live in this demo, so nothing was charged.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/dashboard?tab=bookings" className="btn-primary flex-1">View my bookings</Link>
          <button onClick={() => setDone(null)} className="btn-outline flex-1">Book another</button>
        </div>
      </div>
    );
  }

  return (
    <form id="book" onSubmit={submit} className="card scroll-mt-24 p-5">
      <h2 className="text-lg font-semibold text-ink">Book This Service</h2>

      <label className="mt-4 block text-xs font-medium text-ink">Select Service</label>
      <div className="relative mt-1.5">
        <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} className="input appearance-none pr-9">
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>

      <label htmlFor="date" className="mt-4 block text-xs font-medium text-ink">Date</label>
      <div className="relative mt-1.5">
        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input id="date" type="date" value={date} min={minDate || undefined} onChange={(e) => setDate(e.target.value)} className="input pl-10" required />
      </div>

      <label htmlFor="time" className="mt-4 block text-xs font-medium text-ink">Time</label>
      <div className="relative mt-1.5">
        <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <select id="time" value={time} onChange={(e) => setTime(e.target.value)} className="input appearance-none pl-10 pr-9">
          {timeSlots.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>

      <label htmlFor="note" className="mt-4 block text-xs font-medium text-ink">Special Requests (optional)</label>
      <textarea
        id="note"
        value={note}
        maxLength={200}
        onChange={(e) => setNote(e.target.value)}
        placeholder="E.g. focus on kitchen, pet friendly, etc."
        className="input mt-1.5 h-24 resize-none"
      />
      <p className="mt-1 text-right text-[11px] text-muted">{note.length}/200</p>

      <dl className="mt-3 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between text-gray-600"><dt>Service Price</dt><dd>{naira(service.price)}</dd></div>
        <div className="flex justify-between text-gray-600"><dt>Platform Fee (10%)</dt><dd>{naira(fee)}</dd></div>
        <div className="flex justify-between pt-1 text-base font-semibold text-ink"><dt>Total</dt><dd>{naira(total)}</dd></div>
      </dl>

      {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <button type="submit" className="btn-primary mt-4 w-full py-3">Continue to Payment</button>

      <div className="mt-4 flex items-center gap-3 rounded-lg bg-brand-soft px-4 py-3 text-xs text-gray-600">
        <ShieldCheck className="h-5 w-5 shrink-0 text-brand" />
        Your payment is secure and protected by our platform.
      </div>
    </form>
  );
}
