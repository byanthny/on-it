import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Route, Switch } from "react-router"
import Dev from "./pages/Dev";
import App from "./App";

const urlBase = "/on-it"

ReactDOM.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={"Dark"} />
    <Router>
      <Switch>
          <Route exact path={`${urlBase}/dev`}>
            <Dev /> {/* Use for testing things */}
          </Route>
          <Route exact path={`${urlBase}`}>
            <App />
          </Route>
        </Switch>
    </Router>
  </ChakraProvider>,
  document.getElementById("root")
);
