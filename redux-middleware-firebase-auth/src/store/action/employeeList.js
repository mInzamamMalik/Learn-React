export class EmployeeAction {

    static GET_EMPLOYEE = 'GET_EMPLOYEE';
    static GET_EMPLOYEE_ADDED = 'GET_EMPLOYEE_ADDED';
    static GET_EMPLOYEE_REMOVED = 'GET_EMPLOYEE_REMOVED';
    static GET_EMPLOYEE_CHANGED = 'GET_EMPLOYEE_CHANGED';
    static GET_EMPLOYEE_CANCELLED = 'GET_EMPLOYEE_CANCELLED';

    static ADD_EMPLOYEE = 'ADD_EMPLOYEE';
    static MARK_EMPLOYEE_ARCHIVED = 'MARK_EMPLOYEE_ARCHIVED';
    static DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

    static NULL = 'NULL';

    static getEmployees( companyUid) {
        return { type: EmployeeAction.GET_EMPLOYEE, payload: {  companyUid } }
    }
    static getEmployeesCancel( companyUid,  employee) {
        return { type: EmployeeAction.GET_EMPLOYEE_CANCELLED, payload: {  companyUid,  employee } }
    }
    static addEmployee( companyUid,  employee) {
        return { type: EmployeeAction.ADD_EMPLOYEE, payload: {  companyUid,  employee } }
    }
    static updateEmployee( companyUid, key,  employee) {
        return { type: EmployeeAction.MARK_EMPLOYEE_ARCHIVED, payload: {  companyUid, key,  employee } }
    }
    static deleteEmployee( companyUid,  employee) {
        return {
            type: EmployeeAction.DELETE_EMPLOYEE, payload: {  companyUid,  employee }
        }
    }
}