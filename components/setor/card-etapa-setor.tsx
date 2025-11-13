"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { EtapaProducao } from "@/lib/types/setor-producao"

interface CardEtapaSetorProps {
  etapa: EtapaProducao
  numeroOP: string
  projectName: string
}

export function CardEtapaSetor({ etapa, numeroOP, projectName }: CardEtapaSetorProps) {
  const statusMap = {
    "nao-iniciada": { label: "Não Iniciada", color: "bg-gray-100 text-gray-800" },
    "em-progresso": { label: "Em Progresso", color: "bg-blue-100 text-blue-800" },
    pausada: { label: "Pausada", color: "bg-yellow-100 text-yellow-800" },
    concluida: { label: "Concluída", color: "bg-green-100 text-green-800" },
    "com-erro": { label: "Com Erro", color: "bg-red-100 text-red-800" },
  }

  const status = statusMap[etapa.status]
  const horasEstimadas = Math.round(etapa.tempoEstimado / 60)
  const horasReais = etapa.tempoReal ? Math.round(etapa.tempoReal / 60) : null

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{numeroOP}</CardTitle>
            <CardDescription>{projectName}</CardDescription>
          </div>
          <Badge className={status.color}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Progresso</span>
            <span className="text-gray-600">{etapa.progresso}%</span>
          </div>
          <Progress value={etapa.progresso} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Tempo Estimado</span>
            <p className="font-semibold">{horasEstimadas}h</p>
          </div>
          {horasReais && (
            <div>
              <span className="text-gray-600">Tempo Real</span>
              <p className="font-semibold">{horasReais}h</p>
            </div>
          )}
        </div>

        {etapa.dataInicio && (
          <div className="text-xs text-gray-600">
            Iniciado em: {new Date(etapa.dataInicio).toLocaleDateString("pt-BR")}
          </div>
        )}

        {etapa.observacoes && (
          <div className="bg-gray-50 p-3 rounded text-sm">
            <p className="text-gray-700">{etapa.observacoes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
