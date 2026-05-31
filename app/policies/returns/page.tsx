import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Returns & Warranty",
  description: `Returns and warranty request information for ${site.name}.`,
};

export default function ReturnsPolicyPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="section-title">Returns & Warranty</h1>
        <p className="mt-4 text-muted">
          Return and warranty eligibility depends on the item, condition,
          supplier requirements, and order details. Contact us before sending any
          item back so we can review the request and provide next steps.
        </p>

        <div className="prose-policy mt-10 space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Return Requests</h2>
            <p className="mt-3">
              To request a return, email us with your order details, part number,
              reason for return, and photos of the item and packaging when
              applicable. Items generally need to be new, unused, uninstalled,
              and in original packaging to be considered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Fitment Review</h2>
            <p className="mt-3">
              Please confirm fitment before installation. Installed, modified,
              painted, damaged, or special-order parts may not be eligible for
              return depending on the supplier and item condition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Shipping Damage</h2>
            <p className="mt-3">
              If an item arrives damaged, keep the packaging and contact us as
              soon as possible with photos. Carrier claim timing can affect
              whether a replacement or claim review is available.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Start a Request
            </h2>
            <p className="mt-3">
              Email{" "}
              <a href={`mailto:${site.email}`} className="text-primary hover:underline">
                {site.email}
              </a>{" "}
              with your order information, vehicle details, part details, and
              photos if applicable.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
