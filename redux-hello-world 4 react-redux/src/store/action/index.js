export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

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