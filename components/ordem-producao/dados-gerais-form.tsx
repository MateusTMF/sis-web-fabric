"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OrdemProducao } from "@/lib/types/ordem-producao"

interface FormProps {
  formData: Partial<OrdemProducao>
  setFormData: (data: Partial<OrdemProducao>) => void
}

export function DadosGeraisForm({ formData, setFormData }: FormProps) {
  const updateDadosGerais = (field: string, value: any) => {
    setFormData({
      ...formData,
      dadosGerais: {
        ...formData.dadosGerais,
        [field]: value,
      } as any,
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="numeroOP">Número OP *</Label>
        <Input
          id="numeroOP"
          placeholder="Ex: 3075/ALM3/24"
          value={formData.numeroOP || ""}
          onChange={(e) => setFormData({ ...formData, numeroOP: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="numeroSerie">Número de Série</Label>
        <Input
          id="numeroSerie"
          placeholder="Ex: 001"
          value={formData.dadosGerais?.numeroSerie || ""}
          onChange={(e) => updateDadosGerais("numeroSerie", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="potencia">Potência (kVA) *</Label>
        <Input
          id="potencia"
          type="number"
          placeholder="Ex: 75"
          value={formData.dadosGerais?.potencia || ""}
          onChange={(e) => updateDadosGerais("potencia", Number.parseFloat(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="numeroFases">Número de Fases *</Label>
        <Select
          value={formData.dadosGerais?.numeroFases?.toString() || ""}
          onValueChange={(value) => updateDadosGerais("numeroFases", Number.parseInt(value))}
        >
          <SelectTrigger id="numeroFases">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Monofásico (1)</SelectItem>
            <SelectItem value="3">Trifásico (3)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="classe">Classe (kV) *</Label>
        <Input
          id="classe"
          type="number"
          placeholder="Ex: 15"
          value={formData.dadosGerais?.classe || ""}
          onChange={(e) => updateDadosGerais("classe", Number.parseFloat(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequencia">Frequência (Hz) *</Label>
        <Select
          value={formData.dadosGerais?.frequencia?.toString() || ""}
          onValueChange={(value) => updateDadosGerais("frequencia", Number.parseInt(value))}
        >
          <SelectTrigger id="frequencia">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50">50 Hz</SelectItem>
            <SelectItem value="60">60 Hz</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoTransformador">Tipo de Transformador *</Label>
        <Select
          value={formData.dadosGerais?.tipoTransformador || ""}
          onValueChange={(value) => updateDadosGerais("tipoTransformador", value)}
        >
          <SelectTrigger id="tipoTransformador">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Transformador a óleo">Transformador a óleo</SelectItem>
            <SelectItem value="Transformador a seco">Transformador a seco</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoNucleo">Tipo de Núcleo</Label>
        <Select
          value={formData.dadosGerais?.tipoNucleo || ""}
          onValueChange={(value) => updateDadosGerais("tipoNucleo", value)}
        >
          <SelectTrigger id="tipoNucleo">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Núcleo V">Núcleo V</SelectItem>
            <SelectItem value="Núcleo H">Núcleo H</SelectItem>
            <SelectItem value="Núcleo Envolvente">Núcleo Envolvente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="refrigeracao">Refrigeração</Label>
        <Select
          value={formData.dadosGerais?.refrigeracao || ""}
          onValueChange={(value) => updateDadosGerais("refrigeracao", value)}
        >
          <SelectTrigger id="refrigeracao">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ONAN">ONAN (óleo natural, ar natural)</SelectItem>
            <SelectItem value="ONAF">ONAF (óleo natural, ar forçado)</SelectItem>
            <SelectItem value="OFAF">OFAF (óleo forçado, ar forçado)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instalacao">Instalação</Label>
        <Select
          value={formData.dadosGerais?.instalacao || ""}
          onValueChange={(value) => updateDadosGerais("instalacao", value)}
        >
          <SelectTrigger id="instalacao">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Poste">Poste</SelectItem>
            <SelectItem value="Pedestal">Pedestal</SelectItem>
            <SelectItem value="Abrigado">Abrigado</SelectItem>
            <SelectItem value="Subterrâneo">Subterrâneo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="novoOuReforma">Novo ou Reforma</Label>
        <Select
          value={formData.dadosGerais?.novoOuReforma || ""}
          onValueChange={(value) => updateDadosGerais("novoOuReforma", value)}
        >
          <SelectTrigger id="novoOuReforma">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Novo">Novo</SelectItem>
            <SelectItem value="Reforma">Reforma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projeto">Projeto</Label>
        <Input
          id="projeto"
          placeholder="Ex: 3075/ALM3/24"
          value={formData.dadosGerais?.projeto || ""}
          onChange={(e) => updateDadosGerais("projeto", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="foc">FOC</Label>
        <Input
          id="foc"
          placeholder="FOC / Rev"
          value={formData.dadosGerais?.foc || ""}
          onChange={(e) => updateDadosGerais("foc", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataElaboracao">Data Elaboração</Label>
        <Input
          id="dataElaboracao"
          type="date"
          value={formData.dadosGerais?.dataElaboracao || ""}
          onChange={(e) => updateDadosGerais("dataElaboracao", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataVerificacao">Data Verificação</Label>
        <Input
          id="dataVerificacao"
          type="date"
          value={formData.dadosGerais?.dataVerificacao || ""}
          onChange={(e) => updateDadosGerais("dataVerificacao", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataAprovacao">Data Aprovação</Label>
        <Input
          id="dataAprovacao"
          type="date"
          value={formData.dadosGerais?.dataAprovacao || ""}
          onChange={(e) => updateDadosGerais("dataAprovacao", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="elaboradoPor">Elaborado Por</Label>
        <Input
          id="elaboradoPor"
          placeholder="Nome do elaborador"
          value={formData.dadosGerais?.elaboradoPor || ""}
          onChange={(e) => updateDadosGerais("elaboradoPor", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="verificadoPor">Verificado Por</Label>
        <Input
          id="verificadoPor"
          placeholder="Nome do verificador"
          value={formData.dadosGerais?.verificadoPor || ""}
          onChange={(e) => updateDadosGerais("verificadoPor", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="aprovadoPor">Aprovado Por</Label>
        <Input
          id="aprovadoPor"
          placeholder="Nome do aprovador"
          value={formData.dadosGerais?.aprovadoPor || ""}
          onChange={(e) => updateDadosGerais("aprovadoPor", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="arquivo">Arquivo</Label>
        <Input
          id="arquivo"
          placeholder="Ex: ASS0054-10"
          value={formData.dadosGerais?.arquivo || ""}
          onChange={(e) => updateDadosGerais("arquivo", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="prioridade">Prioridade</Label>
        <Select
          value={formData.prioridade || ""}
          onValueChange={(value) => setFormData({ ...formData, prioridade: value as any })}
        >
          <SelectTrigger id="prioridade">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="baixa">Baixa</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
            <SelectItem value="urgente">Urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="operador">Operador</Label>
        <Input
          id="operador"
          placeholder="Nome do operador"
          value={formData.operador || ""}
          onChange={(e) => setFormData({ ...formData, operador: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maquina">Máquina</Label>
        <Input
          id="maquina"
          placeholder="Ex: Enroladeira 01"
          value={formData.maquina || ""}
          onChange={(e) => setFormData({ ...formData, maquina: e.target.value })}
        />
      </div>
    </div>
  )
}
