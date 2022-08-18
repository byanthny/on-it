import React, { createContext, useMemo, useState } from "react";

const initialTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark";
interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<any>(initialTheme);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialTheme);
  const value = useMemo(()=>({theme, setTheme }),[theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
