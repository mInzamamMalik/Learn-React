export class TodoAction {

    static GET_TODO = 'GET_TODO';
    static GET_TODO_ADDED = 'GET_TODO_ADDED';
    static GET_TODO_REMOVED = 'GET_TODO_REMOVED';
    static GET_TODO_CHANGED = 'GET_TODO_CHANGED';
    static GET_TODO_CANCELLED = 'GET_TODO_CANCELLED';

    static ADD_TODO = 'ADD_TODO';
    static ADD_TODO_DONE = 'ADD_TODO_DONE';


    static NULL = 'NULL';

    static addTodo(data) {
        // console.log("data in action file: ", data);
        return {
            type: TodoAction.ADD_TODO,
            payload: data
        }
    }

    static getTodos() {
        // console.log("Action is firing for get todo")
        return {
            type: TodoAction.GET_TODO,
        }
    }
    static getTodoDone(data) {
        // console.log("get todo done action: ", data);
        return {
            type: TodoAction.GET_TODO_DONE,
        }
    }
    static getTodosCancel(data) {
        console.log("get todo cancel: ", data);
        return {
            type: TodoAction.GET_TODO_CANCELLED,
        }
    }

}