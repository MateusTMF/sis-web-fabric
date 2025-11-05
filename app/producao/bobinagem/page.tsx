import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Zap, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const machines = [
  {
    id: "BOB-01",
    status: "operational",
    op: "OP-1247",
    product: "Transformador 500kVA",
    progress: 85,
    operator: "João Silva",
    efficiency: 92,
  },
  {
    id: "BOB-02",
    status: "operational",
    op: "OP-1248",
    product: "Transformador 300kVA",
    progress: 45,
    operator: "Pedro Costa",
    efficiency: 88,
  },
  { id: "BOB-03", status: "maintenance", op: "-", product: "-", progress: 0, operator: "-", efficiency: 0 },
  { id: "BOB-04", status: "idle", op: "-", product: "-", progress: 0, operator: "-", efficiency: 0 },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "operational":
      return <Badge className="bg-green-600">Operacional</Badge>
    case "maintenance":
      return <Badge className="bg-orange-600">Manutenção</Badge>
    case "idle":
      return <Badge variant="secondary">Parado</Badge>
    default:
      return <Badge variant="outline">-</Badge>
  }
}

export default function BobinagemPage() {
  const operational = machines.filter((m) => m.status === "operational").length
  const avgEfficiency =
    machines.filter((m) => m.status === "operational").reduce((acc, m) => acc + m.efficiency, 0) / operational

  return (
    <PageLayout title="Bobinagem" description="Controle e monitoramento do setor de bobinagem">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Máquinas Ativas</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operational}/{machines.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Disponibilidade: {((operational / machines.length) * 100).toFixed(0)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eficiência Média</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEfficiency.toFixed(1)}%</div>
            <p className="text-xs text-green-600 mt-1">Acima da meta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">OPs em Execução</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{machines.filter((m) => m.op !== "-").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Bobinagem ativa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-orange-600 mt-1">Manutenção pendente</p>
          </CardContent>
        </Card>
      </div>

      {/* Machines List */}
      <Card>
        <CardHeader>
          <CardTitle>Status das Máquinas de Bobinagem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {machines.map((machine) => (
              <div
                key={machine.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{machine.id}</span>
                    {getStatusBadge(machine.status)}
                  </div>
                  {machine.op !== "-" ? (
                    <>
                      <p className="text-sm font-medium">
                        {machine.op} - {machine.product}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span>Operador: {machine.operator}</span>
                        <span>Progresso: {machine.progress}%</span>
                        <span>Eficiência: {machine.efficiency}%</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {machine.status === "maintenance" ? "Aguardando manutenção" : "Disponível para produção"}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {machine.status === "operational" && (
                    <Button size="sm" variant="outline">
                      Detalhes
                    </Button>
                  )}
                  {machine.status === "idle" && <Button size="sm">Iniciar OP</Button>}
                  {machine.status === "maintenance" && (
                    <Button size="sm" variant="outline">
                      Agendar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
