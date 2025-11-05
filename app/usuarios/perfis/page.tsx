import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Shield, Edit, Users, Check, X } from "lucide-react"

const profiles = [
  {
    id: 1,
    name: "Administrador",
    users: 3,
    permissions: {
      dashboard: true,
      usuarios: true,
      producao: true,
      solicitacoes: true,
      materiais: true,
      compras: true,
      financeiro: true,
      contabil: true,
      fiscal: true,
      qualidade: true,
      produtos: true,
      vendas: true,
      rh: true,
      relatorios: true,
      seguranca: true,
      integracoes: true,
      configuracoes: true,
    },
  },
  {
    id: 2,
    name: "Gerente de Produção",
    users: 5,
    permissions: {
      dashboard: true,
      usuarios: false,
      producao: true,
      solicitacoes: true,
      materiais: true,
      compras: false,
      financeiro: false,
      contabil: false,
      fiscal: false,
      qualidade: true,
      produtos: true,
      vendas: false,
      rh: false,
      relatorios: true,
      seguranca: false,
      integracoes: false,
      configuracoes: false,
    },
  },
  {
    id: 3,
    name: "Operador",
    users: 45,
    permissions: {
      dashboard: true,
      usuarios: false,
      producao: true,
      solicitacoes: true,
      materiais: false,
      compras: false,
      financeiro: false,
      contabil: false,
      fiscal: false,
      qualidade: true,
      produtos: false,
      vendas: false,
      rh: false,
      relatorios: false,
      seguranca: false,
      integracoes: false,
      configuracoes: false,
    },
  },
]

const modules = [
  { key: "dashboard", label: "Dashboard" },
  { key: "usuarios", label: "Usuários" },
  { key: "producao", label: "Produção" },
  { key: "solicitacoes", label: "Solicitações" },
  { key: "materiais", label: "Materiais" },
  { key: "compras", label: "Compras" },
  { key: "financeiro", label: "Financeiro" },
  { key: "contabil", label: "Contábil" },
  { key: "fiscal", label: "Fiscal" },
  { key: "qualidade", label: "Qualidade" },
  { key: "produtos", label: "Produtos" },
  { key: "vendas", label: "Vendas" },
  { key: "rh", label: "RH" },
  { key: "relatorios", label: "Relatórios" },
  { key: "seguranca", label: "Segurança" },
  { key: "integracoes", label: "Integrações" },
  { key: "configuracoes", label: "Configurações" },
]

export default function PerfisPage() {
  return (
    <PageLayout title="Perfis e Permissões" description="Gerencie os perfis de acesso e suas permissões no sistema">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Card key={profile.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {profile.name}
                </CardTitle>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Users className="h-4 w-4" />
                {profile.users} usuários
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-semibold mb-3">Permissões:</p>
                <div className="grid grid-cols-2 gap-2">
                  {modules.map((module) => (
                    <div key={module.key} className="flex items-center gap-2 text-xs">
                      {profile.permissions[module.key as keyof typeof profile.permissions] ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <X className="h-3 w-3 text-red-600" />
                      )}
                      <span
                        className={
                          profile.permissions[module.key as keyof typeof profile.permissions]
                            ? ""
                            : "text-muted-foreground"
                        }
                      >
                        {module.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
