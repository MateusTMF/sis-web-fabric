'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Se já estiver logado, vai direto para dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/src/page');
    }
  }, [router]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // Simula login bem-sucedido
    if (email === '' && password === '') {
      localStorage.setItem('token', 'meu-token-de-exemplo'); // salva token
      router.push('/src/page'); // vai para /dashboard
    } else {
      alert('Credenciais inválidas');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-neutral-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-neutral-800 p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 p-3 rounded-lg font-semibold transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
