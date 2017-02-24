import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Addtodo from './components/addTodo';
import TodoList from './components/todoList';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Todo App</h1>
                <Addtodo></Addtodo>
                <TodoList></TodoList>
            </div>
        );
    }
}
export default App;
