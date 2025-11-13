"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrdemProducao } from "@/lib/types/ordem-producao"

interface FormProps {
  formData: Partial<OrdemProducao>
  setFormData: (data: Partial<OrdemProducao>) => void
}

export function EnrolamentoATForm({ formData, setFormData }: FormProps) {
  const updateEnrolamentoAT = (field: string, value: any) => {
    setFormData({
      ...formData,
      enrolamentoAT: {
        ...formData.enrolamentoAT,
        [field]: value,
      } as any,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dimensões</CardTitle>
          <CardDescription>Medidas do enrolamento de alta tensão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Diâmetro Interno (mm)</Label>
              <Input type="number" placeholder="Ex: 172" />
            </div>
            <div className="space-y-2">
              <Label>Diâmetro Externo (mm)</Label>
              <Input type="number" placeholder="Ex: 240" />
            </div>
            <div className="space-y-2">
              <Label>Diâmetro Médio (mm)</Label>
              <Input type="number" placeholder="Ex: 206" />
            </div>
            <div className="space-y-2">
              <Label>Altura Bobina (mm)</Label>
              <Input type="number" placeholder="Ex: 375" />
            </div>
            <div className="space-y-2">
              <Label>Altura Útil (mm)</Label>
              <Input type="number" placeholder="Ex: 343" />
            </div>
            <div className="space-y-2">
              <Label>Altura Elétrica (mm)</Label>
              <Input type="number" placeholder="Ex: 347" />
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
              <Label>Diâmetro Fio (mm)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 1.53" />
            </div>
            <div className="space-y-2">
              <Label>AWG</Label>
              <Input placeholder="Ex: 15 AWG" />
            </div>
            <div className="space-y-2">
              <Label>Seção Fio (mm²)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 1.65" />
            </div>
            <div className="space-y-2">
              <Label>Densidade Corrente 1 (A/mm²)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 1.10" />
            </div>
            <div className="space-y-2">
              <Label>Densidade Corrente 2 (A/mm²)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 1.33" />
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
              <Input type="number" placeholder="Ex: 17" />
            </div>
            <div className="space-y-2">
              <Label>Número de Espiras</Label>
              <Input type="number" placeholder="Ex: 3711" />
            </div>
            <div className="space-y-2">
              <Label>Espiras por Camada</Label>
              <Input type="number" placeholder="Ex: 220" />
            </div>
            <div className="space-y-2">
              <Label>Isolação Camada (mm)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 0.3" />
            </div>
            <div className="space-y-2">
              <Label>Volt por Espira (V/esp)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 3.72" />
            </div>
            <div className="space-y-2">
              <Label>Corte</Label>
              <Input type="number" placeholder="Ex: 161" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Canais</CardTitle>
          <CardDescription>Configuração dos canais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Número de Canais</Label>
              <Input type="number" placeholder="Ex: 1" />
            </div>
            <div className="space-y-2">
              <Label>Espessura Canal (mm)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 2.0" />
            </div>
            <div className="space-y-2">
              <Label>Número Meio Canal</Label>
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
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Peso Alumínio (kg)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 33.0" />
            </div>
            <div className="space-y-2">
              <Label>Comprimento Fio (m)</Label>
              <Input type="number" step="0.1" placeholder="Ex: 7205" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label>Observações</Label>
        <Textarea placeholder="Observações sobre o enrolamento AT..." rows={3} />
      </div>
    </div>
  )
}
