import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/CustomComponents";
import { Button } from "@/components/CustomComponents";
import { Input } from "@/components/CustomComponents";
import { Label } from "@/components/CustomComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/CustomComponents";
import { Settings, UserPlus, FileText, Download, Upload, Trash2 } from "@/components/icons/Icons";
import {
  salvarColaborador,
  salvarQuestionario,
  exportarDados,
  importarDados,
  limparTodosDados,
  obterColaboradores,
  type Colaborador,
  type QuestionarioResposta,
} from "@/services/dataManager";
export default function Admin() {
  const [novoColaborador, setNovoColaborador] = useState<Partial<Colaborador>>({
    nome: "",
    email: "",
    cargo: "",
    departamento: "",
    dataAdmissao: new Date().toISOString().split("T")[0],
    ativo: true,
  });
  const [novoQuestionario, setNovoQuestionario] = useState<Partial<QuestionarioResposta>>({
    colaboradorId: "",
    data: new Date().toISOString().split("T")[0],
    sono: 5,
    estresse: 5,
    motivacao: 5,
    energia: 5,
    satisfacao: 5,
  });
  const colaboradores = obterColaboradores();
  const handleCadastrarColaborador = () => {
    if (!novoColaborador.nome || !novoColaborador.email) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }
    const colaborador: Colaborador = {
      id: `colab-${Date.now()}`,
      nome: novoColaborador.nome!,
      email: novoColaborador.email!,
      cargo: novoColaborador.cargo || "",
      departamento: novoColaborador.departamento || "",
      dataAdmissao: novoColaborador.dataAdmissao || new Date().toISOString().split("T")[0],
      ativo: true,
    };
    salvarColaborador(colaborador);
    setNovoColaborador({
      nome: "",
      email: "",
      cargo: "",
      departamento: "",
      dataAdmissao: new Date().toISOString().split("T")[0],
      ativo: true,
    });
    alert(`Colaborador ${colaborador.nome} cadastrado com sucesso!`);
  };
  const handleAdicionarQuestionario = () => {
    if (!novoQuestionario.colaboradorId) {
      alert("Selecione um colaborador");
      return;
    }
    const questionario: QuestionarioResposta = {
      id: `quest-${Date.now()}`,
      colaboradorId: novoQuestionario.colaboradorId!,
      data: novoQuestionario.data!,
      sono: novoQuestionario.sono!,
      estresse: novoQuestionario.estresse!,
      motivacao: novoQuestionario.motivacao!,
      energia: novoQuestionario.energia!,
      satisfacao: novoQuestionario.satisfacao!,
    };
    salvarQuestionario(questionario);
    setNovoQuestionario({
      ...novoQuestionario,
      data: new Date().toISOString().split("T")[0],
      sono: 5,
      estresse: 5,
      motivacao: 5,
      energia: 5,
      satisfacao: 5,
    });
    alert("Questionário adicionado com sucesso!");
  };
  const handleExportar = () => {
    const json = exportarDados();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wellwork-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert("Dados exportados com sucesso!");
  };
  const handleImportar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = e.target?.result as string;
      importarDados(json);
      window.location.reload();
    };
    reader.readAsText(file);
  };
  return (
    <div className="container py-8">
      {}
      {}
      {}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Administração</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Gerencie colaboradores, questionários e dados do sistema
        </p>
      </div>
      {}
      {}
      {}
      <Tabs defaultValue="colaboradores" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colaboradores">Colaboradores</TabsTrigger>
          <TabsTrigger value="questionarios">Questionários</TabsTrigger>
          <TabsTrigger value="dados">Gerenciar Dados</TabsTrigger>
        </TabsList>
        {}
        {}
        {}
        <TabsContent value="colaboradores">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Cadastrar Novo Colaborador
              </CardTitle>
              <CardDescription>
                Adicione colaboradores para que possam responder questionários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {}
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  placeholder="Ex: João Silva"
                  value={novoColaborador.nome}
                  onChange={(e) => setNovoColaborador({ ...novoColaborador, nome: e.target.value })}
                />
              </div>
              {}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ex: joao.silva@empresa.com"
                  value={novoColaborador.email}
                  onChange={(e) => setNovoColaborador({ ...novoColaborador, email: e.target.value })}
                />
              </div>
              {}
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  placeholder="Ex: Analista de Sistemas"
                  value={novoColaborador.cargo}
                  onChange={(e) => setNovoColaborador({ ...novoColaborador, cargo: e.target.value })}
                />
              </div>
              {}
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Input
                  id="departamento"
                  placeholder="Ex: Tecnologia"
                  value={novoColaborador.departamento}
                  onChange={(e) => setNovoColaborador({ ...novoColaborador, departamento: e.target.value })}
                />
              </div>
              {}
              <div className="space-y-2">
                <Label htmlFor="dataAdmissao">Data de Admissão</Label>
                <Input
                  id="dataAdmissao"
                  type="date"
                  value={novoColaborador.dataAdmissao}
                  onChange={(e) => setNovoColaborador({ ...novoColaborador, dataAdmissao: e.target.value })}
                />
              </div>
              {}
              <Button onClick={handleCadastrarColaborador} className="w-full" size="lg">
                <UserPlus className="w-5 h-5 mr-2" />
                Cadastrar Colaborador
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        {}
        {}
        {}
        <TabsContent value="questionarios">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Adicionar Resposta de Questionário
              </CardTitle>
              <CardDescription>
                Adicione respostas de questionários manualmente para popular o sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {}
              <div className="space-y-2">
                <Label htmlFor="colaborador">Colaborador *</Label>
                <select
                  id="colaborador"
                  className="w-full p-2 border rounded-md"
                  value={novoQuestionario.colaboradorId}
                  onChange={(e) => setNovoQuestionario({ ...novoQuestionario, colaboradorId: e.target.value })}
                >
                  <option value="">Selecione um colaborador</option>
                  {colaboradores.map((colab) => (
                    <option key={colab.id} value={colab.id}>
                      {colab.nome} - {colab.cargo}
                    </option>
                  ))}
                </select>
              </div>
              {}
              <div className="space-y-2">
                <Label htmlFor="dataQuest">Data do Questionário</Label>
                <Input
                  id="dataQuest"
                  type="date"
                  value={novoQuestionario.data}
                  onChange={(e) => setNovoQuestionario({ ...novoQuestionario, data: e.target.value })}
                />
              </div>
              {}
              {[
                { key: "sono", label: "Qualidade do Sono" },
                { key: "estresse", label: "Nível de Estresse" },
                { key: "motivacao", label: "Motivação" },
                { key: "energia", label: "Energia" },
                { key: "satisfacao", label: "Satisfação" },
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{item.label}</Label>
                    <span className="text-2xl font-bold text-primary">
                      {novoQuestionario[item.key as keyof typeof novoQuestionario]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={novoQuestionario[item.key as keyof typeof novoQuestionario] as number}
                    onChange={(e) => setNovoQuestionario({ ...novoQuestionario, [item.key]: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 - Muito Ruim</span>
                    <span>10 - Excelente</span>
                  </div>
                </div>
              ))}
              {}
              <Button onClick={handleAdicionarQuestionario} className="w-full" size="lg">
                <FileText className="w-5 h-5 mr-2" />
                Adicionar Questionário
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        {}
        {}
        {}
        <TabsContent value="dados">
          <div className="space-y-6">
            {}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Exportar Dados
                </CardTitle>
                <CardDescription>
                  Faça backup de todos os dados do sistema em formato JSON
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleExportar} variant="outline" className="w-full" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Baixar Backup (JSON)
                </Button>
              </CardContent>
            </Card>
            {}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Importar Dados
                </CardTitle>
                <CardDescription>
                  Restaure dados de um backup anterior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="file"
                  accept=".json"
                  onChange={handleImportar}
                  className="cursor-pointer"
                />
              </CardContent>
            </Card>
            {}
            <Card className="border-2 border-red-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Trash2 className="w-5 h-5" />
                  Limpar Todos os Dados
                </CardTitle>
                <CardDescription>
                  ATENÇÃO: Esta ação irá apagar TODOS os dados do sistema e não pode ser desfeita!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={limparTodosDados} variant="destructive" className="w-full" size="lg">
                  <Trash2 className="w-5 h-5 mr-2" />
                  Limpar Tudo (Irreversível)
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}