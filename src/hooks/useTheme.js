import { useCallback, useEffect, useState } from "react";

export const THEMES = [
  { id: "paper", label: "Paper" },
  { id: "ink", label: "Ink" },
  { id: "midnight", label: "Midnight" },
];

const KEY = "dg-theme";
const META = { paper: "#e8e6e1", ink: "#101114", midnight: "#0c0a1c" };

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "paper";
    const saved = window.localStorage.getItem(KEY);
    if (saved && META[saved]) return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "ink" : "paper";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(KEY, theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META[theme]);
  }, [theme]);

  const cycle = useCallback(() => {
    setTheme((t) => THEMES[(THEMES.findIndex((x) => x.id === t) + 1) % THEMES.length].id);
  }, []);

  return { theme, setTheme, cycle };
}
