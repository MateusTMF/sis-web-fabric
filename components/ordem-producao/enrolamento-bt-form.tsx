"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { OrdemProducao } from "@/lib/types/ordem-producao"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FormProps {
  formData: Partial<OrdemProducao>
  setFormData: (data: Partial<OrdemProducao>) => void
}

export function EnrolamentoBTForm({ formData, setFormData }: FormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dimensões</CardTitle>
          <CardDescription>Medidas do enrolamento de baixa tensão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Diâmetro Interno (mm)</Label>
              <Input type="number" placeholder="Ex: 117" />
            </div>
            <div className="space-y-2">
              <Label>Diâmetro Externo (mm)</Label>
              <Input type="number" placeholder="Ex: 158" />
            </div>
            <div className="space-y-2">
              <Label>Diâmetro Médio (mm)</Label>
              <Input type="number" placeholder="Ex: 137.5" />
            </div>
            <div className="space-y-2">
              <Label>Altura Bobina (mm)</Label>
              <Input type="number" placeholder="Ex: 375" />
            </div>
            <div className="space-y-2">
              <Label>Altura Útil (mm)</Label>
              <Input type="number" placeholder="Ex: 359" />
            </div>
            <div className="space-y-2">
              <Label>Altura Elétrica (mm)</Label>
              <Input type="number" placeholder="Ex: 349" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fio</CardTitle>
          <CardDescription>Especificações do fio utilizado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Tipo Fio</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fio retangular">Fio retangular</SelectItem>
                  <SelectItem value="Fio redondo">Fio redondo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Material</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Al">Alumínio</SelectItem>
                  <SelectItem value="Cu">Cobre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Disposição</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Deitado">Deitado</SelectItem>
                  <SelectItem value="Em pé">Em pé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Seção Total Fio (mm²)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 97.0" />
            </div>
            <div className="space-y-2">
              <Label>Largura Fio (mm)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 5.52" />
            </div>
            <div className="space-y-2">
              <Label>Espessura Fio (mm)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 4.5" />
            </div>
            <div className="space-y-2">
              <Label>Densidade Corrente (A/mm²)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 1.17" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enrolamento</CardTitle>
          <CardDescription>Configuração do enrolamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Número de Camadas</Label>
              <Input type="number" placeholder="Ex: 2" />
            </div>
            <div className="space-y-2">
              <Label>Número de Espiras</Label>
              <Input type="number" placeholder="Ex: 59" />
            </div>
            <div className="space-y-2">
              <Label>Espiras por Camada</Label>
              <Input type="number" step="0.1" placeholder="Ex: 29.5" />
            </div>
            <div className="space-y-2">
              <Label>Isolação Camada (mm)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 0.3" />
            </div>
            <div className="space-y-2">
              <Label>Número de Bobinas</Label>
              <Input type="number" placeholder="Ex: 1" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cabeceira</CardTitle>
          <CardDescription>Dimensões da cabeceira</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <Label>A (mm)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 8.0" />
            </div>
            <div className="space-y-2">
              <Label>B (mm)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 19.6" />
            </div>
            <div className="space-y-2">
              <Label>C (mm)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 482" />
            </div>
            <div className="space-y-2">
              <Label>E (mm)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 9.6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Isolação</CardTitle>
          <CardDescription>Dados de isolação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Isolação Axial (mm)</Label>
              <Input type="number" placeholder="Ex: 20" />
            </div>
            <div className="space-y-2">
              <Label>Isolação Radial (mm)</Label>
              <Input type="number" placeholder="Ex: 2" />
            </div>
            <div className="space-y-2">
              <Label>Enchimento (mm)</Label>
              <Input type="number" placeholder="Ex: 0" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Peso e Comprimento</CardTitle>
          <CardDescription>Dados de material</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Peso Alumínio (kg)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 21.5" />
            </div>
            <div className="space-y-2">
              <Label>Comprimento Fio (m)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 82.0" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label>Observações</Label>
        <Textarea placeholder="Observações sobre o enrolamento BT..." rows={3} />
      </div>
    </div>
  )
}
