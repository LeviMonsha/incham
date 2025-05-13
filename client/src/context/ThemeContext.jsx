import React, { createContext, useState, useEffect, useCallback } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const getThemeFromServer = useCallback(async () => {
    try {
      const response = await fetch("/api/user/theme");
      const { theme: serverTheme } = await response.json();
      setTheme(serverTheme === "dark" ? "dark" : "light");
      localStorage.setItem("theme", serverTheme);
    } catch (error) {
      console.error("Ошибка при получении темы:", error);
    }
  }, []);

  const updateThemeOnServer = useCallback(async (newTheme) => {
    try {
      await fetch("/api/user/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (error) {
      console.error("Ошибка при обновлении темы:", error);
    }
  }, []);

  const handleThemeChange = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeOnServer(newTheme);
  }, [theme, updateThemeOnServer]);

  useEffect(() => {
    getThemeFromServer();
  }, [getThemeFromServer]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
