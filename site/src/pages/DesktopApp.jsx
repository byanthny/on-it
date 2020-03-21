import { API, Task } from "../api";


const DesktopApp = ()  => {
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
      const signupMessage = (
        <p>
          <span style="opacity: .6">Don't have an account?</span> Sign Up!
        </p>
      );
    
      return (
        <div class="container">
          <div class="row">
            <div class="five columns">
              <h1>ON IT</h1>
            </div>
            <div class="seven columns">
              <h1>Login</h1>
              <main style="">
                <form style="">
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
}

export default DesktopApp;