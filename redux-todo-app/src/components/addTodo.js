import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo, removeTodo } from '../store/actions/actions-todo'

class AddTodo extends Component {
    constructor(props) {
        super(props);

        this._submithandler = this._submithandler.bind(this);
    }
    _submithandler(event) {
        event.preventDefault()

        console.log("refs: ", this.refs.todoText.value)

        var todo = {
            text: this.refs.todoText.value,
            done: false
        }
        //dispatch add todo action with todo data
        return this.props.add(todo);
    }
    render() {
        return (
            <div>
                <form onSubmit={this._submithandler}>
                    <label htmlFor="addtodo"></label>
                    <input id="addTodo" type="text" ref="todoText" />
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}



function mapStateToProps(state) {
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

export default connect(mapStateToProps, matchDispatchToProps)(AddTodo);