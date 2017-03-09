import React, { Component } from 'react';
import { Link } from 'react-router'

import {AppBar} from 'material-ui';

class LoginSignup extends Component {
    render() {
        return (
            <div>
                <AppBar title="This is landing page"></AppBar>
               
                <ul>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default LoginSignup;