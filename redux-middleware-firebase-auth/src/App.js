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

function isLogout(nextState, replace) {

    // firebase.auth().onAuthStateChanged(function (usera) {

    //     let user = firebase.auth().currentUser;
    //     console.log("user: ", user);
    //     if (user) {
    //         console.log("user: ", user);

    //         replace({
    //             pathname: 'dashboard',
    //             state: { nextPathname: nextState.location.pathname }
    //         });
    //     }
    // });

    // setTimeout(function () {
    //    return replace({
    //         pathname: 'dashboard',
    //         state: { nextPathname: nextState.location.pathname }
    //     });
    //     let user = firebase.auth().currentUser;
    //     console.log("user: ", user);
    //     if (user) {
    //         console.log("user: ", user);

    //         // replace({
    //         //     pathname: 'dashboard',
    //         //     state: { nextPathname: nextState.location.pathname }
    //         // });
    //     }
    // }, 3000);
}
function isLogin(nextState, replace) {

    // if (user) {
    //     replace({
    //         pathname: 'dashboard',
    //         state: { nextPathname: nextState.location.pathname }
    //     });
    // }
}
class App extends Component {
    constructor(props) {
        super(props);
        this.props.isLoggedIn();
    }

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
export default connect(mapStateToProps, mapDispatchToProps)(App);