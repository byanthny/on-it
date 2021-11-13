import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={"Light"} />
    <Router>
      <App />
    </Router>
  </ChakraProvider>,
  document.getElementById("root")
);
