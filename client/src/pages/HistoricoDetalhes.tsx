import { useMemo } from "react";
import { useParams, useNavigate } from "@/lib/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/CustomComponents";
import { Button } from "@/components/CustomComponents";
import { History, BarChart3 } from "@/components/icons/Icons";

export default function HistoricoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Dados mockados - em produção viria da API Java
  const registro = useMemo(() => {
    return {
      id: id,
      data: "2024-11-20",
      sono: 7,
      estresse: 4,
      motivacao: 8,
      energia: 7,
      satisfacao: 8,
      ibe: 7.2,
      observacoes: "Dia produtivo, boa energia pela manhã.",
    };
  }, [id]);

  // Calcular IBE otimizado com useMemo
  const ibeCalculado = useMemo(() => {
    return (
      (registro.sono +
        registro.motivacao +
        registro.energia +
        registro.satisfacao -
        registro.estresse) /
      4
    ).toFixed(1);
  }, [registro]);

  return (
    <div className="container py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/historico")}
          className="gap-2 mb-4"
        >
          ← Voltar ao Histórico
        </Button>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white shadow-lg">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Detalhes do Registro</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              📅 {new Date(registro.data).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>

      {/* IBE em Destaque */}
      <Card className="mb-8 border-2">
        <CardHeader>
          <CardTitle className="text-center">Índice de Bem-Estar (IBE)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold text-cyan-600 dark:text-cyan-400">
              {ibeCalculado}
            </div>
            <p className="text-muted-foreground mt-2">de 10</p>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Detalhadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sono</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{registro.sono}/10</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(registro.sono / 10) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estresse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{registro.estresse}/10</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${(registro.estresse / 10) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Motivação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{registro.motivacao}/10</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(registro.motivacao / 10) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Energia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{registro.energia}/10</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-yellow-600 h-2 rounded-full"
                style={{ width: `${(registro.energia / 10) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Satisfação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{registro.satisfacao}/10</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${(registro.satisfacao / 10) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Observações */}
      {registro.observacoes && (
        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{registro.observacoes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
