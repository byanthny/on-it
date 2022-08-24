import React, { useState } from "react";
import { Note, Task } from "common";
import CreateForm from "../components/forms/CreateForm";
import Button from "../components/items/Button";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/navigation/Header";
import NavBar from "../components/navigation/NavBar";
import { useUser } from "../context/UserContext";
import { useItemCreate } from "../utils/hooks";

const settingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { logout } = useUser();
  const [modalOpen, setModalOpen] = useState(false);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const handleSubmit = async (itemType: string, data: Task | Note) => {
    try {
      const response = await useItemCreate(data);
      if (response.error) throw response.error;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar modalState={modalOpen} setModalOpen={setModalOpen}>
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
