import { featuredProducts } from "@/data/products";

const artClass = {
  headlight: "part-art-headlight",
  bumper: "part-art-bumper",
  pump: "part-art-pump",
} as const;

export default function FeaturedProducts() {
  return (
    <section className="border-b border-border bg-white py-8 sm:py-10">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Ready to quote
            </p>
            <h2 className="section-title mt-1">Featured Products</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            Sample high-demand categories for repair shops, resellers, and daily
            replacement orders.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.sku}
              className="overflow-hidden rounded border border-border bg-card"
            >
              <div
                className={`h-44 border-b border-border bg-background-alt ${artClass[product.tone]}`}
                aria-hidden="true"
              />
              <div className="p-4">
                <p className="text-xs font-bold text-primary">{product.sku}</p>
                <h3 className="mt-1 min-h-12 text-lg font-bold text-foreground">
                  {product.name}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted">{product.category}</p>
                    <p className="text-lg font-bold text-foreground">{product.price}</p>
                  </div>
                  <a href="/contact" className="btn-primary px-4">
                    Quote
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
