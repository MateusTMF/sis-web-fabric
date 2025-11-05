import PageLayout from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ChevronRight } from "lucide-react"

const accounts = [
  { code: "1", name: "ATIVO", type: "group", level: 0 },
  { code: "1.1", name: "Ativo Circulante", type: "group", level: 1 },
  { code: "1.1.1", name: "Caixa e Equivalentes", type: "account", level: 2, balance: 193000 },
  { code: "1.1.2", name: "Contas a Receber", type: "account", level: 2, balance: 56350 },
  { code: "1.1.3", name: "Estoques", type: "account", level: 2, balance: 280000 },
  { code: "1.2", name: "Ativo Não Circulante", type: "group", level: 1 },
  { code: "1.2.1", name: "Imobilizado", type: "account", level: 2, balance: 850000 },
  { code: "2", name: "PASSIVO", type: "group", level: 0 },
  { code: "2.1", name: "Passivo Circulante", type: "group", level: 1 },
  { code: "2.1.1", name: "Fornecedores", type: "account", level: 2, balance: 72750 },
  { code: "2.1.2", name: "Salários a Pagar", type: "account", level: 2, balance: 45000 },
  { code: "3", name: "PATRIMÔNIO LÍQUIDO", type: "group", level: 0 },
  { code: "3.1", name: "Capital Social", type: "account", level: 1, balance: 500000 },
  { code: "4", name: "RECEITAS", type: "group", level: 0 },
  { code: "4.1", name: "Receita de Vendas", type: "account", level: 1, balance: 670000 },
  { code: "5", name: "DESPESAS", type: "group", level: 0 },
  { code: "5.1", name: "Despesas Operacionais", type: "group", level: 1 },
  { code: "5.1.1", name: "Salários e Encargos", type: "account", level: 2, balance: 180000 },
  { code: "5.1.2", name: "Materiais e Insumos", type: "account", level: 2, balance: 250000 },
]

export default function PlanoContasPage() {
  return (
    <PageLayout title="Plano de Contas" description="Estrutura completa do plano de contas contábil">
      <div className="mb-6 flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Conta
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Ativo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.379.350</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Passivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 117.750</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Patrimônio Líquido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 500.000</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contas Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estrutura do Plano de Contas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {accounts.map((account) => (
              <div
                key={account.code}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  account.type === "group" ? "bg-muted font-semibold" : "bg-muted/30 hover:bg-muted/50"
                }`}
                style={{ paddingLeft: `${account.level * 24 + 12}px` }}
              >
                <div className="flex items-center gap-3 flex-1">
                  {account.type === "group" && <ChevronRight className="h-4 w-4" />}
                  <span className="font-mono text-sm">{account.code}</span>
                  <span className={account.type === "group" ? "font-semibold" : ""}>{account.name}</span>
                  {account.type === "group" && <Badge variant="outline">Grupo</Badge>}
                </div>
                {account.balance !== undefined && (
                  <span className="font-mono font-semibold">
                    R$ {account.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
