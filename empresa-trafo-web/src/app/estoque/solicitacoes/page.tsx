"use client";
import { useState } from "react";

export default function SolicitacoesInternasPage() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarCheckin, setMostrarCheckin] = useState<null | number>(null);
  const [detalheAberto, setDetalheAberto] = useState<null | number>(null);
  const [pesquisa, setPesquisa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todas");

  const [solicitacoes, setSolicitacoes] = useState([
    {
      id: 1,
      setor: "Manutenção",
      responsavel: "Carlos Silva",
      lote: "L001",
      relacaoOrdemProducao: "OP-200",
      observacao: "Urgente",
      status: "pendente",
      itens: [
        { codigo: "MAT-001", descricao: "Parafusos 10mm", quantidade: "50", entregue: "" },
        { codigo: "MAT-013", descricao: "Porcas 10mm", quantidade: "50", entregue: "" },
      ],
    },
    {
      id: 2,
      setor: "Produção",
      responsavel: "Ana Souza",
      lote: "L002",
      relacaoOrdemProducao: "OP-250",
      observacao: "Sem urgência",
      status: "concluida",
      itens: [
        { codigo: "MAT-002", descricao: "Chapas de aço", quantidade: "10", entregue: "10" },
        { codigo: "MAT-003", descricao: "Tinta industrial", quantidade: "5", entregue: "5" },
      ],
    },
  ]);

  const [novaSolicitacao, setNovaSolicitacao] = useState({
    setor: "",
    responsavel: "",
    lote: "",
    relacaoOrdemProducao: "",
    observacao: "",
    itens: [{ codigo: "", descricao: "", quantidade: "" }],
  });

  const [checkinItens, setCheckinItens] = useState<
    { codigo: string; entregue: string }[]
  >([]);

  // Adicionar e remover itens da nova solicitação
  const handleAdicionarItem = () => {
    setNovaSolicitacao({
      ...novaSolicitacao,
      itens: [...novaSolicitacao.itens, { codigo: "", descricao: "", quantidade: "" }],
    });
  };

  const handleRemoverItem = (index: number) => {
    const novosItens = novaSolicitacao.itens.filter((_, i) => i !== index);
    setNovaSolicitacao({ ...novaSolicitacao, itens: novosItens });
  };

  const handleItemChange = (index: number, campo: string, valor: string) => {
    const novosItens = [...novaSolicitacao.itens];
    novosItens[index][campo] = valor;
    setNovaSolicitacao({ ...novaSolicitacao, itens: novosItens });
  };

  // Criar nova solicitação
  const handleSubmit = () => {
    const nova = {
      ...novaSolicitacao,
      id: solicitacoes.length + 1,
      status: "pendente",
      itens: novaSolicitacao.itens.map((i) => ({ ...i, entregue: "" })),
    };
    setSolicitacoes([...solicitacoes, nova]);
    setNovaSolicitacao({
      setor: "",
      responsavel: "",
      lote: "",
      relacaoOrdemProducao: "",
      observacao: "",
      itens: [{ codigo: "", descricao: "", quantidade: "" }],
    });
    setMostrarFormulario(false);
  };

  // Check-in
  const abrirCheckin = (id: number) => {
    const solicitacao = solicitacoes.find((s) => s.id === id);
    if (!solicitacao) return;
    const itensCheck = solicitacao.itens.map((i) => ({
      codigo: i.codigo,
      entregue: i.entregue || "",
    }));
    setCheckinItens(itensCheck);
    setMostrarCheckin(id);
  };

  const handleEntregueChange = (codigo: string, valor: string) => {
    setCheckinItens((prev) =>
      prev.map((i) => (i.codigo === codigo ? { ...i, entregue: valor } : i))
    );
  };

  const handleFinalizarCheckin = (id: number) => {
    setSolicitacoes((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "concluida",
              itens: s.itens.map((i) => ({
                ...i,
                entregue:
                  checkinItens.find((ci) => ci.codigo === i.codigo)?.entregue || i.entregue,
              })),
            }
          : s
      )
    );
    setCheckinItens([]);
    setMostrarCheckin(null);
  };

  const solicitacoesFiltradas = solicitacoes.filter((s) => {
    const pesquisaLower = pesquisa.toLowerCase();
    const correspondePesquisa =
      s.setor.toLowerCase().includes(pesquisaLower) ||
      s.responsavel.toLowerCase().includes(pesquisaLower) ||
      s.lote.toLowerCase().includes(pesquisaLower) ||
      s.relacaoOrdemProducao.toLowerCase().includes(pesquisaLower) ||
      s.itens.some(
        (i) =>
          i.codigo.toLowerCase().includes(pesquisaLower) ||
          i.descricao.toLowerCase().includes(pesquisaLower)
      );
    const correspondeStatus =
      filtroStatus === "todas" || s.status === filtroStatus;
    return correspondePesquisa && correspondeStatus;
  });

  return (
    <div className="p-6 text-neutral-100 relative">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Solicitações Internas de Materiais</h1>
        <button
          onClick={() => setMostrarFormulario(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Nova Solicitação
        </button>
      </div>

      {/* Pesquisa e filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm w-full md:w-1/2 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
        />
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm w-full md:w-1/4"
        >
          <option value="todas">Todas</option>
          <option value="pendente">Pendentes</option>
          <option value="concluida">Concluídas</option>
        </select>
      </div>

      {/* Tabela responsiva */}
      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Solicitações</h2>

        {/* Tabela (desktop) */}
        <div className="hidden md:block">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-neutral-400 border-b border-neutral-700">
              <tr>
                <th className="py-2">Setor</th>
                <th className="py-2">Responsável</th>
                <th className="py-2">Lote</th>
                <th className="py-2">Ordem Prod.</th>
                <th className="py-2">Status</th>
                <th className="py-2 text-center w-[130px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {solicitacoesFiltradas.map((s) => (
                <>
                  <tr
                    key={s.id}
                    className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors cursor-pointer"
                    onClick={() =>
                      setDetalheAberto(detalheAberto === s.id ? null : s.id)
                    }
                  >
                    <td className="py-2 align-middle">{s.setor}</td>
                    <td className="py-2 align-middle">{s.responsavel}</td>
                    <td className="py-2 align-middle">{s.lote}</td>
                    <td className="py-2 align-middle">{s.relacaoOrdemProducao}</td>
                    <td
                      className={`py-2 align-middle font-medium ${
                        s.status === "pendente" ? "text-yellow-400" : "text-green-400"
                      }`}
                    >
                      {s.status === "pendente" ? "Pendente" : "Concluída"}
                    </td>
                    <td className="py-2 text-center align-middle">
                      {s.status === "pendente" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            abrirCheckin(s.id);
                          }}
                          className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                        >
                          Atender
                        </button>
                      )}
                    </td>
                  </tr>

                  {detalheAberto === s.id && (
                    <tr>
                      <td colSpan={6} className="bg-neutral-800/30 p-4">
                        <p className="text-sm mb-2">
                          <strong>Observação:</strong> {s.observacao || "Nenhuma"}
                        </p>
                        <p className="text-sm mb-2">
                          <strong>Ordem de Produção:</strong>{" "}
                          {s.relacaoOrdemProducao}
                        </p>
                        <h4 className="font-semibold text-neutral-200 mt-2 mb-1">
                          Itens:
                        </h4>
                        <ul className="list-disc ml-6 text-sm">
                          {s.itens.map((i, idx) => (
                            <li key={idx}>
                              <strong>{i.codigo}</strong> - {i.descricao} —{" "}
                              {i.quantidade} un.
                              {s.status === "concluida" && i.entregue && (
                                <span className="text-green-400">
                                  {" "}
                                  (Entregue: {i.entregue})
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards (mobile) */}
        <div className="flex flex-col gap-4 md:hidden">
          {solicitacoesFiltradas.map((s) => (
            <div
              key={s.id}
              className="border border-neutral-700 rounded-lg p-4 bg-neutral-800"
              onClick={() =>
                setDetalheAberto(detalheAberto === s.id ? null : s.id)
              }
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-base">{s.setor}</h3>
                {s.status === "pendente" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      abrirCheckin(s.id);
                    }}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-xs font-medium"
                  >
                    Atender
                  </button>
                )}
              </div>
              <p className="text-sm text-neutral-300">
                <strong>Responsável:</strong> {s.responsavel}
              </p>
              <p className="text-sm text-neutral-300">
                <strong>Lote:</strong> {s.lote}
              </p>
              <p className="text-sm text-neutral-300">
                <strong>Ordem Prod.:</strong> {s.relacaoOrdemProducao}
              </p>
              <p
                className={`text-sm mt-2 font-medium ${
                  s.status === "pendente" ? "text-yellow-400" : "text-green-400"
                }`}
              >
                {s.status === "pendente" ? "Pendente" : "Concluída"}
              </p>

              {detalheAberto === s.id && (
                <div className="mt-3 text-sm">
                  <p>
                    <strong>Observação:</strong> {s.observacao || "Nenhuma"}
                  </p>
                  <h4 className="font-semibold mt-2 mb-1">Itens:</h4>
                  <ul className="list-disc ml-5">
                    {s.itens.map((i, idx) => (
                      <li key={idx}>
                        {i.codigo} - {i.descricao} ({i.quantidade} un)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAIS */}
      {mostrarFormulario && (
        <ModalNovaSolicitacao
          onClose={() => setMostrarFormulario(false)}
          novaSolicitacao={novaSolicitacao}
          setNovaSolicitacao={setNovaSolicitacao}
          handleAdicionarItem={handleAdicionarItem}
          handleRemoverItem={handleRemoverItem}
          handleItemChange={handleItemChange}
          handleSubmit={handleSubmit}
        />
      )}

      {mostrarCheckin && (
        <ModalCheckin
          solicitacao={solicitacoes.find((s) => s.id === mostrarCheckin)!}
          checkinItens={checkinItens}
          handleEntregueChange={handleEntregueChange}
          handleFinalizarCheckin={handleFinalizarCheckin}
          onClose={() => setMostrarCheckin(null)}
        />
      )}
    </div>
  );
}

/* ---------------------- MODAL NOVA SOLICITAÇÃO ---------------------- */
function ModalNovaSolicitacao({
  onClose,
  novaSolicitacao,
  setNovaSolicitacao,
  handleAdicionarItem,
  handleRemoverItem,
  handleItemChange,
  handleSubmit,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-neutral-400 hover:text-neutral-200"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Nova Solicitação</h2>

        {/* Campos principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["setor", "responsavel", "lote", "relacaoOrdemProducao"].map(
            (key) => (
              <div key={key} className="flex flex-col">
                <label className="text-sm text-neutral-400 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  value={(novaSolicitacao as any)[key]}
                  onChange={(e) =>
                    setNovaSolicitacao({
                      ...novaSolicitacao,
                      [key]: e.target.value,
                    })
                  }
                  className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
              </div>
            )
          )}
        </div>

        {/* Observação */}
        <div className="mt-4">
          <label className="text-sm text-neutral-400 mb-1 block">Observação</label>
          <textarea
            value={novaSolicitacao.observacao}
            onChange={(e) =>
              setNovaSolicitacao({
                ...novaSolicitacao,
                observacao: e.target.value,
              })
            }
            className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm w-full focus:ring-1 focus:ring-neutral-500 focus:outline-none"
          />
        </div>

        {/* Itens da solicitação */}
        <h3 className="text-md font-semibold mt-6 mb-2">Itens Solicitados</h3>
        {novaSolicitacao.itens.map((item: any, index: number) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2 items-end"
          >
            <input
              placeholder="Código"
              value={item.codigo}
              onChange={(e) => handleItemChange(index, "codigo", e.target.value)}
              className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
            />
            <input
              placeholder="Descrição"
              value={item.descricao}
              onChange={(e) =>
                handleItemChange(index, "descricao", e.target.value)
              }
              className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm md:col-span-2"
            />
            <input
              placeholder="Qtd"
              type="number"
              value={item.quantidade}
              onChange={(e) =>
                handleItemChange(index, "quantidade", e.target.value)
              }
              className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
            />
            {novaSolicitacao.itens.length > 1 && (
              <button
                onClick={() => handleRemoverItem(index)}
                className="text-red-400 text-xs hover:underline md:col-span-full"
              >
                Remover
              </button>
            )}
          </div>
        ))}

        {/* Botões do modal */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAdicionarItem}
            className="text-blue-400 text-sm hover:underline"
          >
            + Adicionar Item
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Enviar Solicitação
          </button>
        </div>
      </div>
    </div>
  );
}


/* ---------------------- MODAL DE CHECK-IN (ATENDER) ---------------------- */
function ModalCheckin({
  solicitacao,
  checkinItens,
  handleEntregueChange,
  handleFinalizarCheckin,
  onClose,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-neutral-400 hover:text-neutral-200"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">
          Atender Solicitação #{solicitacao.id}
        </h2>

        <div className="text-sm mb-4">
          <p>
            <strong>Setor:</strong> {solicitacao.setor}
          </p>
          <p>
            <strong>Responsável:</strong> {solicitacao.responsavel}
          </p>
          <p>
            <strong>Lote:</strong> {solicitacao.lote}
          </p>
          <p>
            <strong>Ordem de Produção:</strong>{" "}
            {solicitacao.relacaoOrdemProducao}
          </p>
        </div>

        <h3 className="font-semibold mb-2 text-neutral-200">Itens da Solicitação</h3>
        <div className="space-y-3">
          {solicitacao.itens.map((item: any, index: number) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between bg-neutral-800 rounded-lg p-3"
            >
              <div>
                <p className="font-medium text-neutral-100">{item.descricao}</p>
                <p className="text-neutral-400 text-sm">
                  Código: {item.codigo} | Solicitado: {item.quantidade} un.
                </p>
              </div>
              <div className="mt-2 md:mt-0 flex items-center gap-2">
                <label className="text-sm text-neutral-400">Entregue:</label>
                <input
                  type="number"
                  min="0"
                  value={
                    checkinItens.find((ci: any) => ci.codigo === item.codigo)
                      ?.entregue || ""
                  }
                  onChange={(e) =>
                    handleEntregueChange(item.codigo, e.target.value)
                  }
                  className="bg-neutral-700 border border-neutral-600 rounded-md px-2 py-1 text-sm w-24 text-right focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-md text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleFinalizarCheckin(solicitacao.id)}
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md text-sm font-medium"
          >
            Finalizar e Marcar como Concluída
          </button>
        </div>
      </div>
    </div>
  );
}
