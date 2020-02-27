import { API } from "../api";

const Home = () => {

  Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function short_months(dt)
     { 
       return Date.shortMonths[dt.getMonth()]; 
     }
  
  var dt = new Date();
  var date = short_months(dt) + ". " + dt.getDate();

  const inputEmail = <input placeholder="email" id="in_email" name="email" type="email" />;
  const inputPass = <input  placeholder="password" id="in_pass" type="password" name="password" />;
  const signupMessage = <p><span style="opacity: .6">Don't have an account?</span> Sign Up!</p>;
  
  
  function createHeader($emoji, $message) {
    return (   
      <header class="header">
        <h1 class="emoji-header" style="float: right;">{$emoji}</h1>
        <h1>{date}</h1>
        <h1 class="message" style="padding-bottom: 10vh;">{$message}</h1>
    </header>  
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
                console.log("error handled.")
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
            {createHeader("🤓","Inbox")}

        <button
          onClick={e => {
            e.preventDefault();
            API.task
              .getAll()
              .then(tasks => {
                console.log(tasks);
              })
              .catch(e => console.log(e));
          }}
        >
          Test Task
        </button>
        </div>
        </div>
  );
};

export default Home;
