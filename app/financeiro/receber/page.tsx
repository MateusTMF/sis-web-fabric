import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Plus, CheckCircle, AlertCircle, Clock, DollarSign } from "lucide-react"

const receivables = [
  {
    id: "CR001",
    customer: "Indústria ABC",
    description: "Pedido PV001",
    dueDate: "2025-01-20",
    value: 15750.0,
    status: "Pendente",
  },
  {
    id: "CR002",
    customer: "Metalúrgica XYZ",
    description: "Pedido PV002",
    dueDate: "2025-01-22",
    value: 22400.0,
    status: "Pendente",
  },
  {
    id: "CR003",
    customer: "Fábrica 123",
    description: "Pedido PV003",
    dueDate: "2025-01-15",
    value: 8900.0,
    status: "Recebido",
  },
  {
    id: "CR004",
    customer: "Indústria DEF",
    description: "Pedido PV004",
    dueDate: "2025-01-19",
    value: 18200.0,
    status: "Pendente",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Recebido":
      return (
        <Badge className="bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Recebido
        </Badge>
      )
    case "Pendente":
      return (
        <Badge className="bg-yellow-600">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pendente
        </Badge>
      )
    case "Vencido":
      return (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Vencido
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function ContasReceber() {
  const totalMonth = receivables.reduce((acc, r) => acc + r.value, 0)
  const pending = receivables.filter((r) => r.status === "Pendente").reduce((acc, r) => acc + r.value, 0)
  const received = receivables.filter((r) => r.status === "Recebido").reduce((acc, r) => acc + r.value, 0)

  return (
    <PageLayout title="Contas a Receber" description="Gestão completa de recebimentos e faturamento da empresa">
      <div className="mb-6 flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Conta
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">A Receber (7 dias)</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R$ {pending.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {receivables.filter((r) => r.status === "Pendente").length} contas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vencidas</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ 0,00</div>
            <p className="text-xs text-muted-foreground mt-1">0 contas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recebidas (Mês)</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {received.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {receivables.filter((r) => r.status === "Recebido").length} contas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalMonth.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{receivables.length} contas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Contas a Receber</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {receivables.map((receivable) => (
              <div
                key={receivable.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{receivable.id}</span>
                    {getStatusBadge(receivable.status)}
                  </div>
                  <p className="font-medium">{receivable.customer}</p>
                  <p className="text-sm text-muted-foreground">{receivable.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Vencimento: {new Date(receivable.dueDate).toLocaleDateString("pt-BR")}</span>
                    <span className="font-semibold text-green-600">
                      Valor: R$ {receivable.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {receivable.status !== "Recebido" && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirmar
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Ver Detalhes
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
