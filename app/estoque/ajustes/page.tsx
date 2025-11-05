import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, AlertCircle } from "lucide-react"

const adjustments = [
  {
    id: "A001",
    date: "2025-01-15",
    product: "Parafuso M8",
    before: 1450,
    after: 1500,
    difference: 50,
    reason: "Contagem física",
    user: "João Silva",
  },
  {
    id: "A002",
    date: "2025-01-14",
    product: "Rolamento 6205",
    before: 50,
    after: 45,
    difference: -5,
    reason: "Perda/Avaria",
    user: "Maria Santos",
  },
  {
    id: "A003",
    date: "2025-01-13",
    product: "Tinta Epóxi Branca",
    before: 75,
    after: 80,
    difference: 5,
    reason: "Erro de lançamento",
    user: "Pedro Costa",
  },
]

export default function Ajustes() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Ajustes de Estoque</h1>
              <p className="text-muted-foreground">Correções e ajustes de inventário</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Ajuste
            </Button>
          </div>

          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-orange-900">Atenção aos Ajustes</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    Ajustes de estoque devem ser realizados com cuidado e sempre documentados. Verifique a necessidade
                    de aprovação gerencial.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Ajustes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">ID</th>
                      <th className="text-left p-4 font-medium">Data</th>
                      <th className="text-left p-4 font-medium">Produto</th>
                      <th className="text-left p-4 font-medium">Antes</th>
                      <th className="text-left p-4 font-medium">Depois</th>
                      <th className="text-left p-4 font-medium">Diferença</th>
                      <th className="text-left p-4 font-medium">Motivo</th>
                      <th className="text-left p-4 font-medium">Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adjustments.map((adjustment) => (
                      <tr key={adjustment.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">{adjustment.id}</td>
                        <td className="p-4">{new Date(adjustment.date).toLocaleDateString("pt-BR")}</td>
                        <td className="p-4 font-medium">{adjustment.product}</td>
                        <td className="p-4">{adjustment.before}</td>
                        <td className="p-4">{adjustment.after}</td>
                        <td className="p-4">
                          <span
                            className={`font-medium ${adjustment.difference > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {adjustment.difference > 0 ? "+" : ""}
                            {adjustment.difference}
                          </span>
                        </td>
                        <td className="p-4">{adjustment.reason}</td>
                        <td className="p-4">{adjustment.user}</td>
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
