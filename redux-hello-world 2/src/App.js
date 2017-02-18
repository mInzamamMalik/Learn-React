import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>{this.props.value}</h1>
                <button onClick={this.props.onINCREMENT} > + </button>
                <button onClick={this.props.onDECREMENT} > - </button>
            </div>
        );
    }
}

export default App;
