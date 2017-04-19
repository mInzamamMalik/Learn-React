import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { AuthActions } from './store/action/auth';
import { firebaseService } from './service/firebaseService';

import LoginSignup from './containers/login-signup'
import Dashboard from './containers/dashboard'

import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/profile'
import EmployeeList from './components/employeeList'
import ProductVerifier from './components/productVerifier'
import NoMatch from './components/404'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
    };
}
function mapDispatchToProps(dispatch) {
    //auto dispatch
    // dispatch(AuthActions.isLoggedIn());
    return {
        isLoggedIn: () => dispatch(AuthActions.isLoggedIn())
    };
}


class App extends Component {
    constructor(props) {
        super(props);
        this.props.isLoggedIn();

        this.isLogout = this.isLogout.bind(this);
        this.isLogin = this.isLogin.bind(this);
    }

    isLogout(nextState, replace) {
        // console.log("islogout guard: ", this.props.isAuthenticated);
        // if (this.props.isAuthenticated) {
        //     replace({
        //         pathname: 'dashboard',
        //         state: { nextPathname: nextState.location.pathname }
        //     });
        // }
    }

    isLogin(nextState, replace) {

        // console.log("isLogin guard: ", this.props.isAuthenticated);
        // if (!this.props.isAuthenticated) {
        //     replace({
        //         pathname: 'login',
        //         state: { nextPathname: nextState.location.pathname }
        //     });
        // }
    }

    render() {
        return (
            <Router history={browserHistory}>

                <Route path="/" component={LoginSignup} onEnter={this.isLogout}>
                    <IndexRoute component={Login} />
                    <Route path="login" component={Login} />
                    <Route path="signup" component={Signup} />
                </Route>

                <Route path="dashboard" component={Dashboard} onEnter={this.isLogin} >
                    <IndexRoute component={ProductVerifier} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/employeelist/:companyId" component={EmployeeList} />
                    <Route path="/productverifier" component={ProductVerifier} />
                    <Route path="/admin" component={ProductVerifier} />
                </Route>

                <Route path="*" component={NoMatch} />

            </Router>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);