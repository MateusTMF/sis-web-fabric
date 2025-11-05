import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Check, X, Eye, Clock, AlertCircle } from "lucide-react"

const pendingRequests = [
  {
    id: "SOL-001",
    department: "Produção",
    requester: "João Silva",
    date: "2025-01-15",
    priority: "urgent",
    items: 5,
    op: "OP-1247",
    justification: "Materiais necessários para conclusão da OP-1247 com prazo crítico",
  },
  {
    id: "SOL-002",
    department: "Manutenção",
    requester: "Carlos Ferreira",
    date: "2025-01-15",
    priority: "high",
    items: 3,
    op: "-",
    justification: "Peças de reposição para manutenção preventiva das máquinas de bobinagem",
  },
  {
    id: "SOL-003",
    department: "Qualidade",
    requester: "Ana Costa",
    date: "2025-01-14",
    priority: "medium",
    items: 2,
    op: "-",
    justification: "Materiais para testes de qualidade do lote #458",
  },
]

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "urgent":
      return <Badge variant="destructive">Urgente</Badge>
    case "high":
      return <Badge className="bg-orange-600">Alta</Badge>
    case "medium":
      return <Badge className="bg-yellow-600">Média</Badge>
    case "low":
      return <Badge variant="secondary">Baixa</Badge>
    default:
      return <Badge variant="outline">-</Badge>
  }
}

export default function AprovacaoPage() {
  return (
    <PageLayout title="Aprovação de Solicitações" description="Analise e aprove solicitações de materiais pendentes">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Urgentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.filter((r) => r.priority === "urgent").length}</div>
            <p className="text-xs text-red-600 mt-1">Atenção imediata</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aprovadas Hoje</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Processadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitações Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="flex flex-col gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-semibold">{request.id}</span>
                      {getPriorityBadge(request.priority)}
                      {request.op !== "-" && <Badge variant="outline">{request.op}</Badge>}
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">
                        {request.department} • {request.requester}
                      </p>
                      <p className="text-muted-foreground mt-1">
                        {request.items} itens solicitados • {request.date}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground italic">{request.justification}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                  <Button size="sm" variant="destructive">
                    <X className="h-4 w-4 mr-2" />
                    Rejeitar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
