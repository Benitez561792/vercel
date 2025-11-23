import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "@/lib/router";

interface PrivateRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function PrivateRoute({ children, requireAdmin = false }: PrivateRouteProps) {
  const { isAuthenticated, usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirecionar para login se não autenticado
      navigate("/login");
    } else if (requireAdmin && usuario?.nivel !== "admin") {
      // Redirecionar para home se não for admin
      navigate("/");
    }
  }, [isAuthenticated, requireAdmin, usuario, navigate]);

  // Não renderizar nada se não autenticado
  if (!isAuthenticated) {
    return null;
  }

  // Não renderizar se requer admin mas usuário não é admin
  if (requireAdmin && usuario?.nivel !== "admin") {
    return null;
  }

  return <>{children}</>;
}
