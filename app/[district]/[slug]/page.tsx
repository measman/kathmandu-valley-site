import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/site-header";
import { getPlaceByDistrictAndSlug, places } from "@/lib/places";

export async function generateStaticParams() {
  return places.map((place) => ({
    district: place.district.toLowerCase(),
    slug: place.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ district: string; slug: string }>;
}): Promise<Metadata> {
  const { district, slug } = await params;
  const place = getPlaceByDistrictAndSlug(district, slug);

  if (!place) {
    return { title: "Site not found" };
  }

  return {
    title: `${place.name} | Kathmandu Valley Heritage Guide`,
    description: place.summary,
    openGraph: {
      title: `${place.name} | Kathmandu Valley Heritage Guide`,
      description: place.summary,
      type: "website",
    },
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ district: string; slug: string }>;
}) {
  const { district, slug } = await params;
  const place = getPlaceByDistrictAndSlug(district, slug);

  if (!place) {
    notFound();
  }

  const districtSlug = district.toLowerCase();

  // Filter additional sub-monuments/sections (excluding core pattern sections)
  const subMonuments = place.sections.filter(
    (s) => !["location", "existence", "description"].includes(s.title.toLowerCase())
  );

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.25em] text-[var(--copper)]">
          <Link href="/" className="no-underline hover:text-[var(--foreground)]">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${districtSlug}`} className="no-underline hover:text-[var(--foreground)]">
            {place.district}
          </Link>
          <span>/</span>
          <span className="text-[var(--muted)]">{place.shortName}</span>
        </div>

        <article className="page-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          {/* Header Title Section */}
          <div className="mb-8 border-b border-[var(--line)] pb-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="section-label">Heritage Sanctuary</span>
              <span className="text-xs text-[var(--line)]">•</span>
              <span className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                {place.district} District
              </span>
            </div>
            <h1 className="font-display text-4xl leading-[1.1] tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              {place.name}
            </h1>

            {place.stats.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {place.stats.map((stat) => (
                  <span
                    key={stat}
                    className="inline-flex items-center rounded-sm border border-[var(--line)] bg-[rgba(184,130,61,0.08)] px-3 py-1 text-[0.66rem] uppercase tracking-[0.16em] text-[var(--copper-soft)]"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Place Primary Image (or Visual Slot) */}
          <div className="mb-10">
            {place.image ? (
              <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-[var(--line)] shadow-lg">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,13,10,0.7)] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[0.68rem] tracking-[0.15em] text-[var(--foreground)]">
                  <span className="bg-[rgba(18,14,11,0.85)] px-2.5 py-1 uppercase backdrop-blur-sm">
                    {place.name}
                  </span>
                  <span className="hidden text-[rgba(239,230,212,0.75)] sm:inline">
                    Kathmandu Valley Heritage
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative flex min-h-[14rem] flex-col items-center justify-center rounded-sm border border-dashed border-[var(--line)] bg-[rgba(26,20,16,0.4)] p-8 text-center">
                <div className="mb-3 flex flex-col items-center gap-1 opacity-70">
                  <span className="pagoda-bar w-16" />
                  <span className="pagoda-bar w-10" />
                  <span className="pagoda-bar w-6" />
                </div>
                <p className="font-display text-lg text-[var(--foreground)]">
                  {place.shortName} Photography
                </p>
                <p className="mt-1 max-w-md text-xs leading-relaxed text-[var(--muted)]">
                  Visual preview pending. Place an image in{" "}
                  <code className="rounded bg-[rgba(0,0,0,0.3)] px-1.5 py-0.5 text-[var(--copper-soft)]">
                    public/images/places/
                  </code>{" "}
                  to display it here.
                </p>
              </div>
            )}
          </div>

          {/* Structured Pattern: Location, Existence, Description */}
          <div className="space-y-8">
            {/* 1. Location Block */}
            {place.locationText && (
              <section className="relative rounded-sm border border-[var(--line)] bg-[rgba(24,19,15,0.6)] p-6 sm:p-7">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(184,130,61,0.15)] text-xs text-[var(--copper)]">
                    📍
                  </span>
                  <span className="section-label text-[0.72rem] tracking-[0.24em]">
                    Location & Geography
                  </span>
                </div>
                <h2 className="mb-3 font-display text-2xl tracking-[-0.02em] text-[var(--foreground)]">
                  Where It Stands
                </h2>
                <div className="detail-copy whitespace-pre-line text-base leading-relaxed">
                  {place.locationText}
                </div>
              </section>
            )}

            {/* 2. Existence Block */}
            {place.existenceText && (
              <section className="relative rounded-sm border border-[var(--line)] bg-[rgba(24,19,15,0.6)] p-6 sm:p-7">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(184,130,61,0.15)] text-xs text-[var(--copper)]">
                    ⏳
                  </span>
                  <span className="section-label text-[0.72rem] tracking-[0.24em]">
                    Existence & Historical Roots
                  </span>
                </div>
                <h2 className="mb-3 font-display text-2xl tracking-[-0.02em] text-[var(--foreground)]">
                  Origin & Dynasty
                </h2>
                <div className="detail-copy whitespace-pre-line text-base leading-relaxed">
                  {place.existenceText}
                </div>
              </section>
            )}

            {/* 3. Description Block */}
            {place.descriptionText && (
              <section className="relative rounded-sm border border-[var(--line)] bg-[rgba(24,19,15,0.6)] p-6 sm:p-7">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(184,130,61,0.15)] text-xs text-[var(--copper)]">
                    🏛️
                  </span>
                  <span className="section-label text-[0.72rem] tracking-[0.24em]">
                    Architecture & Sacred Rituals
                  </span>
                </div>
                <h2 className="mb-3 font-display text-2xl tracking-[-0.02em] text-[var(--foreground)]">
                  Architectural Description
                </h2>
                <div className="detail-copy whitespace-pre-line text-base leading-relaxed">
                  {place.descriptionText}
                </div>
              </section>
            )}

            {/* Sub-Monuments & Key Shrines (if present) */}
            {subMonuments.length > 0 && (
              <div className="mt-12 border-t border-[var(--line)] pt-10">
                <div className="mb-6">
                  <p className="section-label mb-2">Heritage Ensemble</p>
                  <h2 className="font-display text-3xl tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
                    Monuments, Shrines & Courtyards
                  </h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Exploration guide to prominent individual structures within the complex.
                  </p>
                </div>

                <div className="grid gap-6">
                  {subMonuments.map((monument) => (
                    <div
                      key={monument.title}
                      className="overflow-hidden rounded-sm border border-[var(--line)] bg-[rgba(20,16,13,0.7)] p-5 sm:p-6"
                    >
                      {monument.image && (
                        <div className="group relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-sm border border-[var(--line)]">
                          <Image
                            src={monument.image}
                            alt={monument.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 896px) 100vw, 896px"
                          />
                          {monument.imageCaption && (
                            <div className="absolute bottom-0 inset-x-0 bg-[rgba(18,14,11,0.85)] px-3 py-1.5 text-xs text-[var(--muted)] backdrop-blur-sm">
                              {monument.imageCaption}
                            </div>
                          )}
                        </div>
                      )}

                      <h3 className="mb-3 font-display text-xl tracking-[-0.02em] text-[var(--foreground)] sm:text-2xl">
                        {monument.title}
                      </h3>
                      <div className="detail-copy whitespace-pre-line text-sm leading-relaxed text-[var(--muted)]">
                        {monument.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-[var(--line)] pt-8">
            <Link
              href={`/${districtSlug}`}
              className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-[var(--copper)] no-underline transition-colors hover:text-[var(--foreground)]"
            >
              ← Back to {place.district} Sites
            </Link>
            <Link
              href="/"
              className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-[var(--muted)] no-underline transition-colors hover:text-[var(--foreground)]"
            >
              Valley Overview ↑
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
