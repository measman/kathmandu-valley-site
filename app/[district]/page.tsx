import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/site-header";
import { districtData, getDistrictBySlug, getDistrictIntro, places } from "@/lib/places";

export async function generateStaticParams() {
  return ["kathmandu", "lalitpur", "bhaktapur"].map((slug) => ({ district: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ district: string }>;
}): Promise<Metadata> {
  const { district } = await params;
  const districtName = getDistrictBySlug(district);

  if (!districtName) {
    return { title: "District not found" };
  }

  return {
    title: `${districtName} | Kathmandu Valley Heritage Guide`,
    description: getDistrictIntro(districtName),
    openGraph: {
      title: `${districtName} | Kathmandu Valley Heritage Guide`,
      description: getDistrictIntro(districtName),
      type: "website",
    },
  };
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ district: string }>;
}) {
  const { district } = await params;
  const districtName = getDistrictBySlug(district);

  if (!districtName) {
    notFound();
  }

  const districtPlaces = places.filter((place) => place.district === districtName);

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-[var(--copper)]">
          <Link href="/" className="text-[var(--copper)] no-underline hover:text-[var(--foreground)]">
            Home
          </Link>
          <span>/</span>
          <span>{districtName}</span>
        </div>

        <header className="mb-10 border-b border-[var(--line)] pb-8">
          <p className="section-label mb-3">District guide</p>
          <h1 className="font-display text-5xl tracking-[-0.05em] text-[var(--foreground)] sm:text-6xl">
            {districtName}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-7 text-[var(--muted)]">
            {getDistrictIntro(districtName)}
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {districtPlaces.map((place) => (
            <article key={place.id} className="site-card">
              {place.image ? (
                <div className="relative mb-5 aspect-[16/10] overflow-hidden">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              ) : null}

              <div className="mb-4 flex items-center justify-between gap-2 text-[0.64rem] uppercase tracking-[0.2em] text-[var(--copper)]">
                <span>{place.district}</span>
                <span className="opacity-70">{place.stats[0] ?? "Landmark"}</span>
              </div>

              <h2 className="font-display text-3xl leading-[1.05] tracking-[-0.04em] text-[var(--foreground)]">
                {place.shortName}
              </h2>

              <p className="mt-4 flex-1 text-sm leading-6 text-[var(--muted)]">{place.summary}</p>

              <Link
                href={`/${district}/${place.slug}`}
                className="mt-6 inline-flex items-center text-[0.68rem] uppercase tracking-[0.22em] text-[var(--copper)] no-underline transition-colors hover:text-[var(--foreground)]"
              >
                Read site
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
