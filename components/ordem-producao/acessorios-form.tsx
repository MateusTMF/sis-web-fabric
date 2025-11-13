"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OrdemProducao } from "@/lib/types/ordem-producao"

interface FormProps {
  formData: Partial<OrdemProducao>
  setFormData: (data: Partial<OrdemProducao>) => void
}

export function AcessoriosForm({ formData, setFormData }: FormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Buchas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Bucha BT</Label>
              <Input placeholder="Ex: Padrão" />
            </div>
            <div className="space-y-2">
              <Label>Bucha AT</Label>
              <Input placeholder="Ex: Padrão" />
            </div>
            <div className="space-y-2">
              <Label>Localização Bucha AT</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Na tampa">Na tampa</SelectItem>
                  <SelectItem value="Na lateral">Na lateral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Localização Bucha BT</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Na tampa">Na tampa</SelectItem>
                  <SelectItem value="Na lateral">Na lateral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proteção</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="releGas" />
              <Label htmlFor="releGas">Relé de Gás</Label>
            </div>
            <div className="space-y-2">
              <Label>Contatos Relé Gás</Label>
              <Input type="number" placeholder="Ex: 0" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="valvulaPressao" />
              <Label htmlFor="valvulaPressao">Válvula à Pressão</Label>
            </div>
            <div className="space-y-2">
              <Label>Contatos Válvula</Label>
              <Input type="number" placeholder="Ex: 0" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="relePressaoSubita" />
              <Label htmlFor="relePressaoSubita">Relé Pressão Súbita</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="tuboExplosao" />
              <Label htmlFor="tuboExplosao">Tubo de Explosão</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monitoramento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="termometro" />
              <Label htmlFor="termometro">Termômetro</Label>
            </div>
            <div className="space-y-2">
              <Label>Contatos Termômetro</Label>
              <Input type="number" placeholder="Ex: 0" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="termometroImagemTermica" />
              <Label htmlFor="termometroImagemTermica">Termômetro Imagem Térmica</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="controladorTemperatura" />
              <Label htmlFor="controladorTemperatura">Controlador Temperatura</Label>
            </div>
            <div className="space-y-2">
              <Label>Sensores Temperatura</Label>
              <Input type="number" placeholder="Ex: 0" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="manovacuometro" />
              <Label htmlFor="manovacuometro">Manovacuômetro</Label>
            </div>
            <div className="space-y-2">
              <Label>Contatos Manovacuômetro</Label>
              <Input type="number" placeholder="Ex: 0" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="indicadorNivelMagnetico" />
              <Label htmlFor="indicadorNivelMagnetico">Indicador Nível Magnético</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conservador e Resfriamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="conservadorOleo" />
              <Label htmlFor="conservadorOleo">Conservador de Óleo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="bolsaNeoprene" />
              <Label htmlFor="bolsaNeoprene">Bolsa de Neoprene</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="secadorArSilica" />
              <Label htmlFor="secadorArSilica">Secador de Ar c/ Sílica Gel</Label>
            </div>
            <div className="space-y-2">
              <Label>Ventilação Forçada (un)</Label>
              <Input type="number" placeholder="Ex: 0" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comutador</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Tipo Comutador</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Simples">Simples</SelectItem>
                  <SelectItem value="Duplo">Duplo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="comutadorBaixoCarga" />
              <Label htmlFor="comutadorBaixoCarga">Comutador Baixo Carga</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="acionamentoComutadorExterno" />
              <Label htmlFor="acionamentoComutadorExterno">Acionamento Externo</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Outros Acessórios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="placaIdentificacao" />
              <Label htmlFor="placaIdentificacao">Placa Identificação</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="caixaLigacao" />
              <Label htmlFor="caixaLigacao">Caixa de Ligação</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="painelLigacao" />
              <Label htmlFor="painelLigacao">Painel de Ligação</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="guiaCabos" />
              <Label htmlFor="guiaCabos">Guia Cabos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="flangeBT" />
              <Label htmlFor="flangeBT">Flange BT</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="flangeAT" />
              <Label htmlFor="flangeAT">Flange AT</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="btTerminalSpade" />
              <Label htmlFor="btTerminalSpade">BT Terminal Spade</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="tanqueGalvanizado" />
              <Label htmlFor="tanqueGalvanizado">Tanque Galvanizado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="padMounted" />
              <Label htmlFor="padMounted">Pad Mounted</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="subterraneo" />
              <Label htmlFor="subterraneo">Subterrâneo</Label>
            </div>
            <div className="space-y-2">
              <Label>Embalagem</Label>
              <Input placeholder="Ex: Básico" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Label>Observações</Label>
        <Textarea placeholder="Observações sobre acessórios..." rows={3} />
      </div>
    </div>
  )
}
