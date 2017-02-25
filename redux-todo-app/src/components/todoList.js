import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodoList extends Component {
    constructor(props, context) {
        super(props, context);

    }

    _list() {
        console.log("inside todo list: ", this.props);
        if (this.props.todo.todos.length) {
            return this.props.todo.todos.map((todo, index) => {
                return (
                    <li key={index}>
                        {todo.text}                       
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

export default connect(mapStateToProps)(TodoList);