
const initialState = 0

export default function (state = initialState, action) {

    switch (action.type) {

        case "INCREMENT":
            return state + 1;
            break;

    }
    return state;
}