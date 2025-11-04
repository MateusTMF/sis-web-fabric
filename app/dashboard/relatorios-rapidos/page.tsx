"use client"

import { TrendingUp, Package, ShoppingCart, AlertCircle, CheckCircle, Clock } from "lucide-react"
import Sidebar from "../../components/sidebar"

const produtosData = [
  { name: "Jan", valor: 2400 },
  { name: "Fev", valor: 1398 },
  { name: "Mar", valor: 3200 },
  { name: "Abr", valor: 2780 },
  { name: "Mai", valor: 1890 },
  { name: "Jun", valor: 2390 },
]

const estoqueData = [
  { name: "Disponível", value: 65, fill: "#3b82f6" },
  { name: "Baixo", value: 25, fill: "#fbbf24" },
  { name: "Crítico", value: 10, fill: "#ef4444" },
]

const comprasData = [
  { name: "Entregues", valor: 28 },
  { name: "Em Transit", valor: 12 },
  { name: "Pendentes", valor: 8 },
  { name: "Cancelados", valor: 2 },
]

const producaoData = [
  { name: "Seg", conclusao: 95, meta: 100 },
  { name: "Ter", conclusao: 88, meta: 100 },
  { name: "Qua", conclusao: 102, meta: 100 },
  { name: "Qui", conclusao: 92, meta: 100 },
  { name: "Sex", conclusao: 98, meta: 100 },
  { name: "Sab", conclusao: 75, meta: 100 },
]

