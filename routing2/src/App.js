import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'


class Home extends Component {
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
class Login extends Component {
    
    doLogin() {
        browserHistory.push('/dashboard');
    }
    render() {
        return (<div>
            <div>this is Login</div>

            <input type="text" placeholder="username" /> <br />
            <input type="text" placeholder="password" /> <br />

            <button onClick={this.doLogin}>
                Login
            </button>
        </div>)
    }
}
class Signup extends Component {
    render() {
        return (<div>
            <div>This is Login</div>

            <input type="text" placeholder="name" /> <br />
            <input type="text" placeholder="username" /> <br />
            <input type="text" placeholder="password" /> <br />

            <button>
                <Link to="/login">Do Signup</Link>
            </button>
        </div>)
    }
}


class Dashboard extends Component {
    render() {
        return (<div>

            <h1>This is Dashboard</h1>

            <Link to="/dashboard/profile">Profile</Link>
            <Link to="/dashboard/about">About</Link>
            <Link to="/dashboard/contact">Contact</Link>

            {this.props.children}
        </div>)
    }
}

class Profile extends Component {
    render() {
        return <div>this is profile</div>
    }
}
class About extends Component {
    render() {
        return <div>this is about</div>
    }
}
class Contact extends Component {
    render() {
        return <div>this is Contact</div>
    }
}
class NoMatch extends Component {
    render() {
        return <div>Not found 404</div>
    }
}


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

                <Route path="/" component={Home}>
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
