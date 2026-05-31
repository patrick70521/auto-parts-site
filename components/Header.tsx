"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="container-page flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-primary text-sm font-bold text-white">
            {site.shortName}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold text-foreground sm:text-lg">
              {site.name}
            </span>
            <span className="hidden text-xs text-muted sm:block">
              Automotive Parts & Supply
            </span>
          </span>
        </Link>

        <form className="order-3 flex w-full overflow-hidden rounded border-2 border-primary bg-white lg:order-2 lg:max-w-xl">
          <input
            type="search"
            aria-label="Search auto parts"
            placeholder="Search by part name, SKU, or keyword"
            className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            Search
          </button>
        </form>

        <div className="order-2 flex items-center gap-3 lg:order-3">
          <a
            href={`mailto:${site.email}`}
            className="hidden text-right text-xs text-muted xl:block"
          >
            <span className="block font-semibold text-foreground">Need fitment help?</span>
            <span>{site.email}</span>
          </a>
          <Link
            href="/contact"
            className="hidden rounded border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary sm:inline-flex"
          >
            Quote
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-border p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className="hidden border-t border-border md:block">
        <nav className="container-page flex items-center">
          {site.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b-2 px-4 py-4 text-sm font-medium transition ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground hover:border-border hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-card md:hidden">
          <div className="container-page flex flex-col py-2">
            {site.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border px-2 py-3 text-sm font-medium text-foreground last:border-0 hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
