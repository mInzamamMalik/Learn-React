export class TodoAction {

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
}