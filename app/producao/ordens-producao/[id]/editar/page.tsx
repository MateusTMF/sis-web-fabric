"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { ordensProducaoMockDetalhes } from "@/lib/types/ordem-producao-extended"
import Sidebar from "@/components/sidebar"

export default function EditarOrdemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const ordem = ordensProducaoMockDetalhes[0] // Mock - substituir com busca real

  const [dados, setDados] = useState({
    status: ordem.status,
    progresso: ordem.progresso,
    prioridade: ordem.prioridade,
    operador: ordem.operador,
    maquina: ordem.maquina,
    secao: ordem.secao,
    observacoes: ordem.observacoes,
  })

  const handleChange = (field: string, value: any) => {
    setDados((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSalvar = () => {
    console.log("Ordem atualizada:", dados)
    router.push(`/producao/ordens-producao/${ordem.id}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em-producao":
        return "bg-blue-500"
      case "aguardando":
        return "bg-yellow-500"
      case "concluida":
        return "bg-green-500"
      case "pausada":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "em-producao":
        return "Em Produção"
      case "aguardando":
        return "Aguardando"
      case "concluida":
        return "Concluída"
      case "pausada":
        return "Pausada"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background p-12">
      <Sidebar />
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">Editar OP: {ordem.numeroOP}</h1>
              <Badge className={getStatusColor(ordem.status)}>{getStatusText(ordem.status)}</Badge>
            </div>
            <p className="text-muted-foreground">
              {ordem.projeto.tipoTransformador} - {ordem.projeto.potencia} kVA
            </p>
          </div>
          <Link href={`/producao/ordens-producao/${ordem.id}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
          </Link>
        </div>

        {/* Status e Progresso */}
        <Card>
          <CardHeader>
            <CardTitle>Status e Progresso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={dados.status} onValueChange={(v) => handleChange("status", v)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aguardando">Aguardando</SelectItem>
                    <SelectItem value="em-producao">Em Produção</SelectItem>
                    <SelectItem value="pausada">Pausada</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select value={dados.prioridade} onValueChange={(v) => handleChange("prioridade", v)}>
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

              <div>
                <Label htmlFor="progresso">Progresso (%)</Label>
                <Input
                  id="progresso"
                  type="number"
                  min="0"
                  max="100"
                  value={dados.progresso}
                  onChange={(e) => handleChange("progresso", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Visualização de Progresso</Label>
                <span className="font-semibold">{dados.progresso}%</span>
              </div>
              <Progress value={dados.progresso} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Dados Operacionais */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Operacionais</CardTitle>
            <CardDescription>Atribua responsáveis e recursos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="operador">Operador</Label>
                <Input
                  id="operador"
                  placeholder="Nome do operador"
                  value={dados.operador}
                  onChange={(e) => handleChange("operador", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="maquina">Máquina</Label>
                <Select value={dados.maquina} onValueChange={(v) => handleChange("maquina", v)}>
                  <SelectTrigger id="maquina">
                    <SelectValue placeholder="Selecione a máquina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Máquina 01">Máquina 01</SelectItem>
                    <SelectItem value="Máquina 02">Máquina 02</SelectItem>
                    <SelectItem value="Máquina 03">Máquina 03</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="secao">Seção</Label>
              <Select value={dados.secao} onValueChange={(v) => handleChange("secao", v)}>
                <SelectTrigger id="secao">
                  <SelectValue placeholder="Selecione a seção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bobinagem">Bobinagem</SelectItem>
                  <SelectItem value="montagem">Montagem</SelectItem>
                  <SelectItem value="testes">Testes</SelectItem>
                  <SelectItem value="acabamento">Acabamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Observações */}
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="observacoes">Anotações da Ordem</Label>
            <Textarea
              id="observacoes"
              placeholder="Digite observações sobre a ordem de produção..."
              value={dados.observacoes}
              onChange={(e) => handleChange("observacoes", e.target.value)}
              className="h-40"
            />
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex gap-2">
          <Button onClick={handleSalvar} className="flex-1" size="lg">
            <Save className="mr-2 h-5 w-5" />
            Salvar Alterações
          </Button>
          <Link href={`/producao/ordens-producao/${ordem.id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent" size="lg">
              Descartar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
