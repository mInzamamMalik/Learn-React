import React, { Component } from 'react';

class AddTodo extends Component {
    constructor(props) {
        super(props);

        this._submithandler = this._submithandler.bind(this);
    }
    _submithandler(event) {
        event.preventDefault()

        var todo = {
            text: event.target.value,
            done: false
        }
        //dispatch add todo action with todo data
    }
    render() {
        return (
            <div>
                <form onSubmit={this._submithandler}>
                    <label htmlFor="addtodo"></label>
                    <input id="addTodo" type="text" />
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

export default AddTodo;