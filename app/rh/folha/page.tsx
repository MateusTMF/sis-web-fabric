import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, DollarSign, Users, TrendingUp } from "lucide-react"

const payroll = [
  {
    month: "Janeiro 2025",
    employees: 87,
    grossTotal: "R$ 304.500,00",
    deductions: "R$ 45.675,00",
    netTotal: "R$ 258.825,00",
    status: "Processada",
  },
  {
    month: "Dezembro 2024",
    employees: 85,
    grossTotal: "R$ 297.500,00",
    deductions: "R$ 44.625,00",
    netTotal: "R$ 252.875,00",
    status: "Paga",
  },
  {
    month: "Novembro 2024",
    employees: 84,
    grossTotal: "R$ 294.000,00",
    deductions: "R$ 44.100,00",
    netTotal: "R$ 249.900,00",
    status: "Paga",
  },
]

export default function FolhaPagamento() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Folha de Pagamento</h1>
              <p className="text-muted-foreground">Gestão de salários e encargos</p>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Exportar Folha
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Bruto (Mês)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 304.500</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.4% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Líquido (Mês)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 258.825</div>
                <p className="text-xs text-muted-foreground mt-1">Após descontos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Funcionários</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-muted-foreground mt-1">Colaboradores ativos</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Folhas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payroll.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{item.month}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.employees} funcionários</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "Processada" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Bruto</p>
                        <p className="text-sm font-medium">{item.grossTotal}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Descontos</p>
                        <p className="text-sm font-medium text-red-600">{item.deductions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Líquido</p>
                        <p className="text-sm font-medium text-green-600">{item.netTotal}</p>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar Holerite
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
