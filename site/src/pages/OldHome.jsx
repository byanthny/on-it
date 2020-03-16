import { API, Task } from "../api";
import render from "../render";

const Home = () => {
  return (
    <div id="all">
      <div id="home" class="view">
        <div class="login">
          {createHeader("📌", "Welcome to On It")}
          <main style="margin:auto; max-width:550px">
            <form style="text-align:center;">
              {inputEmail}
              {inputPass}
              {signupMessage}
              <button
                //style={pastelbackground}
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  document.getElementById("home").style.height = "0";
                  try {
                    API.user.login(inputEmail.value, inputPass.value);
                  } catch (error) {
                    console.log("error handled.");
                  }
                }}
              >
                login
              </button>
            </form>
          </main>
        </div>
      </div>
      <div id="task" class="view">
        {createHeader("🤓", "Inbox")}
        <div id="projs">
          <button
            onClick={e => {
              e.preventDefault();
              //API.projects.create("TesT-prOject-name");
              //API.projects.delete("Project-Name-One").then(r => console.log(r));
              loadProjects();
            }}
          >
            Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
