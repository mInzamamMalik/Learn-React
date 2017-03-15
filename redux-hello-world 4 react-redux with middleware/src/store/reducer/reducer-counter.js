import { counterAction } from "../action/action-counter";

const initialState = 0;

export function counterReducer(state = initialState, action) {
    switch (action.type) {

        case counterAction.INCREMENT:
            return state + 1;
            break;

        case counterAction.DECREMENT:
            return state - 1;
            break;

        default:
            return state;
    }
}