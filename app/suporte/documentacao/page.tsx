"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, FileText, Video, HelpCircle } from "lucide-react"

export default function Documentacao() {
  const categorias = [
    {
      titulo: "Primeiros Passos",
      icone: BookOpen,
      artigos: 12,
      descricao: "Guias básicos para começar a usar o sistema",
    },
    {
      titulo: "Módulo de Produção",
      icone: FileText,
      artigos: 24,
      descricao: "Documentação completa do módulo de produção",
    },
    {
      titulo: "Módulo Financeiro",
      icone: FileText,
      artigos: 18,
      descricao: "Guias sobre gestão financeira e contábil",
    },
    { titulo: "Vídeos Tutoriais", icone: Video, artigos: 8, descricao: "Tutoriais em vídeo passo a passo" },
    { titulo: "Perguntas Frequentes", icone: HelpCircle, artigos: 45, descricao: "Respostas para dúvidas comuns" },
    {
      titulo: "API e Integrações",
      icone: FileText,
      artigos: 15,
      descricao: "Documentação técnica para desenvolvedores",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documentação</h1>
        <p className="text-muted-foreground mt-2">Encontre guias, tutoriais e documentação completa do sistema</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar na documentação..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <categoria.icone className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{categoria.titulo}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{categoria.artigos} artigos</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{categoria.descricao}</p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Ver Artigos
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Artigos Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Como criar uma ordem de produção</p>
                  <p className="text-sm text-muted-foreground">Guia completo passo a passo</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Ler
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Gerenciamento de estoque</p>
                  <p className="text-sm text-muted-foreground">Melhores práticas e dicas</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Ler
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Introdução ao sistema ERP</p>
                  <p className="text-sm text-muted-foreground">Vídeo tutorial - 15 minutos</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Assistir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
