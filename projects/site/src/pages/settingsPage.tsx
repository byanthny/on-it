import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";
// import CurrentUserContext from "../context/UserContext";

const settingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const logout = () => {
    // eslint-disable-next-line no-console
    console.log("logging out apparently");
    // const { setUser } = useContext(CurrentUserContext.Provider);
    // setUser(null);
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
