"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { places } from "@/lib/places";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return places.slice(0, 6);
    }

    return places.filter((place) => {
      const pool = `${place.name} ${place.district}`.toLowerCase();
      return pool.includes(trimmed);
    });
  }, [query]);

  return (
    <div className="rounded-[26px] border border-[var(--line)] bg-[rgba(24,20,16,0.82)] p-3 shadow-[0_0_0_1px_rgba(184,130,61,0.12)] backdrop-blur-sm">
      <label className="block text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted)]">
        Search the valley
      </label>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Find a temple, square, or stupa"
        className="mt-3 w-full border-0 bg-transparent px-0 py-2 text-base text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-0"
        aria-label="Search heritage sites"
      />

      {query.length > 0 && (
        <div className="mt-3 border-t border-[var(--line)] pt-3">
          {results.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">No matching sites yet.</p>
          ) : (
            <ul className="space-y-2">
              {results.slice(0, 6).map((place) => (
                <li key={`${place.district}-${place.slug}`}>
                  <Link
                    href={`/${place.district.toLowerCase()}/${place.slug}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-transparent px-2 py-1.5 text-sm transition-colors hover:border-[var(--copper)] hover:bg-[rgba(184,130,61,0.08)]"
                  >
                    <span className="text-[var(--foreground)]">{place.shortName}</span>
                    <span className="text-[0.64rem] uppercase tracking-[0.18em] text-[var(--copper)]">
                      {place.district}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
