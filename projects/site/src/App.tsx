/* eslint  prefer-template: 0 */

import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import DevPage from "./pages/devPage";
import AuthPage from "./pages/authPage";
import HomePage from "./pages/homePage";
import NotesPage from "./pages/notesPage";
import SettingsPage from "./pages/settingsPage";
import TodoPage from "./pages/todoPage";
import PageNoteFound from "./pages/pageNotFound"

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme} background`}>
      <Router basename="/on-it">
        <Routes>
          <Route path="/dev" element={<DevPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
