import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Plus, CheckCircle, AlertCircle, Clock, DollarSign } from "lucide-react"

const bills = [
  {
    id: "CP001",
    description: "Fornecedor - Metalúrgica Silva",
    dueDate: "2025-01-18",
    value: 12450.0,
    status: "Pendente",
    category: "Compras",
  },
  {
    id: "CP002",
    description: "Energia Elétrica",
    dueDate: "2025-01-20",
    value: 3200.0,
    status: "Pendente",
    category: "Utilidades",
  },
  {
    id: "CP003",
    description: "Folha de Pagamento",
    dueDate: "2025-01-25",
    value: 45000.0,
    status: "Agendado",
    category: "Pessoal",
  },
  {
    id: "CP004",
    description: "Fornecedor - Tintas Premium",
    dueDate: "2025-01-15",
    value: 3600.0,
    status: "Pago",
    category: "Compras",
  },
  {
    id: "CP005",
    description: "Aluguel",
    dueDate: "2025-01-10",
    value: 8500.0,
    status: "Pago",
    category: "Fixo",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pago":
      return (
        <Badge className="bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Pago
        </Badge>
      )
    case "Agendado":
      return (
        <Badge className="bg-blue-600">
          <Clock className="h-3 w-3 mr-1" />
          Agendado
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

export default function ContasPagar() {
  const totalMonth = bills.reduce((acc, bill) => acc + bill.value, 0)
  const pending = bills.filter((b) => b.status === "Pendente").reduce((acc, b) => acc + b.value, 0)
  const paid = bills.filter((b) => b.status === "Pago").reduce((acc, b) => acc + b.value, 0)

  return (
    <PageLayout title="Contas a Pagar" description="Gestão completa de pagamentos e despesas da empresa">
      <div className="mb-6 flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Conta
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">A Vencer (7 dias)</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              R$ {pending.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {bills.filter((b) => b.status === "Pendente").length} contas
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Pagas (Mês)</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {paid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {bills.filter((b) => b.status === "Pago").length} contas
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
            <p className="text-xs text-muted-foreground mt-1">{bills.length} contas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Contas a Pagar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{bill.id}</span>
                    {getStatusBadge(bill.status)}
                    <Badge variant="outline">{bill.category}</Badge>
                  </div>
                  <p className="font-medium">{bill.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Vencimento: {new Date(bill.dueDate).toLocaleDateString("pt-BR")}</span>
                    <span className="font-semibold text-foreground">
                      Valor: R$ {bill.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {bill.status !== "Pago" && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Pagar
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
