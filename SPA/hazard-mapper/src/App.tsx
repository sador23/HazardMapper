import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Register from "./components/register";
import {Login} from "./components/login";
import MainMap from "./components/mainMap";

function App() {
  return (
      <div className="App">
          <Router>
              <div>
                  <nav>
                      <ul>
                          <li>
                              <Link to="/">Home</Link>
                          </li>
                          <li>
                              <Link to="/register">Register</Link>
                          </li>
                          <li>
                              <Link to="/login">Login</Link>
                          </li>
                      </ul>
                  </nav>

                  <Switch>
                      <Route path="/register">
                          <Register />
                      </Route>
                      <Route path="/login">
                          <Login />
                      </Route>
                      <Route path="/">
                          <MainMap />
                      </Route>
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
