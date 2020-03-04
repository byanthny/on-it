import { API, Task } from "../api";
import render from "../render";

const Home = () => {
  Date.shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  function short_months(dt) {
    return Date.shortMonths[dt.getMonth()];
  }

  var dt = new Date();
  var date = short_months(dt) + ". " + dt.getDate();

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

  function createHeader($emoji, $message) {
    return (
      <header class="header">
        <h1 class="emoji-header" style="float: right;">
          {$emoji}
        </h1>
        <h1>{date}</h1>
        <h1 class="message" style="padding-bottom: 10vh;">
          {$message}
        </h1>
      </header>
    );
  }

  function loadProjects() {
    const list = document.getElementById("projs");
    return API.projects.getAll().then(r =>
      r
        .map(p => (
          <div className="project" style={{ border: `1px solid ${p.color}` }}>
            <h2>{p.name}</h2>
          </div>
        ))
        .forEach(pd => render(pd, true, list))
    );
  }

  //var hue = Math.floor(Math.random() * 360);
  // var pastel = 'hsl(' + hue + ', 100%, 80%)';
  //var pastelbackground  = "background-color: " + pastel;

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
