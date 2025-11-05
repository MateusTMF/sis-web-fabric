import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

const materials = [
  {
    id: "MAT-001",
    name: "Fio de Cobre 2.5mm",
    category: "Matéria Prima",
    unit: "Metro",
    stock: 1500,
    min: 500,
    max: 3000,
    price: 12.5,
  },
  {
    id: "MAT-002",
    name: "Chapa de Aço 3mm",
    category: "Matéria Prima",
    unit: "Kg",
    stock: 850,
    min: 300,
    max: 1500,
    price: 8.75,
  },
  {
    id: "MAT-003",
    name: "Parafuso M8",
    category: "Componente",
    unit: "Unidade",
    stock: 2500,
    min: 1000,
    max: 5000,
    price: 0.45,
  },
  {
    id: "MAT-004",
    name: "Tinta Industrial Azul",
    category: "Acabamento",
    unit: "Litro",
    stock: 45,
    min: 50,
    max: 200,
    price: 35.0,
  },
  {
    id: "MAT-005",
    name: "Óleo Isolante",
    category: "Insumo",
    unit: "Litro",
    stock: 320,
    min: 100,
    max: 500,
    price: 28.9,
  },
]

const getStockStatus = (stock: number, min: number) => {
  if (stock < min) return <Badge variant="destructive">Crítico</Badge>
  if (stock < min * 1.5) return <Badge className="bg-yellow-600">Baixo</Badge>
  return <Badge className="bg-green-600">Normal</Badge>
}

export default function CadastroMateriaisPage() {
  return (
    <PageLayout
      title="Cadastro de Itens e Insumos"
      description="Gerencie o cadastro de materiais, insumos e componentes"
    >
      {/* New Material Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Novo Material
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input id="code" placeholder="MAT-XXX" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Nome do Material</Label>
                <Input id="name" placeholder="Digite o nome do material" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="materia-prima">Matéria Prima</SelectItem>
                    <SelectItem value="componente">Componente</SelectItem>
                    <SelectItem value="acabamento">Acabamento</SelectItem>
                    <SelectItem value="insumo">Insumo</SelectItem>
                    <SelectItem value="embalagem">Embalagem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="un">Unidade</SelectItem>
                    <SelectItem value="kg">Kg</SelectItem>
                    <SelectItem value="m">Metro</SelectItem>
                    <SelectItem value="l">Litro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="min">Estoque Mínimo</Label>
                <Input id="min" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Estoque Máximo</Label>
                <Input id="max" type="number" placeholder="0" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço Médio (R$)</Label>
                <Input id="price" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Fornecedor Principal</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forn1">Fornecedor A</SelectItem>
                    <SelectItem value="forn2">Fornecedor B</SelectItem>
                    <SelectItem value="forn3">Fornecedor C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input id="location" placeholder="Ex: Prateleira A-12" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar Material
              </Button>
              <Button type="button" variant="outline">
                Limpar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por código, nome ou categoria..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="materia-prima">Matéria Prima</SelectItem>
                <SelectItem value="componente">Componente</SelectItem>
                <SelectItem value="acabamento">Acabamento</SelectItem>
                <SelectItem value="insumo">Insumo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>Materiais Cadastrados ({materials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {materials.map((material) => (
              <div
                key={material.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{material.id}</span>
                    <Badge variant="outline">{material.category}</Badge>
                    {getStockStatus(material.stock, material.min)}
                  </div>
                  <p className="font-medium">{material.name}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>
                      Estoque: {material.stock} {material.unit}
                    </span>
                    <span>Mín: {material.min}</span>
                    <span>Máx: {material.max}</span>
                    <span>Preço: R$ {material.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
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
