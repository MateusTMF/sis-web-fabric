"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OrdemProducao } from "@/lib/types/ordem-producao"

interface FormProps {
  formData: Partial<OrdemProducao>
  setFormData: (data: Partial<OrdemProducao>) => void
}

export function NucleoForm({ formData, setFormData }: FormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuração</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Tipo Núcleo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Núcleo V">Núcleo V</SelectItem>
                  <SelectItem value="Núcleo H">Núcleo H</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Número Colunas</Label>
              <Input type="number" placeholder="Ex: 3" />
            </div>
            <div className="space-y-2">
              <Label>Diâmetro Núcleo (mm)</Label>
              <Input type="number" placeholder="Ex: 112" />
            </div>
            <div className="space-y-2">
              <Label>Seção Núcleo (cm²)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 85.82" />
            </div>
            <div className="space-y-2">
              <Label>Corte (mm)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 600" />
            </div>
            <div className="space-y-2">
              <Label>Empilhamento (mm)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 105.6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dimensões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Largura (mm)</Label>
              <Input type="number" placeholder="Ex: 594" />
            </div>
            <div className="space-y-2">
              <Label>Altura (mm)</Label>
              <Input type="number" placeholder="Ex: 610" />
            </div>
            <div className="space-y-2">
              <Label>Profundidade (mm)</Label>
              <Input type="number" placeholder="Ex: 247" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chapas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Tipo Chapa</Label>
              <Input placeholder="Ex: M30" />
            </div>
            <div className="space-y-2">
              <Label>Espessura (mm)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 0.23" />
            </div>
            <div className="space-y-2">
              <Label>Fator Empilhamento</Label>
              <Input type="number" step="0.01" placeholder="Ex: 0.96" />
            </div>
            <div className="space-y-2">
              <Label>Área Líquida (cm²)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 85.82" />
            </div>
            <div className="space-y-2">
              <Label>Peso Bruto (kg)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 159.48" />
            </div>
            <div className="space-y-2">
              <Label>Peso Líquido (kg)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 154.45" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Características Magnéticas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Indutância Magnética (Gauss)</Label>
              <Input type="number" placeholder="Ex: 16264" />
            </div>
            <div className="space-y-2">
              <Label>Perda por kg (W/kg)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 1.2" />
            </div>
            <div className="space-y-2">
              <Label>VA por kg (VA/kg)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 2.62" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label>Observações</Label>
        <Textarea placeholder="Observações sobre o núcleo..." rows={3} />
      </div>
    </div>
  )
}
