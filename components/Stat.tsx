export default function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="border border-black p-4">
      <div className="text-[10px] uppercase tracking-widest">{label}</div>
      <div className="text-3xl font-semibold mt-2">{value}</div>
      {sub && <div className="text-xs mt-1">{sub}</div>}
    </div>
  );
}
