import { Link } from "@/lib/router";
import { Button } from "@/components/CustomComponents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/CustomComponents";
import { Heart, TrendingUp, Users, Shield, ArrowRight, ClipboardList, BarChart3, History } from "@/components/icons/Icons";
export default function Home() {
  const funcionalidades = [
    {
      icone: ClipboardList,
      titulo: "Questionário Semanal",
      descricao: "Responda perguntas rápidas sobre sono, estresse, motivação e energia para avaliar seu bem-estar.",
      cor: "from-cyan-500 to-cyan-600",
      link: "/questionario",
    },
    {
      icone: BarChart3,
      titulo: "Dashboard Interativo",
      descricao: "Visualize relatórios e estatísticas em tempo real sobre a saúde emocional da equipe.",
      cor: "from-purple-500 to-purple-600",
      link: "/dashboard",
    },
    {
      icone: History,
      titulo: "Histórico Completo",
      descricao: "Acompanhe a evolução dos seus indicadores ao longo do tempo com gráficos e análises.",
      cor: "from-orange-500 to-orange-600",
      link: "/historico",
    },
  ];
  const beneficios = [
    {
      icone: Heart,
      titulo: "Cuidado com a Saúde Mental",
      descricao: "Monitore e promova o bem-estar emocional dos colaboradores de forma contínua.",
    },
    {
      icone: TrendingUp,
      titulo: "Melhoria da Produtividade",
      descricao: "Colaboradores saudáveis e felizes são mais produtivos e engajados.",
    },
    {
      icone: Users,
      titulo: "Ambiente Positivo",
      descricao: "Crie uma cultura organizacional focada no cuidado e na qualidade de vida.",
    },
    {
      icone: Shield,
      titulo: "Dados Confidenciais",
      descricao: "Todas as informações são tratadas com segurança e privacidade total.",
    },
  ];
  return (
    <div className="min-h-screen">
      {}
      <section className="relative bg-gradient-to-br from-cyan-50 via-background to-purple-50 dark:from-gray-900 dark:via-background dark:to-gray-800 py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white shadow-xl">
                <Heart className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bem-vindo ao{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                WellWork
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Sistema de Monitoramento de Bem-Estar no Trabalho
            </p>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Uma plataforma simples e eficaz para avaliar e acompanhar a saúde emocional e a qualidade de vida dos colaboradores, promovendo um ambiente de trabalho mais saudável e produtivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cadastro">
                <Button size="lg" className="gap-2 text-lg px-8 py-6">
                  Começar Agora
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/sobre">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Funcionalidades Principais
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas completas para monitorar e melhorar o bem-estar da sua equipe
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {funcionalidades.map((func) => {
              const Icone = func.icone;
              return (
                <Link key={func.titulo} href={func.link}>
                  <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${func.cor} flex items-center justify-center text-white mb-4 shadow-lg`}>
                        <Icone className="w-7 h-7" />
                      </div>
                      <CardTitle className="text-xl">{func.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {func.descricao}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que usar o WellWork?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Invista no bem-estar da sua equipe e colha os resultados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {beneficios.map((beneficio) => {
              const Icone = beneficio.icone;
              return (
                <Card key={beneficio.titulo} className="border-2 text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900 dark:to-cyan-800 flex items-center justify-center mx-auto mb-3">
                      <Icone className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <CardTitle className="text-lg">{beneficio.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {beneficio.descricao}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {}
      <section className="py-20 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar o ambiente de trabalho?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Cadastre-se agora e comece a monitorar o bem-estar da sua equipe de forma simples e eficaz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cadastro">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6">
                  Criar Conta Gratuita
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 bg-white/10 hover:bg-white/20 text-white border-white/30">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}