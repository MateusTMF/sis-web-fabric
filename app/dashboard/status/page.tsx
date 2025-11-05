"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Progress } from "../../../components/ui/progress"
import { Factory, Package, TrendingUp, CheckCircle } from "lucide-react"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import PageLayout from "../../../components/page-layout"

const productionOrders = [
  { id: "OP-1247", product: "Transformador 500kVA", progress: 85, status: "in-progress", priority: "high" },
  { id: "OP-1248", product: "Transformador 300kVA", progress: 45, status: "in-progress", priority: "medium" },
  { id: "OP-1249", product: "Transformador 750kVA", progress: 92, status: "in-progress", priority: "high" },
  { id: "OP-1250", product: "Transformador 200kVA", progress: 15, status: "in-progress", priority: "low" },
  { id: "OP-1251", product: "Transformador 1000kVA", progress: 100, status: "completed", priority: "high" },
]

const stockStatus = [
  { name: "Normal", value: 1124, color: "hsl(var(--chart-3))" },
  { name: "Baixo", value: 89, color: "hsl(var(--chart-4))" },
  { name: "Crítico", value: 34, color: "hsl(var(--chart-5))" },
]

const machineStatus = [
  { machine: "Bobinagem #1", status: "operational", efficiency: 92 },
  { machine: "Bobinagem #2", status: "operational", efficiency: 88 },
  { machine: "Bobinagem #3", status: "maintenance", efficiency: 0 },
  { machine: "Montagem #1", status: "operational", efficiency: 95 },
  { machine: "Montagem #2", status: "operational", efficiency: 87 },
  { machine: "Teste #1", status: "operational", efficiency: 91 },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "in-progress":
      return <Badge className="bg-blue-600">Em Andamento</Badge>
    case "completed":
      return <Badge className="bg-green-600">Concluído</Badge>
    case "pending":
      return <Badge variant="secondary">Pendente</Badge>
    case "delayed":
      return <Badge variant="destructive">Atrasado</Badge>
    default:
      return <Badge variant="outline">Desconhecido</Badge>
  }
}

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

const getMachineStatusBadge = (status: string) => {
  switch (status) {
    case "operational":
      return <Badge className="bg-green-600">Operacional</Badge>
    case "maintenance":
      return <Badge className="bg-orange-600">Manutenção</Badge>
    case "stopped":
      return <Badge variant="destructive">Parado</Badge>
    default:
      return <Badge variant="outline">Desconhecido</Badge>
  }
}

export default function StatusPage() {
  return (
    <PageLayout
      title="Status de Produção e Estoque"
      description="Acompanhe em tempo real o status da produção, máquinas e estoque"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">OPs Ativas</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">12 aguardando início</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Máquinas Operacionais</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18/21</div>
            <p className="text-xs text-muted-foreground mt-1">85.7% disponibilidade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Itens em Estoque</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.247</div>
            <p className="text-xs text-red-600 mt-1">34 críticos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eficiência Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90.5%</div>
            <p className="text-xs text-green-600 mt-1">+2.3% vs ontem</p>
          </CardContent>
        </Card>
      </div>

      {/* Production Orders */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ordens de Produção em Andamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productionOrders.map((order) => (
              <div key={order.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-sm font-semibold">{order.id}</span>
                    <span className="text-sm text-muted-foreground">{order.product}</span>
                    {getStatusBadge(order.status)}
                    {getPriorityBadge(order.priority)}
                  </div>
                  <span className="text-sm font-semibold">{order.progress}%</span>
                </div>
                <Progress value={order.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Machine Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Status das Máquinas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {machineStatus.map((machine, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{machine.machine}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {machine.status === "operational" ? `Eficiência: ${machine.efficiency}%` : "Em manutenção"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {machine.status === "operational" && (
                    <div className="w-24">
                      <Progress value={machine.efficiency} className="h-2" />
                    </div>
                  )}
                  {getMachineStatusBadge(machine.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stock Status Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição do Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stockStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
