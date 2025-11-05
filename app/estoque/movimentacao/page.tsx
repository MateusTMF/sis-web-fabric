import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpCircle, ArrowDownCircle, Plus } from "lucide-react"

const movements = [
  {
    id: "M001",
    date: "2025-01-15",
    product: "Parafuso M8",
    type: "Entrada",
    quantity: 500,
    reason: "Compra",
    user: "João Silva",
  },
  {
    id: "M002",
    date: "2025-01-15",
    product: "Chapa de Aço 2mm",
    type: "Saída",
    quantity: 50,
    reason: "Produção",
    user: "Maria Santos",
  },
  {
    id: "M003",
    date: "2025-01-14",
    product: "Tinta Epóxi Branca",
    type: "Entrada",
    quantity: 30,
    reason: "Compra",
    user: "João Silva",
  },
  {
    id: "M004",
    date: "2025-01-14",
    product: "Rolamento 6205",
    type: "Saída",
    quantity: 15,
    reason: "Produção",
    user: "Pedro Costa",
  },
  {
    id: "M005",
    date: "2025-01-13",
    product: "Motor Elétrico 5HP",
    type: "Entrada",
    quantity: 8,
    reason: "Compra",
    user: "João Silva",
  },
]

export default function Movimentacao() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Movimentação de Estoque</h1>
              <p className="text-muted-foreground">Histórico de entradas e saídas</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Movimentação
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Entradas (Hoje)</CardTitle>
                <ArrowUpCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">538 unidades</div>
                <p className="text-xs text-muted-foreground mt-1">3 movimentações</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Saídas (Hoje)</CardTitle>
                <ArrowDownCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65 unidades</div>
                <p className="text-xs text-muted-foreground mt-1">2 movimentações</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Movimentações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">ID</th>
                      <th className="text-left p-4 font-medium">Data</th>
                      <th className="text-left p-4 font-medium">Produto</th>
                      <th className="text-left p-4 font-medium">Tipo</th>
                      <th className="text-left p-4 font-medium">Quantidade</th>
                      <th className="text-left p-4 font-medium">Motivo</th>
                      <th className="text-left p-4 font-medium">Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movements.map((movement) => (
                      <tr key={movement.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">{movement.id}</td>
                        <td className="p-4">{new Date(movement.date).toLocaleDateString("pt-BR")}</td>
                        <td className="p-4 font-medium">{movement.product}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              movement.type === "Entrada" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {movement.type === "Entrada" ? (
                              <ArrowUpCircle className="h-3 w-3" />
                            ) : (
                              <ArrowDownCircle className="h-3 w-3" />
                            )}
                            {movement.type}
                          </span>
                        </td>
                        <td className="p-4">{movement.quantity}</td>
                        <td className="p-4">{movement.reason}</td>
                        <td className="p-4">{movement.user}</td>
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
