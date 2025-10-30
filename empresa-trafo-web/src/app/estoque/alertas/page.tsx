"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AlertasReposicaoPage() {
  const router = useRouter();

  const [alertasPendentes, setAlertasPendentes] = useState([
    { codigo: "MP-004", descricao: "Tinta Epóxi Azul", saldo: 3, minimo: 10 },
    { codigo: "MP-006", descricao: "Parafuso M6", saldo: 15, minimo: 20 },
    { codigo: "MP-011", descricao: "Lubrificante Industrial", saldo: 2, minimo: 5 },
    { codigo: "MP-013", descricao: "Bucha de Nylon", saldo: 7, minimo: 15 },
    { codigo: "MP-017", descricao: "Disco de Corte 115mm", saldo: 4, minimo: 12 },
    { codigo: "MP-021", descricao: "Pano de Limpeza", saldo: 10, minimo: 25 },
    { codigo: "MP-025", descricao: "Fita Isolante", saldo: 6, minimo: 20 },
    { codigo: "MP-031", descricao: "Graxa Alta Temperatura", saldo: 8, minimo: 15 },
    { codigo: "MP-034", descricao: "Óleo Hidráulico ISO 46", saldo: 12, minimo: 20 },
    { codigo: "MP-039", descricao: "Luvas de Proteção Nitrílica", saldo: 25, minimo: 30 },
    { codigo: "MP-043", descricao: "Máscara PFF2", saldo: 18, minimo: 25 },
    { codigo: "MP-045", descricao: "Lixa Grão 120", saldo: 11, minimo: 20 },
    { codigo: "MP-052", descricao: "Estopa Industrial", saldo: 13, minimo: 25 },
    { codigo: "MP-057", descricao: "Solda MIG 0.8mm", saldo: 5, minimo: 10 },
    { codigo: "MP-060", descricao: "Spray Desengripante", saldo: 9, minimo: 15 },
  ]);

  const [alertasRepostos, setAlertasRepostos] = useState([
    { codigo: "MP-002", descricao: "Álcool Isopropílico", saldo: 30, minimo: 10 },
    { codigo: "MP-008", descricao: "Arruela de Pressão", saldo: 50, minimo: 20 },
  ]);

  const [aberto, setAberto] = useState<string | null>(null);
  const [formAberto, setFormAberto] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    quantidade: "",
    observacao: "",
  });

  const handleComNota = (codigo: string) => {
    router.push(`/reposicao/com-nota/${codigo}`);
  };

  const handleFormSubmit = (codigo: string) => {
    if (!formData.quantidade) {
      alert("Por favor, informe a quantidade reposta.");
      return;
    }

    const alerta = alertasPendentes.find((a) => a.codigo === codigo);
    if (alerta) {
      setAlertasPendentes((prev) => prev.filter((a) => a.codigo !== codigo));
      setAlertasRepostos((prev) => [
        ...prev,
        { ...alerta, saldo: Number(formData.quantidade) },
      ]);
    }

    setFormAberto(null);
    setAberto(null);
    setFormData({ quantidade: "", observacao: "" });
  };

  // Define a cor do alerta
  const getAlertaClasses = (a: { saldo: number; minimo: number }) => {
    const percentual = a.saldo / a.minimo;
    if (percentual < 0.5) {
      // vermelho para crítico
      return "border-red-700 bg-red-950/30";
    } else {
      // amarelo para próximo do mínimo
      return "border-yellow-600 bg-yellow-950/30";
    }
  };

  return (
    <div className="p-6 text-neutral-100 space-y-8">
      <h1 className="text-2xl font-semibold">Alertas de Reposição</h1>

      {/* Pendentes */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-red-500">
          ⚠️ Itens com baixo estoque
        </h2>
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          {alertasPendentes.length === 0 ? (
            <p className="text-neutral-400 text-sm italic">
              Nenhum alerta pendente.
            </p>
          ) : (
            alertasPendentes.map((a) => (
              <div key={a.codigo} className="mb-3">
                <div
                  className={`rounded-md p-4 flex justify-between items-center border ${getAlertaClasses(
                    a
                  )}`}
                >
                  <div>
                    <h3 className="text-sm font-semibold">{a.descricao}</h3>
                    <p className="text-xs text-neutral-400">
                      Código: {a.codigo} | Saldo: {a.saldo} | Mínimo: {a.minimo}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setAberto(aberto === a.codigo ? null : a.codigo);
                      setFormAberto(null);
                    }}
                    className="bg-red-700 hover:bg-red-800 px-3 py-1.5 rounded text-sm font-medium"
                  >
                    {aberto === a.codigo ? "Fechar" : "Repor"}
                  </button>
                </div>

                {aberto === a.codigo && (
                  <div className="bg-neutral-800/40 border border-neutral-700 border-t-0 rounded-b-md px-4 py-3 text-sm text-neutral-300">
                    {formAberto === a.codigo ? (
                      <div>
                        <p className="mb-2 font-medium">
                          Reposição manual (sem nota fiscal)
                        </p>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs mb-1 text-neutral-400">
                              Quantidade reposta
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={formData.quantidade}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  quantidade: e.target.value,
                                })
                              }
                              className="bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-sm w-full text-neutral-100"
                            />
                          </div>
                          <div>
                            <label className="block text-xs mb-1 text-neutral-400">
                              Observações (opcional)
                            </label>
                            <textarea
                              value={formData.observacao}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  observacao: e.target.value,
                                })
                              }
                              className="bg-neutral-800 border border-neutral-600 rounded px-2 py-1 text-sm w-full text-neutral-100"
                              rows={2}
                            />
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleFormSubmit(a.codigo)}
                              className="bg-green-700 hover:bg-green-800 px-3 py-1.5 rounded text-sm font-medium"
                            >
                              ✅ Confirmar Reposição
                            </button>
                            <button
                              onClick={() => setFormAberto(null)}
                              className="bg-neutral-700 hover:bg-neutral-800 px-3 py-1.5 rounded text-sm"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-2 font-medium">
                          Escolha o tipo de reposição:
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleComNota(a.codigo)}
                            className="bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded text-sm"
                          >
                            📄 Com Nota Fiscal
                          </button>
                          <button
                            onClick={() => setFormAberto(a.codigo)}
                            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1.5 rounded text-sm"
                          >
                            📦 Sem Nota Fiscal
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Já repostos */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-green-500">
          ✅ Itens já repostos
        </h2>
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
          {alertasRepostos.length === 0 ? (
            <p className="text-neutral-400 text-sm italic">
              Nenhum item foi reposto ainda.
            </p>
          ) : (
            alertasRepostos.map((a) => (
              <div
                key={a.codigo}
                className="border border-green-700 bg-green-950/30 rounded-md p-4 mb-3 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-sm font-semibold">{a.descricao}</h3>
                  <p className="text-xs text-neutral-400">
                    Código: {a.codigo} | Saldo: {a.saldo} | Mínimo: {a.minimo}
                  </p>
                </div>
                <span className="text-xs font-medium text-green-400">
                  Reposição concluída
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
