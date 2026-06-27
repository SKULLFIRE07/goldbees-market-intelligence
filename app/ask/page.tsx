import Section from "@/components/Section";
import AskBox from "@/components/AskBox";

export default function Page() {
  return (
    <div>
      <AskBox />

      <Section title="What This Layer Does" subtitle="How the question answering engine works.">
        <div className="grid md:grid-cols-3 gap-6 text-sm leading-relaxed">
          <div className="border border-black p-4">
            <div className="text-[10px] uppercase tracking-widest mb-2">Parses Question</div>
            <p>Detects intent (demand, pricing, distributor, trend, forecast, strategy), plus any category, region or specific product mentioned.</p>
          </div>
          <div className="border border-black p-4">
            <div className="text-[10px] uppercase tracking-widest mb-2">Pulls From Data</div>
            <p>Routes the question to the right slice of the product catalog, regional demand index, distributor database, trend signals or prediction engine.</p>
          </div>
          <div className="border border-black p-4">
            <div className="text-[10px] uppercase tracking-widest mb-2">Explains Why</div>
            <p>Every answer includes the data behind it and a short note on why the insight is useful for a growing consumer brand.</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
