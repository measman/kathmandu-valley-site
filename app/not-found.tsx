import Link from "next/link";

import SiteHeader from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-start justify-center gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex gap-3">
          <span className="inline-block h-px w-12 self-center bg-[var(--copper)]" />
          <span className="text-[0.7rem] uppercase tracking-[0.32em] text-[var(--copper)]">404</span>
        </div>

        <h1 className="max-w-xl font-serif text-5xl tracking-[-0.05em] text-[var(--foreground)] sm:text-6xl">
          This gateway is not on the map.
        </h1>

        <p className="max-w-xl text-lg text-[var(--muted)]">
          The route you requested does not exist in this valley guide. Return to the district index or use the search to find a heritage site.
        </p>

        <Link
          href="/"
          className="inline-flex items-center border border-[var(--copper)] bg-[var(--copper)] px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--ink)] transition-colors hover:bg-transparent hover:text-[var(--foreground)]"
        >
          Return home
        </Link>
      </main>
    </>
  );
}
