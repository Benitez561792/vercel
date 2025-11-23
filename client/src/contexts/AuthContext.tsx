import { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect } from "react";

// Tipos
interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo?: string;
  departamento?: string;
  nivel?: "colaborador" | "rh" | "admin";
  token?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  setUsuario: (usuario: Usuario | null) => void;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuarioState] = useState<Usuario | null>(() => {
    // Recuperar usuário do localStorage ao iniciar
    const usuarioSalvo = localStorage.getItem("usuario");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  // Sincronizar com localStorage sempre que o usuário mudar
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  const isAuthenticated = useMemo(() => usuario !== null, [usuario]);

  // Otimizado com useCallback
  const login = useCallback(async (email: string, _senha: string): Promise<boolean> => {
    try {
      // Simulação de login (em produção, chamar API Java)
      // Por enquanto, aceita qualquer email/senha para demonstração
      const usuarioMock: Usuario = {
        id: "1",
        nome: email.split("@")[0],
        email: email,
        cargo: "Desenvolvedor",
        departamento: "TI",
        nivel: "colaborador",
        token: `mock-token-${Date.now()}`,
      };

      setUsuarioState(usuarioMock);
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  }, []);

  // Otimizado com useCallback
  const logout = useCallback(() => {
    setUsuarioState(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("authToken");
  }, []);

  const setUsuario = useCallback((usuario: Usuario | null) => {
    setUsuarioState(usuario);
  }, []);

  // Otimizado com useMemo
  const value = useMemo(
    () => ({
      usuario,
      isAuthenticated,
      login,
      logout,
      setUsuario,
    }),
    [usuario, isAuthenticated, login, logout, setUsuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook customizado
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
