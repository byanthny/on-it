import { API } from "../api";

const Home = () => {
  const inputEmail = <input id="in_email" name="email" type="email" />;
  const inputPass = <input id="in_pass" type="text" name="password" />;

  return (
    <div id="home">
      <header>
        <h2>On It</h2>
      </header>
      <main style="margin:auto; max-width: 70%">
        <h2>Login</h2>
        <form style="display:flex;flex-direction:column;">
          {inputEmail}
          {inputPass}
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              API.user.login(inputEmail.value, inputPass.value);
            }}
          >
            Login
          </button>
        </form>

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
      </main>
    </div>
  );
};

export default Home;
