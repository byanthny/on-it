import React from "react";
import { Routes, Route } from "react-router-dom";
import Dev from "./pages/devPage";

const urlBase = "/on-it";

const App = () => (
  <Routes>
    <Route path={`${urlBase}/dev`}>
      <Dev /> {/* Use for testing things */}
    </Route>
    <Route path={`${urlBase}`}>
      <h1>Hello World</h1>
    </Route>
  </Routes>
);

export default App;
