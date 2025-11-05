import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Plus, Eye, ShoppingCart, Clock, CheckCircle } from "lucide-react"

const orders = [
  {
    id: "PC001",
    date: "2025-01-15",
    supplier: "Metalúrgica Silva",
    items: 5,
    total: 12450.0,
    status: "Pendente",
    delivery: "2025-01-20",
  },
  {
    id: "PC002",
    date: "2025-01-14",
    supplier: "Tintas Premium",
    items: 3,
    total: 3600.0,
    status: "Aprovado",
    delivery: "2025-01-18",
  },
  {
    id: "PC003",
    date: "2025-01-13",
    supplier: "Componentes Tech",
    items: 8,
    total: 8750.0,
    status: "Entregue",
    delivery: "2025-01-15",
  },
  {
    id: "PC004",
    date: "2025-01-12",
    supplier: "Parafusos Brasil",
    items: 2,
    total: 1250.0,
    status: "Aprovado",
    delivery: "2025-01-17",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pendente":
      return <Badge className="bg-yellow-600">Pendente</Badge>
    case "Aprovado":
      return <Badge className="bg-blue-600">Aprovado</Badge>
    case "Entregue":
      return <Badge className="bg-green-600">Entregue</Badge>
    case "Cancelado":
      return <Badge variant="destructive">Cancelado</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function PedidosCompras() {
  const totalMonth = orders.reduce((acc, order) => acc + order.total, 0)
  const pending = orders.filter((o) => o.status === "Pendente").length
  const approved = orders.filter((o) => o.status === "Aprovado").length

  return (
    <PageLayout title="Pedidos de Compra" description="Gerenciamento completo de pedidos aos fornecedores">
      <div className="mb-6 flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Pedido
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pedidos Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending}</div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pedidos Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approved}</div>
            <p className="text-xs text-muted-foreground mt-1">Em processamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total do Mês</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalMonth.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{orders.length} pedidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ticket Médio</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(totalMonth / orders.length).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Por pedido</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{order.id}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="font-medium">{order.supplier}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Data: {new Date(order.date).toLocaleDateString("pt-BR")}</span>
                    <span>Itens: {order.items}</span>
                    <span>Total: R$ {order.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    <span>Entrega: {new Date(order.delivery).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
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
