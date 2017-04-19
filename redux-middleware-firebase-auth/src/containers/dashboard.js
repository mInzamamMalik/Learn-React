import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { FlatButton } from 'material-ui';
import { AuthActions } from './../store/action/auth';

import { AppBar } from 'material-ui';

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser,
        profile: state.AuthReducer.profile,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AuthActions.logout())
    };
}
class Dashboard extends Component {

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isAuthenticated) {
            browserHistory.replace('login');
        }

        if (nextProps.profile.role == "admin") {
            browserHistory.replace('admin');
        } else if (nextProps.profile.role == "product verifier") {
            browserHistory.replace('productverifier');
        }
    }
    render() {
        return (<div>
            <AppBar
                iconElementLeft={<FlatButton label="Company Logo" />}
                iconElementRight={<FlatButton onClick={() => { this.props.logout() }} label="Logout" />}
                title="This is Dashboard"
            ></AppBar>

            {/*
            <Link to="/dashboard/profile">Profile</Link>
            <Link to="/dashboard/about">About</Link>
            <Link to="/dashboard/contact">Contact</Link>*/}

            {this.props.children}
        </div>)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)