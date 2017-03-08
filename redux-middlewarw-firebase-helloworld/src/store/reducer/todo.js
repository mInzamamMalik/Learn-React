import { TodoAction } from "./../action/todo";

const INITIAL_STATE = {
    todos: {},
    loading: false,
    isError: false
}

export function TodoReducer(state = INITIAL_STATE, action) {

    console.log("todo reducer: ", action.type);

    switch (action.type) {

        case TodoAction.ADD_TODO:
            // console.log("Add todo start");
            return { ...state, loading: true, isError: false };
        
        case TodoAction.ADD_TODO_DONE:
            // console.log("Add todo done: ",action.payload);
            return { ...state, loading: false, isError: false };
            
        default:
            return state;
    }
}