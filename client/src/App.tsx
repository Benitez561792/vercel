import { lazy, Suspense } from "react";
import { Router, Route, Switch } from "@/lib/router";
import ErrorBoundary from "./components/ErrorBoundary";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";

// Lazy loading das páginas para code splitting e otimização
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Cadastro = lazy(() => import("./pages/Cadastro"));
const Questionario = lazy(() => import("./pages/Questionario"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Historico = lazy(() => import("./pages/Historico"));
const HistoricoDetalhes = lazy(() => import("./pages/HistoricoDetalhes"));
const Integrantes = lazy(() => import("./pages/Integrantes"));
const Sobre = lazy(() => import("./pages/Sobre"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

function AppRouter() {
  return (
    <Switch>
      {/* Rotas Públicas - Login e Cadastro (sem Layout) */}
      <Route path="/login">
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      </Route>

      <Route path="/cadastro">
        <Suspense fallback={<Loading />}>
          <Cadastro />
        </Suspense>
      </Route>

      {/* Rota Principal - Home */}
      <Route path="/">
        <Layout>
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        </Layout>
      </Route>

      {/* Rotas Privadas - Requerem Autenticação */}
      <Route path="/questionario">
        <PrivateRoute>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Questionario />
            </Suspense>
          </Layout>
        </PrivateRoute>
      </Route>

      <Route path="/dashboard">
        <PrivateRoute>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          </Layout>
        </PrivateRoute>
      </Route>

      <Route path="/historico">
        <PrivateRoute>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Historico />
            </Suspense>
          </Layout>
        </PrivateRoute>
      </Route>

      {/* Rota Dinâmica - Detalhes do Histórico (com parâmetro :id) */}
      <Route path="/historico/:id">
        <PrivateRoute>
          <Layout>
            <Suspense fallback={<Loading />}>
              <HistoricoDetalhes />
            </Suspense>
          </Layout>
        </PrivateRoute>
      </Route>

      {/* Rotas Públicas - Informações */}
      <Route path="/integrantes">
        <Layout>
          <Suspense fallback={<Loading />}>
            <Integrantes />
          </Suspense>
        </Layout>
      </Route>

      <Route path="/sobre">
        <Layout>
          <Suspense fallback={<Loading />}>
            <Sobre />
          </Suspense>
        </Layout>
      </Route>

      <Route path="/faq">
        <Layout>
          <Suspense fallback={<Loading />}>
            <FAQ />
          </Suspense>
        </Layout>
      </Route>

      {/* Rota Privada - Admin (requer permissão de admin) */}
      <Route path="/admin">
        <PrivateRoute requireAdmin>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Admin />
            </Suspense>
          </Layout>
        </PrivateRoute>
      </Route>

      {/* Rota de Erro 404 */}
      <Route path="/404">
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      </Route>

      {/* Fallback para rotas não encontradas */}
      <Route>
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <AuthProvider>
          <Router>
            <Suspense fallback={<Loading />}>
              <AppRouter />
            </Suspense>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
