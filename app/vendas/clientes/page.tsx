import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Phone, Mail, Building } from "lucide-react"

const customers = [
  {
    id: "C001",
    name: "Indústria ABC",
    cnpj: "11.222.333/0001-44",
    contact: "Roberto Silva",
    phone: "(11) 99999-8888",
    email: "contato@industriaabc.com.br",
    totalOrders: 15,
    totalValue: "R$ 245.000",
  },
  {
    id: "C002",
    name: "Metalúrgica XYZ",
    cnpj: "22.333.444/0001-55",
    contact: "Fernanda Costa",
    phone: "(11) 98888-7777",
    email: "compras@metalurgicaxyz.com.br",
    totalOrders: 8,
    totalValue: "R$ 128.000",
  },
  {
    id: "C003",
    name: "Fábrica 123",
    cnpj: "33.444.555/0001-66",
    contact: "Paulo Santos",
    phone: "(11) 97777-6666",
    email: "vendas@fabrica123.com.br",
    totalOrders: 12,
    totalValue: "R$ 189.000",
  },
]

export default function Clientes() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Clientes</h1>
              <p className="text-muted-foreground">Cadastro e gestão de clientes</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar clientes..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6">
            {customers.map((customer) => (
              <Card key={customer.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{customer.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">CNPJ: {customer.cnpj}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Contato</p>
                        <p className="text-sm text-muted-foreground">{customer.contact}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {customer.email}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm text-muted-foreground">Total de Pedidos</span>
                        <span className="text-lg font-bold">{customer.totalOrders}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm text-muted-foreground">Valor Total</span>
                        <span className="text-lg font-bold text-green-600">{customer.totalValue}</span>
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
