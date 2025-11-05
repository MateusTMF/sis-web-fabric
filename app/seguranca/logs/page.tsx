"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Shield, Search, Filter, Download, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LogsSeguranca() {
  const logs = [
    {
      id: 1,
      usuario: "admin@empresa.com",
      acao: "Login bem-sucedido",
      data: "05/11/2025 14:30",
      ip: "192.168.1.100",
      tipo: "info",
    },
    {
      id: 2,
      usuario: "joao.silva@empresa.com",
      acao: "Alteração de senha",
      data: "05/11/2025 13:15",
      ip: "192.168.1.105",
      tipo: "info",
    },
    {
      id: 3,
      usuario: "desconhecido",
      acao: "Tentativa de login falha",
      data: "05/11/2025 12:00",
      ip: "203.0.113.45",
      tipo: "alerta",
    },
    {
      id: 4,
      usuario: "maria.santos@empresa.com",
      acao: "Acesso ao módulo financeiro",
      data: "05/11/2025 11:30",
      ip: "192.168.1.110",
      tipo: "info",
    },
    {
      id: 5,
      usuario: "pedro.costa@empresa.com",
      acao: "Exportação de relatório",
      data: "05/11/2025 10:45",
      ip: "192.168.1.115",
      tipo: "sucesso",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Logs de Segurança</h1>
        <p className="text-muted-foreground mt-2">Monitore todas as atividades e eventos de segurança do sistema</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eventos Hoje</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.247</div>
            <p className="text-xs text-muted-foreground mt-1">Registros de atividade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">Requer atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Usuários Ativos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">Online agora</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Sucesso</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-green-600 mt-1">Operações bem-sucedidas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Registro de Atividades</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar logs..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.usuario}</TableCell>
                    <TableCell>{log.acao}</TableCell>
                    <TableCell>{log.data}</TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.tipo === "alerta" ? "destructive" : log.tipo === "sucesso" ? "default" : "secondary"
                        }
                      >
                        {log.tipo === "alerta" ? "Alerta" : log.tipo === "sucesso" ? "Sucesso" : "Info"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
