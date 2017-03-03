import { GitAction } from '../action/git';

const INITIAL_STATE = {
    isLoading: true,
    userData: {}
};

export function gitReducer(state = INITIAL_STATE, action) {

    console.log("fired: ", action);

    switch (action.type) {
        case GitAction.GetDataFromUrl:
            return Object.assign({}, state, { isLoading: true });

        case GitAction.GetDataFromUrl_SUCCESS:
            return Object.assign({}, state, { userData: action.payload, isLoading: false });

        default:
            return state;
    }
}