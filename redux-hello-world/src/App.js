import React, { Component } from 'react';
import store from "./store/reducer"
import { counterAction } from './store/action';

class App extends Component {

    constructor(props) {
        super(props);
        this.getFromStore = this.getFromStore.bind(this); //binding class 'this'

        this.state = { number: 0 }; //setting up initial state of component
        store.subscribe(this.getFromStore) //when any change occure in state 'this.getFromState' will be called autetically
    }

    getFromStore() {
        let newState = store.getState()//getting fresh state from redux store
        this.setState({ number: newState }); //saving that newState in component state
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