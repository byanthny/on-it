import React, { useContext, useState } from "react";
import { Note, Task } from "common";
import CreateForm from "../components/forms/CreateForm/CreateForm";
import Button from "../components/interactive/Button/Button";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";
import { UserContext } from "../context/UserContext";
import { createItem } from "../services/OnItApi";

const settingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { logout } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const handleSubmit = async (
    itemType: string,
    data: Task | Note,
  ) => {
    try {
      const response = await createItem(itemType, data);
      if (response.error) throw response.error;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar modalState={modalOpen} closeModal={setModalOpen}>
        <CreateForm handleSubmit={handleSubmit} />
      </NavBar>
      <div className="main-content">
        <Header title="Settings" />
        <div className="secondary-content">
          <Button variant="normal" onClick={changeTheme}>
            toggle theme
          </Button>
          <br />
          <Button variant="normal" onClick={logout}>
            logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default settingsPage;
