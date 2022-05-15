import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NavBar from "../components/navigation/NavBar/NavBar"

const settingsPage = () => {
    const { theme, setTheme }= useContext(ThemeContext);
    return(
        <>
            <NavBar />
            <div className="main-content">
                <h1>Settings</h1>
                <button type="button" 
                    onClick={()=>{setTheme(theme === "light" ?  "dark" : "light")}}>
                    toggle theme
                </button>
            </div>
        </>
    );
}

export default settingsPage;
