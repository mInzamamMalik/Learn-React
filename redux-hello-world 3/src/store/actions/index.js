
export const USER_SELECTED = "USER_SELECTED";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";



export const selectUser = (user) => {
    console.log("you clicked on: ", user.first);
    return {
        type: USER_SELECTED,
        payload: user
    }
}
export const increment = () => {
    return {
        type: INCREMENT,
        payload: null
    }
}
export const decrement = () => {
    return {
        type: DECREMENT,
        payload: null
    }
}