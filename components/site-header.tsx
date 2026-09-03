import Link from "next/link";

const districts = [
  { label: "Kathmandu", href: "/kathmandu" },
  { label: "Lalitpur", href: "/lalitpur" },
  { label: "Bhaktapur", href: "/bhaktapur" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(24,20,16,0.9)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-3 text-[var(--foreground)] no-underline">
          <span className="font-serif text-[1.3rem] leading-none tracking-[-0.04em]">Khaḍga &amp; Chāitya</span>
          <span className="text-[0.62rem] uppercase tracking-[0.32em] text-[var(--muted)]">Kathmandu Valley</span>
        </Link>

        <nav aria-label="District navigation" className="hidden items-center gap-2 md:flex">
          {districts.map((district) => (
            <Link
              key={district.href}
              href={district.href}
              className="group relative border border-transparent px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[var(--muted)] transition-colors duration-200 hover:border-[var(--line)] hover:text-[var(--foreground)]"
            >
              <span className="absolute inset-x-2 bottom-0 h-px origin-left scale-x-0 bg-[var(--copper)] transition-transform duration-200 group-hover:scale-x-100" />
              {district.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
