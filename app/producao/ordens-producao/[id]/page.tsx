"use client"

import { use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, FileDown, Printer } from "lucide-react"
import Link from "next/link"
import { ordensProducaoMock } from "@/lib/types/ordem-producao"

export default function VisualizarOrdemPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const ordem = ordensProducaoMock.find((o) => o.id === resolvedParams.id)

  if (!ordem) {
    return <div>Ordem não encontrada</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em-producao":
        return "bg-blue-500"
      case "aguardando":
        return "bg-yellow-500"
      case "concluida":
        return "bg-green-500"
      case "pausada":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "em-producao":
        return "Em Produção"
      case "aguardando":
        return "Aguardando"
      case "concluida":
        return "Concluída"
      case "pausada":
        return "Pausada"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/producao/ordens-producao">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">OP: {ordem.numeroOP}</h1>
                <Badge className={getStatusColor(ordem.status)}>{getStatusText(ordem.status)}</Badge>
              </div>
              <p className="text-muted-foreground">
                Transformador {ordem.dadosGerais.potencia} kVA - {ordem.dadosGerais.classe} kV
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Link href={`/ordens-producao/${ordem.id}/editar`}>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </Link>
          </div>
        </div>

        {/* Informações de Produção */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Prioridade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold capitalize">{ordem.prioridade}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Operador</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{ordem.operador || "-"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Máquina</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{ordem.maquina || "-"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{ordem.progresso}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Dados Técnicos em Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="dados-gerais">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
                <TabsTrigger value="dados-gerais">Gerais</TabsTrigger>
                <TabsTrigger value="eletricos">Elétricos</TabsTrigger>
                <TabsTrigger value="at">AT</TabsTrigger>
                <TabsTrigger value="bt">BT</TabsTrigger>
                <TabsTrigger value="nucleo">Núcleo</TabsTrigger>
                <TabsTrigger value="tanque">Tanque</TabsTrigger>
                <TabsTrigger value="perdas">Perdas</TabsTrigger>
                <TabsTrigger value="acessorios">Acessórios</TabsTrigger>
                <TabsTrigger value="dimensoes">Dimensões</TabsTrigger>
              </TabsList>

              {/* Dados Gerais */}
              <TabsContent value="dados-gerais" className="space-y-6 pt-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Informações Básicas</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Número Série</p>
                      <p className="font-medium">{ordem.dadosGerais.numeroSerie}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Potência</p>
                      <p className="font-medium">{ordem.dadosGerais.potencia} kVA</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Número de Fases</p>
                      <p className="font-medium">{ordem.dadosGerais.numeroFases}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Classe</p>
                      <p className="font-medium">{ordem.dadosGerais.classe} kV</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Frequência</p>
                      <p className="font-medium">{ordem.dadosGerais.frequencia} Hz</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{ordem.dadosGerais.tipoTransformador}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Núcleo</p>
                      <p className="font-medium">{ordem.dadosGerais.tipoNucleo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Refrigeração</p>
                      <p className="font-medium">{ordem.dadosGerais.refrigeracao}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instalação</p>
                      <p className="font-medium">{ordem.dadosGerais.instalacao}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Projeto</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Projeto</p>
                      <p className="font-medium">{ordem.dadosGerais.projeto}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Arquivo</p>
                      <p className="font-medium">{ordem.dadosGerais.arquivo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Novo/Reforma</p>
                      <p className="font-medium">{ordem.dadosGerais.novoOuReforma}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Datas e Responsáveis</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Data Elaboração</p>
                      <p className="font-medium">{ordem.dadosGerais.dataElaboracao}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data Verificação</p>
                      <p className="font-medium">{ordem.dadosGerais.dataVerificacao}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Elaborado Por</p>
                      <p className="font-medium">{ordem.dadosGerais.elaboradoPor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Verificado Por</p>
                      <p className="font-medium">{ordem.dadosGerais.verificadoPor}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Dados Elétricos */}
              <TabsContent value="eletricos" className="space-y-6 pt-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Alta Tensão (AT)</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Tensão Nominal</p>
                      <p className="font-medium">{ordem.dadosEletricos.tensaoNominalAT} V</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tensão Mínima</p>
                      <p className="font-medium">{ordem.dadosEletricos.tensaoMinimaAT} V</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tensão Máxima</p>
                      <p className="font-medium">{ordem.dadosEletricos.tensaoMaximaAT} V</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Corrente Nominal</p>
                      <p className="font-medium">{ordem.dadosEletricos.correnteNominalAT} A</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Corrente Mínima</p>
                      <p className="font-medium">{ordem.dadosEletricos.correnteMinimaAT} A</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Corrente Máxima</p>
                      <p className="font-medium">{ordem.dadosEletricos.correnteMaximaAT} A</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ligação AT</p>
                      <p className="font-medium">{ordem.dadosEletricos.ligacaoAT}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Baixa Tensão (BT)</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Tensão Nominal</p>
                      <p className="font-medium">{ordem.dadosEletricos.tensaoNominalBT} V</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tensão Fase</p>
                      <p className="font-medium">{ordem.dadosEletricos.tensaoFaseBT} V</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Corrente Nominal</p>
                      <p className="font-medium">{ordem.dadosEletricos.correnteNominalBT} A</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Corrente Linha</p>
                      <p className="font-medium">{ordem.dadosEletricos.correnteLinhaBT} A</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ligação BT</p>
                      <p className="font-medium">{ordem.dadosEletricos.ligacaoBT}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">TAPs</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 text-left font-medium">TAP</th>
                          <th className="pb-2 text-left font-medium">Tensão AT (V)</th>
                          <th className="pb-2 text-left font-medium">Tensão BT (V)</th>
                          <th className="pb-2 text-left font-medium">Espiras AT</th>
                          <th className="pb-2 text-left font-medium">Espiras BT</th>
                          <th className="pb-2 text-left font-medium">Relação</th>
                          <th className="pb-2 text-left font-medium">Erro (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordem.dadosEletricos.taps.map((tap) => (
                          <tr key={tap.numero} className="border-b">
                            <td className="py-2">{tap.numero}</td>
                            <td className="py-2">{tap.tensaoAT}</td>
                            <td className="py-2">{tap.tensaoBT}</td>
                            <td className="py-2">{tap.espirasAT}</td>
                            <td className="py-2">{tap.espirasBT}</td>
                            <td className="py-2">{tap.relacao.toFixed(4)}</td>
                            <td className="py-2">{(tap.erro * 100).toFixed(3)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              {/* Enrolamento AT */}
              <TabsContent value="at" className="space-y-6 pt-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Dimensões</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Diâmetro Interno</p>
                      <p className="font-medium">{ordem.enrolamentoAT.diametroInterno} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Diâmetro Externo</p>
                      <p className="font-medium">{ordem.enrolamentoAT.diametroExterno} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Diâmetro Médio</p>
                      <p className="font-medium">{ordem.enrolamentoAT.diametroMedio} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Altura Bobina</p>
                      <p className="font-medium">{ordem.enrolamentoAT.alturaBobina} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Altura Útil</p>
                      <p className="font-medium">{ordem.enrolamentoAT.alturaUtil} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Altura Elétrica</p>
                      <p className="font-medium">{ordem.enrolamentoAT.alturaEletrica} mm</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Fio</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Material</p>
                      <p className="font-medium">{ordem.enrolamentoAT.materialFio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Diâmetro</p>
                      <p className="font-medium">{ordem.enrolamentoAT.diametroFio} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">AWG</p>
                      <p className="font-medium">{ordem.enrolamentoAT.awgFio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seção</p>
                      <p className="font-medium">{ordem.enrolamentoAT.secaoFio} mm²</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Enrolamento</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Camadas</p>
                      <p className="font-medium">{ordem.enrolamentoAT.numeroCamadas}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Espiras Total</p>
                      <p className="font-medium">{ordem.enrolamentoAT.espirasTotal}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Espiras/Camada</p>
                      <p className="font-medium">{ordem.enrolamentoAT.espirasPorCamada}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Volt/Espira</p>
                      <p className="font-medium">{ordem.enrolamentoAT.voltPorEspira.toFixed(2)} V</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Isolação Camada</p>
                      <p className="font-medium">{ordem.enrolamentoAT.isolacaoCamada} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Corte</p>
                      <p className="font-medium">{ordem.enrolamentoAT.corte}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Material</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Peso Alumínio</p>
                      <p className="font-medium">{ordem.enrolamentoAT.pesoAluminio} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Comprimento Fio</p>
                      <p className="font-medium">{ordem.enrolamentoAT.comprimentoFio} m</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dens. Corrente 1</p>
                      <p className="font-medium">{ordem.enrolamentoAT.densidadeCorrente1} A/mm²</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Enrolamento BT */}
              <TabsContent value="bt" className="space-y-6 pt-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Dimensões</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Diâmetro Interno</p>
                      <p className="font-medium">{ordem.enrolamentoBT.diametroInterno} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Diâmetro Externo</p>
                      <p className="font-medium">{ordem.enrolamentoBT.diametroExterno} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Diâmetro Médio</p>
                      <p className="font-medium">{ordem.enrolamentoBT.diametroMedio} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Altura Bobina</p>
                      <p className="font-medium">{ordem.enrolamentoBT.alturaBobina} mm</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Fio</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{ordem.enrolamentoBT.tipoFio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Material</p>
                      <p className="font-medium">{ordem.enrolamentoBT.materialFio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Disposição</p>
                      <p className="font-medium">{ordem.enrolamentoBT.disposicaoFio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seção Total</p>
                      <p className="font-medium">{ordem.enrolamentoBT.secaoTotalFio} mm²</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Largura Fio</p>
                      <p className="font-medium">{ordem.enrolamentoBT.larguraFio} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Espessura Fio</p>
                      <p className="font-medium">{ordem.enrolamentoBT.espessuraFio} mm</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Enrolamento</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Camadas</p>
                      <p className="font-medium">{ordem.enrolamentoBT.numeroCamadas}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Espiras</p>
                      <p className="font-medium">{ordem.enrolamentoBT.numeroEspiras}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Espiras/Camada</p>
                      <p className="font-medium">{ordem.enrolamentoBT.espirasPorCamada}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bobinas</p>
                      <p className="font-medium">{ordem.enrolamentoBT.numeroBobinas}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Cabeceira</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">A</p>
                      <p className="font-medium">{ordem.enrolamentoBT.cabeceira.a} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">B</p>
                      <p className="font-medium">{ordem.enrolamentoBT.cabeceira.b} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">C</p>
                      <p className="font-medium">{ordem.enrolamentoBT.cabeceira.c} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">E</p>
                      <p className="font-medium">{ordem.enrolamentoBT.cabeceira.e} mm</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Material</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Peso Alumínio</p>
                      <p className="font-medium">{ordem.enrolamentoBT.pesoAluminio} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Comprimento Fio</p>
                      <p className="font-medium">{ordem.enrolamentoBT.comprimentoFio} m</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Densidade Corrente</p>
                      <p className="font-medium">{ordem.enrolamentoBT.densidadeCorrente} A/mm²</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Núcleo */}
              <TabsContent value="nucleo" className="space-y-6 pt-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Configuração</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{ordem.nucleo.tipo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Colunas</p>
                      <p className="font-medium">{ordem.nucleo.numeroColunas}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Diâmetro</p>
                      <p className="font-medium">{ordem.nucleo.diametroNucleo} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seção</p>
                      <p className="font-medium">{ordem.nucleo.secaoNucleo} cm²</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Dimensões</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Largura</p>
                      <p className="font-medium">{ordem.nucleo.largura} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Altura</p>
                      <p className="font-medium">{ordem.nucleo.altura} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Profundidade</p>
                      <p className="font-medium">{ordem.nucleo.profundidade} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Corte</p>
                      <p className="font-medium">{ordem.nucleo.corte} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Empilhamento</p>
                      <p className="font-medium">{ordem.nucleo.empilhamento} mm</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Chapas</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{ordem.nucleo.tipoChapa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Espessura</p>
                      <p className="font-medium">{ordem.nucleo.espessuraChapa} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fator Empilhamento</p>
                      <p className="font-medium">{ordem.nucleo.fatorEmpilhamento}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Área Líquida</p>
                      <p className="font-medium">{ordem.nucleo.areaLiquida} cm²</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Peso Bruto</p>
                      <p className="font-medium">{ordem.nucleo.pesoBruto} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Peso Líquido</p>
                      <p className="font-medium">{ordem.nucleo.pesoLiquido} kg</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Características Magnéticas</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Indutância Magnética</p>
                      <p className="font-medium">{ordem.nucleo.indutanciaMagnetica} Gauss</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Perda/kg</p>
                      <p className="font-medium">{ordem.nucleo.perdaPorKg} W/kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">VA/kg</p>
                      <p className="font-medium">{ordem.nucleo.vaPorKg} VA/kg</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Tanque */}
              <TabsContent value="tanque" className="space-y-6 pt-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Configuração</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{ordem.tanque.tipo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Formato</p>
                      <p className="font-medium">{ordem.tanque.formato}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Dimensões</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Largura</p>
                      <p className="font-medium">{ordem.tanque.largura} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Altura</p>
                      <p className="font-medium">{ordem.tanque.altura} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Profundidade</p>
                      <p className="font-medium">{ordem.tanque.profundidade} mm</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Pesos</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tanque</p>
                      <p className="font-medium">{ordem.tanque.pesoTanque} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Parte Ativa</p>
                      <p className="font-medium">{ordem.tanque.pesoParteAtiva} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Óleo</p>
                      <p className="font-medium">{ordem.tanque.pesoOleo} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-medium">{ordem.tanque.pesoTotal} kg</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Volume de Óleo</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-medium">{ordem.tanque.volumeOleo} l</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tanque</p>
                      <p className="font-medium">{ordem.tanque.volumeOleoTanque} l</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conservador</p>
                      <p className="font-medium">{ordem.tanque.volumeOleoConservador} l</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tubos</p>
                      <p className="font-medium">{ordem.tanque.volumeOleoTubos} l</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nível Óleo</p>
                      <p className="font-medium">{ordem.tanque.nivelOleo}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Elevação Óleo</p>
                      <p className="font-medium">{ordem.tanque.elevacaoOleo}°C</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Radiadores</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Quantidade</p>
                      <p className="font-medium">{ordem.tanque.numeroRadiadores}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tubos</p>
                      <p className="font-medium">{ordem.tanque.numeroTubos}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Comprimento</p>
                      <p className="font-medium">{ordem.tanque.comprimentoTubos} mm</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Perdas */}
              <TabsContent value="perdas" className="space-y-6 pt-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Perdas</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Perdas Vazio (Wo)</p>
                      <p className="font-medium">{ordem.perdasRendimento.perdasVazio} W</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Perdas Cobre (Wc)</p>
                      <p className="font-medium">{ordem.perdasRendimento.perdasCobre} W</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Perdas Totais</p>
                      <p className="font-medium">{ordem.perdasRendimento.perdasTotais} W</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Impedância e Rendimento</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Impedância (Z)</p>
                      <p className="font-medium">{ordem.perdasRendimento.impedancia}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Corrente Vazio (Io)</p>
                      <p className="font-medium">{ordem.perdasRendimento.correnteVazio}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rendimento</p>
                      <p className="font-medium">{ordem.perdasRendimento.rendimento.toFixed(3)}%</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Resistências</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Resistência AT</p>
                      <p className="font-medium">{ordem.perdasRendimento.resistenciaAT} Ω</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Resistência BT</p>
                      <p className="font-medium">{ordem.perdasRendimento.resistenciaBT.toFixed(6)} Ω</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reatância AT</p>
                      <p className="font-medium">{ordem.perdasRendimento.reatanciaAT} Ω</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Gradientes de Temperatura</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Gradiente AT</p>
                      <p className="font-medium">{ordem.perdasRendimento.gradienteAT}°C</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gradiente BT</p>
                      <p className="font-medium">{ordem.perdasRendimento.gradienteBT}°C</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Elevação Temperatura</p>
                      <p className="font-medium">{ordem.perdasRendimento.elevacaoTemperatura}°C</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Acessórios */}
              <TabsContent value="acessorios" className="space-y-6 pt-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Buchas</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Bucha BT</p>
                      <p className="font-medium">{ordem.acessorios.buchaBTTipo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bucha AT</p>
                      <p className="font-medium">{ordem.acessorios.buchaATTipo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Localização AT</p>
                      <p className="font-medium">{ordem.acessorios.localizacaoBuchaAT}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Localização BT</p>
                      <p className="font-medium">{ordem.acessorios.localizacaoBuchaBT}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Proteção</h3>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.releGas ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Relé de Gás</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.valvulaPressao ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Válvula à Pressão</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.relePressaoSubita ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Relé Pressão Súbita</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.tuboExplosao ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Tubo de Explosão</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Monitoramento</h3>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.termometro ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Termômetro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.controladorTemperatura ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Controlador Temperatura</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.indicadorNivelMagnetico ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Indicador Nível Magnético</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Conservador e Resfriamento</h3>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.conservadorOleo ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Conservador de Óleo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.secadorArSilica ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Secador de Ar</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ventilação Forçada</p>
                      <p className="font-medium">{ordem.acessorios.ventilacaoForcada} un</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Comutador</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Tipo</p>
                      <p className="font-medium">{ordem.acessorios.comutador}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.comutadorBaixoCarga ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Comutador Baixo Carga</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Outros</h3>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.placaIdentificacao ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Placa Identificação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.caixaLigacao ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">Caixa de Ligação</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${ordem.acessorios.btTerminalSpade ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-sm">BT Terminal Spade</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Dimensões */}
              <TabsContent value="dimensoes" className="space-y-6 pt-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Vigas</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Largura</p>
                      <p className="font-medium">{ordem.dimensoes.vigas.largura} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Comprimento</p>
                      <p className="font-medium">{ordem.dimensoes.vigas.comprimento} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Massa</p>
                      <p className="font-medium">{ordem.dimensoes.vigas.massa} kg</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Componentes</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Sapatas</p>
                      <p className="font-medium">
                        {ordem.dimensoes.sapatas.dimensoes} ({ordem.dimensoes.sapatas.quantidade} un)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estirante Horizontal</p>
                      <p className="font-medium">
                        {ordem.dimensoes.estiranteHorizontal.dimensoes} (
                        {ordem.dimensoes.estiranteHorizontal.quantidade} un)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estirante Vertical</p>
                      <p className="font-medium">
                        {ordem.dimensoes.estiranteVertical.dimensoes} ({ordem.dimensoes.estiranteVertical.quantidade}{" "}
                        un)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fixação</p>
                      <p className="font-medium">
                        {ordem.dimensoes.fixacao.dimensoes} ({ordem.dimensoes.fixacao.quantidade} un)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Dimensões Totais</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Altura</p>
                      <p className="font-medium">{ordem.dimensoes.dimensoesTotais.altura} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Largura</p>
                      <p className="font-medium">{ordem.dimensoes.dimensoesTotais.largura} mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Profundidade</p>
                      <p className="font-medium">{ordem.dimensoes.dimensoesTotais.profundidade} mm</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
