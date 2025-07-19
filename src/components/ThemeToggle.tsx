import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(null); // Start with null to indicate not initialized

  useEffect(() => {
    const root = window.document.documentElement;

    // On first load, initialize from localStorage
    if (isDark === null) {
      const saved = localStorage.getItem("stellarreach_theme");
      const shouldBeDark = saved ? saved === "dark" : true;
      setIsDark(shouldBeDark);

      // Apply theme immediately
      if (shouldBeDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      return; // Exit early to prevent double execution
    }

    // Handle theme changes after initialization
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("stellarreach_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("stellarreach_theme", "light");
    }
  }, [isDark]);

  // Don't render until initialized
  if (isDark === null) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsDark(!isDark)}
      className="border-border text-foreground hover:bg-accent"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
};
