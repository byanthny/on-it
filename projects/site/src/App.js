import { Route, Switch } from "react-router"
import { useState } from 'react'
import Login from "./pages/auth/Login"
import Main from "./pages/Main"
import Dev from "./pages/Dev"

const urlBase = "/on-it"

function App() {

  const [auth, setAuth] = useState("");

    return (
      <Switch>
        <Route exact path={`${urlBase}/dev`}>
          <Dev /> {/* Use for testing things */}
        </Route>
        <Route path={`${urlBase}/login`}>
          <Login />
        </Route>
        <Route exact path={`${urlBase}`}>
          {/* TODO Route if user is authorized.*/}
          <Main />
        </Route>
      </Switch>
    )
}

export default App