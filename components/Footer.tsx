import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <Logo />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/services" className="hover:text-brand">Explore Services</Link>
          <Link href="/become-a-provider" className="hover:text-brand">Become a Provider</Link>
          <Link href="/about" className="hover:text-brand">About</Link>
          <Link href="/signin" className="hover:text-brand">Sign In</Link>
        </nav>
        <p className="text-xs text-muted">© {new Date().getFullYear()} GetItDone. All rights reserved.</p>
      </div>
    </footer>
  );
}
