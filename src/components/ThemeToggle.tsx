import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Initialize from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDark(true);
    } else if (saved === "light") {
      setIsDark(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }
  }, []);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 bg-muted/50 hover:bg-accent/20 text-foreground"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-brand-orange" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
};
