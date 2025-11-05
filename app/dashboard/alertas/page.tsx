"use client";

import { AlertTriangle, AlertCircle, Info, CheckCircle, Clock, Package, Wrench, DollarSign, Users } from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import PageLayout from "../../../components/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const alerts = [
  {
    id: 1,
    type: "critical",
    category: "Estoque",
    icon: Package,
    title: "Estoque Crítico - Matéria Prima",
    description: "23 itens abaixo do estoque mínimo. Ação imediata necessária.",
    time: "Há 15 minutos",
    status: "pending",
  },
  {
    id: 2,
    type: "high",
    category: "Manutenção",
    icon: Wrench,
    title: "Manutenção Preventiva Vencida",
    description: "Máquina de Bobinagem #3 com manutenção atrasada em 5 dias.",
    time: "Há 2 horas",
    status: "pending",
  },
  {
    id: 3,
    type: "high",
    category: "Financeiro",
    icon: DollarSign,
    title: "Contas a Pagar Vencendo",
    description: "15 contas com vencimento nos próximos 3 dias. Total: R$ 87.500",
    time: "Há 3 horas",
    status: "pending",
  },
  {
    id: 4,
    type: "medium",
    category: "Produção",
    icon: Clock,
    title: "Atraso na Produção",
    description: "OP #1247 está 12% atrasada em relação ao cronograma.",
    time: "Há 4 horas",
    status: "in-progress",
  },
  {
    id: 5,
    type: "medium",
    category: "RH",
    icon: Users,
    title: "Férias Pendentes",
    description: "8 funcionários com férias vencidas precisam agendar.",
    time: "Há 5 horas",
    status: "pending",
  },
  {
    id: 6,
    type: "low",
    category: "Qualidade",
    icon: AlertCircle,
    title: "Taxa de Refugo Elevada",
    description: "Linha de montagem #2 com taxa de refugo 15% acima da média.",
    time: "Há 6 horas",
    status: "in-progress",
  },
  {
    id: 7,
    type: "info",
    category: "Sistema",
    icon: Info,
    title: "Atualização Disponível",
    description: "Nova versão do sistema disponível com melhorias de performance.",
    time: "Há 1 dia",
    status: "pending",
  },
  {
    id: 8,
    type: "resolved",
    category: "Estoque",
    icon: CheckCircle,
    title: "Reposição Concluída",
    description: "Pedido de compra #892 recebido e estoque normalizado.",
    time: "Há 2 dias",
    status: "resolved",
  },
]

const getAlertColor = (type: string) => {
  switch (type) {
    case "critical":
      return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
    case "high":
      return "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900"
    case "medium":
      return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900"
    case "low":
      return "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900"
    case "info":
      return "bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-900"
    case "resolved":
      return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
    default:
      return "bg-muted"
  }
}

const getAlertBadge = (type: string) => {
  switch (type) {
    case "critical":
      return <Badge variant="destructive">Crítico</Badge>
    case "high":
      return <Badge className="bg-orange-600 hover:bg-orange-700">Alto</Badge>
    case "medium":
      return <Badge className="bg-yellow-600 hover:bg-yellow-700">Médio</Badge>
    case "low":
      return <Badge className="bg-blue-600 hover:bg-blue-700">Baixo</Badge>
    case "info":
      return <Badge variant="secondary">Info</Badge>
    case "resolved":
      return <Badge className="bg-green-600 hover:bg-green-700">Resolvido</Badge>
    default:
      return <Badge variant="outline">Desconhecido</Badge>
  }
}

export default function AlertasPage() {
  const pendingAlerts = alerts.filter((a) => a.status === "pending").length
  const inProgressAlerts = alerts.filter((a) => a.status === "in-progress").length
  const criticalAlerts = alerts.filter((a) => a.type === "critical").length

  return (
    <PageLayout
      title="Alertas do Sistema"
      description="Monitore e gerencie todos os alertas e notificações importantes"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alertas Pendentes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAlerts}</div>
            <p className="text-xs text-muted-foreground mt-1">Requerem ação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressAlerts}</div>
            <p className="text-xs text-muted-foreground mt-1">Sendo tratados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Críticos</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalAlerts}</div>
            <p className="text-xs text-muted-foreground mt-1">Atenção imediata</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const IconComponent = alert.icon
          return (
            <Card key={alert.id} className={`${getAlertColor(alert.type)} border`}>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <IconComponent className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {getAlertBadge(alert.type)}
                        <Badge variant="outline">{alert.category}</Badge>
                      </div>
                      <h3 className="font-semibold text-sm md:text-base mb-1">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 md:flex-col md:w-auto">
                    {alert.status !== "resolved" && (
                      <>
                        <Button size="sm" className="flex-1 md:flex-none">
                          Ver Detalhes
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 md:flex-none bg-transparent">
                          Resolver
                        </Button>
                      </>
                    )}
                    {alert.status === "resolved" && (
                      <Button size="sm" variant="ghost" className="flex-1 md:flex-none">
                        Arquivar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </PageLayout>
  )
}
