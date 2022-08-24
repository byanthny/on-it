import React, { createContext, useContext, useMemo, useState } from "react";

const initialTheme = localStorage.getItem("theme") ?? "dark";
interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<any>(initialTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialTheme);
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
