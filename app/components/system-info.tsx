"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Database, Clock, Package, User, Shield } from "lucide-react"

interface SystemInfo {
  currentDate: string
  currentTime: string
  lastBackup: string
  version: string
  user: string
  userType: string
  systemStatus: "online" | "warning" | "error"
  uptime: string
}

export default function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    currentDate: "",
    currentTime: "",
    lastBackup: "Há 2 horas",
    version: "1.0.0",
    user: "João Silva",
    userType: "Gerente",
    systemStatus: "online",
    uptime: "45 dias",
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const dateStr = now.toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      const timeStr = now.toLocaleTimeString("pt-BR")
      setSystemInfo((prev) => ({
        ...prev,
        currentDate: dateStr,
        currentTime: timeStr,
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const infoItems = [
    {
      icon: Clock,
      label: "Data",
      value: systemInfo.currentDate,
      color: "text-blue-500",
    },
    {
      icon: Clock,
      label: "Hora",
      value: systemInfo.currentTime,
      color: "text-purple-500",
    },
    {
      icon: Database,
      label: "Último Backup",
      value: systemInfo.lastBackup,
      color: "text-green-500",
    },
    {
      icon: Package,
      label: "Versão",
      value: systemInfo.version,
      color: "text-orange-500",
    },
    {
      icon: User,
      label: "Usuário",
      value: systemInfo.user,
      color: "text-indigo-500",
    },
    {
      icon: Shield,
      label: "Tipo de Usuário",
      value: systemInfo.userType,
      color: "text-cyan-500",
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Bem-vindo ao ERP</h2>
        <p className="text-muted-foreground">Informações e status do sistema</p>
      </div>

      {/* Status do Sistema */}
      <Card className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Status do Sistema</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">Online</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Tempo de Atividade</p>
              <p className="text-lg font-semibold text-foreground">{systemInfo.uptime}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">CPU</p>
              <p className="text-lg font-semibold text-foreground">45%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Memória</p>
              <p className="text-lg font-semibold text-foreground">62%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Informações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {infoItems.map((item) => {
          const IconComponent = item.icon
          return (
            <Card key={item.label} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
                  <IconComponent className={`w-5 h-5 ${item.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground break-words">{item.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Atividades Recentes */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Backup do banco de dados",
                time: "Há 2 horas",
              },
              {
                action: "Atualização de estoque",
                time: "Há 30 minutos",
              },
              {
                action: "Novo pedido registrado",
                time: "Há 15 minutos",
              },
              {
                action: "Relatório gerado",
                time: "Há 5 minutos",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{activity.action}</span>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
