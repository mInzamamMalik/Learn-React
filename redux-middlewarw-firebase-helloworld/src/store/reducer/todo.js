import { TodoAction } from "./../action/todo";

const INITIAL_STATE = {
    todos: {},
    loading: false,
    isError: false,
    counter: 0,
}

export function TodoReducer(state = INITIAL_STATE, action) {

    console.log("every action in todo reducer: ", action.type);

    switch (action.type) {

        case TodoAction.ADD_TODO:
            // console.log("Add todo start");
            return { ...state, loading: true, isError: false };

        case TodoAction.ADD_TODO_DONE:
            console.log("reducer Add todo done: ", action.payload);
            return { ...state, loading: false, isError: false };

        case TodoAction.GET_TODO:
            console.log("get todo start: ", action.payload);
            return { ...state, loading: true, isError: false };

        case TodoAction.GET_TODO_ADDED:
            console.log("reducer todo added: ", action.payload);

            var newTodos = Object.assign({}, state.todos);
            newTodos[action.payload.key] = action.payload.val;

            console.log("newTodos: ", newTodos);
            return { ...state, todos: newTodos, loading: false, isError: false, counter: state.counter + 1 };

        case TodoAction.GET_TODO_REMOVED:
            console.log("reducer todo removed: ", action.payload);

            var newTodos = Object.assign({}, state.todos);
            delete newTodos[action.payload];

            console.log("newTodos: ", newTodos);
            return { ...state, todos: newTodos, loading: false, isError: false, counter: state.counter + 1 };
        
        case TodoAction.GET_TODO_CHANGED:
            console.log("reducer todo changed: ", action.payload);

            var newTodos = Object.assign({}, state.todos);
            newTodos[action.payload.key] = action.payload.val; 

            console.log("newTodos: ", newTodos);
            return { ...state, todos: newTodos, loading: false, isError: false, counter: state.counter + 1 };

        default:
            return state;
    }
}