import PageLayout from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Package } from "lucide-react"

const products = [
  {
    id: "PROD-001",
    name: "Transformador 500kVA",
    category: "Transformadores",
    stock: 12,
    price: 45000.0,
    status: "active",
  },
  {
    id: "PROD-002",
    name: "Transformador 300kVA",
    category: "Transformadores",
    stock: 18,
    price: 32000.0,
    status: "active",
  },
  {
    id: "PROD-003",
    name: "Transformador 750kVA",
    category: "Transformadores",
    stock: 8,
    price: 58000.0,
    status: "active",
  },
  {
    id: "PROD-004",
    name: "Transformador 1000kVA",
    category: "Transformadores",
    stock: 5,
    price: 75000.0,
    status: "active",
  },
  {
    id: "PROD-005",
    name: "Transformador 200kVA",
    category: "Transformadores",
    stock: 22,
    price: 25000.0,
    status: "active",
  },
]

export default function CadastroProdutosPage() {
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0)
  const totalValue = products.reduce((acc, p) => acc + p.stock * p.price, 0)

  return (
    <PageLayout title="Cadastro de Produtos" description="Gerencie o catálogo de produtos acabados">
      {/* New Product Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Novo Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input id="code" placeholder="PROD-XXX" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input id="name" placeholder="Digite o nome do produto" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transformadores">Transformadores</SelectItem>
                    <SelectItem value="reatores">Reatores</SelectItem>
                    <SelectItem value="paineis">Painéis Elétricos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço de Venda (R$)</Label>
                <Input id="price" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Estoque Inicial</Label>
                <Input id="stock" type="number" placeholder="0" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Produto
              </Button>
              <Button type="button" variant="outline">
                Limpar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Produtos Cadastrados</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estoque Total</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock} un</div>
            <p className="text-xs text-muted-foreground mt-1">Produtos acabados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor em Estoque</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(totalValue / 1000).toFixed(0)}k</div>
            <p className="text-xs text-muted-foreground mt-1">Valor total</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por código ou nome..." className="pl-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{product.id}</span>
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge className="bg-green-600">Ativo</Badge>
                  </div>
                  <p className="font-medium">{product.name}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Estoque: {product.stock} un</span>
                    <span>Preço: R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
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
