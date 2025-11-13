export type SetorProducao =
  | "nucleo"
  | "eletrica"
  | "laboratorio"
  | "alta-tensao"
  | "pintura"
  | "baixa-tensao"
  | "montagem-final"

export const SETORES: Record<SetorProducao, { nome: string; descricao: string; ordem: number }> = {
  nucleo: {
    nome: "Núcleo",
    descricao: "Montagem e laminação do núcleo",
    ordem: 1,
  },
  "alta-tensao": {
    nome: "Alta Tensão",
    descricao: "Enrolamento de alta tensão",
    ordem: 2,
  },
  "baixa-tensao": {
    nome: "Baixa Tensão",
    descricao: "Enrolamento de baixa tensão",
    ordem: 3,
  },
  eletrica: {
    nome: "Elétrica",
    descricao: "Montagem e testes elétricos",
    ordem: 4,
  },
  laboratorio: {
    nome: "Laboratório",
    descricao: "Testes e ensaios de qualidade",
    ordem: 5,
  },
  pintura: {
    nome: "Pintura",
    descricao: "Pintura e acabamento",
    ordem: 6,
  },
  "montagem-final": {
    nome: "Montagem Final",
    descricao: "Montagem final e embalagem",
    ordem: 7,
  },
}

export interface EtapaProducao {
  id: string
  setor: SetorProducao
  status: "nao-iniciada" | "em-progresso" | "pausada" | "concluida" | "com-erro"
  progresso: number // 0-100%
  dataInicio?: string
  dataConclusao?: string
  observacoes: string
  tempoEstimado: number // minutos
  tempoReal?: number // minutos
}

export interface RelatorioSetorProducao {
  setor: SetorProducao
  etapa: EtapaProducao
  horasGastas: number
  statusValidacao: "pendente" | "validado" | "reprovado"
  responsavel?: string
}
