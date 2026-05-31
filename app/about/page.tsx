import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name} and our replacement auto parts sourcing support.`,
};

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="section-title">About</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{site.description}</p>

        <div className="mt-8 space-y-4 text-muted leading-relaxed">
          <p>
            {site.name} focuses on practical replacement parts for repair shops,
            resellers, and vehicle owners who need clear part information before
            ordering. Our catalog highlights common categories such as lighting,
            exterior body parts, drivetrain and engine components, cooling system
            parts, suspension and steering parts, and accessories.
          </p>
          <p>
            Because fitment matters, we recommend sending the vehicle year, make,
            model, trim, and any available OE or interchange part number with each
            inquiry. We can then help review availability and quote details before
            you commit to an order.
          </p>
          <p>
            Visit{" "}
            <a
              href={site.website}
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.website.replace(/^https?:\/\//, "")}
            </a>{" "}
            or{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              contact us
            </Link>{" "}
            for availability, quotes, and partnership inquiries.
          </p>
        </div>
      </div>
    </div>
  );
}
