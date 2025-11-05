import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Eye } from "lucide-react"

const orders = [
  {
    id: "PV001",
    date: "2025-01-15",
    customer: "Indústria ABC",
    items: 3,
    total: "R$ 15.750,00",
    status: "Confirmado",
    delivery: "2025-01-20",
  },
  {
    id: "PV002",
    date: "2025-01-15",
    customer: "Metalúrgica XYZ",
    items: 5,
    total: "R$ 22.400,00",
    status: "Pendente",
    delivery: "2025-01-22",
  },
  {
    id: "PV003",
    date: "2025-01-14",
    customer: "Fábrica 123",
    items: 2,
    total: "R$ 8.900,00",
    status: "Entregue",
    delivery: "2025-01-15",
  },
  {
    id: "PV004",
    date: "2025-01-14",
    customer: "Indústria DEF",
    items: 4,
    total: "R$ 18.200,00",
    status: "Em Produção",
    delivery: "2025-01-19",
  },
]

export default function PedidosVendas() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Pedidos de Venda</h1>
              <p className="text-muted-foreground">Gerenciamento de pedidos de clientes</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Pedido
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pedidos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total do Mês</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 65.250</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ticket Médio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 16.312</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Entregues (Hoje)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Pedido</th>
                      <th className="text-left p-4 font-medium">Data</th>
                      <th className="text-left p-4 font-medium">Cliente</th>
                      <th className="text-left p-4 font-medium">Itens</th>
                      <th className="text-left p-4 font-medium">Total</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Entrega</th>
                      <th className="text-left p-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{order.id}</td>
                        <td className="p-4">{new Date(order.date).toLocaleDateString("pt-BR")}</td>
                        <td className="p-4">{order.customer}</td>
                        <td className="p-4">{order.items}</td>
                        <td className="p-4 font-medium">{order.total}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "Confirmado"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Pendente"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : order.status === "Entregue"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4">{new Date(order.delivery).toLocaleDateString("pt-BR")}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
