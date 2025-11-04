"use client"

import { ChevronLeft, Package, Calendar, AlertCircle, Edit2 } from "lucide-react"
import { useState } from "react"
import Sidebar from "../../../components/sidebar"

const PRODUCTS_DB = [
  {
    id: "1",
    nome: "Núcleo de Silício 50mm",
    codigo: "NC-50-001",
    categoria: "Núcleos",
    quantidade: 450,
    quantidadeMinima: 100,
    status: "em_estoque",
    ultimaAtualizacao: "2024-11-04",
    descricao: "Núcleo de silício de alta qualidade para transformadores de potência",
    localizacao: "Prateleira A-12",
    fornecedor: "SiliTech Materiais",
    dataUltimaCompra: "2024-10-15",
  },
  {
    id: "2",
    nome: "Bobina de Cobre 1.5mm",
    codigo: "BC-15-002",
    categoria: "Bobinas",
    quantidade: 32,
    quantidadeMinima: 50,
    status: "baixo_estoque",
    ultimaAtualizacao: "2024-11-03",
    descricao: "Bobina de cobre enrolada com precisão para transformadores",
    localizacao: "Prateleira B-8",
    fornecedor: "CopperPro",
    dataUltimaCompra: "2024-10-28",
  },
  {
    id: "6",
    nome: "Transformador Trifásico 10kVA",
    codigo: "TT-10KVA-006",
    categoria: "Acabado",
    quantidade: 8,
    quantidadeMinima: 5,
    status: "em_estoque",
    ultimaAtualizacao: "2024-11-04",
    descricao: "Transformador trifásico 10kVA, 380V/220V, classe de isolamento H",
    localizacao: "Setor de Acabados - Rack 1",
    fornecedor: "Interno",
    dataUltimaCompra: "2024-11-03",
  },
  {
    id: "7",
    nome: "Transformador Monofásico 5kVA",
    codigo: "TM-5KVA-007",
    categoria: "Acabado",
    quantidade: 12,
    quantidadeMinima: 5,
    status: "em_estoque",
    ultimaAtualizacao: "2024-11-04",
    descricao: "Transformador monofásico 5kVA, 220V/110V, classe de isolamento F",
    localizacao: "Setor de Acabados - Rack 2",
    fornecedor: "Interno",
    dataUltimaCompra: "2024-11-02",
  },
]

interface PageProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = PRODUCTS_DB.find((p) => p.id === params.id)
  const [isEditing, setIsEditing] = useState(false)

  if (!product) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto transition-all duration-300">
          <div className="pt-20 px-4 md:px-8 py-6 flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Produto não encontrado</h1>
              <button
                onClick={() => (window.location.href = "/estoque/produtos")}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Voltar para estoque
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_estoque":
        return "bg-green-100 text-green-800"
      case "baixo_estoque":
        return "bg-yellow-100 text-yellow-800"
      case "sem_estoque":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "em_estoque":
        return "Em Estoque"
      case "baixo_estoque":
        return "Baixo Estoque"
      case "sem_estoque":
        return "Sem Estoque"
      default:
        return status
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto transition-all duration-300">
        <div className="pt-20 px-4 md:px-8 py-6">
          {/* Header com botão voltar */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => (window.location.href = "/estoque")}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Voltar</span>
            </button>
            <button
              onClick={() => (window.location.href = `/estoque/novo?id=${product.id}`)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Edit2 size={18} />
              <span>Editar</span>
            </button>
          </div>

          {/* Detalhes do produto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna Principal */}
            <div className="md:col-span-2">
              {/* Card Principal */}
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{product.nome}</h1>
                    <p className="text-muted-foreground text-lg mt-2">Código: {product.codigo}</p>
                  </div>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(product.status)}`}
                  >
                    {getStatusLabel(product.status)}
                  </span>
                </div>

                <p className="text-foreground text-base mb-6">{product.descricao}</p>

                {/* Grid de informações */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Categoria</p>
                    <p className="text-lg font-semibold text-foreground">{product.categoria}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Quantidade</p>
                    <p className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Package size={16} /> {product.quantidade}
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Quantidade Mínima</p>
                    <p className="text-lg font-semibold text-foreground">{product.quantidadeMinima}</p>
                  </div>
                </div>
              </div>

              {/* Card de informações adicionais */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Informações Adicionais</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b border-border">
                    <div className="bg-muted p-2 rounded-lg">
                      <AlertCircle size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Localização</p>
                      <p className="text-foreground font-medium">{product.localizacao}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pb-4 border-b border-border">
                    <div className="bg-muted p-2 rounded-lg">
                      <Package size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fornecedor</p>
                      <p className="text-foreground font-medium">{product.fornecedor}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-muted p-2 rounded-lg">
                      <Calendar size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Última Compra</p>
                      <p className="text-foreground font-medium">{product.dataUltimaCompra}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Lateral */}
            <div className="md:col-span-1">
              {/* Card de status */}
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">Resumo</h3>

                {product.quantidade === 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <p className="text-sm font-semibold text-red-800">Sem Estoque</p>
                    <p className="text-xs text-red-700 mt-1">Reposição necessária</p>
                  </div>
                )}

                {product.quantidade < product.quantidadeMinima && product.quantidade > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-sm font-semibold text-yellow-800">Estoque Baixo</p>
                    <p className="text-xs text-yellow-700 mt-1">Considere reabastecer</p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Disponível</span>
                    <span className="font-semibold text-foreground">{product.quantidade}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-sm text-muted-foreground">Mínimo</span>
                    <span className="font-semibold text-foreground">{product.quantidadeMinima}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-muted-foreground">Última atualização</span>
                    <span className="font-semibold text-foreground text-sm">{product.ultimaAtualizacao}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
