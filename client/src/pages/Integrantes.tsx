import { Card, CardContent, CardHeader, CardTitle } from "@/components/CustomComponents";
import { Button } from "@/components/CustomComponents";
import { Users, Github, Linkedin, Mail } from "@/components/icons/Icons";
interface Integrante {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
}
export default function Integrantes() {
  const integrantes: Integrante[] = [
    {
      nome: "Lucca Ramos Mussumecci",
      rm: "RM562027",
      turma: "1TDSPX",
      foto: "/images/integrantes/lucca.jpg",
      github: "https://github.com/Luccarm07",
      linkedin: "https://www.linkedin.com/in/lucca-ramos-mussumecci-aa8337367",
    },
    {
      nome: "Pedro Peres Benitez",
      rm: "RM561792",
      turma: "1TDSPX",
      foto: "/images/integrantes/pedro.jpg",
      github: "https://github.com/Benitez561792",
      linkedin: "https://www.linkedin.com/in/pedro-peres-benitez-3167a3367",
    },
  ];
  return (
    <div className="container py-12">
      {}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white mb-6 shadow-lg">
          <Users className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Integrantes do Projeto
        </h1>
        <p className="text-xl text-muted-foreground">
          Conheça a equipe responsável pelo desenvolvimento do WellWork
        </p>
      </div>
      {}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {integrantes.map((integrante, index) => (
            <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full max-w-md">
              <CardHeader className="text-center pb-4">
                <div className="mb-4">
                  <img
                    src={integrante.foto}
                    alt={integrante.nome}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 shadow-lg"
                  />
                </div>
                <CardTitle className="text-2xl">{integrante.nome}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {}
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <span className="font-semibold">RM:</span>
                    <span>{integrante.rm}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <span className="font-semibold">Turma:</span>
                    <span>{integrante.turma}</span>
                  </div>
                </div>
                {}
                <div className="flex gap-2 justify-center pt-4 border-t">
                  <a
                    href={integrante.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Button>
                  </a>
                  <a
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {}
      <div className="max-w-4xl mx-auto mt-16">
        <Card className="border-2 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 justify-center">
              <Mail className="w-5 h-5" />
              Entre em Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Para mais informações sobre o projeto ou para entrar em contato com a equipe, acesse os perfis do GitHub ou LinkedIn dos integrantes acima.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}