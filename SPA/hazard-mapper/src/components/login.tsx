import React from "react";
import "./login.css";
// @ts-ignore
import { connect } from 'react-redux';
import {login, LoginInterface} from "../actions/userManagementActions";
import {LoginModel} from "../common/Login";

interface IMapDispatchToProps {
    login: (user : LoginModel)  => LoginInterface;
}

class Login extends React.Component<IMapDispatchToProps, LoginModel> {
    constructor(props : any) {
        super(props);
        this.state = {
            username : "",
            password : ""
        }
    }

    handleChangeUsername(e : any) {
        this.setState({username: e.target.value});
    }

    handleChangePassword(e : any) {
        this.setState({password: e.target.value});
    }

    render() {
        return <div className="main-container container">
            <form className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                           aria-describedby="basic-addon1" id="username" value={this.state.username} onChange={e => this.handleChangeUsername(e)}/>
                </div>
                <label htmlFor="password">Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" id="password" aria-describedby="basic-addon3" value={this.state.password} onChange={e => this.handleChangePassword(e)}/>
                </div>
                <button className="btn btn-secondary" onClick={(e ) =>{
                    e.preventDefault();
                    this.props.login(this.state);
                }}>Login</button>
            </form>
        </div>;
    }
}

const mapDispatchToProps = { login }

export default connect(
    null,
    mapDispatchToProps
)(Login)