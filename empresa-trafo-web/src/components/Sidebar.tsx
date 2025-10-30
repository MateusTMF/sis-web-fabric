"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Home,
  Package,
  ShoppingCart,
  Factory,
  Boxes,
  Users,
  ClipboardList,
  BarChart3,
  DollarSign,
  Calculator,
  FileSpreadsheet,
  Shield,
  HelpCircle,
} from "lucide-react";

interface MenuItem {
  title: string;
  icon?: any;
  path?: string;
  description?: string;
  component?: string;
  subItems?: MenuItem[];
}

const menu: MenuItem[] = [
  {
    title: "Início",
    icon: Home,
    subItems: [
      { title: "Dashboard Geral", path: "/dashboard" },
      { title: "Indicadores e KPIs", path: "/indicadores" },
    ],
  },
  {
    title: "Materiais e Estoque",
    icon: Boxes,
    subItems: [
      {
        title: "Cadastro de Matérias-Primas",
        path: "/estoque/materias-primas",
        description: "Gerencie o cadastro de matérias-primas e insumos utilizados na produção.",
        component: "MateriasPrimasPage",
      },
      {
        title: "Controle de Estoque",
        path: "/estoque/controle",
        description: "Visualize saldos, movimentações e localização dos materiais no estoque.",
        component: "ControleEstoquePage",
      },
      {
        title: "Alertas de Reposição",
        path: "/estoque/alertas",
        description: "Monitore materiais com saldo abaixo do mínimo e gere solicitações de compra.",
        component: "AlertasReposicaoPage",
      },
      {
        title: "Solicitações Internas",
        path: "/estoque/solicitacoes",
        description: "Registre solicitações internas de materiais por setor ou responsável.",
        component: "SolicitacoesInternasPage",
      },
    ],
  },
  {
    title: "Compras",
    icon: ShoppingCart,
    subItems: [
      { title: "Requisição de Compra", path: "/compras/requisicao" },
      { title: "Cotação de Fornecedores", path: "/compras/cotacao" },
      { title: "Pedidos de Compra", path: "/compras/pedidos" },
      { title: "Entrada de Notas Fiscais", path: "/compras/nfe" },
      { title: "Relatórios de Compras", path: "/compras/relatorios" },
    ],
  },
  {
    title: "Produção",
    icon: Factory,
    subItems: [
      { title: "Ordens de Produção", path: "/producao/op" },
      { title: "Materiais para Produção", path: "/producao/materiaisparaproducao" },
      { title: "Controle de Qualidade", path: "/producao/qualidade" },
      { title: "Registro de Refugo e Perdas", path: "/producao/refugo" },
      { title: "Histórico de Produção e Eficiência", path: "/producao/historicoproducao" },
    ],
  },
  {
    title: "Produtos Acabados",
    icon: Package,
    subItems: [
      { title: "Cadastro de Produtos", path: "/produtos/cadastro" },
      { title: "Controle de Estoque", path: "/produtos/estoque" },
      { title: "Expedição e Entrega", path: "/produtos/expedicao" },
    ],
  },
  {
    title: "Comercial e Vendas",
    icon: ClipboardList,
    subItems: [
      { title: "Clientes", path: "/vendas/clientes" },
      { title: "Pedidos de Venda e Orçamentos", path: "/vendas/pedidoseorcamentos" },
      { title: "Emissão de NF-e", path: "/vendas/nfe" },
      { title: "Entregas", path: "/vendas/entregas" },
    ],
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    subItems: [
      { title: "Contas a Pagar", path: "/financeiro/pagar" },
      { title: "Contas a Receber", path: "/financeiro/receber" },
      { title: "Fluxo de Caixa", path: "/financeiro/fluxo" },
      { title: "Conciliação Bancária", path: "/financeiro/conciliacao" },
    ],
  },
  {
    title: "Contábil",
    icon: Calculator,
    subItems: [
      { title: "Plano de Contas", path: "/contabil/plano" },
      { title: "Apuração de Impostos", path: "/contabil/impostos" },
      { title: "Relatórios Contábeis", path: "/contabil/relatorios" },
    ],
  },
  {
    title: "Fiscal",
    icon: FileSpreadsheet,
    subItems: [
      { title: "ICMS, IPI, PIS/COFINS", path: "/fiscal/impostos" },
      { title: "NF-e / NFC-e", path: "/fiscal/nfe" },
      { title: "SPED Fiscal", path: "/fiscal/sped" },
      { title: "Auditoria Fiscal", path: "/fiscal/auditoria" },
    ],
  },
  {
    title: "Recursos Humanos",
    icon: Users,
    subItems: [
      { title: "Cadastro de Funcionários", path: "/rh/funcionarios" },
      { title: "Controle de Ponto", path: "/rh/ponto" },
      { title: "Folha de Pagamento", path: "/rh/folha" },
      { title: "Benefícios e Férias", path: "/rh/beneficios" },
    ],
  },
  {
    title: "Relatórios e Dashboards",
    icon: BarChart3,
    subItems: [
      { title: "Produção", path: "/relatorios/producao" },
      { title: "Estoque", path: "/relatorios/estoque" },
      { title: "Compras", path: "/relatorios/compras" },
      { title: "Financeiro", path: "/relatorios/financeiro" },
      { title: "Contábil", path: "/relatorios/contabil" },
    ],
  },
  {
    title: "Segurança e Acesso",
    icon: Shield,
    subItems: [
      { title: "Perfis de Usuário", path: "/seguranca/perfis" },
      { title: "Permissões", path: "/seguranca/permissoes" },
      { title: "Auditoria e Logs", path: "/seguranca/logs" },
    ],
  },
  {
    title: "Suporte e Manutenção",
    icon: HelpCircle,
    subItems: [
      { title: "Backup e Atualizações", path: "/suporte/backup" },
      { title: "Suporte Técnico", path: "/suporte/tecnico" },
    ],
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);
const [collapsed, setCollapsed] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Abre automaticamente o submenu correspondente ao path ativo
  useEffect(() => {
    menu.forEach((item) => {
      if (item.subItems?.some((sub) => sub.path === pathname)) {
        setOpen(item.title);
        if (collapsed) setCollapsed(false);
      }
    });
  }, [pathname]);

  // Fecha a sidebar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        setCollapsed(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`h-screen bg-neutral-900 text-neutral-100 border-r border-neutral-700 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Cabeçalho */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-neutral-700">
        {!collapsed && <span className="text-lg font-semibold">Empresa Trafo</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-neutral-800 transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 scroll-smooth">
        {menu.map((item) => (
          <div key={item.title}>
            <button
              onClick={() => {
                if (collapsed) {
                  setCollapsed(false);
                  setTimeout(() => {
                    setOpen(open === item.title ? null : item.title);
                  }, 50);
                } else {
                  setOpen(open === item.title ? null : item.title);
                }
              }}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
              title={collapsed ? item.title : ""}
            >
              <div className="flex items-center space-x-3">
                {item.icon && <item.icon size={18} />}
                {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
              </div>
              {!collapsed && item.subItems && (
                open === item.title ? <ChevronDown size={16} /> : <ChevronRight size={16} />
              )}
            </button>

            {!collapsed && open === item.title && item.subItems && (
              <div className="ml-6 mt-1 space-y-1 overflow-hidden transition-[max-height] duration-300">
                {item.subItems.map((sub) => (
                  <Link
                    key={sub.title}
                    href={sub.path || "#"}
                    className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${
                      pathname === sub.path
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                    }`}
                    title={sub.description || sub.title}
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
