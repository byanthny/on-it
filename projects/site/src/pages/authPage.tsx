/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/forms/AuthForm/AuthForm";
import {UserContext, User} from "../context/UserContext"
import OnItApi from "../services/OnItApi";

const authPage = () => {
  const [login, setLogin] = useState(true);
  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();

  const submitForm = async (email:string, password:string) => {
    let response;
    try {
      if(login) {
        response = await OnItApi.login( email, password);
      }
      else {
        response = await OnItApi.register( email, password);
      }
    }
    catch(error) {
      console.log(error);
      return;
    }

    const newUser: User = {
      loggedIn: true,
      // eslint-disable-next-line no-underscore-dangle
      id: response.payload?._id!,
      email: response.payload?.email!
    }
    setUser(newUser);

    // const navigate = useNavigate();
    navigate("../", { replace: true })
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
