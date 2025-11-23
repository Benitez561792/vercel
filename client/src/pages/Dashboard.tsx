import { useState, useEffect } from "react";
import { Link } from "@/lib/router";
import { calcularEstatisticas } from "@/services/dataManager";
import { buscarHistorico } from "@/services/apiJavaService";
function obterMensagemIBE(ibe: number): { emoji: string; titulo: string; mensagem: string; cor: string } {
  if (ibe >= 9.0) {
    return {
      emoji: "✨",
      titulo: "Excelente!",
      mensagem: "Seu IBE é excepcional. Seu bem-estar está em um nível ótimo. Mantenha o foco!",
      cor: "from-green-500 to-green-600"
    };
  } else if (ibe >= 7.5) {
    return {
      emoji: "👍",
      titulo: "Muito Bom",
      mensagem: "Seu IBE é sólido. Você está em um caminho positivo de equilíbrio e saúde.",
      cor: "from-cyan-500 to-cyan-600"
    };
  } else if (ibe >= 6.0) {
    return {
      emoji: "✅",
      titulo: "Satisfatório",
      mensagem: "Seu IBE é aceitável, mas há espaço para pequenas melhorias em alguma área.",
      cor: "from-yellow-500 to-yellow-600"
    };
  } else if (ibe >= 4.0) {
    return {
      emoji: "⚠️",
      titulo: "Atenção Moderada",
      mensagem: "Seu IBE está abaixo do ideal. Recomendamos revisar seus hábitos de sono e estresse.",
      cor: "from-orange-500 to-orange-600"
    };
  } else {
    return {
      emoji: "🚨",
      titulo: "Necessidade Urgente de Melhoria",
      mensagem: "Seu IBE indica desequilíbrio significativo. É fundamental buscar suporte e ajustar prioridades (ex: sono/estresse).",
      cor: "from-red-500 to-red-600"
    };
  }
}
interface Indicador {
  categoria: string;
  valor: number;
  nivel: "excelente" | "bom" | "moderado" | "ruim";
  tendencia: "subindo" | "estavel" | "descendo";
}
interface DistribuicaoNivel {
  nivel: string;
  quantidade: number;
  percentual: number;
}
interface EvolucaoMensal {
  mes: string;
  pontuacao: number;
}
interface DadosEstatisticas {
  totalColaboradores: number;
  questionariosRespondidos: number;
  mediaBemEstar: number;
  indicadores: Indicador[];
  distribuicaoPorNivel: DistribuicaoNivel[];
  evolucaoMensal: EvolucaoMensal[];
}
export default function Dashboard() {
  const [periodo, setPeriodo] = useState("30dias");
  const [dados, setDados] = useState<DadosEstatisticas | null>(null);
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      try {
        const resultado = await buscarHistorico();
        if (resultado.sucesso && resultado.dados.length > 0) {
          const estatisticas = calcularEstatisticasDeAPI(resultado.dados);
          setDados(estatisticas);
        } else {
          const estatisticas = calcularEstatisticas();
          setDados(estatisticas);
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
        const estatisticas = calcularEstatisticas();
        setDados(estatisticas);
      } finally {
        setCarregando(false);
      }
    };
    carregarDados();
  }, [periodo]);
  const calcularEstatisticasDeAPI = (dadosAPI: any[]): DadosEstatisticas => {
    if (dadosAPI.length === 0) {
      return calcularEstatisticas();
    }
    const mediaSono = dadosAPI.reduce((acc, d) => acc + d.sono, 0) / dadosAPI.length;
    const mediaEstresse = dadosAPI.reduce((acc, d) => acc + d.estresse, 0) / dadosAPI.length;
    const mediaMotivacao = dadosAPI.reduce((acc, d) => acc + d.motivacao, 0) / dadosAPI.length;
    const mediaEnergia = dadosAPI.reduce((acc, d) => acc + d.energia, 0) / dadosAPI.length;
    const mediaSatisfacao = dadosAPI.reduce((acc, d) => acc + d.satisfacao, 0) / dadosAPI.length;
    const mediaBemEstar = dadosAPI.reduce((acc, d) => acc + (d.ibe || 0), 0) / dadosAPI.length;
    const getNivel = (valor: number): "excelente" | "bom" | "moderado" | "ruim" => {
      if (valor >= 8) return "excelente";
      if (valor >= 6) return "bom";
      if (valor >= 4) return "moderado";
      return "ruim";
    };
    return {
      totalColaboradores: 1,
      questionariosRespondidos: dadosAPI.length,
      mediaBemEstar: Math.round(mediaBemEstar * 10) / 10,
      indicadores: [
        { categoria: "Sono", valor: Math.round(mediaSono * 10) / 10, nivel: getNivel(mediaSono), tendencia: "estavel" },
        { categoria: "Estresse", valor: Math.round(mediaEstresse * 10) / 10, nivel: getNivel(mediaEstresse), tendencia: "estavel" },
        { categoria: "Motivação", valor: Math.round(mediaMotivacao * 10) / 10, nivel: getNivel(mediaMotivacao), tendencia: "estavel" },
        { categoria: "Energia", valor: Math.round(mediaEnergia * 10) / 10, nivel: getNivel(mediaEnergia), tendencia: "estavel" },
        { categoria: "Satisfação", valor: Math.round(mediaSatisfacao * 10) / 10, nivel: getNivel(mediaSatisfacao), tendencia: "estavel" },
      ],
      distribuicaoPorNivel: [
        { nivel: "Excelente (8-10)", quantidade: dadosAPI.filter(d => (d.ibe || 0) >= 8).length, percentual: Math.round((dadosAPI.filter(d => (d.ibe || 0) >= 8).length / dadosAPI.length) * 100) },
        { nivel: "Bom (6-7.9)", quantidade: dadosAPI.filter(d => (d.ibe || 0) >= 6 && (d.ibe || 0) < 8).length, percentual: Math.round((dadosAPI.filter(d => (d.ibe || 0) >= 6 && (d.ibe || 0) < 8).length / dadosAPI.length) * 100) },
        { nivel: "Moderado (4-5.9)", quantidade: dadosAPI.filter(d => (d.ibe || 0) >= 4 && (d.ibe || 0) < 6).length, percentual: Math.round((dadosAPI.filter(d => (d.ibe || 0) >= 4 && (d.ibe || 0) < 6).length / dadosAPI.length) * 100) },
        { nivel: "Ruim (0-3.9)", quantidade: dadosAPI.filter(d => (d.ibe || 0) < 4).length, percentual: Math.round((dadosAPI.filter(d => (d.ibe || 0) < 4).length / dadosAPI.length) * 100) },
      ],
      evolucaoMensal: [],
    };
  };
  const getTendenciaIcone = (tendencia: string) => {
    switch (tendencia) {
      case "subindo":
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "descendo":
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
    }
  };
  const getTendenciaTexto = (tendencia: string) => {
    switch (tendencia) {
      case "subindo": return "Melhorando";
      case "descendo": return "Piorando";
      default: return "Estável";
    }
  };
  const getNivelCor = (nivel: string) => {
    switch (nivel) {
      case "excelente": return "text-green-600 dark:text-green-400";
      case "bom": return "text-cyan-600 dark:text-cyan-400";
      case "moderado": return "text-yellow-600 dark:text-yellow-400";
      case "ruim": return "text-red-600 dark:text-red-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };
  const getCorBarra = (nivel: string) => {
    switch (nivel) {
      case "excelente": return "from-green-500 to-green-600";
      case "bom": return "from-cyan-500 to-cyan-600";
      case "moderado": return "from-yellow-500 to-yellow-600";
      case "ruim": return "from-red-500 to-red-600";
      default: return "from-gray-500 to-gray-600";
    }
  };
  if (carregando) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Carregando estatísticas...</p>
          </div>
        </div>
      </div>
    );
  }
  if (!dados || dados.questionariosRespondidos === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Nenhum dado disponível ainda</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Para ver estatísticas e relatórios, é necessário que você responda ao questionário de bem-estar.
            Comece agora mesmo e acompanhe sua evolução!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/questionario">
              <a className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Responder Questionário
              </a>
            </Link>
            <Link href="/admin">
              <a className="inline-block px-6 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors font-medium">
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
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Visão geral do seu bem-estar
            </p>
          </div>
          {}
          <div className="relative w-full md:w-[200px]">
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="w-full px-4 py-2 pr-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="7dias">Últimos 7 dias</option>
              <option value="30dias">Últimos 30 dias</option>
              <option value="90dias">Últimos 90 dias</option>
              <option value="6meses">Últimos 6 meses</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {}
      <div className={`mb-8 p-6 rounded-xl bg-gradient-to-r ${obterMensagemIBE(dados.mediaBemEstar).cor} text-white shadow-lg`}>
        <div className="flex items-start gap-4">
          <div className="text-4xl">{obterMensagemIBE(dados.mediaBemEstar).emoji}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{obterMensagemIBE(dados.mediaBemEstar).titulo}</h2>
            <p className="text-white/90 text-lg leading-relaxed">{obterMensagemIBE(dados.mediaBemEstar).mensagem}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium opacity-90 mb-1">Seu IBE</div>
            <div className="text-5xl font-bold">{dados.mediaBemEstar.toFixed(1)}</div>
          </div>
        </div>
      </div>
      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {}
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Total de Colaboradores
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{dados.totalColaboradores}</div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Cadastrados no sistema</p>
        </div>
        {}
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Questionários Respondidos
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{dados.questionariosRespondidos}</div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {dados.totalColaboradores > 0
              ? `${Math.round((dados.questionariosRespondidos / dados.totalColaboradores) * 100)}% de participação`
              : "Nenhum colaborador cadastrado"}
          </p>
        </div>
        {}
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Média de Bem-Estar
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{dados.mediaBemEstar.toFixed(1)}</div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Escala de 0 a 10</p>
        </div>
        {}
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Tendência Geral
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              Melhorando
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Comparado ao período anterior</p>
        </div>
      </div>
      {}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Indicadores por Categoria</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Níveis médios de cada aspecto do bem-estar</p>
        </div>
        <div className="space-y-6">
          {dados.indicadores.map((indicador) => (
            <div key={indicador.categoria} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">{indicador.categoria}</span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border-2 border-gray-300 dark:border-gray-600 text-sm">
                    {getTendenciaIcone(indicador.tendencia)}
                    {getTendenciaTexto(indicador.tendencia)}
                  </span>
                </div>
                <span className={`text-2xl font-bold ${getNivelCor(indicador.nivel)}`}>
                  {indicador.valor.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getCorBarra(indicador.nivel)} transition-all duration-500`}
                    style={{ width: `${(indicador.valor / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                  {Math.round((indicador.valor / 10) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {}
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Distribuição por Nível</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Quantidade de colaboradores em cada faixa</p>
          </div>
          <div className="space-y-4">
            {dados.distribuicaoPorNivel.map((item) => (
              <div key={item.nivel} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.nivel}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.quantidade}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.percentual}%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 transition-all"
                    style={{ width: `${item.percentual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {}
        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Evolução Mensal</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Média de bem-estar ao longo dos meses</p>
          </div>
          {dados.evolucaoMensal.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              Dados insuficientes para mostrar evolução mensal
            </p>
          ) : (
            <div className="space-y-4">
              {dados.evolucaoMensal.map((item) => (
                <div key={item.mes} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12">{item.mes}</span>
                  <div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-end px-3 transition-all duration-500"
                      style={{ width: `${item.pontuacao > 0 ? (item.pontuacao / 10) * 100 : 0}%` }}
                    >
                      {item.pontuacao > 0 && (
                        <span className="text-xs font-semibold text-white">
                          {item.pontuacao.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}