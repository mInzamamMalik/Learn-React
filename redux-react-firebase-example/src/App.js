import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';
const { isLoaded, isEmpty, dataToJS } = helpers

@firebase([
    'todos'
])
@connect(
    ({ firebase }) => ({
        todos: dataToJS(firebase, 'todos'),
    })
)
class Todos extends Component {
    const { firebase, todos } = this.props;


const todosList = (!isLoaded(todos)) ? 'Loading' :
    (isEmpty(todos)) ? 'Todo list is empty' : _.map(todos, (todo, id) => (<TodoItem key={id} id={id} todo={todo} />))

return (
    <div>
        <h1>Todos</h1>
        <ul>
            {todosList}
        </ul>
        <input type="text" ref="newTodo" />
        <button onClick={handleAdd}>Add</button>
    </div>
)
}

export default App;
