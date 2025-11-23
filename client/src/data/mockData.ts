export interface DadosEstatisticas {
  totalColaboradores: number;
  questionariosRespondidos: number;
  mediaBemEstar: number;
  indicadores: Array<{
    categoria: string;
    valor: number;
    nivel: "excelente" | "bom" | "moderado" | "ruim";
    tendencia: "subindo" | "estavel" | "descendo";
  }>;
  distribuicaoPorNivel: Array<{
    nivel: string;
    quantidade: number;
    percentual: number;
  }>;
  evolucaoMensal: Array<{
    mes: string;
    pontuacao: number;
  }>;
}
export interface ItemHistorico {
  id: string;
  data: string;
  pontuacaoGeral: number;
  sono: number;
  estresse: number;
  motivacao: number;
  energia: number;
  satisfacao: number;
  tendencia: "subindo" | "estavel" | "descendo";
}
export const estatisticasMock: DadosEstatisticas = {
  totalColaboradores: 156,
  questionariosRespondidos: 142,
  mediaBemEstar: 7.2,
  indicadores: [
    {
      categoria: "Sono",
      valor: 6.8,
      nivel: "bom",
      tendencia: "estavel",
    },
    {
      categoria: "Estresse",
      valor: 5.4,
      nivel: "moderado",
      tendencia: "descendo",
    },
    {
      categoria: "Motivação",
      valor: 7.5,
      nivel: "bom",
      tendencia: "subindo",
    },
    {
      categoria: "Energia",
      valor: 7.1,
      nivel: "bom",
      tendencia: "estavel",
    },
    {
      categoria: "Satisfação",
      valor: 7.8,
      nivel: "bom",
      tendencia: "subindo",
    },
  ],
  distribuicaoPorNivel: [
    {
      nivel: "Excelente (8-10)",
      quantidade: 58,
      percentual: 41,
    },
    {
      nivel: "Bom (6-7.9)",
      quantidade: 64,
      percentual: 45,
    },
    {
      nivel: "Moderado (4-5.9)",
      quantidade: 18,
      percentual: 13,
    },
    {
      nivel: "Ruim (0-3.9)",
      quantidade: 2,
      percentual: 1,
    },
  ],
  evolucaoMensal: [
    { mes: "Jan", pontuacao: 6.5 },
    { mes: "Fev", pontuacao: 6.8 },
    { mes: "Mar", pontuacao: 7.0 },
    { mes: "Abr", pontuacao: 6.9 },
    { mes: "Mai", pontuacao: 7.2 },
    { mes: "Jun", pontuacao: 7.3 },
  ],
};
export const historicoMock: ItemHistorico[] = [
  {
    id: "1",
    data: "2025-11-04",
    pontuacaoGeral: 7.5,
    sono: 7,
    estresse: 6,
    motivacao: 8,
    energia: 8,
    satisfacao: 7,
    tendencia: "subindo",
  },
  {
    id: "2",
    data: "2025-10-28",
    pontuacaoGeral: 7.2,
    sono: 7,
    estresse: 7,
    motivacao: 7,
    energia: 7,
    satisfacao: 8,
    tendencia: "estavel",
  },
  {
    id: "3",
    data: "2025-10-21",
    pontuacaoGeral: 6.8,
    sono: 6,
    estresse: 7,
    motivacao: 7,
    energia: 7,
    satisfacao: 7,
    tendencia: "descendo",
  },
  {
    id: "4",
    data: "2025-10-14",
    pontuacaoGeral: 7.0,
    sono: 7,
    estresse: 6,
    motivacao: 7,
    energia: 8,
    satisfacao: 7,
    tendencia: "subindo",
  },
  {
    id: "5",
    data: "2025-10-07",
    pontuacaoGeral: 6.6,
    sono: 6,
    estresse: 7,
    motivacao: 6,
    energia: 7,
    satisfacao: 7,
    tendencia: "descendo",
  },
  {
    id: "6",
    data: "2025-09-30",
    pontuacaoGeral: 6.9,
    sono: 7,
    estresse: 6,
    motivacao: 7,
    energia: 7,
    satisfacao: 7,
    tendencia: "estavel",
  },
];
export function obterEstatisticas(): DadosEstatisticas {
  return estatisticasMock;
}
export function obterHistorico(): ItemHistorico[] {
  return historicoMock;
}