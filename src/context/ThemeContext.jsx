import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

/**
 * Custom hook to access the theme context
 * @returns {Object} { theme, toggleTheme }
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * Theme Provider Component
 * Manages application theme state (light/dark) and persistence to localStorage.
 * Updates the document root 'data-theme' attribute for CSS variables.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("app-theme");
    return stored || "dark"; // Default to dark
  });

  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
