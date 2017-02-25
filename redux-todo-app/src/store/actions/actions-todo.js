

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";



export const addTodo = (todo) => {
    console.log("you clicked on: ", todo);
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const removeTodo = (index) => {
    return {
        type: REMOVE_TODO,
        payload: index
    }
}








// class actionsTodo {

//     //list of actions
//     static ADD_TODO = "ADD_TODO";
//     static REMOVE_TODO = "REMOVE_TODO";


//     static addTodo = (todo) => {
//         console.log("YOU ARE ABOUT TO ADD TODO: ", todo);
//         return {
//             type: actionsTodo.ADD_TODO,
//             payload: todo
//         }
//     }
//     static removeTodo = (index) => {
//         console.log("YOU ARE ABOUT TO REMOVE TODO INDEX: ", index   );
//         return {
//             type: actionsTodo.REMOVE_TODO,
//             payload: index
//         }
//     }

// }

// export default actionsTodo