export default function Footer() {
  return (
    <footer className="border-t border-black px-4 md:px-8 py-6 text-[10px] uppercase tracking-widest flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <span>Goldbees · Market Intelligence & Distributor Targeting</span>
      <span className="normal-case tracking-normal text-xs">
        Prototype build · data is illustrative pending live ingestion from Amazon, Flipkart, IndiaMART, JustDial & Quick Commerce.
      </span>
    </footer>
  );
}
