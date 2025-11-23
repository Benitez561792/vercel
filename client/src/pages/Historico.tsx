import { useState, useEffect } from "react";
import { Link } from "@/lib/router";
import { buscarHistorico, deletarQuestionario, deletarTodoHistorico } from "@/services/apiJavaService";
interface ItemHistorico {
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
export default function Historico() {
  const [visualizacao, setVisualizacao] = useState("individual");
  const [periodo, setPeriodo] = useState("30dias");
  const [historico, setHistorico] = useState<ItemHistorico[]>([]);
  const [historicoFiltrado, setHistoricoFiltrado] = useState<ItemHistorico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalDeletar, setModalDeletar] = useState<{ aberto: boolean; id?: string; tipo: 'item' | 'todos' }>({
    aberto: false,
    tipo: 'item'
  });
  const [deletando, setDeletando] = useState(false);
  const [mensagem, setMensagem] = useState<{ texto: string; tipo: 'sucesso' | 'erro' } | null>(null);
  useEffect(() => {
    carregarHistorico();
  }, []);
  const carregarHistorico = async () => {
    setCarregando(true);
    try {
      const resultado = await buscarHistorico();
      if (resultado.sucesso && resultado.dados.length > 0) {
        const dadosConvertidos: ItemHistorico[] = resultado.dados.map((item, index, array) => {
          let tendencia: "subindo" | "estavel" | "descendo" = "estavel";
          if (index < array.length - 1) {
            const anterior = array[index + 1];
            if ((item.ibe || 0) > (anterior.ibe || 0) + 0.3) tendencia = "subindo";
            else if ((item.ibe || 0) < (anterior.ibe || 0) - 0.3) tendencia = "descendo";
          }
          return {
            id: item.id?.toString() || `h_${Date.now()}_${index}`,
            data: item.data || new Date().toISOString().split('T')[0],
            pontuacaoGeral: item.ibe || 0,
            sono: item.sono,
            estresse: item.estresse,
            motivacao: item.motivacao,
            energia: item.energia,
            satisfacao: item.satisfacao,
            tendencia,
          };
        });
        setHistorico(dadosConvertidos);
      } else {
        const { obterHistoricoCompleto } = await import("@/services/dataManager");
        setHistorico(obterHistoricoCompleto());
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      const { obterHistoricoCompleto } = await import("@/services/dataManager");
      setHistorico(obterHistoricoCompleto());
    } finally {
      setCarregando(false);
    }
  };
  useEffect(() => {
    const agora = new Date();
    let dataLimite: Date;
    switch (periodo) {
      case "7dias":
        dataLimite = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30dias":
        dataLimite = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "90dias":
        dataLimite = new Date(agora.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "6meses":
        dataLimite = new Date(agora.getTime() - 180 * 24 * 60 * 60 * 1000);
        break;
      default:
        dataLimite = new Date(0);
    }
    const filtrado = historico.filter((h) => {
      const dataItem = new Date(h.data);
      return dataItem >= dataLimite;
    });
    setHistoricoFiltrado(filtrado);
  }, [historico, periodo]);
  const abrirModalDeletar = (id?: string) => {
    setModalDeletar({
      aberto: true,
      id,
      tipo: id ? 'item' : 'todos'
    });
  };
  const fecharModalDeletar = () => {
    setModalDeletar({ aberto: false, tipo: 'item' });
  };
  const confirmarDeletar = async () => {
    setDeletando(true);
    try {
      let resultado;
      if (modalDeletar.tipo === 'todos') {
        resultado = await deletarTodoHistorico();
      } else if (modalDeletar.id) {
        resultado = await deletarQuestionario(modalDeletar.id);
      }
      if (resultado?.sucesso) {
        setMensagem({ texto: resultado.mensagem, tipo: 'sucesso' });
        await carregarHistorico();
      } else {
        setMensagem({ texto: 'Erro ao deletar', tipo: 'erro' });
      }
    } catch (error) {
      setMensagem({ texto: 'Erro ao deletar', tipo: 'erro' });
    } finally {
      setDeletando(false);
      fecharModalDeletar();
      setTimeout(() => setMensagem(null), 3000);
    }
  };
  const formatarData = (data: string) => {
    const d = new Date(data + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  const obterCorNivel = (pontuacao: number) => {
    if (pontuacao >= 8) return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
    if (pontuacao >= 6) return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
    if (pontuacao >= 4) return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
    return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
  };
  const obterIconeTendencia = (tendencia: string) => {
    if (tendencia === "subindo") {
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    }
    if (tendencia === "descendo") {
      return (
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    );
  };
  const calcularMediaGeral = () => {
    if (historicoFiltrado.length === 0) return 0;
    const soma = historicoFiltrado.reduce((acc, h) => acc + h.pontuacaoGeral, 0);
    return soma / historicoFiltrado.length;
  };
  const obterMelhorPontuacao = () => {
    if (historicoFiltrado.length === 0) return 0;
    return Math.max(...historicoFiltrado.map((h) => h.pontuacaoGeral));
  };
  const exportarHistorico = () => {
    const dataStr = JSON.stringify(historicoFiltrado, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `historico-wellwork-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  if (carregando) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Carregando histórico...</p>
          </div>
        </div>
      </div>
    );
  }
  if (historicoFiltrado.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {historico.length === 0 ? "Nenhum questionário respondido ainda" : "Nenhum resultado para o período selecionado"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {historico.length === 0
              ? "O histórico mostrará todos os questionários respondidos ao longo do tempo. Comece respondendo um questionário ou adicione respostas manualmente na página de administração."
              : "Tente selecionar um período maior ou limpar os filtros."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/questionario">
              <a className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Responder Questionário
              </a>
            </Link>
            <Link href="/admin">
              <a className="inline-block px-6 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                Ir para Administração
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {}
      {mensagem && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          mensagem.tipo === 'sucesso'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          {mensagem.texto}
        </div>
      )}
      {}
      {modalDeletar.aberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Confirmar Exclusão
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Esta ação não pode ser desfeita
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {modalDeletar.tipo === 'todos'
                ? 'Tem certeza que deseja deletar TODO o histórico? Todos os questionários serão removidos permanentemente.'
                : 'Tem certeza que deseja deletar este questionário? Ele será removido permanentemente.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={fecharModalDeletar}
                disabled={deletando}
                className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarDeletar}
                disabled={deletando}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deletando ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deletando...
                  </>
                ) : (
                  'Deletar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Histórico de Bem-Estar
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Acompanhe sua evolução ao longo do tempo
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportarHistorico}
              className="px-4 py-2 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar
            </button>
            <button
              onClick={() => abrirModalDeletar()}
              className="px-4 py-2 border-2 border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Deletar Tudo
            </button>
          </div>
        </div>
      </div>
      {}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Visualização
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setVisualizacao("individual")}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  visualizacao === "individual"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setVisualizacao("equipe")}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  visualizacao === "equipe"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Equipe
              </button>
            </div>
          </div>
          {}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Período
            </label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-colors"
            >
              <option value="7dias">Últimos 7 dias</option>
              <option value="30dias">Últimos 30 dias</option>
              <option value="90dias">Últimos 90 dias</option>
              <option value="6meses">Últimos 6 meses</option>
              <option value="todos">Todos</option>
            </select>
          </div>
        </div>
      </div>
      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-100">Total de Respostas</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-4xl font-bold">{historicoFiltrado.length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-100">Média Geral</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-4xl font-bold">{calcularMediaGeral().toFixed(1)}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-100">Melhor Pontuação</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <p className="text-4xl font-bold">{obterMelhorPontuacao().toFixed(1)}</p>
        </div>
      </div>
      {}
      <div className="space-y-4">
        {historicoFiltrado.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatarData(item.data)}
                  </div>
                  <div className={`text-3xl font-bold mt-1 px-4 py-2 rounded-lg ${obterCorNivel(item.pontuacaoGeral)}`}>
                    {item.pontuacaoGeral.toFixed(1)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {obterIconeTendencia(item.tendencia)}
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {item.tendencia}
                  </span>
                </div>
              </div>
              {}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: "Sono", valor: item.sono },
                  { label: "Estresse", valor: item.estresse },
                  { label: "Motivação", valor: item.motivacao },
                  { label: "Energia", valor: item.energia },
                  { label: "Satisfação", valor: item.satisfacao },
                ].map((cat) => (
                  <div key={cat.label} className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {cat.label}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {cat.valor.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
              {}
              <button
                onClick={() => abrirModalDeletar(item.id)}
                className="px-4 py-2 border-2 border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}