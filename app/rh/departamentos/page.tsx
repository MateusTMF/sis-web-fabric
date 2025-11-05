import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, Edit } from "lucide-react"

const departments = [
  {
    id: "D001",
    name: "Produção",
    manager: "Maria Santos",
    employees: 45,
    budget: "R$ 157.500,00",
    description: "Responsável pela fabricação e montagem de produtos",
  },
  {
    id: "D002",
    name: "Qualidade",
    manager: "Carlos Oliveira",
    employees: 8,
    budget: "R$ 33.600,00",
    description: "Controle e inspeção de qualidade dos produtos",
  },
  {
    id: "D003",
    name: "Compras",
    manager: "Ana Costa",
    employees: 5,
    budget: "R$ 24.000,00",
    description: "Aquisição de matéria-prima e insumos",
  },
  {
    id: "D004",
    name: "Vendas",
    manager: "Roberto Lima",
    employees: 12,
    budget: "R$ 57.600,00",
    description: "Comercialização e relacionamento com clientes",
  },
  {
    id: "D005",
    name: "Administrativo",
    manager: "Fernanda Souza",
    employees: 17,
    budget: "R$ 81.600,00",
    description: "Gestão administrativa e financeira",
  },
]

export default function Departamentos() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Departamentos</h1>
              <p className="text-muted-foreground">Estrutura organizacional da empresa</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Departamento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Departamentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de Funcionários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Orçamento Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 354.300</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept) => (
              <Card key={dept.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Gestor: {dept.manager}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{dept.description}</p>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Funcionários</p>
                          <p className="text-lg font-medium">{dept.employees}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Orçamento Mensal</p>
                        <p className="text-lg font-medium">{dept.budget}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">% do Total</span>
                        <span className="font-medium">{Math.round((dept.employees / 87) * 100)}% dos funcionários</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(dept.employees / 87) * 100}%` }}
                        />
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
