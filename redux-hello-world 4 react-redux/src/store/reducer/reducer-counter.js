const initialState = 0;

export default function (state = initialState, action) {

    console.log("all reducers: ", action);
    switch (action.type) {

        case "INCREMENT":
            return state + 1;
            break;

        case "DECREMENT":
            return state - 1;
            break;

        default:
            return state;
    }
}