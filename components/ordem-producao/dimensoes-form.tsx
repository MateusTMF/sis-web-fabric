"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OrdemProducao } from "@/lib/types/ordem-producao"

interface FormProps {
  formData: Partial<OrdemProducao>
  setFormData: (data: Partial<OrdemProducao>) => void
}

export function DimensoesForm({ formData, setFormData }: FormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vigas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Largura (mm)</Label>
              <Input type="number" placeholder="Ex: 60" />
            </div>
            <div className="space-y-2">
              <Label>Comprimento (mm)</Label>
              <Input type="number" placeholder="Ex: 675" />
            </div>
            <div className="space-y-2">
              <Label>Massa (kg)</Label>
              <Input type="number" step="0.01" placeholder="Ex: 11.90" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sapatas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Dimensões</Label>
              <Input placeholder="Ex: 310 x 25 x 45 x 25 - 3,3" />
            </div>
            <div className="space-y-2">
              <Label>Quantidade</Label>
              <Input type="number" placeholder="Ex: 2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estirantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Dimensões Horizontal</Label>
              <Input placeholder='Ex: 185 x 1/2"' />
            </div>
            <div className="space-y-2">
              <Label>Quantidade Horizontal</Label>
              <Input type="number" placeholder="Ex: 4" />
            </div>
            <div className="space-y-2">
              <Label>Dimensões Vertical</Label>
              <Input placeholder='Ex: 550 x 3/8"' />
            </div>
            <div className="space-y-2">
              <Label>Quantidade Vertical</Label>
              <Input type="number" placeholder="Ex: 4" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fixação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Dimensões</Label>
              <Input placeholder='Ex: 150 x 40 x 1/4"' />
            </div>
            <div className="space-y-2">
              <Label>Quantidade</Label>
              <Input type="number" placeholder="Ex: 2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dimensões Totais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Altura (mm)</Label>
              <Input type="number" placeholder="Ex: 830" />
            </div>
            <div className="space-y-2">
              <Label>Largura (mm)</Label>
              <Input type="number" placeholder="Ex: 785" />
            </div>
            <div className="space-y-2">
              <Label>Profundidade (mm)</Label>
              <Input type="number" placeholder="Ex: 325" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
