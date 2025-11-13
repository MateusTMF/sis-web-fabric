"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OrdemProducao } from "@/lib/types/ordem-producao"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface FormProps {
  formData: Partial<OrdemProducao>
  setFormData: (data: Partial<OrdemProducao>) => void
}

export function DadosEletricosForm({ formData, setFormData }: FormProps) {
  const updateDadosEletricos = (field: string, value: any) => {
    setFormData({
      ...formData,
      dadosEletricos: {
        ...formData.dadosEletricos,
        [field]: value,
      } as any,
    })
  }

  const addTap = () => {
    const taps = formData.dadosEletricos?.taps || []
    setFormData({
      ...formData,
      dadosEletricos: {
        ...formData.dadosEletricos,
        taps: [
          ...taps,
          {
            numero: taps.length + 1,
            tensaoAT: 0,
            tensaoBT: 0,
            erro: 0,
            espirasAT: 0,
            espirasBT: 0,
            relacao: 0,
            relacaoCalculada: 0,
            relacaoFabricada: 0,
          },
        ],
      } as any,
    })
  }

  const removeTap = (index: number) => {
    const taps = formData.dadosEletricos?.taps || []
    setFormData({
      ...formData,
      dadosEletricos: {
        ...formData.dadosEletricos,
        taps: taps.filter((_, i) => i !== index),
      } as any,
    })
  }

  return (
    <div className="space-y-6">
      {/* Alta Tensão */}
      <Card>
        <CardHeader>
          <CardTitle>Alta Tensão (AT)</CardTitle>
          <CardDescription>Dados elétricos do enrolamento de alta tensão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tensaoNominalAT">Tensão Nominal (V)</Label>
              <Input
                id="tensaoNominalAT"
                type="number"
                placeholder="Ex: 13800"
                value={formData.dadosEletricos?.tensaoNominalAT || ""}
                onChange={(e) => updateDadosEletricos("tensaoNominalAT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tensaoMinimaAT">Tensão Mínima (V)</Label>
              <Input
                id="tensaoMinimaAT"
                type="number"
                placeholder="Ex: 11400"
                value={formData.dadosEletricos?.tensaoMinimaAT || ""}
                onChange={(e) => updateDadosEletricos("tensaoMinimaAT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tensaoMaximaAT">Tensão Máxima (V)</Label>
              <Input
                id="tensaoMaximaAT"
                type="number"
                placeholder="Ex: 13800"
                value={formData.dadosEletricos?.tensaoMaximaAT || ""}
                onChange={(e) => updateDadosEletricos("tensaoMaximaAT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="correnteNominalAT">Corrente Nominal (A)</Label>
              <Input
                id="correnteNominalAT"
                type="number"
                step="0.01"
                placeholder="Ex: 1.81"
                value={formData.dadosEletricos?.correnteNominalAT || ""}
                onChange={(e) => updateDadosEletricos("correnteNominalAT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="correnteMinimaAT">Corrente Mínima (A)</Label>
              <Input
                id="correnteMinimaAT"
                type="number"
                step="0.01"
                placeholder="Ex: 1.81"
                value={formData.dadosEletricos?.correnteMinimaAT || ""}
                onChange={(e) => updateDadosEletricos("correnteMinimaAT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="correnteMaximaAT">Corrente Máxima (A)</Label>
              <Input
                id="correnteMaximaAT"
                type="number"
                step="0.01"
                placeholder="Ex: 2.19"
                value={formData.dadosEletricos?.correnteMaximaAT || ""}
                onChange={(e) => updateDadosEletricos("correnteMaximaAT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ligacaoAT">Ligação AT</Label>
              <Select
                value={formData.dadosEletricos?.ligacaoAT || ""}
                onValueChange={(value) => updateDadosEletricos("ligacaoAT", value)}
              >
                <SelectTrigger id="ligacaoAT">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Triângulo (Dy)">Triângulo (Dy)</SelectItem>
                  <SelectItem value="Estrela (Yy)">Estrela (Yy)</SelectItem>
                  <SelectItem value="Ziguezague (Zy)">Ziguezague (Zy)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Baixa Tensão */}
      <Card>
        <CardHeader>
          <CardTitle>Baixa Tensão (BT)</CardTitle>
          <CardDescription>Dados elétricos do enrolamento de baixa tensão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="tensaoNominalBT">Tensão Nominal (V)</Label>
              <Input
                id="tensaoNominalBT"
                type="number"
                placeholder="Ex: 380"
                value={formData.dadosEletricos?.tensaoNominalBT || ""}
                onChange={(e) => updateDadosEletricos("tensaoNominalBT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tensaoFaseBT">Tensão Fase (V)</Label>
              <Input
                id="tensaoFaseBT"
                type="number"
                step="0.1"
                placeholder="Ex: 219.4"
                value={formData.dadosEletricos?.tensaoFaseBT || ""}
                onChange={(e) => updateDadosEletricos("tensaoFaseBT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="correnteNominalBT">Corrente Nominal (A)</Label>
              <Input
                id="correnteNominalBT"
                type="number"
                step="0.01"
                placeholder="Ex: 113.95"
                value={formData.dadosEletricos?.correnteNominalBT || ""}
                onChange={(e) => updateDadosEletricos("correnteNominalBT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="correnteLinhaBT">Corrente Linha (A)</Label>
              <Input
                id="correnteLinhaBT"
                type="number"
                step="0.01"
                placeholder="Ex: 113.95"
                value={formData.dadosEletricos?.correnteLinhaBT || ""}
                onChange={(e) => updateDadosEletricos("correnteLinhaBT", Number.parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ligacaoBT">Ligação BT</Label>
              <Select
                value={formData.dadosEletricos?.ligacaoBT || ""}
                onValueChange={(value) => updateDadosEletricos("ligacaoBT", value)}
              >
                <SelectTrigger id="ligacaoBT">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Estrela com Neutro">Estrela com Neutro</SelectItem>
                  <SelectItem value="Estrela">Estrela</SelectItem>
                  <SelectItem value="Triângulo">Triângulo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TAPs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>TAPs</CardTitle>
              <CardDescription>Configuração dos TAPs do transformador</CardDescription>
            </div>
            <Button onClick={addTap} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar TAP
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.dadosEletricos?.taps?.map((tap, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">TAP {tap.numero}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => removeTap(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label>Tensão AT (V)</Label>
                    <Input type="number" value={tap.tensaoAT} placeholder="Ex: 13800" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tensão BT (V)</Label>
                    <Input type="number" value={tap.tensaoBT} placeholder="Ex: 380" />
                  </div>
                  <div className="space-y-2">
                    <Label>Espiras AT</Label>
                    <Input type="number" value={tap.espirasAT} placeholder="Ex: 3711" />
                  </div>
                  <div className="space-y-2">
                    <Label>Espiras BT</Label>
                    <Input type="number" value={tap.espirasBT} placeholder="Ex: 59" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
