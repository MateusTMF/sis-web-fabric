"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Plus, Filter, Package, X, ChevronLeft, Calendar, AlertCircle } from "lucide-react"
import Sidebar from "../../components/sidebar"

interface Product {
  id: string
  nome: string
  codigo: string
  categoria: string
  quantidade: number
  quantidadeMinima: number
  status: "em_estoque" | "baixo_estoque" | "sem_estoque"
  ultimaAtualizacao: string
  descricao?: string
  localizacao?: string
  fornecedor?: string
  dataUltimaCompra?: string
}

const CATEGORIAS = ["Núcleos", "Bobinas", "Materiais", "Componentes", "Acabado"]
const STATUS_OPTIONS = ["em_estoque", "baixo_estoque", "sem_estoque"]

export default function EstoquePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      nome: "Nucleo de Silicio 50mm",
      codigo: "NC-50-001",
      categoria: "Nucleos",
      quantidade: 450,
      quantidadeMinima: 100,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Nucleo de silicio de alta qualidade para transformadores de potencia",
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
      descricao: "Bobina de cobre enrolada com precisao para transformadores",
      localizacao: "Prateleira B-8",
      fornecedor: "CopperPro",
      dataUltimaCompra: "2024-10-28",
    },
    {
      id: "3",
      nome: "Papel Isolante Premium",
      codigo: "PI-PRE-003",
      categoria: "Materiais",
      quantidade: 0,
      quantidadeMinima: 200,
      status: "sem_estoque",
      ultimaAtualizacao: "2024-11-02",
      descricao: "Papel isolante de alta tensao para bobinas",
      localizacao: "Prateleira C-5",
      fornecedor: "IsoMateriais",
      dataUltimaCompra: "2024-09-20",
    },
    {
      id: "4",
      nome: "Parafuso M8x50 Aco",
      codigo: "PM8-50-004",
      categoria: "Componentes",
      quantidade: 2500,
      quantidadeMinima: 500,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Parafuso de aco inoxidavel M8x50 para fixacao",
      localizacao: "Prateleira D-2",
      fornecedor: "AcoFixo",
      dataUltimaCompra: "2024-11-01",
    },
    {
      id: "5",
      nome: "Verniz Isolante 5L",
      codigo: "VI-5L-005",
      categoria: "Materiais",
      quantidade: 15,
      quantidadeMinima: 20,
      status: "baixo_estoque",
      ultimaAtualizacao: "2024-11-01",
      descricao: "Verniz isolante de alta performance para bobinas",
      localizacao: "Prateleira E-10",
      fornecedor: "VernizPlus",
      dataUltimaCompra: "2024-10-10",
    },
    {
      id: "6",
      nome: "Transformador Trifasico 10kVA",
      codigo: "TT-10KVA-006",
      categoria: "Acabado",
      quantidade: 8,
      quantidadeMinima: 5,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Transformador trifasico 10kVA, 380V/220V, classe de isolamento H",
      localizacao: "Setor de Acabados - Rack 1",
      fornecedor: "Interno",
      dataUltimaCompra: "2024-11-03",
    },
    {
      id: "7",
      nome: "Transformador Monofasico 5kVA",
      codigo: "TM-5KVA-007",
      categoria: "Acabado",
      quantidade: 12,
      quantidadeMinima: 5,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Transformador monofasico 5kVA, 220V/110V, classe de isolamento F",
      localizacao: "Setor de Acabados - Rack 2",
      fornecedor: "Interno",
      dataUltimaCompra: "2024-11-02",
    },
    {
      id: "8",
      nome: "Transformador 25kVA Especial",
      codigo: "TE-25KVA-008",
      categoria: "Acabado",
      quantidade: 3,
      quantidadeMinima: 2,
      status: "baixo_estoque",
      ultimaAtualizacao: "2024-11-03",
      descricao: "Transformador trifasico 25kVA com resfriamento a oleo, uso industrial",
      localizacao: "Setor de Acabados - Rack 3",
      fornecedor: "Interno",
      dataUltimaCompra: "2024-10-25",
    },
    {
      id: "9",
      nome: "Bobina Primaria Grande",
      codigo: "BP-GD-009",
      categoria: "Bobinas",
      quantidade: 85,
      quantidadeMinima: 30,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Bobina primaria de cobre para transformadores de alta potencia",
      localizacao: "Prateleira B-15",
      fornecedor: "CopperPro",
      dataUltimaCompra: "2024-10-30",
    },
    {
      id: "10",
      nome: "Nucleo Laminado 100mm",
      codigo: "NL-100-010",
      categoria: "Nucleos",
      quantidade: 120,
      quantidadeMinima: 50,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Nucleo laminado de silicio 100mm para transformadores de 25kVA",
      localizacao: "Prateleira A-20",
      fornecedor: "SiliTech Materiais",
      dataUltimaCompra: "2024-11-01",
    },
    {
      id: "11",
      nome: "Oleo Transformador Premium",
      codigo: "OT-PREM-011",
      categoria: "Materiais",
      quantidade: 45,
      quantidadeMinima: 20,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Oleo mineral isolante de alta qualidade para transformadores",
      localizacao: "Prateleira E-5",
      fornecedor: "OleoTec",
      dataUltimaCompra: "2024-10-20",
    },

    // === NOVOS 20 PRODUTOS ===

    {
      id: "12",
      nome: "Bobina Secundaria Media",
      codigo: "BS-MD-012",
      categoria: "Bobinas",
      quantidade: 60,
      quantidadeMinima: 25,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Bobina secundaria de cobre esmaltado para transformadores padrao",
      localizacao: "Prateleira B-16",
      fornecedor: "CopperPro",
      dataUltimaCompra: "2024-10-28",
    },
    {
      id: "13",
      nome: "Isolador Ceramico M10",
      codigo: "IC-M10-013",
      categoria: "Componentes",
      quantidade: 400,
      quantidadeMinima: 100,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Isolador ceramico roscado M10 para montagem de transformadores",
      localizacao: "Prateleira D-5",
      fornecedor: "IsoParts",
      dataUltimaCompra: "2024-10-30",
    },
    {
      id: "14",
      nome: "Conector de Cobre 16mm",
      codigo: "CC-16-014",
      categoria: "Conectores",
      quantidade: 300,
      quantidadeMinima: 50,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Conector de cobre 16mm para ligacao de bobinas e terminais",
      localizacao: "Prateleira F-3",
      fornecedor: "ElecCon",
      dataUltimaCompra: "2024-10-29",
    },
    {
      id: "15",
      nome: "Terminal de Alumino 25mm",
      codigo: "TA-25-015",
      categoria: "Conectores",
      quantidade: 210,
      quantidadeMinima: 80,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-03",
      descricao: "Terminal de alumino 25mm para transformadores de media potencia",
      localizacao: "Prateleira F-4",
      fornecedor: "ElecCon",
      dataUltimaCompra: "2024-10-18",
    },
    {
      id: "16",
      nome: "Resina Epoxi Isolante",
      codigo: "REI-016",
      categoria: "Materiais",
      quantidade: 25,
      quantidadeMinima: 10,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-02",
      descricao: "Resina epoxi isolante para encapsulamento de componentes eletricos",
      localizacao: "Prateleira E-11",
      fornecedor: "EpoxTech",
      dataUltimaCompra: "2024-10-25",
    },
    {
      id: "17",
      nome: "Fita Isolante Termica 10m",
      codigo: "FIT-10M-017",
      categoria: "Materiais",
      quantidade: 90,
      quantidadeMinima: 30,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Fita isolante termica de alta resistencia para enrolamentos",
      localizacao: "Prateleira E-12",
      fornecedor: "IsoMateriais",
      dataUltimaCompra: "2024-10-22",
    },
    {
      id: "18",
      nome: "Chapa de Aco 2mm",
      codigo: "CA-2MM-018",
      categoria: "Estruturas",
      quantidade: 120,
      quantidadeMinima: 40,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Chapa de aco carbono 2mm para estruturas de transformadores",
      localizacao: "Prateleira G-1",
      fornecedor: "AcoFixo",
      dataUltimaCompra: "2024-10-15",
    },
    {
      id: "19",
      nome: "Chapa de Aco 3mm",
      codigo: "CA-3MM-019",
      categoria: "Estruturas",
      quantidade: 80,
      quantidadeMinima: 30,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-03",
      descricao: "Chapa de aco carbono 3mm para estruturas de base",
      localizacao: "Prateleira G-2",
      fornecedor: "AcoFixo",
      dataUltimaCompra: "2024-10-14",
    },
    {
      id: "20",
      nome: "Pino de Latão 8mm",
      codigo: "PL-8MM-020",
      categoria: "Componentes",
      quantidade: 500,
      quantidadeMinima: 200,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Pino de latao 8mm usado em conexoes eletricas de transformadores",
      localizacao: "Prateleira D-8",
      fornecedor: "LatTec",
      dataUltimaCompra: "2024-10-31",
    },
    {
      id: "21",
      nome: "Disjuntor Termico 20A",
      codigo: "DT-20A-021",
      categoria: "Protecao",
      quantidade: 50,
      quantidadeMinima: 20,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-02",
      descricao: "Disjuntor termico de 20A para protecao de circuitos de transformadores",
      localizacao: "Prateleira H-2",
      fornecedor: "ElecSafe",
      dataUltimaCompra: "2024-10-27",
    },
    {
      id: "22",
      nome: "Chave Seletora 3 Posições",
      codigo: "CS-3P-022",
      categoria: "Componentes",
      quantidade: 60,
      quantidadeMinima: 20,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-03",
      descricao: "Chave seletora 3 posicoes para transformadores ajustaveis",
      localizacao: "Prateleira D-10",
      fornecedor: "ElecSafe",
      dataUltimaCompra: "2024-10-24",
    },
    {
      id: "23",
      nome: "Sensor de Temperatura NTC",
      codigo: "ST-NTC-023",
      categoria: "Sensores",
      quantidade: 75,
      quantidadeMinima: 30,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-01",
      descricao: "Sensor NTC para monitoramento de temperatura em transformadores",
      localizacao: "Prateleira J-2",
      fornecedor: "Sensorix",
      dataUltimaCompra: "2024-10-26",
    },
    {
      id: "24",
      nome: "Ventoinha 120mm 220V",
      codigo: "VT-120-024",
      categoria: "Refrigeracao",
      quantidade: 40,
      quantidadeMinima: 10,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-03",
      descricao: "Ventoinha de 120mm para resfriamento de transformadores",
      localizacao: "Prateleira K-1",
      fornecedor: "CoolTec",
      dataUltimaCompra: "2024-10-29",
    },
    {
      id: "25",
      nome: "Filtro de Oleo Industrial",
      codigo: "FOI-025",
      categoria: "Manutencao",
      quantidade: 20,
      quantidadeMinima: 10,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-02",
      descricao: "Filtro de oleo para sistemas de resfriamento a oleo",
      localizacao: "Prateleira M-2",
      fornecedor: "OilPure",
      dataUltimaCompra: "2024-10-19",
    },
    {
      id: "26",
      nome: "Relé Termico 5A",
      codigo: "RT-5A-026",
      categoria: "Protecao",
      quantidade: 45,
      quantidadeMinima: 15,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-03",
      descricao: "Rele termico de 5A para protecao de bobinas de baixa potencia",
      localizacao: "Prateleira H-3",
      fornecedor: "ElecSafe",
      dataUltimaCompra: "2024-10-28",
    },
    {
      id: "27",
      nome: "Resistor de Potencia 10 Ohms",
      codigo: "RP-10-027",
      categoria: "Componentes",
      quantidade: 90,
      quantidadeMinima: 30,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Resistor de potencia 10 Ohms 50W para circuitos de transformadores",
      localizacao: "Prateleira D-12",
      fornecedor: "ResiTech",
      dataUltimaCompra: "2024-10-22",
    },
    {
      id: "28",
      nome: "Cabo de Cobre 25mm",
      codigo: "CC-25-028",
      categoria: "Cabos",
      quantidade: 180,
      quantidadeMinima: 50,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Cabo de cobre 25mm flexivel para conexoes de potencia",
      localizacao: "Prateleira L-3",
      fornecedor: "CopperPro",
      dataUltimaCompra: "2024-10-21",
    },
    {
      id: "29",
      nome: "Cabo de Cobre 50mm",
      codigo: "CC-50-029",
      categoria: "Cabos",
      quantidade: 120,
      quantidadeMinima: 40,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-04",
      descricao: "Cabo de cobre 50mm flexivel para alta corrente",
      localizacao: "Prateleira L-4",
      fornecedor: "CopperPro",
      dataUltimaCompra: "2024-10-21",
    },
    {
      id: "30",
      nome: "Pintura Epoxi Cinza 10L",
      codigo: "PE-CZ-030",
      categoria: "Materiais",
      quantidade: 10,
      quantidadeMinima: 5,
      status: "em_estoque",
      ultimaAtualizacao: "2024-11-02",
      descricao: "Pintura epoxi cinza industrial para acabamento de transformadores",
      localizacao: "Prateleira E-15",
      fornecedor: "TintaTech",
      dataUltimaCompra: "2024-10-25",
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    categoria: "",
    status: "",
  })
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false)
      }
    }

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showFilters])

  // Filtrar produtos
  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchCategory = !filters.categoria || product.categoria === filters.categoria
    const matchStatus = !filters.status || product.status === filters.status

    return matchSearch && matchCategory && matchStatus
  })

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

  const hasActiveFilters = filters.categoria || filters.status

  if (selectedProduct) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />

        <main className="flex-1 overflow-auto transition-all duration-300">
          <div className="pt-20 px-4 md:px-8 py-6">
            {/* Header com botão voltar */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ChevronLeft size={20} />
                <span className="font-medium">Voltar</span>
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
                      <h1 className="text-3xl font-bold text-foreground">{selectedProduct.nome}</h1>
                      <p className="text-muted-foreground text-lg mt-2">Código: {selectedProduct.codigo}</p>
                    </div>
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedProduct.status)}`}
                    >
                      {getStatusLabel(selectedProduct.status)}
                    </span>
                  </div>

                  <p className="text-foreground text-base mb-6">{selectedProduct.descricao}</p>

                  {/* Grid de informações */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Categoria</p>
                      <p className="text-lg font-semibold text-foreground">{selectedProduct.categoria}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Quantidade</p>
                      <p className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Package size={16} /> {selectedProduct.quantidade}
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Quantidade Mínima</p>
                      <p className="text-lg font-semibold text-foreground">{selectedProduct.quantidadeMinima}</p>
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
                        <p className="text-foreground font-medium">{selectedProduct.localizacao}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pb-4 border-b border-border">
                      <div className="bg-muted p-2 rounded-lg">
                        <Package size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fornecedor</p>
                        <p className="text-foreground font-medium">{selectedProduct.fornecedor}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-muted p-2 rounded-lg">
                        <Calendar size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Última Compra</p>
                        <p className="text-foreground font-medium">{selectedProduct.dataUltimaCompra}</p>
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

                  {selectedProduct.quantidade === 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <p className="text-sm font-semibold text-red-800">Sem Estoque</p>
                      <p className="text-xs text-red-700 mt-1">Reposição necessária</p>
                    </div>
                  )}

                  {selectedProduct.quantidade < selectedProduct.quantidadeMinima && selectedProduct.quantidade > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <p className="text-sm font-semibold text-yellow-800">Estoque Baixo</p>
                      <p className="text-xs text-yellow-700 mt-1">Considere reabastecer</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Disponível</span>
                      <span className="font-semibold text-foreground">{selectedProduct.quantidade}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border">
                      <span className="text-sm text-muted-foreground">Mínimo</span>
                      <span className="font-semibold text-foreground">{selectedProduct.quantidadeMinima}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">Última atualização</span>
                      <span className="font-semibold text-foreground text-sm">{selectedProduct.ultimaAtualizacao}</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    Editar Produto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto transition-all duration-300">
        <div className="pt-20 px-4 md:px-8 py-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Estoque de Produtos</h1>
              <p className="text-sm text-muted-foreground">Gerencie seus produtos e níveis de estoque</p>
            </div>
            <button
              onClick={() => (window.location.href = "/estoque/produtos/novo")}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full md:w-auto justify-center"
            >
              <Plus size={18} />
              <span>Novo Produto</span>
            </button>
          </div>

          {/* Barra de Pesquisa e Filtros */}
          <div className="flex flex-col gap-3 mb-6">
            {/* Pesquisa */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Pesquisar por nome, código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                />
              </div>

              {/* Botão de Filtros */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${hasActiveFilters
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-card/80"
                    }`}
                >
                  <Filter size={18} />
                  <span className="hidden sm:inline">Filtros</span>
                </button>

                {/* Dropdown de Filtros */}
                {showFilters && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg p-4 z-50 w-80 md:w-96">
                    <h3 className="font-semibold text-foreground mb-4">Filtros</h3>

                    {/* Categoria */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">Categoria</label>
                      <select
                        value={filters.categoria}
                        onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      >
                        <option value="">Todas as categorias</option>
                        {CATEGORIAS.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                      <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      >
                        <option value="">Todos os status</option>
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {getStatusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <button
                        onClick={() =>
                          setFilters({
                            categoria: "",
                            status: "",
                          })
                        }
                        className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground hover:bg-background/80 transition-colors"
                      >
                        Limpar
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags de Filtros Ativos */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {filters.categoria && (
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {filters.categoria}
                    <X
                      size={14}
                      className="cursor-pointer hover:text-primary/70"
                      onClick={() => setFilters({ ...filters, categoria: "" })}
                    />
                  </div>
                )}
                {filters.status && (
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {getStatusLabel(filters.status)}
                    <X
                      size={14}
                      className="cursor-pointer hover:text-primary/70"
                      onClick={() => setFilters({ ...filters, status: "" })}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tabela de Produtos */}
          {filteredProducts.length > 0 ? (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Produto</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Código</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Categoria</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Quantidade</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        onClick={() => (window.location.href = `/estoque/produtos/${product.id}`)}
                        className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{product.nome}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{product.codigo}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{product.categoria}</td>
                        <td className="px-6 py-4 text-sm text-foreground text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Package size={14} className="text-muted-foreground" />
                            {product.quantidade}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              product.status,
                            )}`}
                          >
                            {getStatusLabel(product.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden divide-y divide-border">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => (window.location.href = `/estoque/produtos/${product.id}`)}
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm">{product.nome}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{product.codigo}</p>
                      </div>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          product.status,
                        )}`}
                      >
                        {getStatusLabel(product.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Categoria</p>
                        <p className="text-foreground font-medium">{product.categoria}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Qtd</p>
                        <p className="text-foreground font-medium flex items-center gap-1">
                          <Package size={12} /> {product.quantidade}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-card border border-border rounded-lg">
              <Package size={48} className="text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum produto encontrado</h3>
              <p className="text-sm text-muted-foreground">Tente ajustar seus filtros ou pesquisa</p>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
            <p>Total de produtos: {filteredProducts.length}</p>
            <p>Última atualização: {new Date().toLocaleString("pt-BR")}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
