import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Counter from './components/counter'

class App extends Component {
    render() {
        return (
            <div>
                <h2>Countert</h2>
                <Counter></Counter>
            </div>
        );
    }
}

export default App;
