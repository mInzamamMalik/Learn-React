import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux'
import { TodoAction } from './store/action/todo'

function mapStateToProps(state) {
    return {
        todos: state.TodoReducer.todos,
        loading: state.TodoReducer.loading,
        isError: state.TodoReducer.isError,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        addTodo: (data) => dispatch(TodoAction.addTodo(data)),
        getTodos: () => dispatch(TodoAction.getTodos()),
        getTodosCancel: () => dispatch(TodoAction.getTodosCancel()),
    };
}
class Todo extends Component {
    constructor(props) {
        super(props)
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount() {
        console.log('Check to see if firing')
        this.props.getTodos();
    }



    addTodo() {
        var todo = this.refs.todo.value;
        this.props.addTodo({
            todo: todo
        })
    }

    render() {
        return (<div>
            <div>This is Todo App using redux-observable and epic</div>
            <br />
            <br />
            <ul>
                {Object.keys(this.props.todos).map((key, index) => {
                    var val = this.props.todos[key]
                    return (<li key={index}>
                        <p> {val.todo}</p>
                        <p> {(val.isDone) ? "   done" : "    not done yet"} </p>
                    </li>)
                })}
            </ul>

            <input type="text" placeholder="todo" ref="todo" /> <br />

            <button onClick={this.addTodo}>
                Add Todo
            </button>
            <button onClick={this.props.getTodosCancel}>
                Cancel getting todo
            </button>

            {(this.props.loading) ? <p>Loading...</p> : ""}
        </div>)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo)