import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Plus, Trash2, Send } from "lucide-react"

export default function NovaSolicitacaoPage() {
  return (
    <PageLayout
      title="Nova Solicitação de Materiais"
      description="Crie uma nova solicitação de materiais para produção"
    >
      <Card>
        <CardHeader>
          <CardTitle>Dados da Solicitação</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Departamento Solicitante</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="producao">Produção</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="qualidade">Qualidade</SelectItem>
                    <SelectItem value="expedicao">Expedição</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgente</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="op">Ordem de Produção (Opcional)</Label>
                <Input id="op" placeholder="OP-1234" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Data Necessária</Label>
                <Input id="deadline" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="justification">Justificativa</Label>
              <Textarea id="justification" placeholder="Descreva o motivo da solicitação..." rows={3} />
            </div>

            {/* Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Itens Solicitados</Label>
                <Button type="button" size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>

              <div className="space-y-3">
                {[1, 2].map((item) => (
                  <Card key={item}>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-5">
                          <Label htmlFor={`item-${item}`} className="text-xs">
                            Material
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o material" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fio-cobre">Fio de Cobre 2.5mm</SelectItem>
                              <SelectItem value="chapa-aco">Chapa de Aço 3mm</SelectItem>
                              <SelectItem value="parafuso">Parafuso M8</SelectItem>
                              <SelectItem value="tinta">Tinta Industrial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`qty-${item}`} className="text-xs">
                            Quantidade
                          </Label>
                          <Input id={`qty-${item}`} type="number" placeholder="0" />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`unit-${item}`} className="text-xs">
                            Unidade
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Un" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="un">Unidade</SelectItem>
                              <SelectItem value="kg">Kg</SelectItem>
                              <SelectItem value="m">Metro</SelectItem>
                              <SelectItem value="l">Litro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-xs">Estoque</Label>
                          <div className="h-10 flex items-center text-sm text-muted-foreground">150 un</div>
                        </div>
                        <div className="md:col-span-1 flex items-end">
                          <Button type="button" size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Enviar Solicitação
              </Button>
              <Button type="button" variant="outline">
                Salvar Rascunho
              </Button>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
