"use client";
import { useState } from "react";

interface Item {
  codigo: string;
  descricao: string;
  saldo: number;
  unidade: string;
  localizacao: string;
}

export default function ControleEstoquePage() {
  const [itens] = useState<Item[]>([
    { codigo: "MP-001", descricao: "Aço Inox 304", saldo: 120, unidade: "kg", localizacao: "A1" },
    { codigo: "MP-002", descricao: "Fita de Cobre 10mm", saldo: 45, unidade: "m", localizacao: "B2" },
    { codigo: "MP-003", descricao: "Resina Epóxi", saldo: 20, unidade: "L", localizacao: "C3" },
    { codigo: "MP-004", descricao: "Silicone Líquido", saldo: 8, unidade: "L", localizacao: "C4" },
    { codigo: "MP-005", descricao: "Chapa de Alumínio", saldo: 300, unidade: "kg", localizacao: "A2" },
    { codigo: "MP-006", descricao: "Policarbonato Transparente", saldo: 90, unidade: "kg", localizacao: "A3" },
    { codigo: "MP-007", descricao: "Fibra de Vidro", saldo: 55, unidade: "kg", localizacao: "B1" },
    { codigo: "MP-008", descricao: "Acrílico 5mm", saldo: 210, unidade: "m²", localizacao: "C1" },
    { codigo: "MP-009", descricao: "Tinta Epóxi Azul", saldo: 12, unidade: "L", localizacao: "D2" },
    { codigo: "MP-010", descricao: "Óleo Lubrificante", saldo: 35, unidade: "L", localizacao: "D1" },
    { codigo: "MP-011", descricao: "Ferro Fundido", saldo: 500, unidade: "kg", localizacao: "A4" },
    { codigo: "MP-012", descricao: "Bronze Fosforoso", saldo: 64, unidade: "kg", localizacao: "B3" },
    { codigo: "MP-013", descricao: "Teflon", saldo: 30, unidade: "kg", localizacao: "C5" },
    { codigo: "MP-014", descricao: "Chumbo Puro", saldo: 25, unidade: "kg", localizacao: "A5" },
    { codigo: "MP-015", descricao: "Aço Carbono 1020", saldo: 190, unidade: "kg", localizacao: "B4" },
    { codigo: "MP-016", descricao: "Cabo Elétrico 2,5mm", saldo: 300, unidade: "m", localizacao: "E2" },
    { codigo: "MP-017", descricao: "Cabo Elétrico 4mm", saldo: 250, unidade: "m", localizacao: "E3" },
    { codigo: "MP-018", descricao: "Parafuso Inox M6", saldo: 1200, unidade: "un", localizacao: "F1" },
    { codigo: "MP-019", descricao: "Porca Inox M6", saldo: 1300, unidade: "un", localizacao: "F2" },
    { codigo: "MP-020", descricao: "Arruela Inox M6", saldo: 900, unidade: "un", localizacao: "F3" },
    { codigo: "MP-021", descricao: "Placa de Latão", saldo: 85, unidade: "kg", localizacao: "A6" },
    { codigo: "MP-022", descricao: "Feltro Industrial", saldo: 50, unidade: "m²", localizacao: "D3" },
    { codigo: "MP-023", descricao: "Tinta PU Branca", saldo: 18, unidade: "L", localizacao: "D4" },
    { codigo: "MP-024", descricao: "Álcool Isopropílico", saldo: 9, unidade: "L", localizacao: "E1" },
    { codigo: "MP-025", descricao: "Arame Galvanizado", saldo: 110, unidade: "kg", localizacao: "G1" },
  ]);

  const [search, setSearch] = useState("");
  const [filterField, setFilterField] = useState<"codigo" | "descricao" | "localizacao" | "baixo">("descricao");
  const [itemSelecionado, setItemSelecionado] = useState<Item | null>(null);

  const itensFiltrados = itens.filter((item) => {
    if (filterField === "baixo") {
      return item.saldo < 10;
    }

    const termo = search.toLowerCase();
    const valorCampo = item[filterField].toString().toLowerCase();
    return valorCampo.includes(termo);
  });

  return (
    <div className="p-6 text-neutral-100">
      <h1 className="text-2xl font-semibold mb-6">Controle de Estoque</h1>

      {/* 🔍 Barra de Pesquisa */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={filterField === "baixo"}
          className="w-full sm:w-3/4 px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value as any)}
          className="w-full sm:w-1/4 px-3 py-2 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="descricao">Descrição</option>
          <option value="codigo">Código</option>
          <option value="localizacao">Localização</option>
          <option value="baixo">Saldo Baixo (&lt; 10)</option>
        </select>
      </div>

      {/* 📦 Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-neutral-700 bg-neutral-900 rounded-lg overflow-hidden">
          <thead className="bg-neutral-800 text-neutral-300">
            <tr>
              <th className="p-3 text-left">Código</th>
              <th className="p-3 text-left">Descrição</th>
              <th className="p-3 text-left">Saldo</th>
              <th className="p-3 text-left">Unidade</th>
              <th className="p-3 text-left">Localização</th>
            </tr>
          </thead>
          <tbody>
            {itensFiltrados.length > 0 ? (
              itensFiltrados.map((item) => (
                <tr
                  key={item.codigo}
                  onClick={() => setItemSelecionado(item)}
                  className={`border-t border-neutral-700 hover:bg-neutral-800 cursor-pointer ${
                    item.saldo < 10 ? "text-red-400" : ""
                  }`}
                >
                  <td className="p-3">{item.codigo}</td>
                  <td className="p-3">{item.descricao}</td>
                  <td className="p-3">{item.saldo}</td>
                  <td className="p-3">{item.unidade}</td>
                  <td className="p-3">{item.localizacao}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-neutral-400">
                  Nenhum item encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🧾 Modal de Detalhes */}
      {itemSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setItemSelecionado(null)}
              className="absolute top-2 right-3 text-neutral-400 hover:text-white text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Detalhes da Matéria-Prima</h2>

            <div className="space-y-3 text-sm">
              <p><strong>Código:</strong> {itemSelecionado.codigo}</p>
              <p><strong>Descrição:</strong> {itemSelecionado.descricao}</p>
              <p><strong>Saldo em Estoque:</strong> {itemSelecionado.saldo} {itemSelecionado.unidade}</p>
              <p><strong>Unidade:</strong> {itemSelecionado.unidade}</p>
              <p><strong>Localização:</strong> {itemSelecionado.localizacao}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setItemSelecionado(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
