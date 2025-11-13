// Tipos para Ordem de Produção de Transformadores

export interface DadosGerais {
  numeroSerie: string
  potencia: number // kVA
  numeroFases: number
  classe: number // kV
  frequencia: number // Hz
  tipoTransformador: string
  tipoNucleo: string
  refrigeracao: string
  instalacao: string
  novoOuReforma: string
  projeto: string
  foc: string
  dataElaboracao: string
  dataVerificacao: string
  dataAprovacao: string
  elaboradoPor: string
  verificadoPor: string
  aprovadoPor: string
  arquivo: string
}

export interface DadosEletricos {
  // Alta Tensão
  tensaoNominalAT: number
  tensaoMinimaAT: number
  tensaoMaximaAT: number
  correnteNominalAT: number
  correnteMinimaAT: number
  correnteMaximaAT: number
  ligacaoAT: string

  // Baixa Tensão
  tensaoNominalBT: number
  tensaoFaseBT: number
  correnteNominalBT: number
  correnteLinhaBT: number
  ligacaoBT: string

  // TAPs
  taps: Tap[]
}

export interface Tap {
  numero: number
  tensaoAT: number
  tensaoBT: number
  erro: number
  espirasAT: number
  espirasBT: number
  relacao: number
  relacaoCalculada: number
  relacaoFabricada: number
}

export interface EnrolamentoAT {
  diametroInterno: number
  diametroExterno: number
  diametroExternoMaior: number
  diametroMedio: number
  alturaBobina: number
  alturaUtil: number
  alturaEletrica: number
  alturaModelo: number

  tipoFio: string
  materialFio: string
  diametroFio: number
  awgFio: string
  secaoFio: number

  numeroCamadas: number
  numeroEspiras: number
  espirasTotal: number
  espirasPorCamada: number
  isolacaoCamada: number

  numeroCanais: number
  espessuraCanal: number
  numeroMeioCanal: number

  voltPorEspira: number
  densidadeCorrente1: number
  densidadeCorrente2: number

  pesoAluminio: number
  pesoTotal: number
  comprimentoFio: number

  corte: number
  inicioEspiras: number
  sequenciaEnrolamento: string
  observacoes: string
}

export interface EnrolamentoBT {
  diametroInterno: number
  diametroExterno: number
  diametroMedio: number
  alturaBobina: number
  alturaUtil: number
  alturaEletrica: number
  alturaModelo: number

  tipoFio: string
  materialFio: string
  secaoTotalFio: number
  larguraFio: number
  espessuraFio: number
  larguraFioTotal: number
  espessuraFioTotal: number
  disposicaoFio: string

  numeroCamadas: number
  numeroEspiras: number
  espirasPorCamada: number
  isolacaoCamada: number

  numeroCanais: number
  canalInterno: boolean

  numeroBobinas: number
  densidadeCorrente: number

  pesoAluminio: number
  pesoTotal: number
  comprimentoFio: number

  cabeceira: {
    a: number
    b: number
    c: number
    e: number
  }

  isolacaoAxial: number
  isolacaoRadial: number
  enchimento: number
  observacoes: string
}

export interface Nucleo {
  tipo: string // Tipo V, etc
  numeroColunas: number
  numeroPassos: number

  diametroNucleo: number
  secaoNucleo: number

  largura: number
  altura: number
  profundidade: number

  corte: number
  empilhamento: number

  // Chapas
  tipoChapa: string
  espessuraChapa: number
  fatorEmpilhamento: number
  areaLiquida: number
  pesoBruto: number
  pesoLiquido: number

  indutanciaMagnetica: number // B (Gauss)
  perdaPorKg: number // W/kg
  vaPorKg: number // VA/kg

  distanciaEntreColunasLinha: number
  distanciaEntreColunasColuna: number

  observacoes: string
}

export interface Tanque {
  tipo: string
  formato: string // Oval, Retangular, etc

  largura: number
  altura: number
  profundidade: number

  pesoTanque: number
  pesoParteAtiva: number
  pesoOleo: number
  pesoTotal: number

  volumeOleo: number
  volumeOleoTanque: number
  volumeOleoConservador: number
  volumeOleoTubos: number

  nivelOleo: number
  elevacaoOleo: number

