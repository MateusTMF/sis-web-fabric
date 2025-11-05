import Sidebar from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, TrendingUp, Package, DollarSign } from "lucide-react"

export default function RelatoriosRapidos() {
  const reports = [
    { title: "Vendas do Dia", icon: DollarSign, value: "R$ 12.450", change: "+5.2%" },
    { title: "Produção do Dia", icon: Package, value: "142 unidades", change: "+3.1%" },
    { title: "Pedidos Pendentes", icon: FileText, value: "23 pedidos", change: "-2 vs ontem" },
    { title: "Taxa de Conversão", icon: TrendingUp, value: "68%", change: "+4.5%" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-0 md:pl-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Relatórios Rápidos</h1>
              <p className="text-muted-foreground">Métricas e indicadores em tempo real</p>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Exportar Todos
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {reports.map((report) => (
              <Card key={report.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{report.title}</CardTitle>
                  <report.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report.value}</div>
                  <p className="text-xs text-green-600 mt-1">{report.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Relatório de Vendas Diário",
                  "Relatório de Produção Semanal",
                  "Análise de Estoque",
                  "Performance de Funcionários",
                  "Fluxo de Caixa",
                ].map((report) => (
                  <div key={report} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{report}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
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
