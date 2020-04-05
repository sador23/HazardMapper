import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Register from "./register";
import {Login} from "./login";
import MainMap from "./mainMap";
import React from "react";
import './router.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RouterWrapper  extends React.Component{

    render(){ return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/"><h3>Home</h3></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
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
    )}
}