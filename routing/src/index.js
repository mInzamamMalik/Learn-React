import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router from './router.jsx';
import logo from './logo.svg';

const mapping = {
    '#profile': <div >This is profile page (<a href="#">home</a>)</div>,
    '#contacts': <div >This is Contacts page (<a href="#">home</a>)</div>,
    '#about': <div >This is About Us page (<a href="#">home</a>)</div>,
    '*': <div>
        <h1>This is Dashboard </h1>
        <br />
        <a href="#profile">Profile</a>
        <br />
        <a href="#contacts">Contacts</a>
        <br />
        <a href="#about">About</a>
    </div>
}

ReactDOM.render(
    <Router mapping={mapping} />,
    document.getElementById('content')
)