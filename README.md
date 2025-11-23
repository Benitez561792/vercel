# 🏥 WellWork - Plataforma de Bem-Estar Corporativo

## 📋 Descrição

O **WellWork** é uma plataforma inovadora desenvolvida para promover o bem-estar e a saúde mental dos colaboradores em ambientes corporativos. Através de questionários periódicos e análises de dados, a solução permite que empresas monitorem e melhorem a qualidade de vida de suas equipes.

---

## 📊 Status do Projeto

✅ **Concluído e Pronto para Produção**

---

## 📑 Sumário

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
3. [Instalação](#-instalação)
4. [Como Usar](#-como-usar)
5. [Estrutura de Pastas](#-estrutura-de-pastas)
6. [Endpoints ou Rotas Principais](#-endpoints-ou-rotas-principais)
7. [Autores e Créditos](#-autores-e-créditos)
8. [Screenshots / Demonstração](#-screenshots--demonstração)
9. [Contato](#-contato)

---

## 🎯 Sobre o Projeto

O WellWork foi desenvolvido como parte da **Global Solution** da FIAP, integrando conhecimentos de:

- **Front-End Design Engineering** (React + Vite + TypeScript)
- **Domain Drive Design Using Java** (API REST)
- **Building Relational Database** (Banco de Dados)

### Problema Identificado

Empresas enfrentam desafios crescentes relacionados ao bem-estar dos colaboradores:
- Burnout e estresse ocupacional
- Falta de dados objetivos sobre saúde mental
- Dificuldade em identificar problemas precocemente
- Ausência de ferramentas de monitoramento contínuo

### Solução Proposta

O WellWork oferece:
- **Questionários semanais** de bem-estar
- **Dashboard interativo** com estatísticas em tempo real
- **Histórico completo** de avaliações
- **Mensagens personalizadas** baseadas no IBE (Índice de Bem-Estar)
- **Integração com API Java** para armazenamento seguro

### Benefícios

- ✅ Identificação precoce de problemas
- ✅ Dados objetivos para tomada de decisão
- ✅ Acompanhamento longitudinal
- ✅ Interface intuitiva e responsiva
- ✅ Feedback personalizado para colaboradores

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** 18.3.1 - Biblioteca JavaScript para interfaces
- **Vite** 5.4.21 - Build tool e dev server
- **TypeScript** 5.6.3 - Superset JavaScript com tipagem
- **Tailwind CSS** 3.4.17 - Framework CSS utilitário
- **Sistema de Roteamento Nativo** - Implementação customizada sem bibliotecas externas

### Backend
- **Java** 17 - Linguagem de programação
- **Spring Boot** - Framework para API REST
- **Oracle Database** - Banco de dados relacional

### Ferramentas
- **Git/GitHub** - Versionamento de código
- **Vercel** - Deploy do frontend
- **Render** - Deploy da API Java

---

## 💻 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou pnpm instalado
- Git instalado

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/Benitez561792/WellWork-Front.git
cd WellWork-Front
```

2. **Instale as dependências**
```bash
npm install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
VITE_API_JAVA_URL=https://java-wellwork.onrender.com/api
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
pnpm dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

---

## 🎮 Como Usar

### Acesso Online

Acesse a aplicação em produção:
**URL:** [https://wellwork.vercel.app](https://wellwork.vercel.app)

### Fluxo de Uso

#### 1. Página Inicial
- Acesse a home para conhecer o projeto
- Navegue pelo menu para explorar funcionalidades

#### 2. Responder Questionário
1. Acesse `/questionario`
2. Responda as 5 perguntas sobre bem-estar:
   - Qualidade do sono
   - Nível de estresse
   - Motivação
   - Energia
   - Satisfação no trabalho
3. Use os sliders para avaliar de 1 a 10
4. Adicione comentários opcionais
5. Envie as respostas

#### 3. Visualizar Dashboard
1. Acesse `/dashboard`
2. Veja suas estatísticas:
   - Média geral de bem-estar (IBE)
   - Indicadores por categoria
   - Distribuição por nível
   - Mensagem personalizada
3. Filtre por período (7, 30, 90 dias, 6 meses)

#### 4. Consultar Histórico
1. Acesse `/historico`
2. Veja todos os questionários respondidos
3. Filtre por período
4. Exporte dados em JSON

#### 5. Administração (Admin)
1. Acesse `/admin`
2. Cadastre colaboradores
3. Gerencie dados do sistema

---

## 📁 Estrutura de Pastas

```
wellwork/
├── client/                    # Código do frontend
│   ├── public/               # Arquivos públicos
│   └── src/                  # Código-fonte
│       ├── components/       # Componentes reutilizáveis
│       │   ├── CustomComponents.tsx  # Componentes sem frameworks
│       │   ├── ErrorBoundary.tsx     # Tratamento de erros
│       │   ├── Layout.tsx            # Layout principal
│       │   ├── ThemeToggle.tsx       # Alternador de tema
│       │   └── Toast.tsx             # Notificações
│       ├── contexts/         # Contextos React
│       │   └── ThemeContext.tsx      # Contexto de tema
│       ├── pages/            # Páginas da aplicação
│       │   ├── Home.tsx              # Página inicial
│       │   ├── Login.tsx             # Login
│       │   ├── Cadastro.tsx          # Cadastro
│       │   ├── Questionario.tsx      # Questionário
│       │   ├── Dashboard.tsx         # Dashboard
│       │   ├── Historico.tsx         # Histórico
│       │   ├── Integrantes.tsx       # Integrantes
│       │   ├── Sobre.tsx             # Sobre
│       │   ├── FAQ.tsx               # FAQ
│       │   ├── Admin.tsx             # Admin
│       │   └── NotFound.tsx          # 404
│       ├── services/         # Serviços e APIs
│       │   ├── apiJavaService.ts     # Integração API Java
│       │   ├── dataManager.ts        # Gerenciamento de dados
│       │   └── api.ts                # Configuração de API
│       ├── types/            # Tipos TypeScript
│       │   └── index.ts              # Tipos globais
│       ├── App.tsx           # Componente raiz
│       ├── main.tsx          # Entry point
│       └── index.css         # Estilos globais
├── .env                      # Variáveis de ambiente
├── package.json              # Dependências
├── tsconfig.json             # Configuração TypeScript
├── vite.config.ts            # Configuração Vite
├── tailwind.config.cjs       # Configuração Tailwind
└── README.md                 # Este arquivo
```

---

## 🛣️ Endpoints ou Rotas Principais

### Rotas do Frontend

| Rota | Descrição | Tipo |
|------|-----------|------|
| `/` | Página inicial | Pública |
| `/login` | Login de usuário | Pública |
| `/cadastro` | Cadastro de colaborador | Pública |
| `/questionario` | Questionário de bem-estar | Privada |
| `/dashboard` | Dashboard com estatísticas | Privada |
| `/historico` | Histórico de questionários | Privada |
| `/integrantes` | Página de integrantes | Pública |
| `/sobre` | Sobre o projeto | Pública |
| `/faq` | Perguntas frequentes | Pública |
| `/admin` | Administração | Privada |

### Endpoints da API Java

**Base URL:** `https://java-wellwork.onrender.com` / 'https://java-wellwork.onrender.com/usuarios'

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/bemestar` | Enviar questionário de bem-estar |
| GET | `/bemestar/{email}` | Buscar histórico por email |
| GET | `/usuarios` | Listar usuários |
| POST | `/usuarios` | Criar usuário |
| GET | `/usuarios/{id}` | Buscar usuário por ID |
| PUT | `/usuarios/{id}` | Atualizar usuário |
| DELETE | `/usuarios/{id}` | Deletar usuário |

---

## 👥 Autores e Créditos

### Equipe de Desenvolvimento

#### Lucca Ramos Mussumecci
- **RM:** RM562027
- **Turma:** 1TDSPX
- **GitHub:** [github.com/Luccarm07](https://github.com/Luccarm07)
- **LinkedIn:** [linkedin.com/in/lucca-ramos-mussumecci-aa8337367](https://www.linkedin.com/in/lucca-ramos-mussumecci-aa8337367)

#### Pedro Peres Benitez
- **RM:** RM561792
- **Turma:** 1TDSPX
- **GitHub:** [github.com/Benitez561792](https://github.com/Benitez561792)
- **LinkedIn:** [linkedin.com/in/pedro-peres-benitez-3167a3367](https://www.linkedin.com/in/pedro-peres-benitez-3167a3367)

### Agradecimentos

- **FIAP** - Instituição de ensino
- **Professores** - Orientação e suporte
- **Comunidade Open Source** - Ferramentas e bibliotecas

---

## 📸 Screenshots / Demonstração

### Vídeo de Demonstração

🎥 **Vídeo de demonstração**





### Screenshots

#### Página Inicial
![Home](./docs/screenshots/home.png)

#### Questionário
![Questionário](./docs/screenshots/questionario.png)

#### Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

#### Histórico
![Histórico](./docs/screenshots/historico.png)

---

## 📞 Contato

### Lucca Ramos Mussumecci
- **RM:** RM562027
- **Turma:** 1TDSPX
- **GitHub:** [github.com/Luccarm07](https://github.com/Luccarm07)
- **LinkedIn:** [linkedin.com/in/lucca-ramos-mussumecci-aa8337367](https://www.linkedin.com/in/lucca-ramos-mussumecci-aa8337367)

### Pedro Peres Benitez
- **RM:** RM561792
- **Turma:** 1TDSPX
- **GitHub:** [github.com/Benitez561792](https://github.com/Benitez561792)
- **LinkedIn:** [linkedin.com/in/pedro-peres-benitez-3167a3367](https://www.linkedin.com/in/pedro-peres-benitez-3167a3367)

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da Global Solution da FIAP.

---

## 🔗 Links Importantes

- **Repositório GitHub:** [https://github.com/Benitez561792/WellWork-Front.git](https://github.com/Benitez561792/WellWork-Front.gitk)
- **Aplicação em Produção:** 
- **Vídeo de Demonstração:** 
- **API Java:** [https://java-wellwork.onrender.com](https://java-wellwork.onrender.com)

---


