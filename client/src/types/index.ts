export type WellnessLevel = 'baixo' | 'moderado' | 'bom' | 'excelente';
export type UserRole = 'colaborador' | 'rh' | 'admin';
export type QuestionnaireStatus = 'pendente' | 'concluido' | 'atrasado';
export interface Colaborador {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  foto?: string;
  ativo: boolean;
}
export interface Usuario {
  id: string;
  colaboradorId: string;
  email: string;
  senha: string;
  papel: UserRole;
  ultimoAcesso?: string;
}
export interface Pergunta {
  id: string;
  texto: string;
  categoria: 'sono' | 'estresse' | 'motivacao' | 'energia' | 'satisfacao';
  tipo: 'escala' | 'multipla_escolha' | 'texto';
  opcoes?: string[];
  ordem: number;
}
export interface Resposta {
  perguntaId: string;
  valor: number | string;
  categoria: string;
}
export interface Questionario {
  id: string;
  colaboradorId: string;
  dataResposta: string;
  respostas: Resposta[];
  status: QuestionnaireStatus;
  pontuacaoGeral: number;
}
export interface IndicadorBemEstar {
  categoria: string;
  valor: number;
  nivel: WellnessLevel;
  tendencia: 'subindo' | 'estavel' | 'descendo';
}
export interface EstatisticasEquipe {
  totalColaboradores: number;
  questionariosRespondidos: number;
  mediaBemEstar: number;
  indicadores: IndicadorBemEstar[];
  dataAtualizacao: string;
}
export interface HistoricoIndividual {
  colaboradorId: string;
  periodo: {
    inicio: string;
    fim: string;
  };
  questionarios: Questionario[];
  evolucao: {
    data: string;
    pontuacao: number;
  }[];
}
export interface FiltrosRelatorio {
  dataInicio?: string;
  dataFim?: string;
  departamento?: string;
  nivel?: WellnessLevel;
}
export type TipoNotificacao =
  | { tipo: 'sucesso'; mensagem: string }
  | { tipo: 'erro'; mensagem: string; detalhes?: string }
  | { tipo: 'aviso'; mensagem: string; acao?: () => void }
  | { tipo: 'info'; mensagem: string };
export type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: unknown }
  | { status: 'error'; error: string };
export type ColaboradorComEstatisticas = Colaborador & {
  ultimoQuestionario?: string;
  mediaGeral: number;
  totalRespostas: number;
};
export type UsuarioAutenticado = Usuario & {
  token: string;
  expiraEm: string;
  colaborador: Colaborador;
};
export interface LoginRequest {
  email: string;
  senha: string;
}
export interface LoginResponse {
  sucesso: boolean;
  usuario?: UsuarioAutenticado;
  mensagem?: string;
}
export interface CadastroColaboradorRequest {
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  senha: string;
}
export interface CadastroResponse {
  sucesso: boolean;
  colaboradorId?: string;
  mensagem?: string;
}
export interface EnvioQuestionarioRequest {
  colaboradorId: string;
  respostas: Resposta[];
}
export interface EnvioQuestionarioResponse {
  sucesso: boolean;
  questionarioId?: string;
  pontuacaoGeral?: number;
  mensagem?: string;
}
export interface EstatisticasResponse {
  sucesso: boolean;
  dados?: EstatisticasEquipe;
  mensagem?: string;
}
export interface HistoricoResponse {
  sucesso: boolean;
  dados?: HistoricoIndividual;
  mensagem?: string;
}
export type PeriodoOpcao = '7dias' | '30dias' | '90dias' | 'personalizado';
export type TipoGrafico = 'linha' | 'barra' | 'pizza' | 'area';
export interface DadosGrafico {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
  }[];
}