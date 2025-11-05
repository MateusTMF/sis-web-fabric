import Sidebar from "../../../components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Plus, Search, Edit, Phone, Mail } from "lucide-react"

const suppliers = [
  {
    id: "F001",
    name: "Metalúrgica Silva",
    cnpj: "12.345.678/0001-90",
    contact: "Carlos Silva",
    phone: "(11) 98765-4321",
    email: "contato@metalurgicasilva.com.br",
    rating: 4.5,
  },
  {
    id: "F002",
    name: "Tintas Premium",
    cnpj: "23.456.789/0001-01",
    contact: "Ana Costa",
    phone: "(11) 97654-3210",
    email: "vendas@tintaspremium.com.br",
    rating: 4.8,
  },
  {
    id: "F003",
    name: "Componentes Tech",
    cnpj: "34.567.890/0001-12",
    contact: "Roberto Santos",
    phone: "(11) 96543-2109",
    email: "comercial@componentestech.com.br",
    rating: 4.2,
  },
  {
    id: "F004",
    name: "Parafusos Brasil",
    cnpj: "45.678.901/0001-23",
    contact: "Mariana Lima",
    phone: "(11) 95432-1098",
    email: "vendas@parafusosbrasil.com.br",
    rating: 4.6,
  },
]

export default function Fornecedores() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Fornecedores</h1>
              <p className="text-muted-foreground">Cadastro e gestão de fornecedores</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Fornecedor
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar fornecedores..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">CNPJ: {supplier.cnpj}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Contato</p>
                      <p className="text-sm text-muted-foreground">{supplier.contact}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {supplier.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {supplier.email}
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-sm font-medium">Avaliação:</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm ml-1">{supplier.rating}</span>
                      </div>
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
