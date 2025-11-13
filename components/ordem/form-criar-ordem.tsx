"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import type { ProjetoTecnico } from "@/lib/types/projeto"
import type { OrdemProducaoDetalhes } from "@/lib/types/ordem-producao-extended"
import { SETORES } from "@/lib/types/setor-producao"

interface FormCriarOrdemProps {
  projetos: ProjetoTecnico[]
  onSalvar: (ordem: OrdemProducaoDetalhes) => void
}

export function FormCriarOrdem({ projetos, onSalvar }: FormCriarOrdemProps) {
  const [selectedProjetoId, setSelectedProjetoId] = useState<string>("")
  const [projetoSelecionado, setProjetoSelecionado] = useState<ProjetoTecnico | null>(null)
  const [ordem, setOrdem] = useState<Partial<OrdemProducaoDetalhes>>({
    status: "aguardando",
    progresso: 0,
    prioridade: "normal",
  })

  const handleSelectProjeto = (projetoId: string) => {
    setSelectedProjetoId(projetoId)
    const projeto = projetos.find((p) => p.id === projetoId)
    setProjetoSelecionado(projeto || null)
    setOrdem((prev) => ({
      ...prev,
      projetoId,
      projeto: projeto!,
    }))
  }

  const handleInputChange = (field: string, value: any) => {
    setOrdem((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSalvar = () => {
    if (!projetoSelecionado || !ordem.dataPrazo) {
      alert("Selecione um projeto e defina a data de prazo")
      return
    }

    // Criar etapas iniciais para cada setor
    const etapas = Object.values(SETORES).reduce(
      (acc, setor) => {
        acc[setor.nome.toLowerCase().replace(/ /g, "-")] = {
          id: `etapa-${setor.ordem}`,
          setor: setor.nome.toLowerCase().replace(/ /g, "-"),
          status: "nao-iniciada",
          progresso: 0,
          observacoes: "",
          tempoEstimado:
            setor.ordem === 1
              ? 480
              : setor.ordem === 2
                ? 360
                : setor.ordem === 3
                  ? 720
                  : setor.ordem === 4
                    ? 480
                    : setor.ordem === 5
                      ? 240
                      : 360,
        }
        return acc
      },
      {} as Record<string, any>,
    )

    const novaOrdem: OrdemProducaoDetalhes = {
      id: `op-${Date.now()}`,
      numeroOP: `OP-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
      dataCriacao: new Date().toISOString(),
      dataPrazo: ordem.dataPrazo,
      projetoId: projetoSelecionado.id,
      projeto: projetoSelecionado,
      status: "aguardando",
      progresso: 0,
      prioridade: (ordem.prioridade as any) || "normal",
      etapas: etapas as any,
      observacoes: ordem.observacoes || "",
      anotacoes: [],
    }

    onSalvar(novaOrdem)
  }

  return (
    <div className="w-full space-y-6">
      {/* Seleção de Projeto */}
      <Card>
        <CardHeader>
          <CardTitle>Selecionar Projeto</CardTitle>
          <CardDescription>Escolha um projeto existente para criar a ordem de produção</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="projeto">Projeto</Label>
          <Select value={selectedProjetoId} onValueChange={handleSelectProjeto}>
            <SelectTrigger id="projeto">
              <SelectValue placeholder="Selecione um projeto" />
            </SelectTrigger>
            <SelectContent>
              {projetos.map((projeto) => (
                <SelectItem key={projeto.id} value={projeto.id}>
                  {projeto.numero} - {projeto.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Visualização do Projeto Selecionado */}
      {projetoSelecionado && (
        <Card className="bg-muted/50 border border-border">
          <CardHeader>
            <CardTitle>Detalhes do Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Potência</p>
                <p className="font-semibold">{projetoSelecionado.potencia} kVA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Classe</p>
                <p className="font-semibold">{projetoSelecionado.classe} kV</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fases</p>
                <p className="font-semibold">{projetoSelecionado.fases} F</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Frequência</p>
                <p className="font-semibold">{projetoSelecionado.frequencia} Hz</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">AT</p>
                <p className="font-semibold">{projetoSelecionado.tensaoATPrimaria}V</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BT</p>
                <p className="font-semibold">{projetoSelecionado.tensaoBT}V</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo</p>
                <p className="font-semibold">{projetoSelecionado.tipoTransformador}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dados da Ordem - Simplificado */}
      <Card>
        <CardHeader>
          <CardTitle>Dados da Ordem de Produção</CardTitle>
          <CardDescription>Informações gerais da ordem para toda a fábrica</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dataPrazo">Data de Prazo</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dataPrazo"
                  type="date"
                  className="pl-9"
                  onChange={(e) => handleInputChange("dataPrazo", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select value={ordem.prioridade || ""} onValueChange={(v) => handleInputChange("prioridade", v)}>
                <SelectTrigger id="prioridade">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="observacoes">Observações Gerais</Label>
            <Textarea
              id="observacoes"
              placeholder="Digite observações gerais sobre a ordem de produção..."
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              className="h-24"
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSalvar} className="w-full" size="lg">
        Criar Ordem de Produção
      </Button>
    </div>
  )
}
