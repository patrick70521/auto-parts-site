import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategorySlugs, getCategoryBySlug } from "@/data/categories";
import { site } from "@/data/site";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        <h1 className="section-title mt-4">{category.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{category.description}</p>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Subcategories</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {category.subcategories.map((subcategory) => (
              <li key={subcategory.slug} id={subcategory.slug}>
                <article className="border border-border bg-white p-4 transition hover:border-primary">
                  <h3 className="font-medium text-foreground">{subcategory.name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    Contact {site.name} for availability and fitment on{" "}
                    {subcategory.name.toLowerCase()}.
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border border-border bg-background-alt p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Request a quote for {category.name}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Share your vehicle year, make, model, and the part you need. We will
            confirm compatibility and provide pricing.
          </p>
          <Link href="/contact" className="btn-primary mt-4 inline-flex">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
