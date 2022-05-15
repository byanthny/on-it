import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DevPage from "./pages/devPage";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import NotesPage from "./pages/notesPage";
import SettingsPage from "./pages/settingsPage";
import TodoPage from "./pages/todoPage";

// const urlBase = "/on-it";

const App = () => (
  <Router>
    <Routes>
      <Route path="/dev" element={<DevPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;
