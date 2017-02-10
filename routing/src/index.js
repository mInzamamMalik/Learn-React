import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.jsx';

//requiring components
import Home from './components/home.jsx'
import Profile from './components/profile.jsx'
import Contacts from './components/contacts.jsx'
import About from './components/about.jsx'

const mapping = {
    '#profile': <Profile></Profile>,
    '#contacts': <Contacts></Contacts>,
    '#about': <About></About>,
    '*': <Home></Home>
}

ReactDOM.render(
    <Router mapping={mapping} />,
    document.getElementById('content')
)