import PageLayout from "../../../components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { UserPlus, Search, Edit, Trash2, Mail, Shield } from "lucide-react"

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@fabrica.com",
    role: "Administrador",
    department: "TI",
    status: "active",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@fabrica.com",
    role: "Gerente",
    department: "Produção",
    status: "active",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@fabrica.com",
    role: "Operador",
    department: "Produção",
    status: "active",
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@fabrica.com",
    role: "Analista",
    department: "Qualidade",
    status: "active",
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos.ferreira@fabrica.com",
    role: "Supervisor",
    department: "Manutenção",
    status: "active",
  },
  {
    id: 6,
    name: "Juliana Lima",
    email: "juliana.lima@fabrica.com",
    role: "Operador",
    department: "Estoque",
    status: "inactive",
  },
]

const getRoleBadge = (role: string) => {
  switch (role) {
    case "Administrador":
      return <Badge variant="destructive">Administrador</Badge>
    case "Gerente":
      return <Badge className="bg-purple-600">Gerente</Badge>
    case "Supervisor":
      return <Badge className="bg-blue-600">Supervisor</Badge>
    case "Analista":
      return <Badge className="bg-cyan-600">Analista</Badge>
    case "Operador":
      return <Badge variant="secondary">Operador</Badge>
    default:
      return <Badge variant="outline">{role}</Badge>
  }
}

const getStatusBadge = (status: string) => {
  return status === "active" ? (
    <Badge className="bg-green-600">Ativo</Badge>
  ) : (
    <Badge variant="secondary">Inativo</Badge>
  )
}

export default function CadastroUsuariosPage() {
  return (
    <PageLayout title="Cadastro de Usuários" description="Gerencie os usuários do sistema e suas informações">
      {/* New User Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Novo Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" placeholder="Digite o nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="usuario@fabrica.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(00) 00000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="producao">Produção</SelectItem>
                    <SelectItem value="qualidade">Qualidade</SelectItem>
                    <SelectItem value="estoque">Estoque</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="ti">TI</SelectItem>
                    <SelectItem value="rh">RH</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Perfil de Acesso</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="gerente">Gerente</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="analista">Analista</SelectItem>
                    <SelectItem value="operador">Operador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha Inicial</Label>
                <Input id="password" type="password" placeholder="Senha temporária" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit">
                <UserPlus className="h-4 w-4 mr-2" />
                Cadastrar Usuário
              </Button>
              <Button type="button" variant="outline">
                Limpar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por nome, e-mail ou departamento..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="gerente">Gerente</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="analista">Analista</SelectItem>
                <SelectItem value="operador">Operador</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários Cadastrados ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{user.name}</h3>
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {user.department}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
