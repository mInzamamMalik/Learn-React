import { Observable } from "rxjs";
import { EmployeeAction } from "./../action/employeeList";
import { firebaseService } from './../../service/firebaseService';


export class EmployeeEpic {

    static addEmployee = (action$) =>
        action$.ofType(EmployeeAction.ADD_EMPLOYEE)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(firebaseService.database.ref("employee/" + payload.companyUid).push(payload.employee))
                    .map((x) => {
                        return { type: EmployeeAction.NULL };
                    })
            })

    static updateEmployee = (action$) =>
        action$.ofType(EmployeeAction.MARK_EMPLOYEE_ARCHIVED)
            .switchMap(({ payload }) => {
                console.log("updating epic: ", payload);
                return Observable.fromPromise(firebaseService.database.ref("employee/" + payload.companyUid).child(payload.employeeUid).update(payload.employee))
                    .map((x) => {
                        return { type: EmployeeAction.NULL };
                    })
            })

    static deleteEmployee = (action$) =>
        action$.ofType(EmployeeAction.DELETE_EMPLOYEE)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(firebaseService.database.ref("employee/" + payload.companyUid).child(payload.employeeUid).set(null))
                    .map((x) => {
                        return { type: EmployeeAction.NULL };
                    })
            })

    static getEmployees = (action$) =>
        action$.ofType(EmployeeAction.GET_EMPLOYEE)
            .switchMap(({ payload }) => {
                return new Observable((observer) => {

                    firebaseService.database.ref("employee/" + payload.companyUid).on("child_added", (snapshot) => {
                        
                        console.log("getting employee: ", snapshot.val());
                        observer.next({
                            type: EmployeeAction.GET_EMPLOYEE_ADDED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })
                    firebaseService.database.ref("employee/" + payload.companyUid).on("child_changed", (snapshot) => {
                        observer.next({
                            type: EmployeeAction.GET_EMPLOYEE_CHANGED,
                            payload: {
                                key: snapshot.key,
                                val: snapshot.val()
                            }
                        })
                    })
                    firebaseService.database.ref("employee/" + payload.companyUid).on("child_removed", (snapshot) => {
                        observer.next({
                            type: EmployeeAction.GET_EMPLOYEE_REMOVED,
                            payload: snapshot.key
                        })
                    })
                }).takeUntil(action$.ofType(EmployeeAction.GET_EMPLOYEE_CANCELLED));
            })

    static getEmployeesCancel = (action$) =>
        action$.ofType(EmployeeAction.GET_EMPLOYEE_CANCELLED)
            .switchMap(({ payload }) => {
                firebaseService.database.ref("employee/" + payload.companyUid).off();
                return Observable.of({ type: EmployeeAction.NULL })
                //we dont want to do any work on GET_EMPLOYEE_CANCELLED so we are dispatching NULL action
            })

}