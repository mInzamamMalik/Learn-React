import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Counter from './components/counter.jsx'
import store from "./store/reducers.js"

class App extends Component {
    render() {
        return (
            <Counter
                value={store.getState()}
                onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
                onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
            />
        );
    }
}
export default App;

