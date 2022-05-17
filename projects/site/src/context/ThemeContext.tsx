/* eslint react/jsx-no-constructed-context-values: 0 */

import React, { createContext, useState } from "react";

const storedTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";

export const ThemeContext = createContext<any>({ theme: storedTheme, undefined });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(storedTheme);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
