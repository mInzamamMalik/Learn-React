import { AuthActions } from "./../action/auth";
import { EmployeeAction } from "./../action/employeeList";

const INITIAL_STATE = {
    employees: {},
    loading: false,
}

export function EmployeeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case EmployeeAction.GET_EMPLOYEE:
            return { ...state, loading: true };

        case EmployeeAction.GET_EMPLOYEE_ADDED:
            var newEmployees = Object.assign({}, state.employees);
            newEmployees[action.payload.key] = action.payload.val;
            return { ...state, employees: newEmployees, loading: false };

        case EmployeeAction.GET_EMPLOYEE_REMOVED:
            var newEmployees = Object.assign({}, state.employees);
            delete newEmployees[action.payload];
            return { ...state, employees: newEmployees, loading: false };

        case EmployeeAction.GET_EMPLOYEE_CHANGED:
            var newEmployees = Object.assign({}, state.employees);
            newEmployees[action.payload.key] = action.payload.val;
            return { ...state, employees: newEmployees, loading: false };
        
        case AuthActions.LOGOUT_SUCCESSFUL:
            return INITIAL_STATE;

        default:
            return state;
    }
}