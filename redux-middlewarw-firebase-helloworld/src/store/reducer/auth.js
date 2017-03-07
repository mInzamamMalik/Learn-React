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
        case AuthAction.SIGNUP:
            return { ...state, isProcessing: true, isRegistered: false, isError: false };

        case AuthAction.SIGNUP_SUCCESSFUL:
            return { ...state, isProcessing: false, isRegistered: true, isError: false, errorMessage: {} };
        case AuthAction.SIGNUP_REJECTED:
            return { ...state, isProcessing: false, isRegistered: false, isError: true, errorMessage: action.payload };
        case AuthAction.SIGNIN:
            return { ...state, isProcessing: true, isAuthenticated: false, isError: false };
        case AuthAction.SIGNIN_SUCCESSFUL:
            return { ...state, isProcessing: false, isAuthenticated: true, isError: false, authUser: action.payload, errorMessage: {} };
        case AuthAction.SIGNIN_REJECTED:
            return { ...state, isProcessing: false, isAuthenticated: false, authUser: {}, isError: true, errorMessage: action.payload };
        // case AuthAction.LOGOUT:
        //     return { ...state, isProcessing: true };
        // case AuthAction.LOGOUT_SUCCESSFUL:
        //     return { ...state, isProcessing: false, isAuthenticated: false, authUser: {} };
        // case AuthAction.ISLOGGEDIN:
        //     return { ...state, isProcessing: false, isAuthenticated: true, authUser: action.payload };
        // case AuthAction.UPDATE_USER:
        //     return { ...state, isProcessing: false, isAuthenticated: true, authUser: action.payload };
        default:
            return state;
    }
}