import { Input } from "./components";
import { API } from "./api";

const App = () => {
  const header = <header>This is the App</header>;
  let input = Input.Text("sample");

  const title = <h1></h1>;

  API.createUser({ username: "username" }).then(
    u => (title.textContent = u.username)
  );

  return (
    <div>
      {header}
      {title}
    </div>
  );
};

export default App;
