import PageLayout from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, CheckCircle, Clock, XCircle } from "lucide-react"

const invoices = [
  {
    id: "NFe-001",
    type: "NF-e",
    customer: "Indústria ABC",
    value: 15750.0,
    date: "2025-01-15",
    status: "Autorizada",
    number: "12345",
  },
  {
    id: "NFe-002",
    type: "NF-e",
    customer: "Metalúrgica XYZ",
    value: 22400.0,
    date: "2025-01-14",
    status: "Autorizada",
    number: "12346",
  },
  {
    id: "NFe-003",
    type: "NF-e",
    customer: "Fábrica 123",
    value: 8900.0,
    date: "2025-01-13",
    status: "Cancelada",
    number: "12347",
  },
  {
    id: "NFe-004",
    type: "NFC-e",
    customer: "Cliente Varejo",
    value: 450.0,
    date: "2025-01-15",
    status: "Autorizada",
    number: "5001",
  },
  {
    id: "NFe-005",
    type: "NF-e",
    customer: "Indústria DEF",
    value: 18200.0,
    date: "2025-01-12",
    status: "Processando",
    number: "-",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Autorizada":
      return (
        <Badge className="bg-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Autorizada
        </Badge>
      )
    case "Processando":
      return (
        <Badge className="bg-blue-600">
          <Clock className="h-3 w-3 mr-1" />
          Processando
        </Badge>
      )
    case "Cancelada":
      return (
        <Badge variant="destructive">
          <XCircle className="h-3 w-3 mr-1" />
          Cancelada
        </Badge>
      )
    case "Rejeitada":
      return <Badge variant="destructive">Rejeitada</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function EmissaoNFePage() {
  const totalMonth = invoices.filter((i) => i.status === "Autorizada").reduce((acc, i) => acc + i.value, 0)
  const authorized = invoices.filter((i) => i.status === "Autorizada").length

  return (
    <PageLayout title="Emissão de NF-e e NFC-e" description="Emita e gerencie notas fiscais eletrônicas">
      <div className="mb-6 flex gap-3">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova NF-e
        </Button>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Nova NFC-e
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">NFs Autorizadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authorized}</div>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Processamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.filter((i) => i.status === "Processando").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Aguardando SEFAZ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Canceladas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.filter((i) => i.status === "Cancelada").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalMonth.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Faturamento</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notas Fiscais Emitidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-semibold">{invoice.id}</span>
                    <Badge variant="outline">{invoice.type}</Badge>
                    {getStatusBadge(invoice.status)}
                  </div>
                  <p className="font-medium">{invoice.customer}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Data: {new Date(invoice.date).toLocaleDateString("pt-BR")}</span>
                    {invoice.number !== "-" && <span>Número: {invoice.number}</span>}
                    <span className="font-semibold text-foreground">
                      Valor: R$ {invoice.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {invoice.status === "Autorizada" && (
                    <>
                      <Button size="sm" variant="outline">
                        DANFE
                      </Button>
                      <Button size="sm" variant="outline">
                        XML
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    Ver Detalhes
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
