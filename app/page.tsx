import Link from "next/link";

import SearchBox from "@/components/search-box";
import SiteHeader from "@/components/site-header";
import { districtData, getFeaturedPlaces } from "@/lib/places";

export default function HomePage() {
  const featured = getFeaturedPlaces();

  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero-shell">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.35fr_0.9fr] lg:px-8 lg:py-28">
            <div>
              <div className="mb-7 flex flex-col gap-[0.45rem]" aria-hidden="true">
                <span className="pagoda-bar w-28" />
                <span className="pagoda-bar w-20" />
                <span className="pagoda-bar w-12" />
              </div>

              <h1 className="max-w-xl font-display text-5xl leading-[0.92] tracking-[-0.05em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
                A valley shaped by <span className="text-[var(--copper)]">temples</span>, squares, and stone memory.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-7 text-[var(--muted)]">
                Kathmandu, Lalitpur, and Bhaktapur hold the carved rhythm of the Kathmandu Valley in their courtyards, bells, and pagoda roofs.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/kathmandu"
                  className="inline-flex items-center border border-[var(--copper)] bg-[var(--copper)] px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--ink)] no-underline transition-colors hover:bg-transparent hover:text-[var(--foreground)]"
                >
                  Explore Kathmandu
                </Link>
                <Link
                  href="/lalitpur"
                  className="inline-flex items-center border border-[var(--line)] px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--foreground)] no-underline transition-colors hover:border-[var(--copper)] hover:text-[var(--copper)]"
                >
                  Patan guide
                </Link>
              </div>
            </div>

            <div className="lg:pt-6">
              <div className="rounded-[28px] border border-[var(--line)] bg-[rgba(17,12,10,0.7)] p-5 shadow-[0_0_0_1px_rgba(184,130,61,0.08)]">
                <SearchBox />
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="stat-block">
                  <span className="stat-number">51</span>
                  <span className="stat-label">heritage sites</span>
                </div>
                <div className="stat-block">
                  <span className="stat-number">3</span>
                  <span className="stat-label">historic districts</span>
                </div>
                <div className="stat-block">
                  <span className="stat-number">1</span>
                  <span className="stat-label">valley, many layers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {districtData.map(({ district, slug, description, places }) => (
          <section key={district} className="border-b border-[var(--line)] py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-3 text-[0.68rem] uppercase tracking-[0.32em] text-[var(--copper)]">
                    District
                  </p>
                  <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl">
                    {district}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/${slug}`}
                    className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--foreground)] no-underline transition-colors hover:text-[var(--copper)]"
                  >
                    View all {places.length}
                  </Link>
                </div>
              </div>

              <p className="mb-8 max-w-3xl text-base leading-7 text-[var(--muted)]">{description}</p>

              <div className="grid gap-5 md:grid-cols-3">
                {featured[district].map((place) => (
                  <article key={place.id} className="site-card">
                    <div className="mb-4 flex items-center justify-between gap-3 text-[0.64rem] uppercase tracking-[0.22em] text-[var(--copper)]">
                      <span>{place.district}</span>
                      <span className="opacity-70">{place.stats[0] ?? "Heritage"}</span>
                    </div>

                    <h3 className="font-display text-3xl leading-[1.05] tracking-[-0.04em] text-[var(--foreground)]">
                      {place.shortName}
                    </h3>

                    <p className="mt-4 flex-1 text-sm leading-6 text-[var(--muted)]">{place.summary}</p>

                    <Link
                      href={`/${slug}/${place.slug}`}
                      className="mt-6 inline-flex items-center text-[0.68rem] uppercase tracking-[0.22em] text-[var(--copper)] no-underline transition-colors hover:text-[var(--foreground)]"
                    >
                      Read entry
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
