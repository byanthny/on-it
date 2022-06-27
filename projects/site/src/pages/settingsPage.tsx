import React, { useContext } from "react";
import Button from "../components/interactive/Button/Button";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";
import { UserContext, User } from "../context/UserContext";
import OnItApi from "../services/OnItApi";

const settingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const logout = async () => {

    try {
      const response = await OnItApi.logout();

      if(response.error)
        throw response.error

      const loggedOutUser: User = {
        loggedIn: false,
        id: "",
        email: "",
      };
      
      setUser(loggedOutUser);
    } catch (error) {
      // console.log(error);
      // TODO handle error
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Header title="Settings" />
        <div className="secondary-content">
          <Button variant="normal" onClickFunction={changeTheme}>toggle theme</Button>
          <br/>
          <Button variant="normal" onClickFunction={logout}>logout</Button>
        </div>
      </div>
    </>
  );
};

export default settingsPage;
