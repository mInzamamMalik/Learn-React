export class TodoAction {

    static GET_TODO = 'GET_TODO';
    static GET_TODO_ADDED = 'GET_TODO_ADDED';
    static GET_TODO_REMOVED = 'GET_TODO_REMOVED';
    static GET_TODO_CHANGED = 'GET_TODO_CHANGED';
    static GET_TODO_CANCELLED = 'GET_TODO_CANCELLED';

    static ADD_TODO = 'ADD_TODO';
    static ADD_TODO_DONE = 'ADD_TODO_DONE';
    static ADD_TODO_FAIL = 'ADD_TODO_FAIL';//

    static MARK_TODO_ARCHIVED = 'MARK_TODO_ARCHIVED';
    static DELETE_TODO = 'DELETE_TODO';

    static NULL = 'NULL';

    static addTodo(data) {
        return { type: TodoAction.ADD_TODO, payload: data }
    }
    static getTodos() {
        return { type: TodoAction.GET_TODO }
    }
    static getTodoDone(data) {
        return { type: TodoAction.GET_TODO_DONE }
    }
    static getTodosCancel(data) {
        return { type: TodoAction.GET_TODO_CANCELLED, }
    }
    static markTodoArchived(data) {
        return { type: TodoAction.MARK_TODO_ARCHIVED, payload: data }
    }
    static deleteTodo(data) {
        return { type: TodoAction.DELETE_TODO, payload: data }
    }
}