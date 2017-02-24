import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import LoginSignup from './containers/login-signup'
import Dashboard from './containers/dashboard'

import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/profile'
import Contact from './components/contact'
import About from './components/about'
import NoMatch from './components/404'



function check(nextState, replace) {
    // let user = localStorage.getItem("chat-app");
    // if (!user) {
    //     replace({
    //         pathname: 'login',
    //         state: { nextPathname: nextState.location.pathname }
    //     })
    // }
}
class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>

                <Route path="/" component={LoginSignup}>
                    <IndexRoute component={Login} />
                    <Route path="login" component={Login} />
                    <Route path="signup" component={Signup} />
                </Route>

                <Route path="dashboard" component={Dashboard} onEnter={check} >
                    <IndexRoute component={Profile} />
                    <Route path="profile" component={Profile} />
                    <Route path="about" component={About} />
                    <Route path="contact" component={Contact} />
                </Route>
                <Route path="*" component={NoMatch} />

            </Router>
        )
    }
}

export default App;