  // Radiadores
  numeroRadiadores: number
  numeroTubos: number
  comprimentoTubos: number
  secaoTubos: number
  fatorTubos: number
  pesoTubosPorRadiador: number

  // Dimensões internas
  larguraInterna: number
  alturaInterna: number
  profundidadeInterna: number

  observacoes: string
}

export interface PerdasRendimento {
  perdasVazio: number // Wo
  perdasCobre: number // Wc
  perdasTotais: number

  impedancia: number // Z%
  correnteVazio: number // Io%

  resistenciaAT: number // Ohms
  resistenciaBT: number // Ohms
  reatanciaAT: number // Ohms

  gradienteAT: number // °C
  gradienteBT: number // °C
  elevacaoTemperatura: number // °C

  rendimento: number // %
}

export interface Acessorios {
  // Buchas
  buchaBTTipo: string
  buchaATTipo: string
  localizacaoBuchaAT: string
  localizacaoBuchaBT: string

  // Proteção
  releGas: boolean
  releGasContatos: number
  valvulaPressao: boolean
  valvulaPressaoContatos: number
  relePressaoSubita: boolean
  tuboExplosao: boolean

  // Monitoramento
  termometro: boolean
  termometroContatos: number
  termometroImagemTermica: boolean
  controladorTemperatura: boolean
  sensorTemperatura: number
  manovacuometro: boolean
  manovacuometroContatos: number
  indicadorNivelMagnetico: boolean
  indicadorNivelContatos: number

  // Conservador e Resfriamento
  conservadorOleo: boolean
  bolsaNeoprene: boolean
  secadorArSilica: boolean
  ventilacaoForcada: number

  // Comutador
  comutador: string
  comutadorBaixoCarga: boolean
  acionamentoComutadorExterno: boolean

  // Instalação
  olhaisSuspensaoTanque: number
  olhaisSuspensaoTampa: number
  apoioMacaco: boolean
  tampaInspecao: boolean

  // Outros
  placaIdentificacao: boolean
  caixaLigacao: boolean
  painelLigacao: boolean
  caixaPassagem: boolean
  guiaCabos: boolean
  caboFlexLigacao: boolean
  flangeBT: boolean
  flangeAT: boolean
  btTerminalSpade: boolean

  tanqueGalvanizado: boolean
  tanqueMaritimo: boolean
  padMounted: boolean
  subterraneo: boolean
  embalagem: string

  observacoes: string
}

export interface Dimensoes {
  // Chassis e Sapatas
  vigas: {
    largura: number
    comprimento: number
    massa: number
  }

  sapatas: {
    dimensoes: string
    quantidade: number
  }

  estiranteHorizontal: {
    dimensoes: string
    quantidade: number
  }

  estiranteVertical: {
    dimensoes: string
    quantidade: number
  }

  fixacao: {
    dimensoes: string
    quantidade: number
  }

  dimensoesTotais: {
    altura: number
    largura: number
    profundidade: number
  }
}

export interface OrdemProducao {
  id: string
  numeroOP: string
  status: "aguardando" | "em-producao" | "pausada" | "concluida"
  prioridade: "baixa" | "normal" | "alta" | "urgente"

  // Dados principais
  dadosGerais: DadosGerais
  dadosEletricos: DadosEletricos
  enrolamentoAT: EnrolamentoAT
  enrolamentoBT: EnrolamentoBT
  nucleo: Nucleo
  tanque: Tanque
  perdasRendimento: PerdasRendimento
  acessorios: Acessorios
  dimensoes: Dimensoes

  // Controle de produção
  operador?: string
  maquina?: string
  dataInicio?: string
  dataPrazo?: string
  dataConclusao?: string
  progresso: number
  observacoesProducao?: string

  // Metadados
  criadoEm: string
  atualizadoEm: string
  criadoPor: string
}

