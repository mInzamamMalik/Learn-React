import { AuthActions } from "./../action/auth";

const INITIAL_STATE = {
    authUser: {},
    isAuthenticated: false,
    isProcessing: false,
    isRegistered: false,
    isError: false,
    errorMessage: {}
}

export function AuthReducer(state = INITIAL_STATE, action) {

    console.log("all auth reducer: ", action.type);

    switch (action.type) {
        case AuthActions.SIGNUP_START:
            return { ...state, isProcessing: true, isRegistered: false, isError: false };

        case AuthActions.SIGNUP_SUCCESSFUL:
            return { ...state, isProcessing: false, isRegistered: true, isError: false, errorMessage: {} };

        case AuthActions.SIGNUP_REJECTED:
            return { ...state, isProcessing: false, isRegistered: false, isError: true, errorMessage: action.payload.message };


        // case AuthActions.SIGNIN:
        //     return { ...state, isProcessing: true, isAuthenticated: false, isError: false };
        // case AuthActions.SIGNIN_SUCCESSFUL:
        //     return { ...state, isProcessing: false, isAuthenticated: true, isError: false, authUser: action.payload, errorMessage: {} };
        // case AuthActions.SIGNIN_REJECTED:
        //     return { ...state, isProcessing: false, isAuthenticated: false, authUser: {}, isError: true, errorMessage: action.payload };
        // case AuthActions.LOGOUT:
        //     return { ...state, isProcessing: true };
        // case AuthActions.LOGOUT_SUCCESSFUL:
        //     return { ...state, isProcessing: false, isAuthenticated: false, authUser: {} };
        // case AuthActions.ISLOGGEDIN:
        //     return { ...state, isProcessing: false, isAuthenticated: true, authUser: action.payload };
        // case AuthActions.UPDATE_USER:
        //     return { ...state, isProcessing: false, isAuthenticated: true, authUser: action.payload };
        default:
            return state;
    }
}