import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserList from './components/user-list'
import UserDetail from './components/user-detail'
import Counter from './components/counter'

class App extends Component {
    render() {
        return (
            <div>
                <h2>Countert</h2>
                <Counter></Counter>


                <h2>Welcome to React</h2>
                <UserList></UserList>
                <UserDetail></UserDetail>
            </div>
        );
    }
}

export default App;
