import render from "../render";
import { API } from "../api";
import DesktopApp from "./DesktopApp";

const Login = () => {
  const inputEmail = (
    <input placeholder="email" id="in_email" name="email" type="email" />
  );
  const inputPass = (
    <input
      placeholder="password"
      id="in_pass"
      type="password"
      name="password"
    />
  );

  return (
    <div class="container" style="display:table;">
      <div id="login">
        <form>
          {/*TODO Input validation and add reenter password for signup.*/}
          <h1>Welcome to On it!</h1>
          {inputEmail}
          <br />
          {inputPass}
          <br />
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              try {
                render(DesktopApp); //For testing
                API.user.login(inputEmail.value, inputPass.value);
                render(DesktopApp);
              } catch (error) {
                console.log("error handled.");
                console.log(error);
              }
            }}
          >
            login
          </button>
          <br />
          <p class="lined">
            <span>or</span>
          </p>
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              try {
                API.user.register(inputEmail.value, inputPass.value);
                render(DesktopApp);
              } catch (error) {
                console.log("error handled.");
              }
            }}
          >
            Sign Up
          </button>
        </form>
      </div>

      {/*
    <button
        type="submit"
            onClick={e => {
                render(DesktopApp)
            }}
    >
        login
        </button>*/}
    </div>
  );
};

export default Login;
