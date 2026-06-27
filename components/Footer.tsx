export default function Footer() {
  return (
    <footer className="border-t border-ink mt-4">
      <div className="px-4 sm:px-6 lg:px-10 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center bg-ink text-paper font-display text-sm font-bold leading-none">
            G
          </span>
          <span className="eyebrow text-ink/55">
            Goldbees · Market Intelligence & Distributor Targeting
          </span>
        </div>
        <span className="text-xs text-ink/55 max-w-xl md:text-right leading-relaxed">
          Prototype build — data is illustrative pending live ingestion from Amazon, Flipkart,
          IndiaMART, JustDial &amp; Quick Commerce.
        </span>
      </div>
    </footer>
  );
}
