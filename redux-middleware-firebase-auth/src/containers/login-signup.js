import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { AppBar } from 'material-ui';

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
    };
}
class LoginSignup extends Component {


    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            browserHistory.push('/dashboard');
        }
    }
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

export default connect(mapStateToProps, null)(LoginSignup)