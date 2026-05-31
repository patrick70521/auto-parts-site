import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getFullAddress, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for part availability, fitment help, and quotes.`,
};

export default function ContactPage() {
  const address = getFullAddress();
  const phone = site.phone as string;

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="section-title">Contact Us</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Need a quote or help confirming fitment? Send the part name, vehicle
          year, make, model, and any part number you already have.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <article className="card-surface p-6">
              <h2 className="font-semibold text-foreground">Quote Requests</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Email inquiries are accepted anytime. Availability, pricing,
                shipping options, and fitment details are confirmed by quote.
              </p>
            </article>

            <article className="card-surface p-6">
              <h2 className="font-semibold text-foreground">Get in Touch</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>
                  <a
                    href={site.website}
                    className="text-primary hover:underline"
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
                      className="text-primary hover:underline"
                    >
                      {phone}
                    </a>
                  </li>
                )}
                <li>
                  <a href={`mailto:${site.email}`} className="text-primary hover:underline">
                    {site.email}
                  </a>
                </li>
              </ul>
            </article>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
