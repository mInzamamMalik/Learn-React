import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import { RaisedButton, TextField } from 'material-ui';

class Signup extends Component {

    constructor(props) {
        super(props)
        this.doSignup = this.doSignup.bind(this);
    }
    doSignup() {
        var name = this.refs.name.getValue();
        var username = this.refs.username.getValue();
        var password = this.refs.password.getValue();
        console.log(name, username, password);

        browserHistory.push('/login');
    }

    render() {
        return (<div>
            <div>This is Login</div>

            <TextField type="text" hintText="name" ref="name" /> <br />
            <TextField type="text" hintText="username" ref="username" /> <br />
            <TextField type="text" hintText="password" ref="password" /> <br />

            <RaisedButton primary={true} onClick={this.doSignup}>
                Signup
            </RaisedButton>
        </div>)
    }
}
export default Signup;