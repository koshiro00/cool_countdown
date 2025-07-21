import { useState, useEffect } from "react";

export type FullscreenTheme = "dark" | "light";

export const useFullscreenTheme = () => {
  const [theme, setTheme] = useState<FullscreenTheme>(() => {
    // localStorageから初期値を取得
    const saved = localStorage.getItem("fullscreen-theme");
    return (saved as FullscreenTheme) || "dark";
  });

  // テーマの変更をlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("fullscreen-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
};
