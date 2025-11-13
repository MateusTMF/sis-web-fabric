"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OrdemProducao } from "@/lib/types/ordem-producao"

interface FormProps {
  formData: Partial<OrdemProducao>
  setFormData: (data: Partial<OrdemProducao>) => void
}

export function PerdasRendimentoForm({ formData, setFormData }: FormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perdas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Perdas Vazio - Wo (W)</Label>
              <Input type="number" placeholder="Ex: 215" />
            </div>
            <div className="space-y-2">
              <Label>Perdas Cobre - Wc (W)</Label>
              <Input type="number" placeholder="Ex: 364" />
            </div>
            <div className="space-y-2">
              <Label>Perdas Totais (W)</Label>
              <Input type="number" placeholder="Ex: 1125" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impedância e Corrente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Impedância - Z (%)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 3.5" />
            </div>
            <div className="space-y-2">
              <Label>Corrente Vazio - Io (%)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 2.7" />
            </div>
            <div className="space-y-2">
              <Label>Rendimento (%)</Label>
              <Input type="number" step="0.001" placeholder="Ex: 93.932" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resistências e Reatâncias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Resistência AT (Ohms)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 51.53" />
            </div>
            <div className="space-y-2">
              <Label>Resistência BT (Ohms)</Label>
              <Input type="number" step="0.000001" placeholder="Ex: 0.009327" />
            </div>
            <div className="space-y-2">
              <Label>Reatância AT (Ohms)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 3.25" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gradientes de Temperatura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Gradiente AT (°C)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 5" />
            </div>
            <div className="space-y-2">
              <Label>Gradiente BT (°C)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 10.3" />
            </div>
            <div className="space-y-2">
              <Label>Elevação Temperatura (°C)</Label>
              <Input type="number" placeholder="Ex: 55" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
