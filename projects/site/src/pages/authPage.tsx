/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import AuthForm from "../components/forms/AuthForm/AuthForm";

const authPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="main-content">
        <div className="secondary-content-xs authPage">
          <h1>On-It</h1>
          <AuthForm loginState={login} />
          <button className="buttonLink" type="button" onClick={() => setLogin(!login)}>
            {login ? "Dont have an account?" : "Already have an account?"}
          </button>
        </div>
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://gitlab.com/JonoAugustine/on-it"
        className="bottom right textCenter"
      >
        made with 💙 by jono and anthony
      </a>
    </>
  );
};

export default authPage;