function CustomBarChart({ data }: { data: typeof produtosData }) {
  const maxVal = Math.max(...data.map((d) => d.valor))
  const barWidth = 100 / data.length - 4

  return (
    <svg viewBox="0 0 600 300" className="w-full h-full">
      {/* Grid horizontal */}
      {[0, 25, 50, 75, 100].map((i) => (
        <line
          key={`grid-${i}`}
          x1="50"
          y1={30 + (i / 100) * 200}
          x2="580"
          y2={30 + (i / 100) * 200}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      ))}

      {/* Barras */}
      {data.map((item, idx) => {
        const barHeight = (item.valor / maxVal) * 200
        const x = 60 + idx * (520 / data.length) + (520 / data.length) * 0.2
        const y = 230 - barHeight

        return (
          <g key={item.name}>
            <rect x={x} y={y} width={barWidth} height={barHeight} fill="#3b82f6" rx="4" />
            <text x={x + barWidth / 2} y="270" textAnchor="middle" fontSize="12" fill="#6b7280">
              {item.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function CustomPieChart({ data }: { data: typeof estoqueData }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  let startAngle = -Math.PI / 2
  const cx = 150
  const cy = 150
  const radius = 80

  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      {data.map((item, idx) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI
        const endAngle = startAngle + sliceAngle

        const x1 = cx + radius * Math.cos(startAngle)
        const y1 = cy + radius * Math.sin(startAngle)
        const x2 = cx + radius * Math.cos(endAngle)
        const y2 = cy + radius * Math.sin(endAngle)

        const largeArc = sliceAngle > Math.PI ? 1 : 0

        const pathData = [
          `M ${cx} ${cy}`,
          `L ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
          "Z",
        ].join(" ")

        const labelAngle = startAngle + sliceAngle / 2
        const labelX = cx + radius * 0.65 * Math.cos(labelAngle)
        const labelY = cy + radius * 0.65 * Math.sin(labelAngle)

        startAngle = endAngle

        return (
          <g key={item.name}>
            <path d={pathData} fill={item.fill} />
            <text x={labelX} y={labelY} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              {item.value}%
            </text>
          </g>
        )
      })}

      {/* Legenda */}
      {data.map((item, idx) => (
        <g key={`legend-${item.name}`}>
          <rect x="10" y={220 + idx * 20} width="12" height="12" fill={item.fill} />
          <text x="28" y={230 + idx * 20} fontSize="12" fill="#6b7280">
            {item.name}: {item.value}%
          </text>
        </g>
      ))}
    </svg>
  )
}

function CustomHorizontalBarChart({ data }: { data: typeof comprasData }) {
  const maxVal = Math.max(...data.map((d) => d.valor))
  const barHeight = 40

  return (
    <svg viewBox="0 0 600 260" className="w-full h-full">
      {data.map((item, idx) => {
        const barWidth = (item.valor / maxVal) * 400
        const y = 30 + idx * barHeight

        return (
          <g key={item.name}>
            <rect x="120" y={y} width={barWidth} height="30" fill="#10b981" rx="4" />
            <text x="110" y={y + 20} textAnchor="end" fontSize="12" fill="#6b7280">
              {item.name}
            </text>
            <text x={130 + barWidth} y={y + 20} fontSize="12" fill="#6b7280" fontWeight="bold">
              {item.valor}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function CustomLineChart({ data }: { data: typeof producaoData }) {
  const maxVal = 110
  const width = 500
  const height = 200
  const pointsPerSegment = width / (data.length - 1)

  const conclusaoPoints = data.map((d, i) => ({
    x: i * pointsPerSegment,
    y: height - (d.conclusao / maxVal) * height,
  }))

  const metaPoints = data.map((d, i) => ({
    x: i * pointsPerSegment,
    y: height - (d.meta / maxVal) * height,
  }))

  const conclusaoPath = conclusaoPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const metaPath = metaPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")

  return (
    <svg viewBox="0 0 600 280" className="w-full h-full">
      {/* Grid */}
      {[0, 25, 50, 75, 100].map((i) => (
        <line
          key={`grid-${i}`}
          x1="50"
          y1={30 + (i / 100) * 200}
          x2="550"
          y2={30 + (i / 100) * 200}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      ))}

      {/* Linha de meta (tracejada) */}
      <path
        d={`M 50 ${30 + metaPoints[0].y} ${metaPath.substring(2)}`}
        stroke="#d1d5db"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
      />

      {/* Linha de conclusão */}
      <path
        d={`M 50 ${30 + conclusaoPoints[0].y} ${conclusaoPath.substring(2)}`}
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
      />

      {/* Pontos de conclusão */}
      {conclusaoPoints.map((p, i) => (
        <circle key={`dot-${i}`} cx={50 + p.x} cy={30 + p.y} r="4" fill="#3b82f6" />
      ))}

      {/* Labels X */}
      {data.map((item, idx) => (
        <text
          key={`label-${item.name}`}
          x={50 + idx * pointsPerSegment}
          y="270"
          textAnchor="middle"
          fontSize="12"
          fill="#6b7280"
        >
          {item.name}
        </text>
      ))}
    </svg>
  )
}

export default function RelatoriosRapidos() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto transition-all duration-300">
        {/* Header */}
        <div className="pt-20 px-4 md:px-8 py-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Relatórios Rápidos</h1>
          <p className="text-muted-foreground">Visão geral dos indicadores-chave do sistema</p>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Vendas */}
          <div className="bg-white dark:bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Vendas Mês</p>
                <p className="text-2xl lg:text-3xl font-bold text-foreground">R$ 45.230</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <span>↑ 12.5%</span> vs mês anterior
            </p>
          </div>

          {/* Estoque */}
          <div className="bg-white dark:bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Itens em Estoque</p>
                <p className="text-2xl lg:text-3xl font-bold text-foreground">1.240</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-yellow-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> 8 itens baixos
            </p>
          </div>

          {/* Compras */}
          <div className="bg-white dark:bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pedidos Compra</p>
                <p className="text-2xl lg:text-3xl font-bold text-foreground">28</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Todos entregues
            </p>
          </div>

          {/* Produção */}
          <div className="bg-white dark:bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Taxa Produção</p>
                <p className="text-2xl lg:text-3xl font-bold text-foreground">94%</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Em dia com metas
            </p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Vendas por Mês */}
          <div className="bg-white dark:bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Vendas por Mês</h2>
            <div className="w-full h-80">
              <CustomBarChart data={produtosData} />
            </div>
          </div>

          {/* Status Estoque */}
          <div className="bg-white dark:bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Status do Estoque</h2>
            <div className="w-full h-80 flex items-center justify-center">
              <CustomPieChart data={estoqueData} />
            </div>
          </div>
        </div>

        {/* Mais Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compras */}
          <div className="bg-white dark:bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Pedidos de Compra</h2>
            <div className="w-full h-72">
              <CustomHorizontalBarChart data={comprasData} />
            </div>
          </div>

          {/* Produção */}
          <div className="bg-white dark:bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Produção vs Meta</h2>
            <div className="w-full h-72">
              <CustomLineChart data={producaoData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
