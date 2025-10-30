import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-panel rounded-2xl p-8 card-shadow">
        <h1 className="text-3xl font-bold mb-2">Empresa Trafo</h1>
        <p className="text-muted mb-6">Painel de controle (frontend mock — dark mode)</p>

        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 bg-indigo-600 rounded text-white">Login</Link>
          <Link href="/dashboard" className="px-4 py-2 border border-gray-700 rounded text-white">Abrir demo</Link>

        </div>
      </div>
    </div>
  );
}
