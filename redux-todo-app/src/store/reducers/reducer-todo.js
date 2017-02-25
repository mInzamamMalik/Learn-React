import { TodoActions } from '../actions/actions-todo';
const InitailState = {
    todos: []
}

export default function (state = InitailState, action) {

    switch (action.type) {

        case TodoActions.ADD_TODO:

            console.log("all todos: ", state);

            var allTodo = state.todos;
            allTodo.push(action.payload);

            return {
                todos: allTodo
            };
            break;

        case TodoActions.REMOVE_TODO:
            var allTodo = state.todos;
            allTodo.splice(action.payload, 1)

            return {
                todos: allTodo
            };
            break;
    }
    console.log("this is action: ", action, state);
    return state;


}