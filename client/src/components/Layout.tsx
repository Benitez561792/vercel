import { Link, useLocation } from "@/lib/router";
import { Home, ClipboardList, BarChart3, History, Users, Info, HelpCircle, Menu, X, Settings } from "@/components/icons/Icons";
import { useState } from "react";
import { Button } from "@/components/CustomComponents";
import { ThemeToggle } from "@/components/ThemeToggle";
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { path: "/", label: "Início", icon: Home },
    { path: "/questionario", label: "Questionário", icon: ClipboardList },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/historico", label: "Histórico", icon: History },
    { path: "/integrantes", label: "Integrantes", icon: Users },
    { path: "/sobre", label: "Sobre", icon: Info },
    { path: "/faq", label: "FAQ", icon: HelpCircle },
  ];
  const adminLink = { path: "/admin", label: "Admin", icon: Settings };
  const isActive = (path: string) => {
    if (path === "/") {
      return location === path;
    }
    return location.startsWith(path);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {}
      {}
      {}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {}
          {}
          {}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              {}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                W
              </div>
              {}
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                WellWork
              </span>
            </div>
          </Link>
          {}
          {}
          {}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex items-center gap-1">
              {}
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      size="sm"
                      className="gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {}
                      <span className="hidden lg:inline">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
            {}
            <ThemeToggle />
          </div>
          {}
          {}
          {}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {}
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {}
        {}
        {}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="container py-4 flex flex-col gap-2">
              {}
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={active ? "default" : "ghost"}
                      className="w-full justify-start gap-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
      {}
      {}
      {}
      <main className="flex-1">
        {}
        {children}
      </main>
      {}
      {}
      {}
      <footer className="border-t border-border bg-muted/30">
        <div className="container py-8">
          {}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {}
            {}
            {}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">WellWork</h3>
              <p className="text-sm text-muted-foreground">
                Sistema de monitoramento de bem-estar no trabalho, focado na saúde emocional e qualidade de vida dos colaboradores.
              </p>
            </div>
            {}
            {}
            {}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/sobre">
                    <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      Sobre o Projeto
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/integrantes">
                    <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      Integrantes
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                      FAQ
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            {}
            {}
            {}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Contato</h3>
              <p className="text-sm text-muted-foreground">
                Entre em contato através da página de integrantes para mais informações sobre o projeto.
              </p>
            </div>
          </div>
          {}
          {}
          {}
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} WellWork. Desenvolvido com React, Vite e TypeScript.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}