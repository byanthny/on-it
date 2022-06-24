/* eslint react/jsx-no-constructed-context-values: 0 */

import React, { createContext, useState } from "react";

const intialTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";
interface ThemeProviderProps {
  children: React.ReactNode
};

export const ThemeContext = createContext<any>(intialTheme);

export const ThemeProvider = ({ children }:ThemeProviderProps) => {
  const [theme, setTheme] = useState(intialTheme);
  const value = {theme, setTheme}
  return (
  <ThemeContext.Provider value={value}>
    {children}
    </ThemeContext.Provider>
    );
};
