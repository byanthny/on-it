/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import AuthForm from "../components/forms/AuthForm/AuthForm";

const authPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="main-content" >
      <div className="secondary-content-xs authPage">
        <h1>On-It</h1>
        <AuthForm loginState={login} />
        <button className="buttonLink" type="button" onClick={()=>setLogin(!login)}>{login ? "Dont have an account?" : "Already have an account?"}</button>
      </div>
    </div>

    );
};

export default authPage;