// Dados mock para desenvolvimento
export const ordensProducaoMock: OrdemProducao[] = [
  {
    id: "1",
    numeroOP: "3075/ALM3/24",
    status: "em-producao",
    prioridade: "alta",
    dadosGerais: {
      numeroSerie: "0",
      potencia: 75,
      numeroFases: 3,
      classe: 15,
      frequencia: 60,
      tipoTransformador: "Transformador a óleo",
      tipoNucleo: "Núcleo V",
      refrigeracao: "ONAN",
      instalacao: "Poste",
      novoOuReforma: "Novo",
      projeto: "3075/ALM3/24",
      foc: "",
      dataElaboracao: "11/10/2023",
      dataVerificacao: "11/10/2023",
      dataAprovacao: "",
      elaboradoPor: "ARISTIDES",
      verificadoPor: "ARISTIDES",
      aprovadoPor: "",
      arquivo: "ASS0054-10",
    },
    dadosEletricos: {
      tensaoNominalAT: 13800,
      tensaoMinimaAT: 11400,
      tensaoMaximaAT: 13800,
      correnteNominalAT: 1.81,
      correnteMinimaAT: 1.81,
      correnteMaximaAT: 2.19,
      ligacaoAT: "Triângulo (Dy)",
      tensaoNominalBT: 380,
      tensaoFaseBT: 219.4,
      correnteNominalBT: 113.95,
      correnteLinhaBT: 113.95,
      ligacaoBT: "Estrela com Neutro",
      taps: [
        {
          numero: 1,
          tensaoAT: 13800,
          tensaoBT: 380,
          erro: -0.004,
          espirasAT: 3711,
          espirasBT: 59,
          relacao: 62.8983,
          relacaoCalculada: 62.901,
          relacaoFabricada: 62.8983,
        },
        {
          numero: 2,
          tensaoAT: 13200,
          tensaoBT: 380,
          erro: 0.006,
          espirasAT: 3550,
          espirasBT: 59,
          relacao: 60.1695,
          relacaoCalculada: 60.166,
          relacaoFabricada: 60.1695,
        },
      ],
    },
    enrolamentoAT: {
      diametroInterno: 172,
      diametroExterno: 240,
      diametroExternoMaior: 240,
      diametroMedio: 206,
      alturaBobina: 375,
      alturaUtil: 343,
      alturaEletrica: 347,
      alturaModelo: 375,
      tipoFio: "Alumínio",
      materialFio: "Al",
      diametroFio: 1.53,
      awgFio: "15 AWG",
      secaoFio: 1.65,
      numeroCamadas: 17,
      numeroEspiras: 3711,
      espirasTotal: 3711,
      espirasPorCamada: 220,
      isolacaoCamada: 0.3,
      numeroCanais: 1,
      espessuraCanal: 2.0,
      numeroMeioCanal: 0,
      voltPorEspira: 3.72,
      densidadeCorrente1: 1.1,
      densidadeCorrente2: 1.33,
      pesoAluminio: 33.0,
      pesoTotal: 33.0,
      comprimentoFio: 7205,
      corte: 161,
      inicioEspiras: 1629,
      sequenciaEnrolamento: "Camada",
      observacoes: "7 mm de folga entre AT/BT",
    },
    enrolamentoBT: {
      diametroInterno: 117,
      diametroExterno: 158,
      diametroMedio: 137.5,
      alturaBobina: 375,
      alturaUtil: 359,
      alturaEletrica: 349,
      alturaModelo: 375,
      tipoFio: "Fio retangular",
      materialFio: "Al",
      secaoTotalFio: 97.0,
      larguraFio: 5.52,
      espessuraFio: 4.5,
      larguraFioTotal: 11.6,
      espessuraFioTotal: 9.6,
      disposicaoFio: "Deitado",
      numeroCamadas: 2,
      numeroEspiras: 59,
      espirasPorCamada: 29.5,
      isolacaoCamada: 0.3,
      numeroCanais: 0,
      canalInterno: false,
      numeroBobinas: 1,
      densidadeCorrente: 1.17,
      pesoAluminio: 21.5,
      pesoTotal: 21.5,
      comprimentoFio: 82.0,
      cabeceira: {
        a: 8.0,
        b: 19.6,
        c: 482,
        e: 9.6,
      },
      isolacaoAxial: 20,
      isolacaoRadial: 2,
      enchimento: 0,
      observacoes: "",
    },
    nucleo: {
      tipo: "Núcleo V",
      numeroColunas: 3,
      numeroPassos: 3,
      diametroNucleo: 112,
      secaoNucleo: 85.82,
      largura: 594,
      altura: 610,
      profundidade: 247,
      corte: 600,
      empilhamento: 105.6,
      tipoChapa: "M30",
      espessuraChapa: 0.23,
      fatorEmpilhamento: 0.96,
      areaLiquida: 85.82,
      pesoBruto: 159.48,
      pesoLiquido: 154.45,
      indutanciaMagnetica: 16264,
      perdaPorKg: 1.2,
      vaPorKg: 2.62,
      distanciaEntreColunasLinha: 247,
      distanciaEntreColunasColuna: 385,
      observacoes: "Folga viga: 1.5 mm",
    },
    tanque: {
      tipo: "Oval",
      formato: "Oval",
      largura: 1100,
      altura: 950,
      profundidade: 325,
      pesoTanque: 0,
      pesoParteAtiva: 26.39,
      pesoOleo: 156.0,
      pesoTotal: 155,
      volumeOleo: 156.0,
      volumeOleoTanque: 156.0,
      volumeOleoConservador: 0,
      volumeOleoTubos: 2.0,
      nivelOleo: 70,
      elevacaoOleo: 44.7,
      numeroRadiadores: 3,
      numeroTubos: 10,
      comprimentoTubos: 535,
      secaoTubos: 0.51,
      fatorTubos: 1.6,
      pesoTubosPorRadiador: 10.962,
      larguraInterna: 1100,
      alturaInterna: 760,
      profundidadeInterna: 325,
      observacoes: "",
    },
    perdasRendimento: {
      perdasVazio: 215,
      perdasCobre: 364,
      perdasTotais: 1125,
      impedancia: 3.5,
      correnteVazio: 2.7,
      resistenciaAT: 51.53,
      resistenciaBT: 0.009327,
      reatanciaAT: 3.25,
      gradienteAT: 5,
      gradienteBT: 10.3,
      elevacaoTemperatura: 55,
      rendimento: 93.932,
    },
    acessorios: {
      buchaBTTipo: "Padrão",
      buchaATTipo: "Padrão",
      localizacaoBuchaAT: "Na tampa",
      localizacaoBuchaBT: "Na lateral",
      releGas: false,
      releGasContatos: 0,
      valvulaPressao: false,
      valvulaPressaoContatos: 0,
      relePressaoSubita: false,
      tuboExplosao: false,
      termometro: false,
      termometroContatos: 0,
      termometroImagemTermica: false,
      controladorTemperatura: false,
      sensorTemperatura: 0,
      manovacuometro: false,
      manovacuometroContatos: 0,
      indicadorNivelMagnetico: false,
      indicadorNivelContatos: 0,
      conservadorOleo: false,
      bolsaNeoprene: false,
      secadorArSilica: false,
      ventilacaoForcada: 0,
      comutador: "Simples",
      comutadorBaixoCarga: false,
      acionamentoComutadorExterno: false,
      olhaisSuspensaoTanque: 0,
      olhaisSuspensaoTampa: 0,
      apoioMacaco: false,
      tampaInspecao: false,
      placaIdentificacao: true,
      caixaLigacao: false,
      painelLigacao: false,
      caixaPassagem: false,
      guiaCabos: false,
      caboFlexLigacao: false,
      flangeBT: false,
      flangeAT: false,
      btTerminalSpade: true,
      tanqueGalvanizado: false,
      tanqueMaritimo: false,
      padMounted: false,
      subterraneo: false,
      embalagem: "Básico",
      observacoes: "",
    },
    dimensoes: {
      vigas: {
        largura: 60,
        comprimento: 675,
        massa: 11.9,
      },
      sapatas: {
        dimensoes: "310 x 25 x 45 x 25 - 3,3",
        quantidade: 2,
      },
      estiranteHorizontal: {
        dimensoes: '185 x 1/2"',
        quantidade: 4,
      },
      estiranteVertical: {
        dimensoes: '550 x 3/8"',
        quantidade: 4,
      },
      fixacao: {
        dimensoes: '150 x 40 x 1/4"',
        quantidade: 2,
      },
      dimensoesTotais: {
        altura: 830,
        largura: 785,
        profundidade: 325,
      },
    },
    operador: "João Silva",
    maquina: "Enroladeira 01",
    dataInicio: "2025-11-10",
    dataPrazo: "2025-11-25",
    progresso: 65,
    observacoesProducao: "Produção dentro do prazo",
    criadoEm: "2024-01-10T10:00:00Z",
    atualizadoEm: "2024-01-20T15:30:00Z",
    criadoPor: "admin",
  },
]
