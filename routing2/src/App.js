import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'



class Home extends Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to="/profile">Profile</Link>
                    <Link to="/about">About</Link>
                </ul>

                {this.props.children}

            </div>
        )
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
class NoMatch extends Component {
    render() {
        return <div>Not found 404</div>
    }
}


class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>

                <Route path="/" component={Home}>
                
                    <IndexRoute component={Profile} />
                    <Route path="profile" component={Profile} />
                    <Route path="about" component={About} />
                    <Route path="*" component={NoMatch} />
                </Route>

            </Router>
        )
    }
}
export default App;
