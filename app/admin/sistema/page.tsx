"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Server, Database, HardDrive, Cpu, Activity, AlertTriangle } from "lucide-react"

export default function AdminSistema() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <Shield className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modo Administrador</h1>
          <p className="text-muted-foreground">Acesso total às configurações e monitoramento do sistema</p>
        </div>
      </div>

      <Card className="border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-100">Área Restrita</p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Você está no modo administrador. Alterações nesta área podem afetar todo o sistema.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status do Servidor</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Online</div>
            <Badge className="mt-2" variant="default">
              Operacional
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Uso de CPU</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Memória RAM</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62%</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "62%" }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Disco</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "78%" }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Banco de Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Tamanho do Banco</p>
                <p className="text-sm text-muted-foreground">PostgreSQL 15.2</p>
              </div>
              <p className="text-lg font-bold">2.4 GB</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Conexões Ativas</p>
                <p className="text-sm text-muted-foreground">Pool de conexões</p>
              </div>
              <p className="text-lg font-bold">45/100</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Último Backup</p>
                <p className="text-sm text-muted-foreground">Backup automático</p>
              </div>
              <p className="text-lg font-bold">Há 2h</p>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Gerenciar Banco de Dados
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Monitoramento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Requisições/min</p>
                <p className="text-sm text-muted-foreground">Tráfego atual</p>
              </div>
              <p className="text-lg font-bold">1.247</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Tempo de Resposta</p>
                <p className="text-sm text-muted-foreground">Média dos últimos 5min</p>
              </div>
              <p className="text-lg font-bold">125ms</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Uptime</p>
                <p className="text-sm text-muted-foreground">Disponibilidade</p>
              </div>
              <p className="text-lg font-bold">99.9%</p>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Ver Métricas Detalhadas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
