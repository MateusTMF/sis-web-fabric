"use client";
import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const cashFlowData = [
  { month: "Jul", entrada: 45000, saida: 38000 },
  { month: "Ago", entrada: 52000, saida: 42000 },
  { month: "Set", entrada: 48000, saida: 39000 },
  { month: "Out", entrada: 61000, saida: 45000 },
  { month: "Nov", entrada: 55000, saida: 41000 },
  { month: "Dez", entrada: 67000, saida: 48000 },
]

const balanceData = [
  { month: "Jul", saldo: 125000 },
  { month: "Ago", saldo: 135000 },
  { month: "Set", saldo: 144000 },
  { month: "Out", saldo: 160000 },
  { month: "Nov", saldo: 174000 },
  { month: "Dez", saldo: 193000 },
]

export default function FluxoCaixa() {
  return (
    <PageLayout title="Fluxo de Caixa" description="Análise completa de entradas e saídas financeiras">
      <div className="min-h-screen bg-background">
        <main className="pl-0 md:pl-0">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Fluxo de Caixa</h1>
              <p className="text-muted-foreground">Análise de entradas e saídas financeiras</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Atual</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">R$ 193.000</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +10.9% vs mês anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Entradas (Mês)</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 67.000</div>
                  <p className="text-xs text-muted-foreground mt-1">Receitas e recebimentos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Saídas (Mês)</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 48.000</div>
                  <p className="text-xs text-muted-foreground mt-1">Despesas e pagamentos</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Entradas vs Saídas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="entrada" fill="hsl(var(--chart-1))" name="Entradas" />
                      <Bar dataKey="saida" fill="hsl(var(--chart-2))" name="Saídas" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evolução do Saldo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={balanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="saldo" stroke="hsl(var(--primary))" strokeWidth={2} name="Saldo" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resumo Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Mês</th>
                        <th className="text-left p-4 font-medium">Entradas</th>
                        <th className="text-left p-4 font-medium">Saídas</th>
                        <th className="text-left p-4 font-medium">Resultado</th>
                        <th className="text-left p-4 font-medium">Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashFlowData.map((data, index) => {
                        const resultado = data.entrada - data.saida
                        return (
                          <tr key={data.month} className="border-b hover:bg-muted/50">
                            <td className="p-4 font-medium">{data.month}</td>
                            <td className="p-4 text-green-600">R$ {data.entrada.toLocaleString("pt-BR")}</td>
                            <td className="p-4 text-red-600">R$ {data.saida.toLocaleString("pt-BR")}</td>
                            <td className={`p-4 font-medium ${resultado > 0 ? "text-green-600" : "text-red-600"}`}>
                              R$ {resultado.toLocaleString("pt-BR")}
                            </td>
                            <td className="p-4 font-medium">R$ {balanceData[index].saldo.toLocaleString("pt-BR")}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}
