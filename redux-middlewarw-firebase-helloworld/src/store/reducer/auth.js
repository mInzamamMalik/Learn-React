import { AuthAction } from "./../action/auth";

const INITIAL_STATE = {
    authUser: {},
    isAuthenticated: false,
    isProcessing: false,
    isRegistered: false,
    isError: false,
    errorMessage: {}
}

export function AuthReducer(state = INITIAL_STATE, action) {

    console.log("auth reducer");

    switch (action.type) {
        case AuthAction.SIGNUP_DONE:
        console.log("signup done");
            return { ...state, isProcessing: true, isRegistered: false, isError: false };

        default:
            return state;
    }
}