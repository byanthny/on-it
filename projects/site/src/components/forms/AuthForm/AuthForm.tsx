import React, { useState } from "react";
import Button from "../../interactive/Button/Button";
import styles from "./authForm.module.scss";

interface PropTypes {
  loginState: boolean;
  submit: Function;
}

interface ErrorMessage {
  error: boolean;
  errorMessage: string;
}

const AuthForm = ({ loginState, submit }: PropTypes) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<ErrorMessage>({ error: false, errorMessage: "" });

  const submitForm = (
    event: any,
    submittedEmail: string,
    submittedPassword: string,
    submittedConfirmPassword: string,
  ) => {
    event.preventDefault();
    if (!loginState && submittedPassword !== submittedConfirmPassword) {
      setError({ error: true, errorMessage: "passwords don't match" });
      return;
    }
    submit(submittedEmail, submittedPassword, setError);
  };

  return (
    <form className="authForm">
      <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      {!loginState ? (
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      ) : (
        ""
      )}
      {error.error ? <p className="errorMessage">{error.errorMessage}</p> : ""}
      <Button
        variant="normal"
        onClickFunction={(e: any) => submitForm(e, email, password, confirmPassword)}
      >
        {loginState ? "Login" : "Sign Up"}
      </Button>
    </form>
  );
};

export default AuthForm;
