import { Input } from "./components";

const App = () => {
  const header = <header>This is the App</header>;
  let input = Input.Text("sample");

  return (
    <div>
      {header}
      {input}
    </div>
  );
};

export default App;
