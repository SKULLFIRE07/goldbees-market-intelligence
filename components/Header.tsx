import Link from "next/link";

export default function Header() {
  return (
    <header className="hidden md:flex border-b border-black px-8 py-4 items-center justify-between gap-6 sticky top-0 z-10 bg-white">
      <div>
        <div className="text-xs uppercase tracking-widest">AI Distributor Targeting Solution</div>
        <div className="text-lg font-semibold">Goldbees - Prototype</div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/ask"
          className="text-xs uppercase tracking-widest border border-black px-3 py-2 bg-black text-white hover:bg-white hover:text-black"
        >
          Ask The AI
        </Link>
        <span className="border border-black px-2 py-1 uppercase tracking-widest text-xs">Prototype Build</span>
      </div>
    </header>
  );
}
