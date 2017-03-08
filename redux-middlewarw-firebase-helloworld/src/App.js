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
    };
}
class Todo extends Component {
    constructor(props) {
        super(props)
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount() {
        console.log('Check to see if firing')

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

            <input type="text" placeholder="todo" ref="todo" /> <br />

            <button onClick={this.addTodo}>
                Add Todo
            </button>

            {(this.props.loading) ? <p>Loading...</p> : ""}
        </div>)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo)