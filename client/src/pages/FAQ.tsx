import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/CustomComponents";
import { HelpCircle, ChevronDown, ChevronUp, Mail } from "@/components/icons/Icons";
import { Button } from "@/components/CustomComponents";
interface PerguntaResposta {
  pergunta: string;
  resposta: string;
}
export default function FAQ() {
  const [aberto, setAberto] = useState<number | null>(0);
  const perguntas: PerguntaResposta[] = [
    {
      pergunta: "O que é o WellWork?",
      resposta: "O WellWork é um sistema de monitoramento de bem-estar no trabalho que permite aos colaboradores avaliarem periodicamente sua saúde emocional e qualidade de vida através de questionários simples. O sistema gera relatórios e estatísticas para auxiliar a gestão de RH na promoção de um ambiente de trabalho mais saudável.",
    },
    {
      pergunta: "Como funciona o questionário semanal?",
      resposta: "O questionário semanal consiste em 5 perguntas rápidas sobre aspectos fundamentais do bem-estar: qualidade do sono, nível de estresse, motivação, energia e satisfação no trabalho. Cada pergunta é respondida em uma escala de 1 a 10, e o processo leva apenas alguns minutos para ser concluído.",
    },
    {
      pergunta: "Minhas respostas são confidenciais?",
      resposta: "Sim, todas as respostas são tratadas com total confidencialidade e segurança. Os relatórios gerados para a gestão são agregados e anônimos, não permitindo a identificação individual dos colaboradores. Apenas você tem acesso ao seu histórico pessoal completo.",
    },
    {
      pergunta: "Com que frequência devo responder ao questionário?",
      resposta: "Recomendamos que o questionário seja respondido semanalmente para garantir um acompanhamento consistente e permitir a identificação de tendências ao longo do tempo. No entanto, a frequência pode ser ajustada de acordo com as políticas da sua empresa.",
    },
    {
      pergunta: "Posso visualizar meu histórico de respostas?",
      resposta: "Sim! Na página de Histórico você pode visualizar todas as suas respostas anteriores, acompanhar a evolução dos seus indicadores ao longo do tempo através de gráficos e identificar padrões no seu bem-estar.",
    },
    {
      pergunta: "O que acontece se eu esquecer de responder em uma semana?",
      resposta: "Não há problema em pular uma semana ocasionalmente. No entanto, quanto mais consistente for sua participação, mais precisas serão as análises e tendências identificadas pelo sistema. Você pode responder ao questionário sempre que estiver disponível.",
    },
    {
      pergunta: "Como a empresa utiliza os dados coletados?",
      resposta: "Os dados são utilizados de forma agregada e anônima para gerar insights sobre o bem-estar geral da equipe. A gestão de RH pode identificar áreas que precisam de atenção, implementar ações de melhoria e acompanhar a efetividade dessas iniciativas ao longo do tempo.",
    },
    {
      pergunta: "Posso editar minhas respostas após o envio?",
      resposta: "Atualmente, não é possível editar respostas após o envio para garantir a integridade dos dados históricos. Certifique-se de revisar suas respostas antes de finalizar o questionário.",
    },
    {
      pergunta: "O sistema funciona em dispositivos móveis?",
      resposta: "Sim! O WellWork foi desenvolvido com design responsivo e funciona perfeitamente em smartphones, tablets e computadores. Você pode acessar e responder aos questionários de qualquer dispositivo com conexão à internet.",
    },
    {
      pergunta: "Como posso entrar em contato para suporte?",
      resposta: "Para suporte ou dúvidas adicionais, você pode entrar em contato através da página de Integrantes, onde encontrará os links de contato da equipe de desenvolvimento, ou através do email de suporte fornecido pela sua empresa.",
    },
  ];
  const togglePergunta = (index: number) => {
    setAberto(aberto === index ? null : index);
  };
  return (
    <div className="container py-12">
      {}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white mb-6 shadow-lg">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Perguntas Frequentes
        </h1>
        <p className="text-xl text-muted-foreground">
          Encontre respostas para as dúvidas mais comuns sobre o WellWork
        </p>
      </div>
      {}
      <div className="max-w-4xl mx-auto space-y-4">
        {perguntas.map((item, index) => (
          <Card
            key={index}
            className="border-2 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => togglePergunta(index)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg font-semibold flex-1">
                  {item.pergunta}
                </CardTitle>
                <div className="flex-shrink-0">
                  {aberto === index ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>
            {aberto === index && (
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed">
                  {item.resposta}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      {}
      <div className="max-w-4xl mx-auto mt-16">
        <Card className="border-2 bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 justify-center">
              <Mail className="w-5 h-5" />
              Ainda tem dúvidas?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Se você não encontrou a resposta que procurava, entre em contato com nossa equipe através da página de integrantes.
            </p>
            <Button size="lg" className="gap-2">
              <Mail className="w-5 h-5" />
              Entrar em Contato
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}