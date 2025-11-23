import { useState } from "react";
import { useLocation } from "@/lib/router";
import { Toast } from "@/components/Toast";
import { Button } from "@/components/CustomComponents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/CustomComponents";
import { Label } from "@/components/CustomComponents";
import { Textarea } from "@/components/CustomComponents";
import { ClipboardList, Send, Moon, Zap, Heart, Smile, TrendingUp } from "@/components/icons/Icons";
import type { Resposta } from "@/types";
import { enviarQuestionario } from "@/services/apiJavaService";
interface Pergunta {
  id: string;
  texto: string;
  categoria: string;
  icone: React.ComponentType<{ className?: string }>;
  descricaoMin: string;
  descricaoMax: string;
}
export default function Questionario() {
  const [, setLocation] = useLocation();
  const [carregando, setCarregando] = useState(false);
  const [etapa, setEtapa] = useState(0);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [toastMensagem, setToastMensagem] = useState("");
  const [toastTipo, setToastTipo] = useState<"success" | "error">("success");
  const perguntas: Pergunta[] = [
    {
      id: "1",
      texto: "Como você avalia a qualidade do seu sono na última semana?",
      categoria: "sono",
      icone: Moon,
      descricaoMin: "Muito ruim",
      descricaoMax: "Excelente",
    },
    {
      id: "2",
      texto: "Qual o seu nível de estresse no trabalho atualmente?",
      categoria: "estresse",
      icone: Zap,
      descricaoMin: "Muito baixo",
      descricaoMax: "Muito alto",
    },
    {
      id: "3",
      texto: "Como está sua motivação para realizar suas atividades?",
      categoria: "motivacao",
      icone: TrendingUp,
      descricaoMin: "Muito baixa",
      descricaoMax: "Muito alta",
    },
    {
      id: "4",
      texto: "Qual o seu nível de energia durante o dia de trabalho?",
      categoria: "energia",
      icone: Heart,
      descricaoMin: "Muito baixo",
      descricaoMax: "Muito alto",
    },
    {
      id: "5",
      texto: "Como você se sente em relação ao ambiente de trabalho?",
      categoria: "satisfacao",
      icone: Smile,
      descricaoMin: "Muito insatisfeito",
      descricaoMax: "Muito satisfeito",
    },
  ];
  const [respostas, setRespostas] = useState<Record<string, number>>(
    perguntas.reduce((acc, p) => ({ ...acc, [p.id]: 5 }), {})
  );
  const [comentario, setComentario] = useState("");
  const handleSliderChange = (perguntaId: string, valor: number) => {
    setRespostas({
      ...respostas,
      [perguntaId]: valor,
    });
  };
  const handleProximo = () => {
    if (etapa < perguntas.length - 1) {
      setEtapa(etapa + 1);
    }
  };
  const handleAnterior = () => {
    if (etapa > 0) {
      setEtapa(etapa - 1);
    }
  };
  const handleSubmit = async () => {
    setCarregando(true);
    try {
      const dadosQuestionario = {
        email: "usuario@wellwork.com",
        sono: respostas["1"],
        estresse: respostas["2"],
        motivacao: respostas["3"],
        energia: respostas["4"],
        satisfacao: respostas["5"],
      };
      const resultado = await enviarQuestionario(dadosQuestionario);
      if (resultado.sucesso && resultado.dados) {
        const ibe = resultado.dados.ibe || 0;
        setToastMensagem(`Questionário enviado com sucesso! Seu IBE: ${ibe.toFixed(1)}/10`);
        setToastTipo("success");
        setMostrarToast(true);
        setTimeout(() => {
          setLocation("/dashboard");
        }, 2000);
      } else {
        throw new Error("Falha ao enviar questionário");
      }
    } catch (error) {
      console.error("Erro ao enviar questionário:", error);
      setToastMensagem("Erro ao enviar questionário. Tente novamente.");
      setToastTipo("error");
      setMostrarToast(true);
      setCarregando(false);
    }
  };
  const perguntaAtual = perguntas[etapa];
  const Icone = perguntaAtual.icone;
  const progresso = ((etapa + 1) / perguntas.length) * 100;
  return (
    <div className="container py-8 max-w-4xl">
      {}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white mb-4 shadow-lg">
          <ClipboardList className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Questionário de Bem-Estar Semanal
        </h1>
        <p className="text-muted-foreground text-lg">
          Responda às perguntas abaixo para avaliar seu bem-estar
        </p>
      </div>
      {}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Pergunta {etapa + 1} de {perguntas.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progresso)}% completo
          </span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>
      {}
      <Card className="shadow-lg border-2 mb-6">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900 dark:to-cyan-800 flex items-center justify-center">
              <Icone className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl md:text-2xl">
                {perguntaAtual.texto}
              </CardTitle>
              <CardDescription className="mt-1">
                Use o controle abaixo para indicar sua resposta
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {perguntaAtual.descricaoMin}
              </span>
              <span className="text-3xl font-bold text-primary">
                {respostas[perguntaAtual.id]}
              </span>
              <span className="text-sm text-muted-foreground">
                {perguntaAtual.descricaoMax}
              </span>
            </div>
            {}
            <input
              type="range"
              value={respostas[perguntaAtual.id]}
              onChange={(e) => handleSliderChange(perguntaAtual.id, parseInt(e.target.value))}
              min={1}
              max={10}
              step={1}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:bg-cyan-700 [&::-webkit-slider-thumb]:transition-colors [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:bg-cyan-700 [&::-moz-range-thumb]:transition-colors"
            />
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <span key={num} className="w-4 text-center">
                  {num}
                </span>
              ))}
            </div>
          </div>
          {}
          {etapa === perguntas.length - 1 && (
            <div className="space-y-2 pt-4 border-t">
              <Label htmlFor="comentario">
                Comentários adicionais (opcional)
              </Label>
              <Textarea
                id="comentario"
                placeholder="Compartilhe algo que possa ajudar a melhorar seu bem-estar no trabalho..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          )}
        </CardContent>
      </Card>
      {}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Button
          variant="outline"
          onClick={handleAnterior}
          disabled={etapa === 0}
          className="sm:w-auto w-full"
          size="lg"
        >
          ← Anterior
        </Button>
        {etapa < perguntas.length - 1 ? (
          <Button
            onClick={handleProximo}
            className="sm:w-auto w-full"
            size="lg"
          >
            Próxima →
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={carregando}
            className="sm:w-auto w-full gap-2"
            size="lg"
          >
            {carregando ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar Respostas
              </>
            )}
          </Button>
        )}
      </div>
      {}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground text-center">
          Suas respostas são confidenciais e serão usadas apenas para gerar relatórios agregados e anônimos.
        </p>
      </div>
      {}
      {mostrarToast && (
        <Toast
          message={toastMensagem}
          type={toastTipo}
          onClose={() => setMostrarToast(false)}
        />
      )}
    </div>
  );
}