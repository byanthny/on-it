import { Route, Switch } from "react-router";
import React from 'react';
import Login from "./pages/Login";
// import Api from "./OnItApi"
// import { OnIt } from "common"

function App() {

  return (
    <Switch>
      <Route exact path="/">
          <div className="app">
          <a /*href={OnIt.sourceUrl}*/>
            Soon...
          </a>
        </div>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  )
}

export default App;