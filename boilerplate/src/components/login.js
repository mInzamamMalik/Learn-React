import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class Login extends Component {
    doLogin() {
        browserHistory.push('/dashboard');
    }
    render() {
        return (<div>
            <div>this is Login</div>

            <input type="text" placeholder="username" /> <br />
            <input type="text" placeholder="password" /> <br />

            <button onClick={this.doLogin}>
                Login
            </button>
        </div>)
    }
}

export default Login;  