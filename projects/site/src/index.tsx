import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import "./styles/global.scss";
import "./styles/typography.scss";

ReactDOM.render(
  <ThemeProvider>
    <UserProvider>
    <App />
    </UserProvider>
  </ThemeProvider>,
  document.getElementById("root"),
);
