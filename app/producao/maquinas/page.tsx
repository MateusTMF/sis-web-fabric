import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Settings, AlertCircle, CheckCircle } from "lucide-react"

const machines = [
  {
    id: "M001",
    name: "Torno CNC 01",
    type: "Torno CNC",
    status: "Operando",
    efficiency: 92,
    maintenance: "2025-02-15",
    operator: "João Silva",
    currentOrder: "OP001",
  },
  {
    id: "M002",
    name: "Fresadora 02",
    type: "Fresadora",
    status: "Parada",
    efficiency: 88,
    maintenance: "2025-01-20",
    operator: "-",
    currentOrder: "-",
  },
  {
    id: "M003",
    name: "Torno CNC 02",
    type: "Torno CNC",
    status: "Manutenção",
    efficiency: 0,
    maintenance: "2025-01-16",
    operator: "-",
    currentOrder: "-",
  },
  {
    id: "M004",
    name: "Prensa Hidráulica",
    type: "Prensa",
    status: "Operando",
    efficiency: 95,
    maintenance: "2025-03-01",
    operator: "Maria Santos",
    currentOrder: "OP004",
  },
]

export default function Maquinas() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Máquinas</h1>
              <p className="text-muted-foreground">Monitoramento e gestão de máquinas</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Máquina
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Máquinas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Operando</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">2</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Paradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">1</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Manutenção</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {machines.map((machine) => (
              <Card key={machine.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{machine.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{machine.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {machine.status === "Operando" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : machine.status === "Manutenção" ? (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          machine.status === "Operando"
                            ? "bg-green-100 text-green-700"
                            : machine.status === "Manutenção"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {machine.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Operador</p>
                        <p className="text-sm font-medium">{machine.operator}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ordem Atual</p>
                        <p className="text-sm font-medium">{machine.currentOrder}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Eficiência</span>
                        <span className="font-medium">{machine.efficiency}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            machine.efficiency >= 90
                              ? "bg-green-600"
                              : machine.efficiency >= 70
                                ? "bg-yellow-600"
                                : "bg-red-600"
                          }`}
                          style={{ width: `${machine.efficiency}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">Próxima Manutenção</p>
                      <p className="text-sm font-medium">{new Date(machine.maintenance).toLocaleDateString("pt-BR")}</p>
                    </div>

                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
