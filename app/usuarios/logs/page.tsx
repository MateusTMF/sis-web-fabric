import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Activity, User, Clock, FileText, Download } from "lucide-react"

export default function UsuariosLogsPage() {
  const logs = [
    { id: 1, usuario: "João Silva", acao: "Login no sistema", data: "2024-01-15 08:30", tipo: "info" },
    {
      id: 2,
      usuario: "Maria Santos",
      acao: "Criou ordem de produção #1234",
      data: "2024-01-15 09:15",
      tipo: "success",
    },
    { id: 3, usuario: "Pedro Costa", acao: "Alterou cadastro de produto", data: "2024-01-15 10:00", tipo: "warning" },
    { id: 4, usuario: "Ana Lima", acao: "Excluiu fornecedor", data: "2024-01-15 11:30", tipo: "error" },
    {
      id: 5,
      usuario: "Carlos Souza",
      acao: "Aprovou solicitação de materiais",
      data: "2024-01-15 13:00",
      tipo: "success",
    },
  ]

  return (
    <PageLayout title="Logs e Auditoria de Ações" description="Histórico completo de ações dos usuários no sistema">
      <div className="grid gap-6">
        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Usuário</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Todos</option>
                  <option>João Silva</option>
                  <option>Maria Santos</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tipo de Ação</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Todas</option>
                  <option>Login/Logout</option>
                  <option>Criação</option>
                  <option>Alteração</option>
                  <option>Exclusão</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Data Inicial</label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Data Final</label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button>Filtrar</Button>
              <Button variant="outline">Limpar</Button>
              <Button variant="outline" className="ml-auto bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Ações</CardTitle>
            <CardDescription>Últimas 100 ações registradas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{log.usuario}</span>
                      <Badge
                        variant={
                          log.tipo === "error" ? "destructive" : log.tipo === "warning" ? "secondary" : "default"
                        }
                      >
                        {log.tipo}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{log.acao}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {log.data}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
