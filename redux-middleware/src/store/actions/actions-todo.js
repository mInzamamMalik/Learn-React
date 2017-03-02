export class TodoActions {
    //list of actions
    static ADD_TODO = "ADD_TODO";
    static REMOVE_TODO = "REMOVE_TODO";

    static addTodo = (todo) => {
        console.log("you clicked on: ", todo);
        return {
            type: TodoActions.ADD_TODO,
            payload: todo
        }
    }
    static removeTodo = (index) => {
        return {
            type: TodoActions.REMOVE_TODO,
            payload: index
        }
    }
}