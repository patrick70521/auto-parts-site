import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import PartFinder from "@/components/PartFinder";
import { categories } from "@/data/categories";
import { site } from "@/data/site";

export default function HomePage() {
  const quickCategories = categories.slice(0, 6);

  return (
    <>
      <section className="border-b border-border bg-background-alt py-6 sm:py-8">
        <div className="container-page grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded border border-border bg-white p-4">
            <h2 className="text-lg font-bold text-foreground">Popular Categories</h2>
            <nav className="mt-3 divide-y divide-border">
              {quickCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="flex items-center justify-between gap-3 py-3 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>{category.name}</span>
                  <span aria-hidden="true">›</span>
                </Link>
              ))}
            </nav>
          </aside>

          <div className="grid gap-5">
            <section className="grid overflow-hidden rounded border border-border bg-secondary text-white lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-red-200">
                  Wholesale ready auto parts
                </p>
                <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
                  Replacement parts for daily repair work
                </h1>
                <p className="mt-4 max-w-2xl leading-relaxed text-slate-200">
                  {site.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    Request a Quote
                  </Link>
                  <Link
                    href="/categories/vehicle-lighting"
                    className="inline-flex items-center justify-center rounded border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Shop Lighting
                  </Link>
                </div>
              </div>
              <div className="relative min-h-56 overflow-hidden bg-slate-800">
                <div className="hero-part hero-part-lamp" />
                <div className="hero-part hero-part-rotor" />
                <div className="hero-part hero-part-pump" />
              </div>
            </section>

            <PartFinder variant="hero" />
          </div>
        </div>
      </section>

      <CategoryGrid />
      <FeaturedProducts />

      <section className="category-section-alt">
        <div className="container-page">
          <h2 className="section-title text-center">
            Why Choose {site.name}?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.trustPoints.map((point) => (
              <article
                key={point.title}
                className="border border-border bg-white p-4 text-center"
              >
                <h3 className="font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-8">
        <div className="container-page flex flex-col items-start justify-between gap-4 border border-border bg-background-alt p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Need help finding the right part?
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted">
              Contact us with your year, make, model, and part number for fitment
              confirmation and a quote.
            </p>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
