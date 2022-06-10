import React from "react";
import styles from "./authForm.module.scss";

interface PropTypes {
    loginState: boolean
}

// TODO api + update usercontext

const LoginForm = ({loginState}:PropTypes) => (
    <form className={styles.authForm} >
        <input type="email" placeholder="email"/>
        <input type="password" placeholder="password" />
        {!loginState ? (<input type="password" placeholder="password" />) : ("")}
        <button type="submit" aria-label="submit form">{loginState ? "Login" : "Sign Up"}</button>
    </form>
);

export default LoginForm;