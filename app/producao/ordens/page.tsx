import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Plus, Play, Pause, CheckCircle } from "lucide-react"

const orders = [
  {
    id: "OP001",
    product: "Peça Modelo A",
    quantity: 100,
    produced: 75,
    status: "Em Produção",
    machine: "Torno CNC 01",
    operator: "João Silva",
    start: "2025-01-15 08:00",
    deadline: "2025-01-16 18:00",
  },
  {
    id: "OP002",
    product: "Peça Modelo B",
    quantity: 50,
    produced: 50,
    status: "Concluída",
    machine: "Fresadora 02",
    operator: "Maria Santos",
    start: "2025-01-14 08:00",
    deadline: "2025-01-15 18:00",
  },
  {
    id: "OP003",
    product: "Peça Modelo C",
    quantity: 200,
    produced: 0,
    status: "Aguardando",
    machine: "Torno CNC 02",
    operator: "Pedro Costa",
    start: "2025-01-16 08:00",
    deadline: "2025-01-18 18:00",
  },
]

export default function OrdensProducao() {
  return (
    <PageLayout title="Ordens de Produção (OP)" description="Gerenciamento completo das ordens de produção da fábrica">
      <div className="min-h-screen bg-background">
        <main className="pl-0 md:pl-0">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            <div className="mb-6 flex justify-end">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Ordem
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Em Produção</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground mt-1">75% concluída</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Aguardando</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Concluídas (Hoje)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {order.id} - {order.product}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Operador: {order.operator} | Máquina: {order.machine}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Em Produção"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "Concluída"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Quantidade</p>
                          <p className="text-lg font-medium">{order.quantity} un</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Produzido</p>
                          <p className="text-lg font-medium">{order.produced} un</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Início</p>
                          <p className="text-sm">{order.start}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Prazo</p>
                          <p className="text-sm">{order.deadline}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progresso</span>
                          <span className="font-medium">{Math.round((order.produced / order.quantity) * 100)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(order.produced / order.quantity) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {order.status === "Em Produção" && (
                          <>
                            <Button size="sm" variant="outline">
                              <Pause className="mr-2 h-4 w-4" />
                              Pausar
                            </Button>
                            <Button size="sm">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Finalizar
                            </Button>
                          </>
                        )}
                        {order.status === "Aguardando" && (
                          <Button size="sm">
                            <Play className="mr-2 h-4 w-4" />
                            Iniciar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
