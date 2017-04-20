import React, { Component } from 'react';
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { AppBar } from 'material-ui';
import { FlatButton, RaisedButton } from 'material-ui';

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        profile: state.AuthReducer.profile,

    };
}
class LoginSignup extends Component {

    flag = false;
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            console.log("nextProps redirect", nextProps);
            browserHistory.replace('dashboard');
        }
        if (!this.flag && nextProps.profile && nextProps.profile.role) {
            this.flag = true;
            if (nextProps.profile.role == "admin") {
                browserHistory.replace('admin');
            } else if (nextProps.profile.role == "user") {
                browserHistory.replace('profile');
            } else if (nextProps.isAuthenticated && nextProps.profile.role == "product verifier" && nextProps.location.pathname != "productverifier") {
                browserHistory.replace('productverifier');
            }
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