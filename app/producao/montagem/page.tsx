import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Wrench, Clock, CheckCircle, AlertCircle, Play, Pause } from "lucide-react"

export default function ProducaoMontagemPage() {
  const montagens = [
    {
      id: 1,
      produto: "Motor Elétrico 5HP",
      op: "OP-2024-001",
      status: "em_andamento",
      progresso: 65,
      operador: "João Silva",
      inicio: "08:00",
    },
    {
      id: 2,
      produto: "Motor Elétrico 10HP",
      op: "OP-2024-002",
      status: "aguardando",
      progresso: 0,
      operador: "-",
      inicio: "-",
    },
    {
      id: 3,
      produto: "Motor Elétrico 3HP",
      op: "OP-2024-003",
      status: "concluido",
      progresso: 100,
      operador: "Maria Santos",
      inicio: "07:00",
    },
  ]

  return (
    <PageLayout title="Montagem" description="Controle de processos de montagem de produtos">
      <div className="grid gap-6">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Montagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">8</span>
                <Wrench className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aguardando</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">5</span>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Concluídas Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">12</span>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Com Problemas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">2</span>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Montagens */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Ordens de Montagem</CardTitle>
                <CardDescription>Acompanhe o progresso das montagens em tempo real</CardDescription>
              </div>
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Iniciar Nova Montagem
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {montagens.map((montagem) => (
                <div key={montagem.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium mb-1">{montagem.produto}</h3>
                      <p className="text-sm text-muted-foreground">{montagem.op}</p>
                    </div>
                    <Badge
                      variant={
                        montagem.status === "em_andamento"
                          ? "default"
                          : montagem.status === "concluido"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {montagem.status === "em_andamento"
                        ? "Em Andamento"
                        : montagem.status === "concluido"
                          ? "Concluído"
                          : "Aguardando"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Operador:</span>
                      <span className="ml-2 font-medium">{montagem.operador}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Início:</span>
                      <span className="ml-2 font-medium">{montagem.inicio}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">{montagem.progresso}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${montagem.progresso}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {montagem.status === "em_andamento" && (
                      <>
                        <Button size="sm" variant="outline">
                          <Pause className="mr-2 h-4 w-4" />
                          Pausar
                        </Button>
                        <Button size="sm">Finalizar</Button>
                      </>
                    )}
                    {montagem.status === "aguardando" && (
                      <Button size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Iniciar
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                      Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
