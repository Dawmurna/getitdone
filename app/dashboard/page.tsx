import { Suspense } from "react";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata = { title: "Dashboard | GetItDone" };

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-muted">Loading your dashboard...</div>}>
      <DashboardClient />
    </Suspense>
  );
}
