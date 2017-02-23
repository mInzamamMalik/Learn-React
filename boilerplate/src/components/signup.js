import React, { Component } from 'react';
import { browserHistory } from 'react-router'

import {RaisedButton} from 'material-ui';

class Signup extends Component {

    doSignup() {
        browserHistory.push('/login');
    }

    render() {
        return (<div>
            <div>This is Login</div>

            <input type="text" placeholder="name" /> <br />
            <input type="text" placeholder="username" /> <br />
            <input type="text" placeholder="password" /> <br />

            <RaisedButton primary={true}  onClick={this.doSignup}>
                Signup
            </RaisedButton>
        </div>)
    }
}
export default Signup;