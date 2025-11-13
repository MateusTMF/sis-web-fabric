"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, PauseCircle, CheckCircle2, Clock, Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { ordensProducaoMockDetalhes } from "@/lib/types/ordem-producao-extended"
import Sidebar from "@/components/sidebar"

export default function OrdensProducaoPage() {
  const [ordens, setOrdens] = useState(ordensProducaoMockDetalhes)
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")

  const ordensFiltradas = ordens.filter((ordem) => {
    const matchBusca =
      ordem.numeroOP.toLowerCase().includes(busca.toLowerCase()) ||
      ordem.projeto.nome.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus === "todos" || ordem.status === filtroStatus
    return matchBusca && matchStatus
  })

  const stats = {
    emProducao: ordens.filter((o) => o.status === "em-producao").length,
    aguardando: ordens.filter((o) => o.status === "aguardando").length,
    concluidas: ordens.filter((o) => o.status === "concluida").length,
    pausadas: ordens.filter((o) => o.status === "pausada").length,
  }

  const handleIniciar = (id: string) => {
    setOrdens(
      ordens.map((o) =>
        o.id === id ? { ...o, status: "em-producao" as const, dataInicio: new Date().toISOString() } : o,
      ),
    )
  }

  const handlePausar = (id: string) => {
    setOrdens(ordens.map((o) => (o.id === id ? { ...o, status: "pausada" as const } : o)))
  }

  const handleFinalizar = (id: string) => {
    setOrdens(
      ordens.map((o) =>
        o.id === id
          ? { ...o, status: "concluida" as const, progresso: 100, dataConclusao: new Date().toISOString() }
          : o,
      ),
    )
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

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "urgente":
        return "destructive"
      case "alta":
        return "default"
      case "normal":
        return "secondary"
      case "baixa":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-background p-12">
      <Sidebar />
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ordens de Produção</h1>
            <p className="text-muted-foreground">Gerencie as ordens de produção de transformadores</p>
          </div>
          <div className="flex gap-2">
            <Link href="/producao/projetos">
              <Button variant="outline">
                <Search className="mr-2 h-5 w-5" />
                Ver Projetos
              </Button>
            </Link>
            <Link href="/producao/ordens-producao/criar">
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Nova Ordem
              </Button>
            </Link>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Em Produção</CardTitle>
              <PlayCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.emProducao}</div>
              <p className="text-xs text-muted-foreground">Ordens em andamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aguardando</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.aguardando}</div>
              <p className="text-xs text-muted-foreground">Ordens pendentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pausadas</CardTitle>
              <PauseCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pausadas}</div>
              <p className="text-xs text-muted-foreground">Ordens pausadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.concluidas}</div>
              <p className="text-xs text-muted-foreground">Ordens finalizadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Busque e filtre as ordens de produção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número OP ou projeto..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filtroStatus === "todos" ? "default" : "outline"}
                  onClick={() => setFiltroStatus("todos")}
                >
                  Todos
                </Button>
                <Button
                  variant={filtroStatus === "em-producao" ? "default" : "outline"}
                  onClick={() => setFiltroStatus("em-producao")}
                >
                  Em Produção
                </Button>
                <Button
                  variant={filtroStatus === "aguardando" ? "default" : "outline"}
                  onClick={() => setFiltroStatus("aguardando")}
                >
                  Aguardando
                </Button>
                <Button
                  variant={filtroStatus === "concluida" ? "default" : "outline"}
                  onClick={() => setFiltroStatus("concluida")}
                >
                  Concluídas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Ordens */}
        <div className="space-y-4">
          {ordensFiltradas.map((ordem) => (
            <Card key={ordem.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">OP: {ordem.numeroOP}</CardTitle>
                      <Badge className={getStatusColor(ordem.status)}>{getStatusText(ordem.status)}</Badge>
                      <Badge variant={getPrioridadeColor(ordem.prioridade)}>{ordem.prioridade.toUpperCase()}</Badge>
                    </div>
                    <CardDescription>
                      {ordem.projeto.nome} - {ordem.projeto.potencia} kVA - {ordem.projeto.classe} kV
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/producao/ordens-producao/${ordem.id}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/producao/ordens-producao/${ordem.id}/editar`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informações Principais */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Produto</p>
                    <p className="text-sm font-semibold">{ordem.projeto.tipoTransformador}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">AT / BT</p>
                    <p className="text-sm font-semibold">
                      {ordem.projeto.tensaoATPrimaria}V / {ordem.projeto.tensaoBT}V
                    </p>
                  </div>
                </div>

                {/* Datas */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data Início</p>
                    <p className="text-sm font-semibold">
                      {ordem.dataInicio ? new Date(ordem.dataInicio).toLocaleDateString("pt-BR") : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Prazo</p>
                    <p className="text-sm font-semibold">
                      {ordem.dataPrazo ? new Date(ordem.dataPrazo).toLocaleDateString("pt-BR") : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Conclusão</p>
                    <p className="text-sm font-semibold">
                      {ordem.dataConclusao ? new Date(ordem.dataConclusao).toLocaleDateString("pt-BR") : "-"}
                    </p>
                  </div>
                </div>

                {/* Progresso */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Progresso</p>
                    <p className="text-sm font-bold">{ordem.progresso}%</p>
                  </div>
                  <Progress value={ordem.progresso} className="h-2" />
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  {ordem.status === "aguardando" && (
                    <Button onClick={() => handleIniciar(ordem.id)} className="flex-1">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Iniciar Produção
                    </Button>
                  )}
                  {ordem.status === "em-producao" && (
                    <>
                      <Button onClick={() => handlePausar(ordem.id)} variant="outline" className="flex-1">
                        <PauseCircle className="mr-2 h-4 w-4" />
                        Pausar
                      </Button>
                      <Button onClick={() => handleFinalizar(ordem.id)} className="flex-1">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Finalizar
                      </Button>
                    </>
                  )}
                  {ordem.status === "pausada" && (
                    <Button onClick={() => handleIniciar(ordem.id)} className="flex-1">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Retomar Produção
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {ordensFiltradas.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Filter className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium">Nenhuma ordem encontrada</p>
                <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou criar uma nova ordem</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
