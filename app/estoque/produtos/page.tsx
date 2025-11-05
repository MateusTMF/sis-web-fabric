import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

const products = [
  { id: "P001", name: "Parafuso M8", category: "Fixação", stock: 1500, min: 500, price: "R$ 0,50" },
  { id: "P002", name: "Chapa de Aço 2mm", category: "Matéria Prima", stock: 250, min: 100, price: "R$ 45,00" },
  { id: "P003", name: "Tinta Epóxi Branca", category: "Acabamento", stock: 80, min: 50, price: "R$ 120,00" },
  { id: "P004", name: "Rolamento 6205", category: "Componentes", stock: 45, min: 100, price: "R$ 35,00" },
  { id: "P005", name: "Motor Elétrico 5HP", category: "Componentes", stock: 12, min: 20, price: "R$ 850,00" },
]

export default function Produtos() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Produtos</h1>
              <p className="text-muted-foreground">Gerenciamento de produtos em estoque</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar produtos..." className="pl-10" />
                </div>
                <Button variant="outline">Filtros</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Código</th>
                      <th className="text-left p-4 font-medium">Nome</th>
                      <th className="text-left p-4 font-medium">Categoria</th>
                      <th className="text-left p-4 font-medium">Estoque</th>
                      <th className="text-left p-4 font-medium">Mínimo</th>
                      <th className="text-left p-4 font-medium">Preço</th>
                      <th className="text-left p-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">{product.id}</td>
                        <td className="p-4 font-medium">{product.name}</td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">
                          <span
                            className={`font-medium ${product.stock < product.min ? "text-red-600" : "text-green-600"}`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4">{product.min}</td>
                        <td className="p-4">{product.price}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
