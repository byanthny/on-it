import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";
import { UserContext, User } from "../context/UserContext";
// import CurrentUserContext from "../context/UserContext";

const settingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const logout = () => {
    const loggedOutUser: User = {
      loggedIn: false,
      id: "",
      email: "",
    };
    setUser(loggedOutUser);
  };

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Header title="Settings" />
        <div className="secondary-content">
          <button type="button" onClick={changeTheme}>
            toggle theme
          </button>
          <br />
          <button type="button" onClick={logout}>
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default settingsPage;
