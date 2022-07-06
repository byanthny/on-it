import React, { useContext, useState } from "react";
import { UserRole } from "common";
import CreateForm from "../components/forms/CreateForm/CreateForm";
import Button from "../components/interactive/Button/Button";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";
import { UserContext, UserContextData } from "../context/UserContext";
import OnItApi, { createItem } from "../services/OnItApi";

const settingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const logout = async () => {
    try {
      const response = await OnItApi.logout();

      if (response.error) throw response.error;
    } catch (error) {
      // console.log(error);
      // TODO handle error
    }

    const loggedOutUser: UserContextData = {
      loggedIn: false,
      user: {
        email: "",
        role: UserRole.GENERIC,
      },
    };

    setUser(loggedOutUser);
  };

  const handleSubmit = async (itemType: string, data: {checked: boolean, description: string, title: string}) => {
    try {    
      const response = await createItem(itemType, data);
      if(response.error)
        throw response.error

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <NavBar modalState={modalOpen} closeModal={setModalOpen}><CreateForm handleSubmit={handleSubmit}/></NavBar>
      <div className="main-content">
        <Header title="Settings" />
        <div className="secondary-content">
          <Button variant="normal" onClickFunction={changeTheme}>
            toggle theme
          </Button>
          <br />
          <Button variant="normal" onClickFunction={logout}>
            logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default settingsPage;
