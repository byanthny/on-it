import { API } from "../api";

const Home = () => {

  Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function short_months(dt)
     { 
       return Date.shortMonths[dt.getMonth()]; 
     }
  
  dt = new Date();

  const inputEmail = <input placeholder="email" id="in_email" name="email" type="email" />;
  const inputPass = <input  placeholder="password" id="in_pass" type="password" name="password" />;
  
  //var hue = Math.floor(Math.random() * 360);
 // var pastel = 'hsl(' + hue + ', 100%, 80%)';
  //var pastelbackground  = "background-color: " + pastel;

  return (
    <div id="all">
    <div id="home">
      <div class="login">
  <h1>{short_months(dt)} {dt.getDay()}</h1>
      <h1>📌On It</h1>
      <main style="margin:auto; max-width:550px">
        <form style="text-align:center;">
          {inputEmail}
          {inputPass}
          <p><span style="opacity: .6">Don't have an account?</span> Sign Up!</p>
          <button
          //style={pastelbackground}
            type="submit"
            onClick={e => {
              e.preventDefault();
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
        <div id="task">
        <button
          onClick={e => {
            e.preventDefault();
            API.task.create("This Is My first Task", Date.now() + 1).then(r => {
              document.getElementById("home").appendChild(
                <pre>
                  <code>{JSON.stringify(r, null, 2)}</code>
                </pre>
              );
            });
          }}
        >
          Test Task
        </button>
        </div>
        </div>
  );
};

export default Home;
