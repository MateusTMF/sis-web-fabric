"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Menu,
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Zap,
  DollarSign,
  Users,
  BarChart3,
  FileText,
  ChevronDown,
} from "lucide-react"
import { Button } from "./ui/button"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const menuItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      submenu: [
        { label: "Visão Geral", href: "/" },
        { label: "Relatórios Rápidos", href: "/dashboard/relatorios-rapidos" },
      ],
    },
    {
      label: "Estoque",
      href: "/estoque",
      icon: Package,
      submenu: [
        { label: "Produtos", href: "/estoque/produtos" },
        { label: "Movimentação", href: "/estoque/movimentacao" },
        { label: "Ajustes", href: "/estoque/ajustes" },
      ],
    },
    {
      label: "Compras",
      href: "/compras",
      icon: ShoppingCart,
      submenu: [
        { label: "Pedidos", href: "/compras/pedidos" },
        { label: "Fornecedores", href: "/compras/fornecedores" },
        { label: "Cotações", href: "/compras/cotacoes" },
      ],
    },
    {
      label: "Produção",
      href: "/producao",
      icon: Zap,
      submenu: [
        { label: "Ordens de Produção", href: "/producao/ordens" },
        { label: "Máquinas", href: "/producao/maquinas" },
        { label: "Qualidade", href: "/producao/qualidade" },
      ],
    },
    {
      label: "Vendas",
      href: "/vendas",
      icon: DollarSign,
      submenu: [
        { label: "Pedidos", href: "/vendas/pedidos" },
        { label: "Clientes", href: "/vendas/clientes" },
        { label: "Cotações", href: "/vendas/cotacoes" },
      ],
    },
    {
      label: "Financeiro",
      href: "/financeiro",
      icon: BarChart3,
      submenu: [
        { label: "Contas a Pagar", href: "/financeiro/pagar" },
        { label: "Contas a Receber", href: "/financeiro/receber" },
        { label: "Fluxo de Caixa", href: "/financeiro/fluxo" },
      ],
    },
    {
      label: "RH",
      href: "/rh",
      icon: Users,
      submenu: [
        { label: "Funcionários", href: "/rh/funcionarios" },
        { label: "Folha de Pagamento", href: "/rh/folha" },
        { label: "Departamentos", href: "/rh/departamentos" },
      ],
    },
    {
      label: "Relatórios",
      href: "/relatorios",
      icon: FileText,
      submenu: [
        { label: "Vendas", href: "/relatorios/vendas" },
        { label: "Produção", href: "/relatorios/producao" },
        { label: "Financeiro", href: "/relatorios/financeiro" },
      ],
    },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setExpandedMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  return (
    <>
      {/* Desktop e Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-56 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-sidebar-border mt-14">
            <h1 className="text-xl font-bold text-sidebar-primary">ERP</h1>
            <p className="text-xs text-sidebar-foreground/60 mt-1">Fábrica</p>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const isExpanded = expandedMenu === item.label

              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
                  >
                    <IconComponent size={18} className="flex-shrink-0" />
                    <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isExpanded && item.submenu && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-sidebar-accent/30 pl-3">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          className="flex items-center px-3 py-1.5 rounded text-xs text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-sidebar-border space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm h-9"
            >
              <Settings size={16} className="mr-3" />
              Configurações
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm h-9"
            >
              <LogOut size={16} className="mr-3" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
