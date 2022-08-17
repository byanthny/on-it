import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import "./sass/on-it.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <ThemeProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ThemeProvider>,
  document.getElementById("root"),
);
