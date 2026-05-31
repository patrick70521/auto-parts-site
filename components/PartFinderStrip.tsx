import PartFinder from "@/components/PartFinder";

export default function PartFinderStrip() {
  return (
    <section className="finder-strip" aria-label="Find your part">
      <PartFinder variant="compact" />
    </section>
  );
}
