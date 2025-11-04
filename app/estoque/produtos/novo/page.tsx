"use client"

import type React from "react"

import { Save, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Sidebar from "../../../components/sidebar"

const CATEGORIAS = ["Núcleos", "Bobinas", "Materiais", "Componentes", "Acabado"]

const PRODUCTS_DB: Record<string, any> = {
  "1": {
    id: "1",
    nome: "Núcleo de Silício 50mm",
    codigo: "NC-50-001",
    categoria: "Núcleos",
    quantidade: 450,
    quantidadeMinima: 100,
    status: "em_estoque",
    descricao: "Núcleo de silício de alta qualidade para transformadores de potência",
    localizacao: "Prateleira A-12",
    fornecedor: "SiliTech Materiais",
    dataUltimaCompra: "2024-10-15",
  },
  "6": {
    id: "6",
    nome: "Transformador Trifásico 10kVA",
    codigo: "TT-10KVA-006",
    categoria: "Acabado",
    quantidade: 8,
    quantidadeMinima: 5,
    status: "em_estoque",
    descricao: "Transformador trifásico 10kVA, 380V/220V, classe de isolamento H",
    localizacao: "Setor de Acabados - Rack 1",
    fornecedor: "Interno",
    dataUltimaCompra: "2024-11-03",
  },
}

export default function CadastroEditarPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")
  const isEditing = !!productId

  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    categoria: "",
    quantidade: "",
    quantidadeMinima: "",
    descricao: "",
    localizacao: "",
    fornecedor: "",
    dataUltimaCompra: new Date().toISOString().split("T")[0],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditing && productId && PRODUCTS_DB[productId]) {
      setFormData(PRODUCTS_DB[productId])
    }
  }, [isEditing, productId])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório"
    if (!formData.codigo.trim()) newErrors.codigo = "Código é obrigatório"
    if (!formData.categoria) newErrors.categoria = "Categoria é obrigatória"
    if (!formData.quantidade) newErrors.quantidade = "Quantidade é obrigatória"
    if (isNaN(Number(formData.quantidade))) newErrors.quantidade = "Quantidade deve ser um número"
    if (!formData.quantidadeMinima) newErrors.quantidadeMinima = "Quantidade mínima é obrigatória"
    if (isNaN(Number(formData.quantidadeMinima))) newErrors.quantidadeMinima = "Quantidade mínima deve ser um número"
    if (!formData.descricao.trim()) newErrors.descricao = "Descrição é obrigatória"
    if (!formData.localizacao.trim()) newErrors.localizacao = "Localização é obrigatória"
    if (!formData.fornecedor.trim()) newErrors.fornecedor = "Fornecedor é obrigatório"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setTimeout(() => {
      window.location.href = "/estoque"
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto transition-all duration-300">
        <div className="pt-20 px-4 md:px-8 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                {isEditing ? "Editar Produto" : "Cadastrar Novo Produto"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isEditing ? "Atualize os dados do produto" : "Preencha os dados para criar um novo produto"}
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/estoque")}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={24} className="text-foreground" />
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nome do Produto</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Ex: Transformador Trifásico 10kVA"
                    className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground ${
                      errors.nome ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                </div>

                {/* Código */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Código do Produto</label>
                  <input
                    type="text"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    placeholder="Ex: TT-10KVA-001"
                    className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground ${
                      errors.codigo ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.codigo && <p className="text-red-500 text-xs mt-1">{errors.codigo}</p>}
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Categoria</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground ${
                      errors.categoria ? "border-red-500" : "border-border"
                    }`}
                  >
                    <option value="">Selecione uma categoria</option>
                    {CATEGORIAS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria}</p>}
                </div>

                {/* Fornecedor */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Fornecedor</label>
                  <input
                    type="text"
                    name="fornecedor"
                    value={formData.fornecedor}
                    onChange={handleChange}
                    placeholder="Ex: SiliTech Materiais"
                    className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground ${
                      errors.fornecedor ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.fornecedor && <p className="text-red-500 text-xs mt-1">{errors.fornecedor}</p>}
                </div>

                {/* Quantidade */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Quantidade</label>
                  <input
                    type="number"
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleChange}
                    placeholder="0"
                    className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground ${
                      errors.quantidade ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.quantidade && <p className="text-red-500 text-xs mt-1">{errors.quantidade}</p>}
                </div>

                {/* Quantidade Mínima */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Quantidade Mínima</label>
                  <input
                    type="number"
                    name="quantidadeMinima"
                    value={formData.quantidadeMinima}
                    onChange={handleChange}
                    placeholder="0"
                    className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground ${
                      errors.quantidadeMinima ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.quantidadeMinima && <p className="text-red-500 text-xs mt-1">{errors.quantidadeMinima}</p>}
                </div>

                {/* Localização */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Localização</label>
                  <input
                    type="text"
                    name="localizacao"
                    value={formData.localizacao}
                    onChange={handleChange}
                    placeholder="Ex: Prateleira A-12"
                    className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground ${
                      errors.localizacao ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.localizacao && <p className="text-red-500 text-xs mt-1">{errors.localizacao}</p>}
                </div>

                {/* Data Última Compra */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Data Última Compra</label>
                  <input
                    type="date"
                    name="dataUltimaCompra"
                    value={formData.dataUltimaCompra}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Descreva o produto..."
                  rows={5}
                  className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground resize-none ${
                    errors.descricao ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao}</p>}
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => (window.location.href = "/estoque")}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                {loading ? "Salvando..." : isEditing ? "Atualizar" : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
