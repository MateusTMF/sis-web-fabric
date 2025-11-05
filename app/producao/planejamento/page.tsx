"use client";
import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Calendar, Clock, TrendingUp, AlertCircle, Plus } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const weeklyPlan = [
  { day: "Seg", planned: 1200, actual: 1150 },
  { day: "Ter", planned: 1200, actual: 1280 },
  { day: "Qua", planned: 1200, actual: 1190 },
  { day: "Qui", planned: 1200, actual: 0 },
  { day: "Sex", planned: 1200, actual: 0 },
]

const plannedOrders = [
  {
    id: "OP-1252",
    product: "Transformador 500kVA",
    quantity: 10,
    startDate: "2025-01-20",
    endDate: "2025-01-25",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "OP-1253",
    product: "Transformador 300kVA",
    quantity: 15,
    startDate: "2025-01-22",
    endDate: "2025-01-28",
    priority: "medium",
    status: "scheduled",
  },
  {
    id: "OP-1254",
    product: "Transformador 750kVA",
    quantity: 8,
    startDate: "2025-01-25",
    endDate: "2025-02-02",
    priority: "high",
    status: "scheduled",
  },
  {
    id: "OP-1255",
    product: "Transformador 1000kVA",
    quantity: 5,
    startDate: "2025-01-28",
    endDate: "2025-02-05",
    priority: "low",
    status: "pending",
  },
]

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">Alta</Badge>
    case "medium":
      return <Badge className="bg-yellow-600">Média</Badge>
    case "low":
      return <Badge variant="secondary">Baixa</Badge>
    default:
      return <Badge variant="outline">-</Badge>
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "scheduled":
      return <Badge className="bg-blue-600">Agendado</Badge>
    case "pending":
      return <Badge variant="secondary">Pendente</Badge>
    case "confirmed":
      return <Badge className="bg-green-600">Confirmado</Badge>
    default:
      return <Badge variant="outline">-</Badge>
  }
}

export default function PlanejamentoPage() {
  return (
    <PageLayout title="Planejamento de Produção" description="Planeje e organize a produção da fábrica">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">OPs Planejadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">Próximos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Capacidade Utilizada</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-green-600 mt-1">Dentro do ideal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5 dias</div>
            <p className="text-xs text-muted-foreground mt-1">Por ordem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conflitos</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-red-600 mt-1">Requer ajuste</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Production Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Planejamento Semanal (Unidades)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyPlan}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar dataKey="planned" fill="hsl(var(--chart-1))" name="Planejado" />
              <Bar dataKey="actual" fill="hsl(var(--chart-2))" name="Realizado" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Planned Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Ordens Planejadas</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova OP
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plannedOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{order.id}</span>
                    {getPriorityBadge(order.priority)}
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm font-medium">{order.product}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>Quantidade: {order.quantity} un</span>
                    <span>Início: {order.startDate}</span>
                    <span>Término: {order.endDate}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                  <Button size="sm">Confirmar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
