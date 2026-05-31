import Link from "next/link";
import { categories } from "@/data/categories";
import { getFullAddress, site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const address = getFullAddress();
  const phone = site.phone as string;

  return (
    <footer className="border-t-4 border-primary bg-secondary text-slate-200">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed">{site.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {site.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">
            Shop By Categories
          </p>
          <ul className="mt-4 space-y-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-sm transition hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white">
            Customer Service
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <a
                href={site.website}
                className="hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.website.replace(/^https?:\/\//, "")}
              </a>
            </li>
            {address && <li>{address}</li>}
            {phone && (
              <li>
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="hover:text-white"
                >
                  {phone}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-600">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Part availability, pricing, and fitment may vary by vehicle application.</p>
        </div>
      </div>
    </footer>
  );
}
