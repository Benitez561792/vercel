export const JAVA_API_CONFIG = {
  baseURL: import.meta.env.VITE_API_JAVA_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 10000,
  retryAttempts: 3,
};
export const JAVA_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",
  COLABORADORES_LISTAR: "/colaboradores",
  COLABORADORES_BUSCAR: "/colaboradores/:id",
  COLABORADORES_CRIAR: "/colaboradores",
  COLABORADORES_ATUALIZAR: "/colaboradores/:id",
  COLABORADORES_DELETAR: "/colaboradores/:id",
  QUESTIONARIOS_ENVIAR: "/questionarios",
  QUESTIONARIOS_COLABORADOR: "/questionarios/colaborador/:id",
  QUESTIONARIOS_BUSCAR: "/questionarios/:id",
  RELATORIOS_GERAL: "/relatorios/geral",
  RELATORIOS_DEPARTAMENTO: "/relatorios/departamento/:id",
  RELATORIOS_COLABORADOR: "/relatorios/colaborador/:id",
};
export interface JavaAPIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
export interface LoginRequest {
  email: string;
  senha: string;
}
export interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    tipo: "colaborador" | "rh" | "admin";
  };
}
export interface Colaborador {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
  ativo: boolean;
}
export interface QuestionarioRequest {
  colaboradorId: number;
  sono: number;
  estresse: number;
  motivacao: number;
  energia: number;
  satisfacao: number;
}
export interface QuestionarioResponse {
  id: number;
  colaboradorId: number;
  data: string;
  sono: number;
  estresse: number;
  motivacao: number;
  energia: number;
  satisfacao: number;
  pontuacaoGeral: number;
}
export function replaceParams(endpoint: string, params: Record<string, string | number>): string {
  let result = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value));
  });
  return result;
}
export function addQueryParams(endpoint: string, params: Record<string, string | number>): string {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}
export function getAuthHeaders(token: string): HeadersInit {
  return {
    ...JAVA_API_CONFIG.headers,
    "Authorization": `Bearer ${token}`,
  };
}