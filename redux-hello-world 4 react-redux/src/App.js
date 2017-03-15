import React, { Component } from 'react';
import Counter from './components/counter'

class App extends Component {
    render() {
        return (
            <div>
                <h2>Counter:</h2>
                <Counter></Counter>
            </div>
        );
    }
}
export default App;
