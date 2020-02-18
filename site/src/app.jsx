import { Input } from "./components";
import { API } from "./api";

const App = () => {
  const header = <header>This is the App</header>;
  let input = Input.Text("sample");

  const title = <h1></h1>;

  API.createUser({ username: "username" }).then(
    u => (title.textContent = u.username)
  );

  const button = <button>docs</button>;
  button.onclick = () => {
    console.log("click");
    window.location.href = "/api/docs";
  };

  return (
    <div>
      {header}
      {title}
      {button}
    </div>
  );
};

export default App;
