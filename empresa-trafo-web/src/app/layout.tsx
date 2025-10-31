import './globals.css';
import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import { redirect } from 'next/navigation';


export const metadata = {
  title: 'Empresa Trafo',
  description: 'Frontend mock - Empresa Trafo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex bg-neutral-900 text-neutral-100">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
    
  );
}
