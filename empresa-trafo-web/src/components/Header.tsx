'use client';
import useStore from '../lib/useStore';
import { useRouter } from 'next/navigation';

export default function Header({ title }: { title: string }) {
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser); // função para limpar usuário no store
  const router = useRouter();

  const handleLogout = () => {
    // Limpa o usuário do store
    setUser(null);

    // Remove token do localStorage, se houver
    localStorage.removeItem('token');

    // Redireciona para login
    router.push('/login');
  };

  return (
    <header className="flex items-center justify-between border-b border-border pb-3">
      <div>
        <h1 className="text-2xl font-semibold text-text">{title}</h1>
        <p className="text-sm text-muted">Bem-vindo ao painel</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-muted hidden sm:block">
          Olá, {user?.name ?? 'Visitante'}
        </div>

        <button className="btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
