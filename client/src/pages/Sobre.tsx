import { Card, CardContent, CardHeader, CardTitle } from "@/components/CustomComponents";
import { Heart, Target, Lightbulb, Users } from "@/components/icons/Icons";
export default function Sobre() {
  return (
    <div className="container py-12">
      {}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white mb-6 shadow-lg">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Sobre o WellWork
        </h1>
        <p className="text-xl text-muted-foreground">
          Conheça mais sobre nosso sistema de monitoramento de bem-estar no trabalho
        </p>
      </div>
      {}
      <div className="max-w-4xl mx-auto mb-16">
        <Card className="border-2">
          <CardContent className="pt-6">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              O <strong className="text-foreground">WellWork</strong> é um sistema desenvolvido para auxiliar empresas no monitoramento e promoção do bem-estar emocional e da qualidade de vida de seus colaboradores. Em um mundo corporativo cada vez mais dinâmico e desafiador, cuidar da saúde mental dos profissionais tornou-se essencial para garantir ambientes de trabalho saudáveis, produtivos e sustentáveis.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Através de questionários semanais simples e objetivos, o sistema coleta informações sobre aspectos fundamentais como qualidade do sono, níveis de estresse, motivação, energia e satisfação no trabalho. Essas informações são transformadas em relatórios visuais e estatísticas que permitem à gestão de Recursos Humanos identificar tendências, detectar problemas precocemente e implementar ações de melhoria direcionadas.
            </p>
          </CardContent>
        </Card>
      </div>
      {}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Nossos Objetivos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900 dark:to-cyan-800 flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <CardTitle className="text-xl">Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Promover a saúde emocional e o bem-estar dos colaboradores através de ferramentas simples, acessíveis e eficazes de monitoramento contínuo.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 flex items-center justify-center mb-3">
                <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl">Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ser referência em soluções de bem-estar corporativo, contribuindo para a criação de ambientes de trabalho mais humanos e saudáveis.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-xl">Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Empatia, transparência, privacidade, inovação e compromisso com a qualidade de vida dos colaboradores.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      {}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Como Funciona</h2>
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Cadastro e Login</h3>
                  <p className="text-muted-foreground">
                    Os colaboradores se cadastram no sistema com informações básicas como nome, email, cargo e departamento.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Questionário Semanal</h3>
                  <p className="text-muted-foreground">
                    Semanalmente, os colaboradores respondem a um questionário rápido com perguntas sobre sono, estresse, motivação, energia e satisfação, usando uma escala de 1 a 10.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Análise e Relatórios</h3>
                  <p className="text-muted-foreground">
                    O sistema gera relatórios visuais com gráficos simples, mostrando a média de bem-estar da equipe, tendências e indicadores por categoria.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Acompanhamento Histórico</h3>
                  <p className="text-muted-foreground">
                    Cada colaborador pode visualizar seu histórico individual, acompanhando a evolução de seus indicadores ao longo do tempo.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {}
      <div className="max-w-4xl mx-auto">
        
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            </div></div>
            <p className="text-sm text-muted-foreground mt-6 text-center">
              Desenvolvido com as mais modernas tecnologias de front-end para garantir performance, escalabilidade e uma excelente experiência do usuário.
            </p>
      </div>
  );
}