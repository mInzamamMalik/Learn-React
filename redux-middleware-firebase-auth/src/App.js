import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import * as firebase from 'firebase';
import { firebaseService } from './service/firebaseService';

import LoginSignup from './containers/login-signup'
import Dashboard from './containers/dashboard'

import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/profile'
import NoMatch from './components/404'

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

    setTimeout(function () {
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
    }, 3000);
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
    render() {
        return (
            <Router history={browserHistory}>


                <Route path="/" component={Dashboard} onEnter={isLogin} >
                    <IndexRoute component={Profile} />
                    <Route path="dashboard" component={Profile} />
                </Route>

                <Route path="/" component={LoginSignup} onEnter={isLogout}>
                    <IndexRoute component={Login} />
                    <Route path="login" component={Login} />
                    <Route path="signup" component={Signup} />
                </Route>
                <Route path="*" component={NoMatch} />

            </Router>
        );
    }
}
export default App;
