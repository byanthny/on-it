/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import AuthForm from "../components/forms/AuthForm/AuthForm";

const authPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="main-content" >
      <div className="secondary-content-xs authPage">
        <h1>{login ? "Login" : "Sign Up"}</h1>
        <AuthForm loginState={login} />
        <button type="button" onClick={()=>setLogin(!login)}>{login ? "Dont have an account?" : "Already have an account?"}</button>
      </div>
    </div>

    );
};

export default authPage;
