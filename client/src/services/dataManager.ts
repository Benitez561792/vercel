import type {
  DadosEstatisticas,
  ItemHistorico,
} from "@/data/mockData";
export type { DadosEstatisticas, ItemHistorico };
const CHAVE_HISTORICO = "wellwork_historico";
const CHAVE_COLABORADORES = "wellwork_colaboradores";
const CHAVE_CONFIGURACOES = "wellwork_configuracoes";
export interface Colaborador {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  ativo: boolean;
}
export interface QuestionarioResposta {
  id: string;
  colaboradorId: string;
  data: string;
  sono: number;
  estresse: number;
  motivacao: number;
  energia: number;
  satisfacao: number;
}
function salvar<T>(chave: string, dados: T): void {
  try {
    localStorage.setItem(chave, JSON.stringify(dados));
  } catch (error) {
    console.error(`Erro ao salvar ${chave}:`, error);
  }
}
function carregar<T>(chave: string, padrao: T): T {
  try {
    const item = localStorage.getItem(chave);
    return item ? JSON.parse(item) : padrao;
  } catch (error) {
    console.error(`Erro ao carregar ${chave}:`, error);
    return padrao;
  }
}
export function salvarQuestionario(resposta: QuestionarioResposta): void {
  const historico = carregar<QuestionarioResposta[]>(CHAVE_HISTORICO, []);
  historico.unshift(resposta);
  salvar(CHAVE_HISTORICO, historico);
}
export function obterHistoricoCompleto(): ItemHistorico[] {
  const respostas = carregar<QuestionarioResposta[]>(CHAVE_HISTORICO, []);
  return respostas.map((resposta, index, array) => {
    const pontuacaoGeral = calcularMedia([
      resposta.sono,
      resposta.estresse,
      resposta.motivacao,
      resposta.energia,
      resposta.satisfacao,
    ]);
    let tendencia: "subindo" | "estavel" | "descendo" = "estavel";
    if (index < array.length - 1) {
      const anterior = array[index + 1];
      const mediaAnterior = calcularMedia([
        anterior.sono,
        anterior.estresse,
        anterior.motivacao,
        anterior.energia,
        anterior.satisfacao,
      ]);
      if (pontuacaoGeral > mediaAnterior + 0.3) tendencia = "subindo";
      else if (pontuacaoGeral < mediaAnterior - 0.3) tendencia = "descendo";
    }
    return {
      id: resposta.id,
      data: resposta.data,
      pontuacaoGeral,
      sono: resposta.sono,
      estresse: resposta.estresse,
      motivacao: resposta.motivacao,
      energia: resposta.energia,
      satisfacao: resposta.satisfacao,
      tendencia,
    };
  });
}
export function obterHistoricoPorColaborador(colaboradorId: string): ItemHistorico[] {
  const historico = obterHistoricoCompleto();
  const respostas = carregar<QuestionarioResposta[]>(CHAVE_HISTORICO, []);
  const idsDoColaborador = respostas
    .filter(r => r.colaboradorId === colaboradorId)
    .map(r => r.id);
  return historico.filter(h => idsDoColaborador.includes(h.id));
}
export function salvarColaborador(colaborador: Colaborador): void {
  const colaboradores = carregar<Colaborador[]>(CHAVE_COLABORADORES, []);
  colaboradores.push(colaborador);
  salvar(CHAVE_COLABORADORES, colaboradores);
}
export function obterColaboradores(): Colaborador[] {
  return carregar<Colaborador[]>(CHAVE_COLABORADORES, []);
}
export function obterColaboradorPorId(id: string): Colaborador | null {
  const colaboradores = obterColaboradores();
  return colaboradores.find(c => c.id === id) || null;
}
function calcularMedia(valores: number[]): number {
  if (valores.length === 0) return 0;
  const soma = valores.reduce((acc, val) => acc + val, 0);
  return Math.round((soma / valores.length) * 10) / 10;
}
export function calcularEstatisticas(): DadosEstatisticas {
  const colaboradores = obterColaboradores();
  const historico = obterHistoricoCompleto();
  if (historico.length === 0) {
    return {
      totalColaboradores: colaboradores.length,
      questionariosRespondidos: 0,
      mediaBemEstar: 0,
      indicadores: [
        { categoria: "Sono", valor: 0, nivel: "ruim", tendencia: "estavel" },
        { categoria: "Estresse", valor: 0, nivel: "ruim", tendencia: "estavel" },
        { categoria: "Motivação", valor: 0, nivel: "ruim", tendencia: "estavel" },
        { categoria: "Energia", valor: 0, nivel: "ruim", tendencia: "estavel" },
        { categoria: "Satisfação", valor: 0, nivel: "ruim", tendencia: "estavel" },
      ],
      distribuicaoPorNivel: [
        { nivel: "Excelente (8-10)", quantidade: 0, percentual: 0 },
        { nivel: "Bom (6-7.9)", quantidade: 0, percentual: 0 },
        { nivel: "Moderado (4-5.9)", quantidade: 0, percentual: 0 },
        { nivel: "Ruim (0-3.9)", quantidade: 0, percentual: 0 },
      ],
      evolucaoMensal: [],
    };
  }
  const mediaSono = calcularMedia(historico.map(h => h.sono));
  const mediaEstresse = calcularMedia(historico.map(h => h.estresse));
  const mediaMotivacao = calcularMedia(historico.map(h => h.motivacao));
  const mediaEnergia = calcularMedia(historico.map(h => h.energia));
  const mediaSatisfacao = calcularMedia(historico.map(h => h.satisfacao));
  const mediaBemEstar = calcularMedia(historico.map(h => h.pontuacaoGeral));
  const determinarNivel = (valor: number): "excelente" | "bom" | "moderado" | "ruim" => {
    if (valor >= 8) return "excelente";
    if (valor >= 6) return "bom";
    if (valor >= 4) return "moderado";
    return "ruim";
  };
  const calcularTendencia = (valores: number[]): "subindo" | "estavel" | "descendo" => {
    if (valores.length < 4) return "estavel";
    const recentes = valores.slice(0, 3);
    const anteriores = valores.slice(3, 6);
    const mediaRecente = calcularMedia(recentes);
    const mediaAnterior = calcularMedia(anteriores);
    if (mediaRecente > mediaAnterior + 0.3) return "subindo";
    if (mediaRecente < mediaAnterior - 0.3) return "descendo";
    return "estavel";
  };
  const distribuicao = {
    excelente: 0,
    bom: 0,
    moderado: 0,
    ruim: 0,
  };
  historico.forEach(h => {
    const nivel = determinarNivel(h.pontuacaoGeral);
    distribuicao[nivel]++;
  });
  const total = historico.length;
  const evolucaoMensal = calcularEvolucaoMensal(historico);
  return {
    totalColaboradores: colaboradores.length,
    questionariosRespondidos: historico.length,
    mediaBemEstar,
    indicadores: [
      {
        categoria: "Sono",
        valor: mediaSono,
        nivel: determinarNivel(mediaSono),
        tendencia: calcularTendencia(historico.map(h => h.sono)),
      },
      {
        categoria: "Estresse",
        valor: mediaEstresse,
        nivel: determinarNivel(mediaEstresse),
        tendencia: calcularTendencia(historico.map(h => h.estresse)),
      },
      {
        categoria: "Motivação",
        valor: mediaMotivacao,
        nivel: determinarNivel(mediaMotivacao),
        tendencia: calcularTendencia(historico.map(h => h.motivacao)),
      },
      {
        categoria: "Energia",
        valor: mediaEnergia,
        nivel: determinarNivel(mediaEnergia),
        tendencia: calcularTendencia(historico.map(h => h.energia)),
      },
      {
        categoria: "Satisfação",
        valor: mediaSatisfacao,
        nivel: determinarNivel(mediaSatisfacao),
        tendencia: calcularTendencia(historico.map(h => h.satisfacao)),
      },
    ],
    distribuicaoPorNivel: [
      {
        nivel: "Excelente (8-10)",
        quantidade: distribuicao.excelente,
        percentual: Math.round((distribuicao.excelente / total) * 100),
      },
      {
        nivel: "Bom (6-7.9)",
        quantidade: distribuicao.bom,
        percentual: Math.round((distribuicao.bom / total) * 100),
      },
      {
        nivel: "Moderado (4-5.9)",
        quantidade: distribuicao.moderado,
        percentual: Math.round((distribuicao.moderado / total) * 100),
      },
      {
        nivel: "Ruim (0-3.9)",
        quantidade: distribuicao.ruim,
        percentual: Math.round((distribuicao.ruim / total) * 100),
      },
    ],
    evolucaoMensal,
  };
}
function calcularEvolucaoMensal(historico: ItemHistorico[]): Array<{ mes: string; pontuacao: number }> {
  const mesesAbrev = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const hoje = new Date();
  const evolucao: Array<{ mes: string; pontuacao: number }> = [];
  for (let i = 5; i >= 0; i--) {
    const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
    const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`;
    const respostasMes = historico.filter(h => h.data.startsWith(mesAno));
    const media = respostasMes.length > 0
      ? calcularMedia(respostasMes.map(h => h.pontuacaoGeral))
      : 0;
    evolucao.push({
      mes: mesesAbrev[data.getMonth()],
      pontuacao: media,
    });
  }
  return evolucao;
}
export function exportarDados(): string {
  const dados = {
    historico: carregar<QuestionarioResposta[]>(CHAVE_HISTORICO, []),
    colaboradores: carregar<Colaborador[]>(CHAVE_COLABORADORES, []),
    configuracoes: carregar<any>(CHAVE_CONFIGURACOES, {}),
    dataExportacao: new Date().toISOString(),
  };
  return JSON.stringify(dados, null, 2);
}
export function importarDados(json: string): void {
  try {
    const dados = JSON.parse(json);
    if (dados.historico) salvar(CHAVE_HISTORICO, dados.historico);
    if (dados.colaboradores) salvar(CHAVE_COLABORADORES, dados.colaboradores);
    if (dados.configuracoes) salvar(CHAVE_CONFIGURACOES, dados.configuracoes);
    alert("Dados importados com sucesso!");
  } catch (error) {
    console.error("Erro ao importar dados:", error);
    alert("Erro ao importar dados. Verifique o formato do arquivo.");
  }
}
export function limparTodosDados(): void {
  if (confirm("ATENÇÃO: Isso irá apagar TODOS os dados do sistema. Deseja continuar?")) {
    localStorage.removeItem(CHAVE_HISTORICO);
    localStorage.removeItem(CHAVE_COLABORADORES);
    localStorage.removeItem(CHAVE_CONFIGURACOES);
    alert("Todos os dados foram removidos.");
    window.location.reload();
  }
}