import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Eye, Send } from "lucide-react"

const quotes = [
  {
    id: "CV001",
    date: "2025-01-15",
    customer: "Indústria ABC",
    product: "Peça Modelo A",
    quantity: 500,
    unitPrice: "R$ 45,00",
    total: "R$ 22.500,00",
    status: "Enviada",
    validUntil: "2025-01-22",
  },
  {
    id: "CV002",
    date: "2025-01-14",
    customer: "Metalúrgica XYZ",
    product: "Peça Modelo B",
    quantity: 300,
    unitPrice: "R$ 62,00",
    total: "R$ 18.600,00",
    status: "Aprovada",
    validUntil: "2025-01-21",
  },
  {
    id: "CV003",
    date: "2025-01-14",
    customer: "Fábrica 123",
    product: "Peça Modelo C",
    quantity: 200,
    unitPrice: "R$ 38,00",
    total: "R$ 7.600,00",
    status: "Rascunho",
    validUntil: "2025-01-21",
  },
]

export default function CotacoesVendas() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Cotações de Venda</h1>
              <p className="text-muted-foreground">Propostas comerciais para clientes</p>
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
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">65%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 48.700</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {quotes.map((quote) => (
              <Card key={quote.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {quote.id} - {quote.customer}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Data: {new Date(quote.date).toLocaleDateString("pt-BR")} | Válida até:{" "}
                        {new Date(quote.validUntil).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        quote.status === "Enviada"
                          ? "bg-blue-100 text-blue-700"
                          : quote.status === "Aprovada"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {quote.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Produto</p>
                      <p className="text-sm font-medium">{quote.product}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Quantidade</p>
                      <p className="text-sm font-medium">{quote.quantity} un</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Preço Unitário</p>
                      <p className="text-sm font-medium">{quote.unitPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-sm font-medium text-green-600">{quote.total}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </Button>
                      {quote.status === "Rascunho" && (
                        <Button size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          Enviar
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
  )
}
