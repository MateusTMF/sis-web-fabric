import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Mail, Phone, User } from "lucide-react"

const employees = [
  {
    id: "F001",
    name: "João Silva",
    role: "Operador de Máquina",
    department: "Produção",
    email: "joao.silva@empresa.com",
    phone: "(11) 99999-0001",
    salary: "R$ 3.500,00",
    status: "Ativo",
  },
  {
    id: "F002",
    name: "Maria Santos",
    role: "Supervisora de Produção",
    department: "Produção",
    email: "maria.santos@empresa.com",
    phone: "(11) 99999-0002",
    salary: "R$ 5.200,00",
    status: "Ativo",
  },
  {
    id: "F003",
    name: "Pedro Costa",
    role: "Analista de Compras",
    department: "Compras",
    email: "pedro.costa@empresa.com",
    phone: "(11) 99999-0003",
    salary: "R$ 4.800,00",
    status: "Ativo",
  },
  {
    id: "F004",
    name: "Ana Paula",
    role: "Inspetora de Qualidade",
    department: "Qualidade",
    email: "ana.paula@empresa.com",
    phone: "(11) 99999-0004",
    salary: "R$ 4.200,00",
    status: "Ativo",
  },
]

export default function Funcionarios() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Funcionários</h1>
              <p className="text-muted-foreground">Cadastro e gestão de colaboradores</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Funcionário
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar funcionários..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {employees.map((employee) => (
              <Card key={employee.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{employee.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">ID</p>
                        <p className="text-sm font-medium">{employee.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Departamento</p>
                        <p className="text-sm font-medium">{employee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {employee.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {employee.phone}
                    </div>
                    <div className="pt-2 border-t flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Salário</p>
                        <p className="text-sm font-medium">{employee.salary}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {employee.status}
                      </span>
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
