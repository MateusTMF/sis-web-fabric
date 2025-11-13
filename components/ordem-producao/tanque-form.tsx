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

export function TanqueForm({ formData, setFormData }: FormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuração</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Tipo Tanque</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Oval">Oval</SelectItem>
                  <SelectItem value="Retangular">Retangular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Formato</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Oval">Oval</SelectItem>
                  <SelectItem value="Retangular">Retangular</SelectItem>
                </SelectContent>
              </Select>
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
              <Input type="number" placeholder="Ex: 1100" />
            </div>
            <div className="space-y-2">
              <Label>Altura (mm)</Label>
              <Input type="number" placeholder="Ex: 950" />
            </div>
            <div className="space-y-2">
              <Label>Profundidade (mm)</Label>
              <Input type="number" placeholder="Ex: 325" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pesos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Peso Tanque (kg)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 0" />
            </div>
            <div className="space-y-2">
              <Label>Peso Parte Ativa (kg)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 26.39" />
            </div>
            <div className="space-y-2">
              <Label>Peso Óleo (kg)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 156" />
            </div>
            <div className="space-y-2">
              <Label>Peso Total (kg)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 155" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Volume de Óleo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Volume Total (l)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 156.0" />
            </div>
            <div className="space-y-2">
              <Label>Volume Tanque (l)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 156.0" />
            </div>
            <div className="space-y-2">
              <Label>Volume Conservador (l)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 0" />
            </div>
            <div className="space-y-2">
              <Label>Volume Tubos (l)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 2.0" />
            </div>
            <div className="space-y-2">
              <Label>Nível Óleo (%)</Label>
              <Input type="number" placeholder="Ex: 70" />
            </div>
            <div className="space-y-2">
              <Label>Elevação Óleo (°C)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 44.7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Radiadores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Número Radiadores</Label>
              <Input type="number" placeholder="Ex: 3" />
            </div>
            <div className="space-y-2">
              <Label>Número Tubos</Label>
              <Input type="number" placeholder="Ex: 10" />
            </div>
            <div className="space-y-2">
              <Label>Comprimento Tubos (mm)</Label>
              <Input type="number" placeholder="Ex: 535" />
            </div>
            <div className="space-y-2">
              <Label>Seção Tubos (mm²)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 0.51" />
            </div>
            <div className="space-y-2">
              <Label>Fator Tubos</Label>
              <Input type="number" step="0.1" placeholder="Ex: 1.6" />
            </div>
            <div className="space-y-2">
              <Label>Peso Tubos/Rad (kg)</Label>
              <Input type="number" step="0.001" placeholder="Ex: 10.962" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label>Observações</Label>
        <Textarea placeholder="Observações sobre o tanque..." rows={3} />
      </div>
    </div>
  )
}
