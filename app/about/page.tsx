import Link from "next/link";

export const metadata = { title: "About | GetItDone" };

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="text-4xl font-bold tracking-tight text-ink">Real people. Real skills. Real help.</h1>
      <p className="mt-5 text-lg leading-relaxed text-gray-700">
        GetItDone connects people who need something done with the skilled people who do it well: plumbers, tailors,
        event planners, coaches, photographers, consultants and more.
      </p>
      <p className="mt-4 leading-relaxed text-gray-700">
        Every provider has a profile, rates and reviews you can check before you book. You pick a time, confirm the
        details and pay through the platform, so both sides are protected.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/services" className="btn-primary">Explore services</Link>
        <Link href="/become-a-provider" className="btn-outline">Become a provider</Link>
      </div>
    </div>
  );
}
