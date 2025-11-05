"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Search, Download, Package, MapPin, CheckCircle } from "lucide-react"

export default function HistoricoRastreabilidade() {
  const eventos = [
    {
      id: 1,
      lote: "LT2025001",
      evento: "Produção Iniciada",
      data: "01/11/2025 08:00",
      local: "Linha 1",
      usuario: "João Silva",
    },
    {
      id: 2,
      lote: "LT2025001",
      evento: "Inspeção de Qualidade",
      data: "01/11/2025 14:30",
      local: "Qualidade",
      usuario: "Ana Paula",
    },
    {
      id: 3,
      lote: "LT2025001",
      evento: "Armazenamento",
      data: "01/11/2025 16:00",
      local: "Estoque PA",
      usuario: "Sistema",
    },
    {
      id: 4,
      lote: "LT2025002",
      evento: "Produção Iniciada",
      data: "02/11/2025 09:00",
      local: "Linha 2",
      usuario: "Maria Santos",
    },
    {
      id: 5,
      lote: "LT2025003",
      evento: "Expedição",
      data: "03/11/2025 10:30",
      local: "Expedição",
      usuario: "Pedro Costa",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Rastreabilidade</h1>
        <p className="text-muted-foreground mt-2">Visualize todo o histórico de movimentações e eventos dos lotes</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Buscar Histórico</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por lote..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {evento.evento.includes("Produção") ? (
                    <Package className="h-5 w-5 text-primary" />
                  ) : evento.evento.includes("Expedição") ? (
                    <MapPin className="h-5 w-5 text-primary" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold">{evento.evento}</h3>
                      <p className="text-sm text-muted-foreground">Lote: {evento.lote}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium">{evento.data}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {evento.local}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {evento.usuario}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
