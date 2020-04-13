import React from "react";
import {RegisterModel} from "../common/RegisterModel";
import {register, RegisterInterface} from "../actions/userManagementActions";
// @ts-ignore
import { connect } from 'react-redux';
import {Redirect} from "react-router";
import "./userManagement.css";

interface IMapDispatchToProps {
    register: (model : RegisterModel)  => RegisterInterface;
}

interface IMapStateToProps {
    jwt : string;
}

interface InnerState {
    passwordAgain : string
}

class Register extends React.Component<IMapDispatchToProps & IMapStateToProps, RegisterModel & InnerState> {
    constructor(props : any) {
        super(props);
        this.state = {
            username : "",
            email : "",
            password : "",
            vocation : "",
            country : "",
            passwordAgain : ""
        }
    }

    handleInputChange(e : any) {
        // @ts-ignore
        this.setState({[e.target.name ]: e.target.value});
    }


    render() {
        if(this.props.jwt !== null && this.props.jwt !== undefined && this.props.jwt !== ''){
            return (<Redirect to='/home' />);
        }

        return <div className="main-container container">
            <form className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                           aria-describedby="basic-addon1" id="username" name="username" value={this.state.username} onChange={e => this.handleInputChange(e)}/>
                </div>
                <label htmlFor="password">Email</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="email" name="email" aria-describedby="basic-addon3" value={this.state.email} onChange={e => this.handleInputChange(e)}/>
                </div>
                <label htmlFor="password">Password</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" id="password" name="password" aria-describedby="basic-addon3" value={this.state.password} onChange={e => this.handleInputChange(e)}/>
                </div>
                <label htmlFor="password">Password again</label>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" id="passwordAgain" name="passwordAgain" aria-describedby="basic-addon3" value={this.state.passwordAgain} onChange={e => this.handleInputChange(e)}/>
                </div>
                <label htmlFor="password">Country</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="country" name="country" aria-describedby="basic-addon3" value={this.state.country} onChange={e => this.handleInputChange(e)}/>
                </div>
                <label htmlFor="password">Vocation</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="vocation" name="vocation" aria-describedby="basic-addon3" value={this.state.vocation} onChange={e => this.handleInputChange(e)}/>
                </div>
                <button className="btn btn-secondary" onClick={(e ) =>{
                    e.preventDefault();
                    this.props.register( this.state);
                }}>Register</button>
            </form>
        </div>;
    }
}

const mapDispatchToProps = { register }

const mapStateToProps = (state : any) => ({
    jwt : state.jwt
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)
