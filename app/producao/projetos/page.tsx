"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { type ProjetoTecnico, projetoMock } from "@/lib/types/projeto"
import Sidebar from "@/components/sidebar"

export default function ProjetosPage() {
  const [projetos, setProjetos] = useState<ProjetoTecnico[]>(projetoMock)
  const [busca, setBusca] = useState("")

  const projetosFiltrados = projetos.filter(
    (projeto) =>
      projeto.numero.toLowerCase().includes(busca.toLowerCase()) ||
      projeto.nome.toLowerCase().includes(busca.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background p-12">
      <Sidebar />
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projetos Técnicos</h1>
            <p className="text-muted-foreground">Gerencie os projetos de transformadores</p>
          </div>
          <Link href="/producao/projetos/novo">
            <Button size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Novo Projeto
            </Button>
          </Link>
        </div>

        {/* Busca */}
        <Card>
          <CardHeader>
            <CardTitle>Pesquisa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por número ou nome do projeto..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Projetos */}
        <div className="space-y-4">
          {projetosFiltrados.map((projeto) => (
            <Card key={projeto.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{projeto.numero}</CardTitle>
                    <CardDescription>{projeto.nome}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/producao/projetos/${projeto.id}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/producao/projetos/${projeto.id}/editar`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Potência</p>
                    <p className="font-semibold">{projeto.potencia} kVA</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Classe</p>
                    <p className="font-semibold">{projeto.classe} kV</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <p className="font-semibold">{projeto.tipoTransformador}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fases</p>
                    <p className="font-semibold">{projeto.fases} F</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {projetosFiltrados.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium">Nenhum projeto encontrado</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
