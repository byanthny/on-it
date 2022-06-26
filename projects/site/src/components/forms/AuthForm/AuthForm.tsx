import React, { useState } from "react";
import styles from "./authForm.module.scss";

interface PropTypes {
  loginState: boolean;
  submit: Function;
}

// TODO api + update usercontext

const AuthForm = ({ loginState, submit }: PropTypes) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitForm = (event: any, submittedEmail: string, submittedPassword: string, submittedConfirmPassword: string) => {
    event.preventDefault();
    if (!loginState && submittedPassword !== submittedConfirmPassword) {
      console.log("password don't match");
      return;
    }
    submit(submittedEmail, submittedPassword);
  };

  return (
    <form className={`${styles.authForm} light`}>
      {/* <h2>{loginState ? "Login" : "Sign Up"}</h2> */}
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
      <button
        type="submit"
        aria-label="submit form"
        onClick={(e) => submitForm(e, email, password, confirmPassword)}
      >
        {loginState ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
