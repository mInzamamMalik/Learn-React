import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store from "./store/reducer.js"
import { counterAction } from './store/actions';

class App extends Component {

    incrementIfOdd() {
        if (this.props.value % 2 !== 0) {
            counterAction.increment();
        }
    }
    incrementAsync() {
        setTimeout(() => {
            counterAction.increment()
        }, 1000)
    }
    dec() {
        counterAction.decrement();
    }

    render() {
        return (
            <div>
                <p>{store.getState()}</p>
                <button onClick={this.incrementAsync}>Increment</button>
                <button onClick={this.dec}>Decrement</button>
            </div>
        );
    }
}
export default App;

