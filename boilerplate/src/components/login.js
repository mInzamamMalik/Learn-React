import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import {RaisedButton} from 'material-ui';

class Login extends Component {
    doLogin() {
        browserHistory.push('/dashboard');
    }
    render() {
        return (<div>
            <div>this is Login</div>

            <input type="text" placeholder="username" /> <br />
            <input type="text" placeholder="password" /> <br />

            <RaisedButton onClick={this.doLogin} primary={true}>
                Login
            </RaisedButton>
        </div>)
    }
}

export default Login;  