import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo, removeTodo } from '../store/actions/actions-todo'

class TodoList extends Component {
    constructor(props, context) {
        super(props, context);

    }
    _removeTodo(index) {
        console.log("index: ", index);
        this.props.remove(index)
    }

    _list() {
        console.log("inside todo list: ", this.props);
        if (this.props.todo.todos.length) {
            return this.props.todo.todos.map((todo, index) => {
                return (
                    <li key={index}>
                        <p>{todo.text} <button onClick={() => this._removeTodo(index)}>Remove</button></p>
                    </li>
                )
            })
        } else {
            return <div>No Todo</div>
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {this._list()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log("inside todo list: ", state);
    return {
        todo: state.todoStore
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        add: addTodo,
        remove: removeTodo
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TodoList);