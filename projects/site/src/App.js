import { Route, Switch } from "react-router";
import { Component } from 'react';
import Login from "./pages/Login";
import Main from "./pages/Main";
// import Api from "./OnItApi"
// import { OnIt } from "common"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/test">
          <div className="app">
            <a /*href={OnIt.sourceUrl}*/>
              Testing...
            </a>
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
}

export default App;