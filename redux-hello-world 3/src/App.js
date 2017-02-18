import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/user-list'
class App extends Component {
    render() {
        return (
            <div>
                <h2>Welcome to React</h2>
                <UserList></UserList>
            </div>
        );
    } 
}

export default App;
