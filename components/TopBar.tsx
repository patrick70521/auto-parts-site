import { site } from "@/data/site";

export default function TopBar() {
  const phone = site.phone as string;

  return (
    <div className="border-b border-border bg-secondary text-sm text-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-2">
        <p className="font-medium">Same day processing on orders placed before 10am EST</p>
        <div className="flex flex-wrap items-center gap-4">
          {site.utilityLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="hidden hover:underline sm:inline"
            >
              {phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
