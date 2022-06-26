/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/interactive/Button/Button";
import AuthForm from "../components/forms/AuthForm/AuthForm";
import { UserContext, User } from "../context/UserContext";
import OnItApi from "../services/OnItApi";

const authPage = () => {
  const [login, setLogin] = useState(true);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const submitForm = async (email: string, password: string, setError: Function) => {
    try {
      let response;

      if (login) {
        response = await OnItApi.login(email, password);
      } else {
        response = await OnItApi.register(email, password);
      }

      if (response.error) {
        throw response.error;
      }

      const newUser: User = {
        loggedIn: true,
        // eslint-disable-next-line no-underscore-dangle
        id: response.payload?._id!,
        email: response.payload?.email!,
      };

      setUser(newUser);
      navigate("../", { replace: true });
    } catch (error: any) {
      setError({ error: true, errorMessage: error.message });
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="secondary-content-xs authPage">
          <h1>On-It</h1>
          <AuthForm loginState={login} submit={submitForm} />
          <Button variant="transparent" onClickFunction={()=>setLogin(!login)}>{login ? "Dont have an account?" : "Already have an account?"}</Button>
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
