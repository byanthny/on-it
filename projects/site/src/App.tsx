/* eslint-disable react/jsx-props-no-spreading */
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
import { UserContext } from "./context/UserContext";
import ProtectedRoute, { ProtectedRouteProps } from "./services/helper/PrivateRoute";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "component"> = {
    loggedIn: user.loggedIn,
    authenticationPath: "/auth",
  };


  return (
    <div className={`${theme} background`}>
      <Router basename="/on-it">
        <Routes>
          <Route path="/dev" element={<DevPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/settings" element={<ProtectedRoute {...defaultProtectedRouteProps} component={<SettingsPage />} />} />
          <Route path="/notes" element={<ProtectedRoute {...defaultProtectedRouteProps} component={<NotesPage />} />} />
          <Route path="/todo" element={<ProtectedRoute {...defaultProtectedRouteProps} component={<TodoPage />} />} />
          <Route path="/" element={<ProtectedRoute {...defaultProtectedRouteProps} component={<HomePage />} />} />
          <Route path="*" element={<PageNoteFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
