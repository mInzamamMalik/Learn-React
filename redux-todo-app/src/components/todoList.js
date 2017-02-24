import React, { Component } from 'react';

class TodoList extends Component {
    constructor(props, context) {
        super(props, context);
                
    }   
    
    render() {
        return (
            <div>
                <ul>
                    <li>todo 1 <button>delete</button></li>
                    <li>todo 2 <button>delete</button></li>
                </ul>                
            </div>
        );
    }
}

export default TodoList;