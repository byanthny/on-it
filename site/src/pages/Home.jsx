import { API } from "../api";

const Home = () => {
  const inputEmail = <input placeholder="email" id="in_email" name="email" type="email" />;
  const inputPass = <input  placeholder="password" id="in_pass" type="password" name="password" />;

  return (
    <div id="all">
    <div id="home">
      <div class="login">
        <h1>On It</h1>
      <main style="margin:auto; max-width:550px">
        <form style="text-align:center;">
          {inputEmail}
          {inputPass}
          <button
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
            Login
          </button>
          <p>Don't have an account? Sign Up!</p>
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
