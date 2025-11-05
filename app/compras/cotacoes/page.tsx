import Sidebar from "../../../components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Plus, Eye } from "lucide-react"

const quotes = [
  {
    id: "COT001",
    date: "2025-01-15",
    product: "Chapa de Aço 3mm",
    quantity: 100,
    suppliers: 3,
    bestPrice: "R$ 52,00",
    status: "Em análise",
  },
  {
    id: "COT002",
    date: "2025-01-14",
    product: "Motor Elétrico 10HP",
    quantity: 5,
    suppliers: 4,
    bestPrice: "R$ 1.450,00",
    status: "Aprovada",
  },
  {
    id: "COT003",
    date: "2025-01-13",
    product: "Rolamento 6206",
    quantity: 50,
    suppliers: 2,
    bestPrice: "R$ 38,00",
    status: "Aguardando",
  },
  {
    id: "COT004",
    date: "2025-01-12",
    product: "Tinta Epóxi Preta",
    quantity: 20,
    suppliers: 3,
    bestPrice: "R$ 115,00",
    status: "Aprovada",
  },
]

export default function Cotacoes() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Cotações</h1>
              <p className="text-muted-foreground">Solicitações e comparação de preços</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Cotação
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cotações Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Aguardando Resposta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Economia Estimada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 2.340</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Cotações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">ID</th>
                      <th className="text-left p-4 font-medium">Data</th>
                      <th className="text-left p-4 font-medium">Produto</th>
                      <th className="text-left p-4 font-medium">Quantidade</th>
                      <th className="text-left p-4 font-medium">Fornecedores</th>
                      <th className="text-left p-4 font-medium">Melhor Preço</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{quote.id}</td>
                        <td className="p-4">{new Date(quote.date).toLocaleDateString("pt-BR")}</td>
                        <td className="p-4">{quote.product}</td>
                        <td className="p-4">{quote.quantity}</td>
                        <td className="p-4">{quote.suppliers}</td>
                        <td className="p-4 font-medium text-green-600">{quote.bestPrice}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              quote.status === "Em análise"
                                ? "bg-blue-100 text-blue-700"
                                : quote.status === "Aprovada"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {quote.status}
                          </span>
                        </td>
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
