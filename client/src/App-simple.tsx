import { Router, Route, Switch } from "@/lib/router";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import NotFound from "./pages/NotFound";

function AppRouter() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/cadastro">
        <Cadastro />
      </Route>

      <Route path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>

      <Route path="/404">
        <NotFound />
      </Route>

      <Route>
        <NotFound />
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
            <AppRouter />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
