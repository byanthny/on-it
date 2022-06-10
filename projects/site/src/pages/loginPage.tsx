/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const loginPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="main-content">
      <h1>Login</h1>
      <form>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password" />
          {!login ? (<input type="password" placeholder="password" />) : ("")}
          <button type="submit" aria-label="submit form">{login ? "Login" : "Sign-Up"}</button>
      </form>
      <button type="button" onClick={()=>setLogin(!login)}>{login ? "Dont have an account?" : "Already have an account?"}</button>
    </div>

    );
};

export default loginPage;
