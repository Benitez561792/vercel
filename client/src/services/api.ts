import type {
  LoginRequest,
  LoginResponse,
  CadastroColaboradorRequest,
  CadastroResponse,
  EnvioQuestionarioRequest,
  EnvioQuestionarioResponse,
  EstatisticasResponse,
  HistoricoResponse,
} from "@/types";
const API_JAVA_URL = import.meta.env.VITE_API_JAVA_URL || "http://localhost:8080/api";
async function fetchAPI<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}
function setAuthToken(token: string): void {
  localStorage.setItem("authToken", token);
}
function removeAuthToken(): void {
  localStorage.removeItem("authToken");
}
export async function login(dados: LoginRequest): Promise<LoginResponse> {
  const response = await fetchAPI<LoginResponse>(`${API_JAVA_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(dados),
  });
  if (response.sucesso && response.usuario.token) {
    setAuthToken(response.usuario.token);
  }
  return response;
}
export async function logout(): Promise<void> {
  removeAuthToken();
}
export async function cadastrarColaborador(
  dados: CadastroColaboradorRequest
): Promise<CadastroResponse> {
    const response = await fetchAPI<CadastroResponse>(`${API_JAVA_URL}/colaboradores`, {
    method: "POST",
    body: JSON.stringify(dados),
  });
  return response;
}
export async function enviarQuestionario(
  dados: EnvioQuestionarioRequest
): Promise<EnvioQuestionarioResponse> {
  const token = getAuthToken();
  const response = await fetchAPI<EnvioQuestionarioResponse>(`${API_JAVA_URL}/questionarios`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  return response;
}
export async function obterEstatisticas(
  filtros?: {
    dataInicio?: string;
    dataFim?: string;
    departamento?: string;
  }
): Promise<EstatisticasResponse> {
  const token = getAuthToken();
  const params = new URLSearchParams(filtros as any);
  const response = await fetchAPI<EstatisticasResponse>(
    `${API_PYTHON_URL}/estatisticas?${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}
export async function obterHistorico(
  colaboradorId: string,
  filtros?: {
    dataInicio?: string;
    dataFim?: string;
  }
): Promise<HistoricoResponse> {
  const token = getAuthToken();
  const params = new URLSearchParams(filtros as any);
  const response = await fetchAPI<HistoricoResponse>(
    `${API_JAVA_URL}/historico/${colaboradorId}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}
export { getAuthToken, setAuthToken, removeAuthToken };