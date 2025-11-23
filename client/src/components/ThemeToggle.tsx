import { Moon, Sun } from "@/components/icons/Icons";
import { Button } from "@/components/CustomComponents";
import { useTheme } from "@/contexts/ThemeContext";
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-lg"
      aria-label="Alternar tema"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  );
}