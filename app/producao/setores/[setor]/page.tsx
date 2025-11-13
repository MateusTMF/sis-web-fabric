"use client"

import { useMemo } from "react"
import { SETORES, type SetorProducao } from "@/lib/types/setor-producao"
import { ordensProducaoMockDetalhes } from "@/lib/types/ordem-producao-extended"
import { ListaOpsSetor } from "@/components/setor/lista-ops-setor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SetorPageProps {
  params: Promise<{ setor: SetorProducao }>
}

export default async function SetorPage({ params }: SetorPageProps) {
  const { setor } = await params
  const setorInfo = SETORES[setor]

  const opsDoSetor = ordensProducaoMockDetalhes.filter((op) => op.etapas[setor])
  const etapasDoSetor = opsDoSetor.map((op) => op.etapas[setor])

  const statsSetor = useMemo(() => {
    const total = etapasDoSetor.length
    const concluidas = etapasDoSetor.filter((e) => e.status === "concluida").length
    const emProgresso = etapasDoSetor.filter((e) => e.status === "em-progresso").length
    const naoIniciadas = etapasDoSetor.filter((e) => e.status === "nao-iniciada").length
    const comErro = etapasDoSetor.filter((e) => e.status === "com-erro").length

    const progressoMedio = total > 0 ? Math.round(etapasDoSetor.reduce((sum, e) => sum + e.progresso, 0) / total) : 0

    return {
      total,
      concluidas,
      emProgresso,
      naoIniciadas,
      comErro,
      progressoMedio,
    }
  }, [etapasDoSetor])

  if (!setorInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Setor não encontrado</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">{setorInfo.nome}</h1>
        <p className="text-gray-600 mt-2">{setorInfo.descricao}</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{statsSetor.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700">{statsSetor.concluidas}</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Em Progresso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-700">{statsSetor.emProgresso}</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Aguardando</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-700">{statsSetor.naoIniciadas}</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Com Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-700">{statsSetor.comErro}</p>
          </CardContent>
        </Card>
      </div>

      {/* Progresso Geral */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Geral do Setor</CardTitle>
          <CardDescription>{statsSetor.progressoMedio}% das tarefas do setor foram concluídas</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={statsSetor.progressoMedio} className="h-3" />
        </CardContent>
      </Card>

      {/* Ordens de Produção */}
      <Card>
        <CardHeader>
          <CardTitle>Ordens de Produção</CardTitle>
          <CardDescription>{opsDoSetor.length} ordem(ns) atribuída(s) para este setor</CardDescription>
        </CardHeader>
        <CardContent>
          <ListaOpsSetor setor={setor} ops={ordensProducaoMockDetalhes} />
        </CardContent>
      </Card>
    </div>
  )
}
