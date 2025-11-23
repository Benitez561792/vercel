import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
}

interface RouteProps {
  path?: string;
  component?: React.ComponentType;
  children?: ReactNode;
}

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function Router({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Switch({ children }: { children: ReactNode }) {
  const context = useRouter();
  const routes = React.Children.toArray(children) as React.ReactElement<RouteProps>[];

  for (const route of routes) {
    const routePath = route.props.path;

    if (!routePath) {
      return route;
    }

    const match = matchPath(context.currentPath, routePath);
    if (match.matched) {
      // Atualizar params no contexto
      context.params = match.params;
      return route;
    }
  }

  return routes[routes.length - 1] || null;
}

export function Route({ path, component: Component, children }: RouteProps) {
  if (Component) {
    return <Component />;
  }
  return <>{children}</>;
}

export function Link({ href, children, className }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

function useRouter(): RouterContextType {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within Router");
  }
  return context;
}

export function useLocation(): [string, (path: string) => void] {
  const { currentPath, navigate } = useRouter();
  return [currentPath, navigate];
}

export function useNavigate() {
  const { navigate } = useRouter();
  return navigate;
}

// Hook para acessar parâmetros de rota dinâmica
export function useParams<T = Record<string, string>>(): T {
  const { params } = useRouter();
  return params as T;
}

// Função para fazer match de rotas com parâmetros dinâmicos
function matchPath(currentPath: string, routePath: string): {
  matched: boolean;
  params: Record<string, string>;
} {
  // Match exato
  if (currentPath === routePath) {
    return { matched: true, params: {} };
  }

  // Limpar barras finais
  const cleanCurrent = currentPath.replace(/\/$/, "") || "/";
  const cleanRoute = routePath.replace(/\/$/, "") || "/";

  if (cleanCurrent === cleanRoute) {
    return { matched: true, params: {} };
  }

  // Verificar se a rota tem parâmetros dinâmicos (:id, :slug, etc)
  const routeParts = cleanRoute.split("/");
  const currentParts = cleanCurrent.split("/");

  // Se o número de partes não bate, não é match
  if (routeParts.length !== currentParts.length) {
    return { matched: false, params: {} };
  }

  const params: Record<string, string> = {};
  let matched = true;

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const currentPart = currentParts[i];

    // Se é um parâmetro dinâmico (começa com :)
    if (routePart.startsWith(":")) {
      const paramName = routePart.slice(1); // Remove o :
      params[paramName] = currentPart;
    } else if (routePart !== currentPart) {
      // Se não é parâmetro e não bate, não é match
      matched = false;
      break;
    }
  }

  return { matched, params };
}
