"use client"

import Link from "next/link"
import { CardEtapaSetor } from "./card-etapa-setor"
import type { OrdemProducaoDetalhes } from "@/lib/types/ordem-producao-extended"
import type { SetorProducao } from "@/lib/types/setor-producao"

interface ListaOpsSetorProps {
  setor: SetorProducao
  ops: OrdemProducaoDetalhes[]
}

export function ListaOpsSetor({ setor, ops }: ListaOpsSetorProps) {
  // Filtra apenas as OPs que têm etapas para este setor
  const opsDoSetor = ops.filter((op) => op.etapas[setor])

  if (opsDoSetor.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhuma ordem de produção para este setor no momento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {opsDoSetor.map((op) => {
        const etapa = op.etapas[setor]
        return (
          <Link key={op.id} href={`/producao/ordens-producao/${op.id}`}>
            <CardEtapaSetor
              etapa={etapa}
              numeroOP={op.numeroOP}
              projectName={op.projeto.nome || `Projeto ${op.projetoId}`}
            />
          </Link>
        )
      })}
    </div>
  )
}
