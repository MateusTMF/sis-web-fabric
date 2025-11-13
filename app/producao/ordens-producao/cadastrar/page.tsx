"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { DadosGeraisForm } from "@/components/ordem-producao/dados-gerais-form"
import { DadosEletricosForm } from "@/components/ordem-producao/dados-eletricos-form"
import { EnrolamentoATForm } from "@/components/ordem-producao/enrolamento-at-form"
import { EnrolamentoBTForm } from "@/components/ordem-producao/enrolamento-bt-form"
import { NucleoForm } from "@/components/ordem-producao/nucleo-form"
import { TanqueForm } from "@/components/ordem-producao/tanque-form"
import { PerdasRendimentoForm } from "@/components/ordem-producao/perdas-rendimento-form"
import { AcessoriosForm } from "@/components/ordem-producao/acessorios-form"
import { DimensoesForm } from "@/components/ordem-producao/dimensoes-form"
import type { OrdemProducao } from "@/lib/types/ordem-producao"

export default function CadastrarOrdemPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dados-gerais")

  // Estado inicial do formulário
  const [formData, setFormData] = useState<Partial<OrdemProducao>>({
    numeroOP: "",
    status: "aguardando",
    prioridade: "normal",
    progresso: 0,
  })

  const handleSave = () => {
    // Aqui você implementaria a lógica de salvar no backend
    console.log("[v0] Salvando ordem de produção:", formData)
    alert("Ordem de produção cadastrada com sucesso!")
    router.push("/producao/ordens-producao")
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
              <h1 className="text-3xl font-bold tracking-tight">Nova Ordem de Produção</h1>
              <p className="text-muted-foreground">Cadastre todos os dados técnicos do transformador</p>
            </div>
          </div>
          <Button size="lg" onClick={handleSave}>
            <Save className="mr-2 h-5 w-5" />
            Salvar Ordem
          </Button>
        </div>

        {/* Formulário com Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Técnicos</CardTitle>
            <CardDescription>
              Preencha todas as informações técnicas do transformador organizadas por seção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
                <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
                <TabsTrigger value="dados-eletricos">Elétricos</TabsTrigger>
                <TabsTrigger value="enrolamento-at">Enrol. AT</TabsTrigger>
                <TabsTrigger value="enrolamento-bt">Enrol. BT</TabsTrigger>
                <TabsTrigger value="nucleo">Núcleo</TabsTrigger>
                <TabsTrigger value="tanque">Tanque</TabsTrigger>
                <TabsTrigger value="perdas">Perdas</TabsTrigger>
                <TabsTrigger value="acessorios">Acessórios</TabsTrigger>
                <TabsTrigger value="dimensoes">Dimensões</TabsTrigger>
              </TabsList>

              <TabsContent value="dados-gerais" className="space-y-4 pt-6">
                <DadosGeraisForm formData={formData} setFormData={setFormData} />
              </TabsContent>

              <TabsContent value="dados-eletricos" className="space-y-4 pt-6">
                <DadosEletricosForm formData={formData} setFormData={setFormData} />
              </TabsContent>

              <TabsContent value="enrolamento-at" className="space-y-4 pt-6">
                <EnrolamentoATForm formData={formData} setFormData={setFormData} />
              </TabsContent>

              <TabsContent value="enrolamento-bt" className="space-y-4 pt-6">
                <EnrolamentoBTForm formData={formData} setFormData={setFormData} />
              </TabsContent>

              <TabsContent value="nucleo" className="space-y-4 pt-6">
                <NucleoForm formData={formData} setFormData={setFormData} />
              </TabsContent>

              <TabsContent value="tanque" className="space-y-4 pt-6">
                <TanqueForm formData={formData} setFormData={setFormData} />
              </TabsContent>

              <TabsContent value="perdas" className="space-y-4 pt-6">
                <PerdasRendimentoForm formData={formData} setFormData={setFormData} />
              </TabsContent>

              <TabsContent value="acessorios" className="space-y-4 pt-6">
                <AcessoriosForm formData={formData} setFormData={setFormData} />
              </TabsContent>

              <TabsContent value="dimensoes" className="space-y-4 pt-6">
                <DimensoesForm formData={formData} setFormData={setFormData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
