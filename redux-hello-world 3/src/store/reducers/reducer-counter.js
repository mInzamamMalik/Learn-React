export default function (state = 5, action) {

    switch (action.type) {

        case "INCREMENT":
            return state + 1;
            break;

        case "DECREMENT":
            return state - 1;
            break;

    }
    return state;
}