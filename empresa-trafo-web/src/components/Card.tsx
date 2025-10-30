export default function Card({ title, value, desc }: { title: string; value: string | number; desc?: string }) {
  return (
    <div className="bg-panel p-4 rounded card-shadow">
      <p className="text-sm text-muted">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
      {desc && <p className="text-sm text-muted mt-2">{desc}</p>}
    </div>
  );
}
