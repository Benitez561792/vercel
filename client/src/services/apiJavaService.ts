import { salvarQuestionario, obterHistoricoCompleto, type QuestionarioResposta } from "./dataManager";
const API_BASE_URL = "https://java-wellwork.onrender.com";
const TIMEOUT_MS = 10000;
const DEFAULT_EMAIL = "usuario@wellwork.com";
export interface BemEstarRequest {
  email: string;
  sono: number;
  estresse: number;
  motivacao: number;
  energia: number;
  satisfacao: number;
}
export interface BemEstarResponse {
  id?: number;
  email: string;
  sono: number;
  estresse: number;
  motivacao: number;
  energia: number;
  satisfacao: number;
  ibe?: number;
  data?: string;
}
async function fetchWithTimeout(url: string, options: RequestInit, timeout: number = TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
function getUsuarioEmail(): string {
  try {
    const usuario = localStorage.getItem("wellwork_usuario");
    if (usuario) {
      const parsed = JSON.parse(usuario);
      return parsed.email || DEFAULT_EMAIL;
    }
  } catch (error) {
    console.error("Erro ao obter email do usuário:", error);
  }
  return DEFAULT_EMAIL;
}
function calcularIBE(sono: number, estresse: number, motivacao: number, energia: number, satisfacao: number): number {
  const media = (sono + estresse + motivacao + energia + satisfacao) / 5;
  return Math.round(media * 10) / 10;
}
export async function enviarQuestionario(dados: BemEstarRequest): Promise<{ sucesso: boolean; mensagem: string; dados?: BemEstarResponse }> {
  console.log("📤 Enviando questionário para API Java...");
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/api/bemestar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(dados),
      },
      TIMEOUT_MS
    );
    if (response.ok) {
      const resultado: BemEstarResponse = await response.json();
      console.log("✅ Questionário enviado com sucesso para API Java");
      salvarNoLocalStorage(dados);
      return {
        sucesso: true,
        mensagem: "Questionário enviado com sucesso!",
        dados: resultado,
      };
    } else {
      throw new Error(`API retornou status ${response.status}`);
    }
  } catch (error) {
    console.warn("⚠️ Falha ao enviar para API Java, usando localStorage:", error);
    const dadosLocal = salvarNoLocalStorage(dados);
    return {
      sucesso: true,
      mensagem: "Questionário salvo localmente (API indisponível)",
      dados: dadosLocal,
    };
  }
}
export async function buscarHistorico(email?: string): Promise<{ sucesso: boolean; dados: BemEstarResponse[] }> {
  const emailBusca = email || getUsuarioEmail();
  console.log(`📥 Buscando histórico para ${emailBusca}...`);
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/api/bemestar/${encodeURIComponent(emailBusca)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      },
      TIMEOUT_MS
    );
    if (response.ok) {
      const resultado: BemEstarResponse[] = await response.json();
      console.log(`✅ Histórico obtido da API Java (${resultado.length} registros)`);
      return {
        sucesso: true,
        dados: resultado,
      };
    } else {
      throw new Error(`API retornou status ${response.status}`);
    }
  } catch (error) {
    console.warn("⚠️ Falha ao buscar da API Java, usando localStorage:", error);
    const dadosLocal = obterDoLocalStorage();
    return {
      sucesso: true,
      dados: dadosLocal,
    };
  }
}
export async function verificarStatusAPI(): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/api/usuarios`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      5000
    );
    return response.ok || response.status === 404;
  } catch (error) {
    console.warn("⚠️ API Java indisponível:", error);
    return false;
  }
}
function salvarNoLocalStorage(dados: BemEstarRequest): BemEstarResponse {
  const questionarioData: QuestionarioResposta = {
    id: `q_${Date.now()}`,
    colaboradorId: dados.email,
    data: new Date().toISOString().split('T')[0],
    sono: dados.sono,
    estresse: dados.estresse,
    motivacao: dados.motivacao,
    energia: dados.energia,
    satisfacao: dados.satisfacao,
  };
  salvarQuestionario(questionarioData);
  return {
    id: Date.now(),
    email: dados.email,
    sono: dados.sono,
    estresse: dados.estresse,
    motivacao: dados.motivacao,
    energia: dados.energia,
    satisfacao: dados.satisfacao,
    ibe: calcularIBE(dados.sono, dados.estresse, dados.motivacao, dados.energia, dados.satisfacao),
    data: questionarioData.data,
  };
}
function obterDoLocalStorage(): BemEstarResponse[] {
  const historico = obterHistoricoCompleto();
  return historico.map((item) => ({
    id: parseInt(item.id.replace('q_', '')),
    email: getUsuarioEmail(),
    sono: item.sono,
    estresse: item.estresse,
    motivacao: item.motivacao,
    energia: item.energia,
    satisfacao: item.satisfacao,
    ibe: item.pontuacaoGeral,
    data: item.data,
  }));
}
export default {
  enviarQuestionario,
  buscarHistorico,
  verificarStatusAPI,
  deletarQuestionario,
  deletarTodoHistorico,
};
export async function deletarQuestionario(id: number | string): Promise<{ sucesso: boolean; mensagem: string }> {
  console.log(`🗑️ Deletando questionário ID ${id}...`);
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/api/bemestar/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      },
      TIMEOUT_MS
    );
    if (response.ok || response.status === 204) {
      console.log("✅ Questionário deletado com sucesso da API Java");
      deletarDoLocalStorage(id);
      return {
        sucesso: true,
        mensagem: "Histórico deletado",
      };
    } else if (response.status === 404) {
      console.warn("⚠️ Questionário não encontrado na API, removendo do localStorage");
      const resultado = deletarDoLocalStorage(id);
      return {
        sucesso: resultado,
        mensagem: resultado ? "Histórico deletado" : "Erro ao deletar",
      };
    } else {
      throw new Error(`API retornou status ${response.status}`);
    }
  } catch (error) {
    console.warn("⚠️ Falha ao deletar da API Java, removendo do localStorage:", error);
    const resultado = deletarDoLocalStorage(id);
    return {
      sucesso: resultado,
      mensagem: resultado ? "Histórico deletado" : "Erro ao deletar",
    };
  }
}
export async function deletarTodoHistorico(email?: string): Promise<{ sucesso: boolean; mensagem: string }> {
  const emailBusca = email || getUsuarioEmail();
  console.log(`🗑️ Deletando todo histórico de ${emailBusca}...`);
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/api/bemestar/usuario/${encodeURIComponent(emailBusca)}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      },
      TIMEOUT_MS
    );
    if (response.ok || response.status === 204) {
      console.log("✅ Todo histórico deletado com sucesso da API Java");
      limparLocalStorage();
      return {
        sucesso: true,
        mensagem: "Histórico deletado",
      };
    } else if (response.status === 404) {
      console.warn("⚠️ Nenhum histórico encontrado na API, limpando localStorage");
      limparLocalStorage();
      return {
        sucesso: true,
        mensagem: "Histórico deletado",
      };
    } else {
      throw new Error(`API retornou status ${response.status}`);
    }
  } catch (error) {
    console.warn("⚠️ Falha ao deletar da API Java, limpando localStorage:", error);
    limparLocalStorage();
    return {
      sucesso: true,
      mensagem: "Histórico deletado",
    };
  }
}
function deletarDoLocalStorage(id: number | string): boolean {
  try {
    const historico = obterHistoricoCompleto();
    const novoHistorico = historico.filter(item => {
      const itemId = String(item.id);
      const searchId = String(id);
      return itemId !== searchId && itemId !== `q_${searchId}` && item.id !== id;
    });
    localStorage.setItem("wellwork_historico", JSON.stringify(novoHistorico));
    console.log(`✅ Questionário ${id} removido do localStorage`);
    return true;
  } catch (error) {
    console.error("Erro ao deletar do localStorage:", error);
    return false;
  }
}
function limparLocalStorage(): void {
  try {
    localStorage.removeItem("wellwork_historico");
    console.log("✅ Histórico limpo do localStorage");
  } catch (error) {
    console.error("Erro ao limpar localStorage:", error);
  }
}