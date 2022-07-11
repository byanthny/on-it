/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import DevPage from "./pages/devPage";
import AuthPage from "./pages/authPage";
import HomePage from "./pages/homePage";
import NotesPage from "./pages/notesPage";
import SettingsPage from "./pages/settingsPage";
import TaskPage from "./pages/taskPage";
import PageNoteFound from "./pages/pageNotFound";
import { UserContext } from "./context/UserContext";
import PrivateRoute, { PrivateRouteProps } from "./components/hoc/PrivateRoute";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  /* Default Props for Private Route */
  const defaultPrivateRouteProps: Omit<PrivateRouteProps, "component"> = {
    loggedIn: user.loggedIn,
    authPath: "/",
  };

  return (
    <div className={theme}>
      <div className="background">
        <Router basename="/on-it">
          <Routes>
            {/* Main Routes */}
            <Route
              path="/settings"
              element={<PrivateRoute {...defaultPrivateRouteProps} component={<SettingsPage />} />}
            />
            <Route
              path="/notes"
              element={<PrivateRoute {...defaultPrivateRouteProps} component={<NotesPage />} />}
            />
            <Route
              path="/todo"
              element={<PrivateRoute {...defaultPrivateRouteProps} component={<TaskPage />} />}
            />
            <Route path="/" element={user.loggedIn ? <HomePage /> : <AuthPage />} />
            <Route path="*" element={<PageNoteFound />} />

            {/* Development Only Routes */}
            {process.env.NODE_ENV.toUpperCase() === "DEVELOPMENT" && (
              <Route path="/dev" element={<DevPage />} />
            )}
            {process.env.NODE_ENV.toUpperCase() === "DEVELOPMENT" && (
              <Route path="/auth" element={<AuthPage />} />
            )}
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
