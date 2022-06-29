/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from "react";

const initialTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark";
interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<any>(initialTheme);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialTheme);
  const value = {theme, setTheme};
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
