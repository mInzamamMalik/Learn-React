import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import { RaisedButton, TextField } from 'material-ui';

class Login extends Component {
    constructor(props) {
        super(props)//for using 'this.'
        this.doLogin = this.doLogin.bind(this)
    }

    doLogin() {
        var username = this.refs.username.getValue();
        var password = this.refs.password.getValue();
        console.log(username, password);

        browserHistory.push('/dashboard');
    }
    render() {
        return (<div>
            <div>this is Login</div>

            <TextField type="text" hintText="username" ref="username" /> <br />
            <TextField type="text" hintText="password" ref="password" /> <br />

            <RaisedButton onClick={this.doLogin} primary={true}>
                Login
            </RaisedButton>
        </div>)
    }
}

export default Login;  