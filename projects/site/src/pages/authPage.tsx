import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../sass/pages/authPage.scss";
import Button from "../components/interactive/Button/Button";
import AuthForm from "../components/forms/AuthForm/AuthForm";
import { UserContext, UserContextData } from "../context/UserContext";
import OnItApi from "../services/OnItApi";

const authPage = () => {
  const [login, setLogin] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  /* On form submit login/signup user
   * setError: callback provided by Form comp to create error message
   */
  const submitForm = async (email: string, password: string, setError: Function) => {
    try {
      const response = login
        ? await OnItApi.login(email, password)
        : await OnItApi.register(email, password);

      // Error occurred
      if (response.error) {
        throw response.error;
      }

      // Update user in context with API response
      const newUser: UserContextData = {
        loggedIn: true,
        user: {
          email: response.payload?.email!,
          role: response.payload?.role!,
        },
      };

      setUser(newUser);
      navigate("../", { replace: true });
    } catch (error: any) {
      // callback form to produce error message
      setError({ error: true, errorMessage: error.message });
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="secondary-content-xs authPage">
          <h1>On-It</h1>
          <AuthForm loginState={login} submit={submitForm} />
          <Button variant="transparent" onClick={() => setLogin(!login)}>
            {login ? "Don't have an account?" : "Already have an account?"}
          </Button>
        </div>
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://gitlab.com/JonoAugustine/on-it"
        className="bottom right textCenter"
      >
        ?
      </a>
    </>
  );
};

export default authPage;
