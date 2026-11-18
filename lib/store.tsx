"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getService, getProvider, providerLabel } from "./data";
import { addDays } from "./format";

const KEY = "getitdone:v1";

export interface User {
  name: string;
  email: string;
}

export type BookingStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  providerId: string;
  providerName: string;
  categoryId: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  status: BookingStatus;
  total: number;
  note?: string;
}

export interface ServiceRequest {
  id: string;
  title: string;
  categoryId: string;
  budget: string;
  description: string;
  createdAt: string;
}

interface Persisted {
  user: User | null;
  bookings: Booking[];
  savedProviders: string[];
  savedServices: string[];
  requests: ServiceRequest[];
  wallet: number;
  seeded: boolean;
}

const empty: Persisted = {
  user: null,
  bookings: [],
  savedProviders: [],
  savedServices: [],
  requests: [],
  wallet: 0,
  seeded: false,
};

interface AppContextValue extends Persisted {
  ready: boolean;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  addBooking: (b: Omit<Booking, "id" | "status"> & { status?: BookingStatus }) => Booking;
  cancelBooking: (id: string) => void;
  toggleSaveProvider: (id: string) => void;
  toggleSaveService: (id: string) => void;
  addRequest: (r: Omit<ServiceRequest, "id" | "createdAt">) => void;
  addFunds: (amount: number) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function locationFor(mode: string): string {
  if (mode === "Remote") return "Online";
  if (mode === "Workshop") return "At provider's workshop";
  return "At your location";
}

function seedBookings(): Booking[] {
  const make = (serviceId: string, days: number, time: string, status: BookingStatus): Booking | null => {
    const s = getService(serviceId);
    if (!s) return null;
    const p = getProvider(s.providerId);
    if (!p) return null;
    return {
      id: uid(),
      serviceId: s.id,
      serviceTitle: s.title,
      providerId: p.id,
      providerName: providerLabel(p),
      categoryId: s.categoryId,
      date: addDays(days),
      time,
      location: locationFor(s.mode),
      status,
      total: Math.round(s.price * 1.1),
    };
  };
  return [
    make("s-painting", 3, "10:00 AM - 2:00 PM", "Confirmed"),
    make("s-fitness", 1, "6:00 AM - 7:00 AM", "Confirmed"),
    make("s-event", 10, "4:00 PM - 10:00 PM", "Pending"),
    make("s-furniture", 16, "9:00 AM - 5:00 PM", "Confirmed"),
  ].filter((b): b is Booking => b !== null);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Persisted>;
        setState({ ...empty, ...parsed });
      }
    } catch {
      // ignore corrupted storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // storage may be unavailable (private mode), the app still works in memory
    }
  }, [state, ready]);

  const signIn = useCallback((name: string, email: string) => {
    setState((s) => ({
      ...s,
      user: { name, email },
      bookings: s.seeded ? s.bookings : [...seedBookings(), ...s.bookings],
      seeded: true,
    }));
  }, []);

  const signOut = useCallback(() => {
    setState((s) => ({ ...s, user: null }));
  }, []);

  const addBooking = useCallback<AppContextValue["addBooking"]>((b) => {
    const booking: Booking = { ...b, id: uid(), status: b.status ?? "Pending" };
    setState((s) => ({ ...s, bookings: [booking, ...s.bookings] }));
    return booking;
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)),
    }));
  }, []);

  const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const toggleSaveProvider = useCallback((id: string) => {
    setState((s) => ({ ...s, savedProviders: toggle(s.savedProviders, id) }));
  }, []);

  const toggleSaveService = useCallback((id: string) => {
    setState((s) => ({ ...s, savedServices: toggle(s.savedServices, id) }));
  }, []);

  const addRequest = useCallback<AppContextValue["addRequest"]>((r) => {
    const req: ServiceRequest = { ...r, id: uid(), createdAt: new Date().toISOString() };
    setState((s) => ({ ...s, requests: [req, ...s.requests] }));
  }, []);

  const addFunds = useCallback((amount: number) => {
    setState((s) => ({ ...s, wallet: s.wallet + amount }));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      ready,
      signIn,
      signOut,
      addBooking,
      cancelBooking,
      toggleSaveProvider,
      toggleSaveService,
      addRequest,
      addFunds,
    }),
    [state, ready, signIn, signOut, addBooking, cancelBooking, toggleSaveProvider, toggleSaveService, addRequest, addFunds],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
