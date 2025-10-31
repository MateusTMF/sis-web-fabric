"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from '../../../components/Header';

export default function MateriasPrimasPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // se não estiver logado, vai para login
    }
  }, [router]);



  const [form, setForm] = useState({
    codigo: "",
    descricao: "",
    unidade: "",
    categoria: "",
    ncm: "",
    cfop: "",
    pesoBruto: "",
    pesoLiquido: "",
    estoqueMinimo: "",
    estoqueMaximo: "",
    localizacao: "",
    fornecedor: "",
  });

  return (
    <div className="p-6 text-neutral-100">
      <Header title="Dashboard" />

      <h1 className="text-2xl font-semibold mb-6">Cadastro de Matérias-Primas e Insumos</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-neutral-900 p-6 rounded-xl border border-neutral-700">
        {Object.entries(form).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm text-neutral-400 mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-neutral-500 focus:outline-none"
            />
          </div>
        ))}
        <div className="col-span-full flex justify-end mt-4">
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
