'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // se não estiver logado, vai para login
    }
  }, [router]);

  const user = { name: 'João Silva' };
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const backupInfo = { lastBackup: '28/10/2025 02:15', status: 'Concluído' };
  const systemInfo = { version: 'v2.3.1', totalUsers: 128, openProductionOrders: 14 };

  return (
    <div className="flex-1 p-6">
      <Header title="Dashboard" />

      <div className="flex justify-center my-12">
        <img src="/logo.png" alt="Logo da empresa" className="h-24 w-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-panel rounded p-4">
          <p className="text-sm text-muted">Usuário logado</p>
          <p className="font-medium">{user.name}</p>
        </div>
        <div className="bg-panel rounded p-4">
          <p className="text-sm text-muted">Data e hora</p>
          <p className="font-medium">{currentTime ?? 'Carregando...'}</p>
        </div>
        <div className="bg-panel rounded p-4">
          <p className="text-sm text-muted">Último backup</p>
          <p className="font-medium">{backupInfo.lastBackup} ({backupInfo.status})</p>
        </div>
        <div className="bg-panel rounded p-4">
          <p className="text-sm text-muted">Versão do sistema</p>
          <p className="font-medium">{systemInfo.version}</p>
        </div>
        <div className="bg-panel rounded p-4">
          <p className="text-sm text-muted">Total de usuários</p>
          <p className="font-medium">{systemInfo.totalUsers}</p>
        </div>
        <div className="bg-panel rounded p-4">
          <p className="text-sm text-muted">Ordens de produção abertas</p>
          <p className="font-medium">{systemInfo.openProductionOrders}</p>
        </div>
      </div>
    </div>
  );
}
