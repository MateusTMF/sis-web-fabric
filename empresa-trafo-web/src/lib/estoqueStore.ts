'use client';
import { create } from 'zustand';

export interface EstoqueItem {
  id: string;
  nome: string;
  sku: string;
  quantidade: number;
  unidade: string;
  local: string;
  observacoes?: string;
}

interface EstoqueState {
  itens: EstoqueItem[];
  adicionarItem: (item: EstoqueItem) => void;
  atualizarItem: (item: EstoqueItem) => void;
  removerItem: (id: string) => void;
}

const useEstoqueStore = create<EstoqueState>((set) => ({
  itens: [
    {
      id: '1',
      nome: 'Parafuso M6',
      sku: 'MAT-001',
      quantidade: 150,
      unidade: 'un',
      local: 'Almoxarifado A',
      observacoes: 'Usado em tampas metálicas'
    },
  ],

  adicionarItem: (item) =>
    set((state) => ({ itens: [...state.itens, item] })),

  atualizarItem: (item) =>
    set((state) => ({
      itens: state.itens.map((i) => (i.id === item.id ? item : i)),
    })),

  removerItem: (id) =>
    set((state) => ({ itens: state.itens.filter((i) => i.id !== id) })),
}));

export default useEstoqueStore;
