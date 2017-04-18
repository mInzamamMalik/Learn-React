import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux'
import { FlatButton, RaisedButton, TextField, Dialog, Checkbox, FontIcon } from 'material-ui';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { EmployeeAction } from "../store/action/employeeList"
import { firebaseService } from "../service/firebaseService"

function mapStateToProps(state) {
    return {
        profile: state.AuthReducer.profile,
        authUser: state.AuthReducer.authUser,
        employees: state.EmployeeReducer.employees,

    };
}
function mapDispatchToProps(dispatch) {
    return {
        getEmployees: (companyUid) => dispatch(EmployeeAction.getEmployees(companyUid)),
        getEmployeesCancel: (companyUid) => dispatch(EmployeeAction.getEmployeesCancel(companyUid)),
        addEmployee: (companyUid, data) => dispatch(EmployeeAction.addEmployee(companyUid, data)),
        deleteEmployee: (companyUid, data) => dispatch(EmployeeAction.deleteEmployee(companyUid, data)),
        updateEmployee: (companyUid, key, data) => dispatch(EmployeeAction.updateEmployee(companyUid, key, data)),
    };
}
const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};
class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: true,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '600px',

            isEditing: false,
            editingKey: null,
            editingValue: null
        };
        this.addTodo = this.addTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.editTodoSave = this.editTodoSave.bind(this);
        this._handleFromChange = this._handleFromChange.bind(this);
        this.props.getEmployees(this.props.params.companyId); //start getting todo from firebase
    }
    componentWillReceiveProps(nextProps) {
        console.log("next props: ", nextProps.employees);
        // if (Object.keys(nextProps.todos).length === 0) {
        //     console.log("getting data for uid: ", );
        //     this.props.getEmployees(this.props.params.companyId); //start getting todo from firebase
        // }
    }
    _handleFromChange(e) {
        // console.log("name: ", e.target.name);
        // console.log("value: ", e.target.value);

        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }
    addTodo(e) {
        e.preventDefault();
        console.log("pushing todo component: ", this.state);
        this.props.addTodo(
            this.props.authUser.uid,
            {
                "employeeName": this.state.employeeName,
                "employeeGender": this.state.employeeAddress,
                "employeeIsVisited": false,
                "employeeVisitedDate": null,
                "employeeSendStatus": false,
                "employeeRemarks": "",
            }
        );
        this.setState({ ...this.state, employeeName: "", employeeAddress: "" });
    }
    deleteTodo(key) {
        this.props.deleteTodo(this.props.authUser.uid, { key: key });
    }
    editTodo(key, dataObj) {
        this.setState({
            ...this.state,
            isEditing: true,
            editingKey: key,
            editEmployeeName: dataObj.employeeName,
            editEmployeeAddress: dataObj.employeeAddress
        })
    }
    editTodoSave() {
        this.props.updateTodo(
            this.props.authUser.uid,
            this.state.editingKey,
            { employeeName: this.state.editEmployeeName, employeeAddress: this.state.editEmployeeAddress, }
        );
        this.setState({ ...this.state, isEditing: false, editingKey: "", employeeAddress: "", editEmployeeName: "" })
    }
    markCompanyVisited(key, visited) {
        this.props.updateTodo(
            this.props.authUser.uid,
            key,
            { companyIsVisited: !visited, companyVisitedDate: firebaseService.timestamp() }
        );
    }
    giveRemarks(key, remark) {
        this.props.updateTodo(
            this.props.authUser.uid,
            key,
            { companyRemarks: remark }
        );
    }
    toggleSendstatus(key, companySendStatus) {
        this.props.updateTodo(
            this.props.authUser.uid,
            key,
            { companySendStatus: !companySendStatus }
        );
    }



    render() {
        /*let todoList = Object.keys(this.props.todos).map((key, index) => {
            let val = this.props.todos[key];
            return (
                <TableRow id={index} key={index}>
                    <TableRowColumn colSpan="1">{index + 1}</TableRowColumn>
                    <TableRowColumn colSpan="2">{val.companyName}</TableRowColumn>
                    <TableRowColumn colSpan="3">{val.companyAddress}</TableRowColumn>
                    <TableRowColumn colSpan="1">
                        <Checkbox
                            disabled={val.companyIsVisited}
                            checked={val.companyIsVisited}
                            onCheck={() => { this.markCompanyVisited(key, val.companyIsVisited) }} />
                    </TableRowColumn>
                    <TableRowColumn colSpan="2">
                        {(val.companyVisitedDate) ? <Timestamp time={val.companyVisitedDate / 1000} /> : ""}
                    </TableRowColumn>
                    <TableRowColumn colSpan="1">
                        <Checkbox
                            checked={val.companySendStatus}
                            onCheck={(e) => { this.toggleSendstatus(key, e.target.companySendStatus) }} />
                    </TableRowColumn>
                    <TableRowColumn colSpan="2">
                        <TextField disabled={!val.companyIsVisited} value={val.companyRemarks} onChange={(e) => { this.giveRemarks(key, e.target.value) }} />
                    </TableRowColumn>

                    <TableRowColumn colSpan="2">
                        <FontIcon
                            className="material-icons"
                            label="Delete"
                            onClick={() => { this.deleteTodo(key) }}
                        >delete_forever</FontIcon>

                        <FontIcon
                            className="material-icons"
                            label="Edit"
                            tooltip="Edit"
                            onClick={() => { this.editTodo(key, val) }}
                        >mode_edit</FontIcon>
                    </TableRowColumn>
                </TableRow>
            )
        })*/
        const editActions = [
            <FlatButton
                label="Cancel"
                primary={false}
                keyboardFocused={false}
                onTouchTap={() => { this.setState({ ...this.state, isEditing: false }) }}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.editTodoSave}
            />,
        ];
        const addActions = [
            <FlatButton
                label="Cancel"
                primary={false}
                keyboardFocused={false}
                onTouchTap={() => { this.setState({ ...this.state, isAddingEmployee: false }) }}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.addTodo}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Edit"
                    actions={editActions}
                    modal={false}
                    open={this.state.isEditing}
                >
                    <TextField
                        name="editCompanyName"
                        floatingLabelText="Company Name"
                        value={this.state.editCompanyName}
                        onChange={this._handleFromChange}
                    />
                    <TextField
                        name="editCompanyAddress"
                        floatingLabelText="Company Address"
                        value={this.state.editCompanyAddress}
                        onChange={this._handleFromChange}
                    />
                </Dialog>

                <RaisedButton
                    primary={true}
                    label="Add Employee"
                    onClick={() => { this.setState({ ...this.state, isAddingEmployee: true }) }} />
                <Dialog
                    title="Add Employee"
                    actions={addActions}
                    modal={false}
                    open={this.state.isAddingEmployee}
                >
                    <form onSubmit={this.addTodo}>
                        <TextField name="companyName" value={this.state.employeeName} floatingLabelText="Name" onChange={this._handleFromChange} />
                        <br />
                        <TextField name="companyGender" value={this.state.companyAddress} floatingLabelText="Gender" onChange={this._handleFromChange} />
                        <br />
                        <TextField name="companyAge" type="number" value={this.state.companyAddress} floatingLabelText="Age" onChange={this._handleFromChange} />
                        <br />
                        <TextField name="companyPosition" value={this.state.companyAddress} floatingLabelText="Position" onChange={this._handleFromChange} />
                        <br />
                    </form>
                </Dialog>

                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="9" tooltip="Header" style={{ textAlign: 'center' }}>
                                <p>{this.props.profile.role}: {this.props.profile.name} - {this.props.profile.email}</p>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn colSpan="1" tooltip="serial number">No.</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Company Name</TableHeaderColumn>
                            <TableHeaderColumn colSpan="3">Address</TableHeaderColumn>
                            <TableHeaderColumn colSpan="1">Visited</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Date</TableHeaderColumn>
                            <TableHeaderColumn colSpan="1">Send Status</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2" tooltip="Click and hold on Text Field and start typing, remard saved with release of mouse click">Remarks</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {/*{this.props.todos.map((row, index) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.status}</TableRowColumn>
                            </TableRow>
                        ))}*/}
                        {/*{todoList}*/}
                    </TableBody>
                    {/*<TableFooter
                        adjustForCheckbox={this.state.showCheckboxes}
                    >
                        <TableRow>
                            <TableRowColumn>ID</TableRowColumn>
                            <TableRowColumn>Name</TableRowColumn>
                            <TableRowColumn>Status</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                                Super Footer
              </TableRowColumn>
                        </TableRow>
                    </TableFooter>*/}
                </Table>




            </div>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)
