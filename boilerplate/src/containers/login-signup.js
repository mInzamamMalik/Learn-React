import React, { Component } from 'react';
import { Link } from 'react-router'

class LoginSignup extends Component {
    render() {
        return (
            <div>
                <h1>This is landing page</h1>
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