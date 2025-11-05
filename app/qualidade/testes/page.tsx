import PageLayout from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, CheckCircle, XCircle, Clock, Zap } from "lucide-react"

const tests = [
  {
    id: "TEST-001",
    product: "Transformador 500kVA",
    op: "OP-1247",
    type: "Elétrico",
    date: "2025-01-15",
    status: "Aprovado",
    operator: "Ana Costa",
  },
  {
    id: "TEST-002",
    product: "Transformador 300kVA",
    op: "OP-1248",
    type: "Mecânico",
    date: "2025-01-15",
    status: "Em Teste",
    operator: "Carlos Lima",
  },
  {
    id: "TEST-003",
    product: "Transformador 750kVA",
    op: "OP-1249",
    type: "Elétrico",
    date: "2025-01-14",
    status: "Aprovado",
    operator: "Ana Costa",
  },
  {
    id: "TEST-004",
    product: "Transformador 200kVA",
    op: "OP-1250",
    type: "Mecânico",
    date: "2025-01-14",
    status: "Reprovado",
    operator: "Carlos Lima",
  },
  {
    id: "TEST-005",
    product: "Transformador 1000kVA",
    op: "OP-1251",
    type: "Elétrico",
    date: "2025-01-13",
    status: "Aprovado",
    operator: "Ana Costa",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Aprovado":
      return (
        <Badge className="bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Aprovado
        </Badge>
      )
    case "Em Teste":
      return (
        <Badge className="bg-blue-600">
          <Clock className="h-3 w-3 mr-1" />
          Em Teste
        </Badge>
      )
    case "Reprovado":
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Reprovado
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function TestesPage() {
  const approved = tests.filter((t) => t.status === "Aprovado").length
  const rejected = tests.filter((t) => t.status === "Reprovado").length
  const approvalRate = ((approved / tests.length) * 100).toFixed(1)

  return (
    <PageLayout title="Testes Elétricos e Mecânicos" description="Registro e acompanhamento de testes de qualidade">
      <div className="mb-6 flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Teste
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Testes Aprovados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approved}</div>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Teste</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.filter((t) => t.status === "Em Teste").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reprovados</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejected}</div>
            <p className="text-xs text-muted-foreground mt-1">Requer correção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Aprovação</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalRate}%</div>
            <p className="text-xs text-green-600 mt-1">Acima da meta</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Testes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tests.map((test) => (
              <div
                key={test.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{test.id}</span>
                    <Badge variant="outline">{test.type}</Badge>
                    {getStatusBadge(test.status)}
                  </div>
                  <p className="font-medium">{test.product}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>OP: {test.op}</span>
                    <span>Data: {new Date(test.date).toLocaleDateString("pt-BR")}</span>
                    <span>Operador: {test.operator}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Ver Laudo
                  </Button>
                  {test.status === "Em Teste" && <Button size="sm">Finalizar</Button>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
