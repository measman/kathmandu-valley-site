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

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-[var(--copper)]">
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

        <article className="page-panel p-6 sm:p-8 lg:p-10">
          {place.image ? (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden">
              <Image
                src={place.image}
                alt={place.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          ) : null}

          <div className="mb-8 border-b border-[var(--line)] pb-6">
            <p className="section-label mb-3">Heritage site</p>
            <h1 className="font-display text-4xl tracking-[-0.05em] text-[var(--foreground)] sm:text-5xl">
              {place.name}
            </h1>
          </div>

          {place.stats.length > 0 ? (
            <div className="mb-8 flex flex-wrap gap-3">
              {place.stats.map((stat) => (
                <span
                  key={stat}
                  className="inline-flex items-center rounded-full border border-[var(--line)] bg-[rgba(184,130,61,0.08)] px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.18em] text-[var(--foreground)]"
                >
                  {stat}
                </span>
              ))}
            </div>
          ) : null}

          <div className="space-y-6">
            {place.sections.map((section) => (
              <section key={`${place.id}-${section.title}`}>
                <h2 className="mb-3 font-display text-2xl tracking-[-0.03em] text-[var(--foreground)]">
                  {section.title}
                </h2>
                <p className="detail-copy whitespace-pre-line">{section.content}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
