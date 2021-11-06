import { Route, Switch } from "react-router"
import { Component, useState } from 'react'
import Login from "./pages/Login"
import Main from "./pages/Main"

function App() {

  const [auth, setAuth] = useState("");

    return (
      <Switch>
        <Route exact path="/test">
          <div className="app">
            Testing...
          </div>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          {/* TODO PrivateRoute if user is authorized.*/}
          <Main />
        </Route>
      </Switch>
    )
}

export default App