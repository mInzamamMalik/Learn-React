export class TodoAction {

    static GET_TODO = 'GET_TODO';
    static GET_TODO_DONE = 'GET_TODO_DONE';

    static ADD_TODO = 'ADD_TODO';
    static ADD_TODO_DONE = 'ADD_TODO_DONE';


    static NULL = 'NULL';

    //static NULL = 'NULL';
    static addTodo(data) {
        console.log("data in action file: ", data);

        return {
            type: TodoAction.ADD_TODO,
            payload: data
        }
    }

    static getTodos() {
        console.log("Action is firing for get todo")
        return {
            type: TodoAction.GET_TODO,
        }
    }
    static getTodoDone(data) {

        console.log("get todo finnal: ", data);

        return {
            type: TodoAction.GET_TODO_DONE,
            payload: data
        }
    }

}