import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router'
//requiring components 
import Home from './components/home.jsx'
import Profile from './components/profile.jsx'
import Contacts from './components/contacts.jsx'
import About from './components/about.jsx'
import Menu from './components/menu.jsx'


ReactDOM.render(
    <div>
        <Router history={browserHistory}>        
            <Route path="/" component={Home} >

                <IndexRoute component={Profile} />

                <Route path="/profile" component={Profile} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/about" component={About} />
                
            </Route>
        </Router>
    </div>,
    document.getElementById('content')
)
            // <Route path="/posts/:id" component={Post} posts={posts} />