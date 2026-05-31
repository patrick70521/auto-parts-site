import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";

export default function CategoryGrid() {
  return (
    <section>
      <div className="container-page border-b border-border py-8">
        <h2 className="section-title">Shop By Categories</h2>
      </div>

      {categories.map((category, index) => (
        <CategoryCard
          key={category.slug}
          category={category}
          alternate={index % 2 === 1}
        />
      ))}
    </section>
  );
}
