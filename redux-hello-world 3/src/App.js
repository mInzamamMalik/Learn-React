import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/user-list'
import UserDetail from './components/user-detail'

class App extends Component {
    render() {
        return (
            <div>
                <h2>Welcome to React</h2>
                <UserList></UserList>
                <UserDetail></UserDetail>
            </div>
        );
    }
}

export default App;
