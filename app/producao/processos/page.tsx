import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Progress } from "../../../components/ui/progress"
import { CheckCircle, Clock, AlertCircle, Play } from "lucide-react"

const processes = [
  {
    op: "OP-1247",
    product: "Transformador 500kVA",
    stages: [
      { name: "Bobinagem", status: "completed", progress: 100, operator: "João Silva", duration: "8h" },
      { name: "Montagem", status: "in-progress", progress: 65, operator: "Maria Santos", duration: "6h" },
      { name: "Testes", status: "pending", progress: 0, operator: "-", duration: "4h" },
      { name: "Inspeção Final", status: "pending", progress: 0, operator: "-", duration: "2h" },
    ],
  },
  {
    op: "OP-1248",
    product: "Transformador 300kVA",
    stages: [
      { name: "Bobinagem", status: "in-progress", progress: 45, operator: "Pedro Costa", duration: "6h" },
      { name: "Montagem", status: "pending", progress: 0, operator: "-", duration: "5h" },
      { name: "Testes", status: "pending", progress: 0, operator: "-", duration: "3h" },
      { name: "Inspeção Final", status: "pending", progress: 0, operator: "-", duration: "2h" },
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "in-progress":
      return <Play className="h-4 w-4 text-blue-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-muted-foreground" />
    default:
      return <AlertCircle className="h-4 w-4 text-muted-foreground" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-600">Concluído</Badge>
    case "in-progress":
      return <Badge className="bg-blue-600">Em Andamento</Badge>
    case "pending":
      return <Badge variant="secondary">Pendente</Badge>
    default:
      return <Badge variant="outline">-</Badge>
  }
}

export default function ProcessosPage() {
  return (
    <PageLayout title="Controle de Processos" description="Acompanhe cada etapa do processo produtivo em tempo real">
      <div className="space-y-6">
        {processes.map((process) => (
          <Card key={process.op}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-lg">{process.op}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{process.product}</p>
                </div>
                <Badge className="bg-blue-600 w-fit">
                  {process.stages.filter((s) => s.status === "completed").length}/{process.stages.length} Etapas
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {process.stages.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(stage.status)}
                        <div>
                          <p className="font-medium text-sm">{stage.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {stage.operator !== "-" ? `Operador: ${stage.operator}` : "Aguardando"} • Duração:{" "}
                            {stage.duration}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(stage.status)}
                    </div>
                    {stage.status !== "pending" && (
                      <div className="ml-7">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="font-medium">{stage.progress}%</span>
                        </div>
                        <Progress value={stage.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
