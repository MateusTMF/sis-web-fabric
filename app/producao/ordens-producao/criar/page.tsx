"use client"

import { useRouter } from "next/navigation"
import { FormCriarOrdem } from "@/components/ordem/form-criar-ordem"
import { projetoMock } from "@/lib/types/projeto"
import type { OrdemProducaoDetalhes } from "@/lib/types/ordem-producao-extended"
import Sidebar from "@/components/sidebar"
import { Card } from "@/components/ui/card"

export default function CriarOrdemPage() {
  const router = useRouter()

  const handleCriarOrdem = (ordem: OrdemProducaoDetalhes) => {
    console.log("Ordem criada:", ordem)
    // Aqui você salvaria a ordem no banco de dados
    router.push("/producao/ordens-producao")
  }

  return (
    <div className="min-h-screen bg-background p-12">
      <Sidebar />
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Criar Ordem de Produção</h1>
          <p className="text-muted-foreground">Gere uma nova ordem de produção vinculando um projeto existente</p>
        </div>

        <Card className="p-6">
          <FormCriarOrdem projetos={projetoMock} onSalvar={handleCriarOrdem} />
        </Card>
      </div>
    </div>
  )
}
