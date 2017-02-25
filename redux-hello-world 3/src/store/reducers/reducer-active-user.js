export default function (state = {}, action) {
    switch (action.type) {
        case "USER_SELECTED":
            console.log("in reducer USER_SELECTED: ",state,action)
            return action.payload
            break;

    }
    console.log("abc",action)
    return state;
}