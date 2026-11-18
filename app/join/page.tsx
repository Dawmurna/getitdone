import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Join | GetItDone" };

export default function JoinPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-muted">Loading...</div>}>
      <AuthForm mode="join" />
    </Suspense>
  );
}
