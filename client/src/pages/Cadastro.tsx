import { useState } from "react";
import { Link, useLocation } from "@/lib/router";
import { Button } from "@/components/CustomComponents";
import { Input } from "@/components/CustomComponents";
import { Label } from "@/components/CustomComponents";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/CustomComponents";
import { UserPlus, Mail, Lock, User, Briefcase, Building, Calendar, Eye, EyeOff } from "@/components/icons/Icons";
export default function Cadastro() {
  const [, setLocation] = useLocation();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cargo: "",
    departamento: "",
    dataAdmissao: "",
    senha: "",
    confirmarSenha: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.senha || !formData.cargo || !formData.departamento || !formData.dataAdmissao) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }
    if (formData.senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres");
      return;
    }
    setCarregando(true);
    setTimeout(() => {
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      setLocation("/login");
      setCarregando(false);
    }, 1500);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-background to-orange-50 dark:from-gray-900 dark:via-background dark:to-gray-800 p-4 py-12">
      <div className="w-full max-w-2xl">
        {}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                W
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                WellWork
              </span>
            </div>
          </Link>
          <p className="text-muted-foreground">
            Cadastro de Novo Colaborador
          </p>
        </div>
        {}
        <Card className="shadow-xl border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Criar Nova Conta
            </CardTitle>
            <CardDescription className="text-center">
              Preencha os dados abaixo para se cadastrar no sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="João Silva"
                      value={formData.nome}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                {}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Corporativo *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="joao.silva@empresa.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                {}
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo *</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cargo"
                      name="cargo"
                      type="text"
                      placeholder="Analista"
                      value={formData.cargo}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                {}
                <div className="space-y-2">
                  <Label htmlFor="departamento">Departamento *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="departamento"
                      name="departamento"
                      type="text"
                      placeholder="Tecnologia"
                      value={formData.departamento}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                {}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="dataAdmissao">Data de Admissão *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="dataAdmissao"
                      name="dataAdmissao"
                      type="date"
                      value={formData.dataAdmissao}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                {}
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="senha"
                      name="senha"
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.senha}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {mostrarSenha ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                {}
                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmarSenha}
                      onChange={handleChange}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              </div>
              {}
              <Button
                type="submit"
                className="w-full gap-2 mt-6"
                disabled={carregando}
                size="lg"
              >
                {carregando ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Criar Conta
                  </>
                )}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Já possui uma conta?{" "}
                <Link href="/login">
                  <span className="text-primary font-semibold hover:underline cursor-pointer">
                    Faça login aqui
                  </span>
                </Link>
              </div>
              <div className="text-sm text-center">
                <Link href="/">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    ← Voltar para o início
                  </span>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}