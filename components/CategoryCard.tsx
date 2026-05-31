import Link from "next/link";
import type { Category } from "@/data/categories";

type CategoryCardProps = {
  category: Category;
  alternate?: boolean;
};

export default function CategoryCard({ category, alternate }: CategoryCardProps) {
  return (
    <section
      className={alternate ? "category-section-alt" : "category-section"}
    >
      <div className="container-page">
        <div className="category-section-title">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {category.name}
          </h2>
          <Link
            href={`/categories/${category.slug}`}
            className="text-sm font-semibold text-primary hover:underline"
          >
            See All
          </Link>
        </div>

        <ul className="mt-4 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
          {category.subcategories.map((subcategory) => (
            <li key={subcategory.slug} className="mb-2 break-inside-avoid">
              <Link
                href={`/categories/${category.slug}#${subcategory.slug}`}
                className="text-sm text-foreground hover:text-primary hover:underline"
              >
                {subcategory.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
