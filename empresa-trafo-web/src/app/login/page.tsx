'use client'; 
// Indica que este componente será renderizado no lado do cliente (Client Component) no Next.js 13+

import { useRouter } from 'next/navigation'; 
// Hook do Next.js usado para navegação programática entre páginas

import { useState } from 'react'; 
// Hook do React para gerenciar estados locais (ex: email e senha)

import useStore from '../../lib/useStore'; 
// Hook personalizado (provavelmente usando Zustand) para acessar e atualizar o estado global da aplicação

export default function LoginPage() {
  const router = useRouter(); 
  // Inicializa o roteador para permitir redirecionamento após o login

  const setUser = useStore(state => state.setUser); 
  // Obtém a função setUser do estado global, usada para armazenar o usuário logado

  const [email, setEmail] = useState('admin@trafo.com'); 
  // Estado local que armazena o valor do campo de email (valor padrão: admin@trafo.com)

  const [password, setPassword] = useState('password'); 
  // Estado local que armazena o valor do campo de senha (valor padrão: password)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault(); 
    // Impede o comportamento padrão do formulário (recarregar a página)

    // mock login: aceita qualquer credencial e define o usuário atual
    setUser({ 
      id: 'u-1', 
      name: 'Admin Trafo', 
      email, 
      profile: { id: 'p-admin', name: 'Admin' }
    });

    router.push('/dashboard'); 
    // Redireciona o usuário para a página de dashboard após o "login"
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Contêiner principal que centraliza o formulário na tela */}
      
      <form 
        onSubmit={handleLogin} 
        className="w-full max-w-md bg-panel p-6 rounded-2xl card-shadow"
      >
        {/* Formulário de login com estilização básica */}
        
        <h2 className="text-xl font-semibold mb-4">Entrar</h2>
        {/* Título do formulário */}
        
        <label className="block mb-2 text-sm text-muted">Email</label>
        <input 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="w-full mb-3 px-3 py-2 rounded bg-bg border border-gray-700" 
        />
        {/* Campo de entrada de email controlado pelo estado */}
        
        <label className="block mb-2 text-sm text-muted">Senha</label>
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="w-full mb-4 px-3 py-2 rounded bg-bg border border-gray-700" 
        />
        {/* Campo de entrada de senha controlado pelo estado */}
        
        <button 
          type="submit" 
          className="w-full py-2 bg-indigo-600 rounded"
        >
          Entrar
        </button>
        {/* Botão que aciona o handleLogin ao enviar o formulário */}
      </form>
    </div>
  );
}
