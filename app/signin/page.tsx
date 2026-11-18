import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export const metadata = { title: "Sign In | GetItDone" };

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-muted">Loading...</div>}>
      <AuthForm mode="signin" />
    </Suspense>
  );
}
