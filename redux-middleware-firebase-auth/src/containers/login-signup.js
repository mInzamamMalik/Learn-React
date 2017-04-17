import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { AppBar } from 'material-ui';
import { FlatButton, RaisedButton } from 'material-ui';

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
    };
}
class LoginSignup extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            browserHistory.replace('dashboard');
        }
    }
    render() {
        return (
            <div>
                <AppBar title="This is landing page"></AppBar>
                <ul>
                    <FlatButton><Link to="/login">Login</Link></FlatButton>
                    <FlatButton><Link to="/signup">Signup</Link></FlatButton>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(LoginSignup)