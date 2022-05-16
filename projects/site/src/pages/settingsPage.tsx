import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NavBar from "../components/navigation/NavBar/NavBar"

const settingsPage = () => {
    const { theme, setTheme }= useContext(ThemeContext);

    const changeTheme = () =>{
        const newTheme = theme === "light" ?  "dark" : "light";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    }

    return(
        <>
            <NavBar />
            <div className="main-content">
                <h1>Settings</h1>
                <button type="button" 
                    onClick={changeTheme}>
                    toggle theme
                </button>
            </div>
        </>
    );
}

export default settingsPage;
