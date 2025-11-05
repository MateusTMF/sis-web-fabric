import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Shield, Lock, Key, Eye } from "lucide-react"

export default function UsuariosAcessoPage() {
  const configuracoes = [
    {
      id: 1,
      nome: "Tempo de Sessão",
      valor: "30 minutos",
      descricao: "Tempo máximo de inatividade antes do logout automático",
    },
    {
      id: 2,
      nome: "Tentativas de Login",
      valor: "3 tentativas",
      descricao: "Número máximo de tentativas antes de bloquear a conta",
    },
    {
      id: 3,
      nome: "Senha Forte",
      valor: "Ativado",
      descricao: "Exigir senhas com letras, números e caracteres especiais",
    },
    {
      id: 4,
      nome: "Autenticação 2FA",
      valor: "Opcional",
      descricao: "Autenticação de dois fatores para maior segurança",
    },
  ]

  return (
    <PageLayout title="Configurações de Acesso" description="Gerencie políticas de segurança e acesso ao sistema">
      <div className="grid gap-6">
        {/* Políticas de Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Políticas de Segurança
            </CardTitle>
            <CardDescription>Configure as regras de acesso e segurança do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {configuracoes.map((config) => (
                <div key={config.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{config.nome}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{config.descricao}</p>
                    <Badge variant="secondary">{config.valor}</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controle de IPs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Controle de IPs
            </CardTitle>
            <CardDescription>Gerencie IPs permitidos e bloqueados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">IPs Permitidos</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg min-h-[100px]"
                  placeholder="Digite os IPs permitidos, um por linha"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">IPs Bloqueados</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg min-h-[100px]"
                  placeholder="Digite os IPs bloqueados, um por linha"
                />
              </div>
              <Button>Salvar Configurações</Button>
            </div>
          </CardContent>
        </Card>

        {/* Chaves de API */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Chaves de API
            </CardTitle>
            <CardDescription>Gerencie chaves de acesso para integrações externas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium mb-1">API Key Principal</h3>
                  <code className="text-sm bg-muted px-2 py-1 rounded">sk_live_••••••••••••••••</code>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Renovar
                  </Button>
                </div>
              </div>
              <Button variant="outline">
                <Key className="mr-2 h-4 w-4" />
                Gerar Nova Chave
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
