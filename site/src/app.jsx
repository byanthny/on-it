import { Input } from "./components";
import { API } from "./api";

const App = () => {
  const title = <h1>Title</h1>;

  const button = <button>docs</button>;
  button.onclick = () => {
    console.log("click");
    window.location.href = "/api/docs";
  };

  API.login("swordmaster9@gmail.com", "mypass").then(u => console.log(u));

  return (
    <div>
      {title}
      {button}
    </div>
  );
};

export default App;
