
const InitailState = {
    todos: []
}

export default function (state = InitailState, action) {

    switch (action.type) {

        case "ADD_TODO":

            console.log("all todos: ", state);

            var allTodo = state.todos;
            allTodo.push(action.payload);

            return {
                todos: allTodo
            };
            break;

        case "REMOVE_TODO":
            return state - 1;
            break;
    }
    console.log("this is action: ", action, state);
    return state;


}