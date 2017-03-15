import React, { Component } from 'react';
import store from "./store"
import { counterAction } from './store/action';

class App extends Component {

    constructor(props) {
        super(props);
        this.getFromStore = this.getFromStore.bind(this); //binding class 'this'

        this.state = { number: 0 }; //setting up initial state
        store.subscribe(this.getFromStore) //when any change occure in state 'this.getFromState' will be called autetically
    }

    getFromStore() {
        this.setState({
            number: store.getState()
        });
    }
    inc() {
        counterAction.increment(); //dispatch increment action
    }
    dec() {
        counterAction.decrement(); //dispatch decrement action
    }

    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.inc}>Increment</button>
                <button onClick={this.dec}>Decrement</button>
            </div>
        );
    }
}
export default App;

