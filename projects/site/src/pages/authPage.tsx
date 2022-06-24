/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import AuthForm from "../components/forms/AuthForm/AuthForm";
import {UserContext} from "../context/UserContext"
import OnItApi from "../services/OnItApi";

const authPage = () => {
  const [login, setLogin] = useState(true);
  const {setUser} = useContext(UserContext);

  const submitForm = async (email:string, password:string) => {
    if(login) {
      const response = await OnItApi.login( email, password);
      console.log(response);
    }
    else {
      const response = await OnItApi.register( email, password);
      console.log(response);
    }
  }

  return (
    <>
      <div className="main-content">
        <div className="secondary-content-xs authPage">
          <h1>On-It</h1>
          <AuthForm loginState={login} submit={submitForm} />
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
