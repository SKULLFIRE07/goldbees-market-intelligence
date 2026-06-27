"use client";

import { useState } from "react";
import Section from "@/components/Section";
import { ask, AskResult } from "@/lib/ai/ask";

const DEFAULT_SUGGESTED = [
  "Which state has the highest demand for face serum?",
  "Top distributors in Maharashtra for soap",
  "Pricing for Glow Serum",
  "What is trending this week?",
  "Show me 90 day forecast for Premium Milk Soap",
  "What should I do next?",
  "Which formulations are declining?",
  "Launch order matrix",
  "Top distributors in Kerala",
  "Composite demand ranking across India",
  "Pricing for Goat Milk Soap",
  "Forecast for Karnataka",
];

function AnswerCard({ r }: { r: AskResult }) {
  return (
    <div className="border border-black mb-6">
      <div className="border-b border-black px-4 py-3">
        <div className="text-[10px] uppercase tracking-widest">Intent: {r.intent}</div>
        <div className="font-semibold text-sm mt-1">Q: {r.question}</div>
      </div>
      <div className="p-4">
        <div className="text-base font-semibold mb-3">{r.answer}</div>

        {r.bullets && (
          <ul className="list-disc pl-5 text-sm mb-4">
            {r.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {r.table && (
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-black">
                  {r.table.headers.map((h) => (
                    <th key={h} className="text-left py-2 pr-3 uppercase tracking-widest text-[10px]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.table.rows.map((row, i) => (
                  <tr key={i} className="border-b border-black">
                    {row.map((c, j) => (
                      <td key={j} className="py-2 pr-3 font-mono text-sm">
                        {String(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="border-t border-black pt-3 mt-3">
          <div className="text-[10px] uppercase tracking-widest mb-1">Why This Is Useful</div>
          <p className="text-sm leading-relaxed">{r.whyUseful}</p>
        </div>
        <div className="border-t border-black pt-2 mt-3 text-[10px] uppercase tracking-widest">
          Sources: {r.sources.join(" · ")}
        </div>
      </div>
    </div>
  );
}

export default function AskBox({
  title = "Ask The AI",
  subtitle = "Type any question about regional demand, distributors, pricing, trends, forecasts or strategy. The engine answers from the actual Goldbees data.",
  suggestions = DEFAULT_SUGGESTED,
  showHistory = true,
}: {
  title?: string;
  subtitle?: string;
  suggestions?: string[];
  showHistory?: boolean;
}) {
  const [q, setQ] = useState("");
  const [current, setCurrent] = useState<AskResult | null>(null);
  const [history, setHistory] = useState<AskResult[]>([]);

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const r = ask(trimmed);
    setCurrent(r);
    setHistory((h) => [r, ...h.filter((x) => x.question !== r.question)].slice(0, 10));
    setQ("");
  };

  return (
    <div>
      <Section title={title} subtitle={subtitle}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(q);
          }}
          className="flex gap-0"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. Which state has the highest demand for Face Serum?"
            className="flex-1 border border-black border-r-0 px-4 py-3 bg-white text-black text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="border border-black bg-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black"
          >
            Ask
          </button>
        </form>

        <div className="mt-5">
          <div className="text-[10px] uppercase tracking-widest mb-2">Suggested Questions</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => submit(s)}
                className="text-xs border border-black px-3 py-1 bg-white text-black hover:bg-black hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {current && <AnswerCard r={current} />}

      {showHistory && history.length > 1 && (
        <Section title="Recent Questions" subtitle="Click any to re-open the answer.">
          <ul className="text-sm">
            {history
              .filter((h) => h.question !== current?.question)
              .map((h, i) => (
                <li key={i} className="border-b border-black py-2 flex items-center justify-between">
                  <button onClick={() => setCurrent(h)} className="text-left underline">
                    {h.question}
                  </button>
                  <span className="text-[10px] uppercase tracking-widest">{h.intent}</span>
                </li>
              ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
