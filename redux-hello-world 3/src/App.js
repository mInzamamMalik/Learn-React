import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore } from 'redux';
import allReducers from './reducers/index.js'

const store = createStore(allReducers)

class App extends Component {
    render() {
        return (
            <h2>Welcome to React</h2>
        );
    }
}

export default App;
