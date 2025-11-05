import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const inspections = [
  {
    id: "INS001",
    date: "2025-01-15",
    order: "OP001",
    product: "Peça Modelo A",
    inspector: "Carlos Oliveira",
    approved: 95,
    rejected: 5,
    status: "Aprovado",
  },
  {
    id: "INS002",
    date: "2025-01-15",
    order: "OP002",
    product: "Peça Modelo B",
    inspector: "Ana Paula",
    approved: 48,
    rejected: 2,
    status: "Aprovado",
  },
  {
    id: "INS003",
    date: "2025-01-14",
    order: "OP003",
    product: "Peça Modelo C",
    inspector: "Carlos Oliveira",
    approved: 85,
    rejected: 15,
    status: "Atenção",
  },
]

export default function Qualidade() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Controle de Qualidade</h1>
              <p className="text-muted-foreground">Inspeções e aprovações de produção</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Inspeção
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Aprovação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">94.7%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Peças Aprovadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">228</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Peças Rejeitadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">22</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Inspeções (Hoje)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Inspeções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspections.map((inspection) => (
                  <div key={inspection.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-lg">
                          {inspection.id} - {inspection.product}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ordem: {inspection.order} | Inspetor: {inspection.inspector}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                          inspection.status === "Aprovado"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {inspection.status === "Aprovado" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                        {inspection.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Data</p>
                        <p className="text-sm font-medium">{new Date(inspection.date).toLocaleDateString("pt-BR")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Aprovadas
                        </p>
                        <p className="text-sm font-medium">{inspection.approved} unidades</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Rejeitadas
                        </p>
                        <p className="text-sm font-medium">{inspection.rejected} unidades</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Taxa de Aprovação</span>
                        <span className="font-medium">
                          {Math.round((inspection.approved / (inspection.approved + inspection.rejected)) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${(inspection.approved / (inspection.approved + inspection.rejected)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
