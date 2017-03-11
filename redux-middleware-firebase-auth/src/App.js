import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import { firebaseService } from './service/firebaseService';

import LoginSignup from './containers/login-signup'
import Dashboard from './containers/dashboard'

import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/profile'
import NoMatch from './components/404'

function isLogin(nextState, replace) {
    let user = firebaseService.auth();
    console.log("isLogin: ", user)
    if (!user) {
        replace({
            pathname: 'login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}
function isLogout(nextState, replace) {
    let user = firebaseService.auth();
    if (user) {
        replace({
            pathname: 'dashboard',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}


class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>

                <Route path="/" component={LoginSignup} onEnter={isLogout}>
                    <IndexRoute component={Login} />
                    <Route path="login" component={Login} />
                    <Route path="signup" component={Signup} />
                </Route>

                <Route path="dashboard" component={Dashboard} onEnter={isLogin} >
                    <IndexRoute component={Profile} />
                    <Route path="profile" component={Profile} />
                </Route>
                <Route path="*" component={NoMatch} />

            </Router>
        );
    }
}
export default App;
