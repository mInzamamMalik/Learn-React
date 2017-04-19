import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux'
import { Tabs, Tab, List, ListItem, DatePicker, SelectField, MenuItem, FlatButton, RaisedButton, TextField, Dialog, Checkbox, FontIcon } from 'material-ui';
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
        deleteEmployee: (companyUid, key) => dispatch(EmployeeAction.deleteEmployee(companyUid, key)),
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
        this.props.addEmployee(
            this.props.params.companyId,
            {
                "employeeName": this.state.employeeName || null,
                "employeeGender": this.state.employeeGender || null,
                "employeeAge": this.state.employeeAge || null,
                "employeePosition": this.state.employeePosition || null,
                "employeeStatus": this.state.employeeStatus || null,
                "employeeId": this.state.employeeId || null,
                "employeeDob": this.state.employeeDob || null,
                "employeePhone": this.state.employeePhone || null,
                "employeeAddress": this.state.employeeAddress || null,
            }
        );
        this.setState({ ...this.state, isAddingEmployee: false });
    }
    deleteTodo(key) {
        this.props.deleteEmployee(this.props.params.companyId, key);
    }
    editTodo(key, dataObj) {
        this.setState({
            ...this.state,
            isEditing: true,
            editingKey: key,
            employeeName: dataObj.employeeName,
            employeeGender: dataObj.employeeGender,
            employeeAge: dataObj.employeeAge,
            employeePosition: dataObj.employeePosition,
            employeeStatus: dataObj.employeeStatus,
            employeeId: dataObj.employeeId,
            employeeDob: dataObj.employeeDob,
            employeePhone: dataObj.employeePhone,
            employeeAddress: dataObj.employeeAddress,
        })
    }
    editTodoSave() {
        this.props.updateEmployee(
            this.props.params.companyId,
            this.state.editingKey,
            {
                employeeName: this.state.employeeName,
                employeeGender: this.state.employeeGender,
                employeeAge: this.state.employeeAge,
                employeePosition: this.state.employeePosition,
                employeeStatus: this.state.employeeStatus,
                employeeId: this.state.employeeId,
                employeeDob: this.state.employeeDob,
                employeePhone: this.state.employeePhone,
                employeeAddress: this.state.employeeAddress,
            }
        );
        this.setState({ ...this.state, isEditing: false, editingKey: "", employeeAddress: "", editEmployeeName: "" })
    }
    viewTodo(dataObj) {
        this.setState({
            ...this.state,
            isViewing: true,
            employeeName: dataObj.employeeName,
            employeeGender: dataObj.employeeGender,
            employeeAge: dataObj.employeeAge,
            employeePosition: dataObj.employeePosition,
            employeeStatus: dataObj.employeeStatus,
            employeeId: dataObj.employeeId,
            employeeDob: dataObj.employeeDob,
            employeePhone: dataObj.employeePhone,
            employeeAddress: dataObj.employeeAddress,
        })
    }
    addProduct() {
        this.props.addProduct(
            this.props.params.companyId,
            {
                "productId": this.state.productId || null,
                "productDesc": this.state.productDesc || null,
                "productSamples": this.state.productSamples || null,
                "productSamplesId": this.state.productSamplesId || null,
                "productType": this.state.productType || null,
            }
        );
        this.setState({ ...this.state, isViewing: false });
    }
    // markCompanyVisited(key, visited) {
    //     this.props.updateTodo(
    //         this.props.params.companyId,
    //         key,
    //     );
    // }
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
        let todoList = Object.keys(this.props.employees).map((key, index) => {
            let val = this.props.employees[key];
            return (
                <TableRow id={index} key={index}>
                    <TableRowColumn colSpan="1">{index + 1}</TableRowColumn>
                    <TableRowColumn colSpan="2">{val.employeeName}</TableRowColumn>
                    <TableRowColumn colSpan="2">{val.employeeGender}</TableRowColumn>
                    <TableRowColumn colSpan="2">{val.employeePosition}</TableRowColumn>
                    <TableRowColumn colSpan="2">{val.employeeStatus}</TableRowColumn>

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

                        <FontIcon
                            className="material-icons"
                            label="Edit"
                            tooltip="Edit"
                            onClick={() => { this.viewTodo(val) }}
                        >fullscreen</FontIcon>
                    </TableRowColumn>
                </TableRow>
            )
        })
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
        const viewActions = [
            <FlatButton
                label="Close"
                primary={false}
                keyboardFocused={true}
                onTouchTap={() => { this.setState({ ...this.state, isViewing: false }) }}
            />
        ];

        return (
            <div>
                <Dialog
                    title="Edit"
                    actions={editActions}
                    modal={false}
                    open={this.state.isEditing}
                >
                    <form>
                        <TextField name="employeeName" value={this.state.employeeName} floatingLabelText="Name" onChange={this._handleFromChange} />
                        <br />
                        <SelectField name="employeeGender" value={this.state.employeeGender} floatingLabelText="Gender" onChange={(e, index, value) => { this.setState({ ...this.state, employeeGender: value }); }}    >
                            <MenuItem value={"male"} primaryText="Male" />
                            <MenuItem value={"female"} primaryText="Female" />
                        </SelectField>
                        <br />
                        <TextField name="employeeAge" type="number" value={this.state.employeeAge} floatingLabelText="Age" onChange={this._handleFromChange} />
                        <br />
                        <TextField name="employeePosition" value={this.state.employeePosition} floatingLabelText="Position" onChange={this._handleFromChange} />
                        <br />
                        <SelectField name="employeeStatus" value={this.state.employeeStatus} floatingLabelText="Status" onChange={(e, index, value) => { this.setState({ ...this.state, employeeStatus: value }); }}>
                            <MenuItem value={"Consent"} primaryText="Consent" />
                            <MenuItem value={"Decline"} primaryText="Decline" />
                            <MenuItem value={"N/A"} primaryText="N/A" />
                        </SelectField>
                        <br />
                        <TextField name="employeeId" value={this.state.employeeId} floatingLabelText="Id" onChange={this._handleFromChange} />
                        <br />
                        <DatePicker name="employeeDob" floatingLabelText="Date of birth" onChange={(e, dateObj) => { this.setState({ ...this.setState, employeeDob: dateObj.getTime() }), console.log(dateObj, this.state); }} />

                        <br />
                        <TextField name="employeePhone" value={this.state.employeePhone} floatingLabelText="Contact Number" onChange={this._handleFromChange} />
                        <br />
                        <TextField name="employeeAddress" value={this.state.employeeAddress} floatingLabelText="Address" onChange={this._handleFromChange} />
                        <br />

                    </form>
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
                    <form>
                        <TextField name="employeeName" value={this.state.employeeName} floatingLabelText="Name" onChange={this._handleFromChange} />
                        <br />
                        <SelectField name="employeeGender" value={this.state.employeeGender} floatingLabelText="Gender" onChange={(e, index, value) => { this.setState({ ...this.state, employeeGender: value }); }}    >
                            <MenuItem value={"male"} primaryText="Male" />
                            <MenuItem value={"female"} primaryText="Female" />
                        </SelectField>
                        <br />
                        <TextField name="employeeAge" type="number" value={this.state.employeeAge} floatingLabelText="Age" onChange={this._handleFromChange} />
                        <br />
                        <TextField name="employeePosition" value={this.state.employeePosition} floatingLabelText="Position" onChange={this._handleFromChange} />
                        <br />
                        <SelectField name="employeeStatus" value={this.state.employeeStatus} floatingLabelText="Status" onChange={(e, index, value) => { this.setState({ ...this.state, employeeStatus: value }); }}>
                            <MenuItem value={"Consent"} primaryText="Consent" />
                            <MenuItem value={"Decline"} primaryText="Decline" />
                            <MenuItem value={"N/A"} primaryText="N/A" />
                        </SelectField>
                        <br />
                        <TextField name="employeeId" value={this.state.employeeId} floatingLabelText="Id" onChange={this._handleFromChange} />
                        <br />
                        <DatePicker name="employeeDob" floatingLabelText="Date of birth" onChange={(e, dateObj) => { this.setState({ ...this.setState, employeeDob: dateObj.getTime() }), console.log(dateObj, this.state); }} />

                        <br />
                        <TextField name="employeePhone" value={this.state.employeePhone} floatingLabelText="Contact Number" onChange={this._handleFromChange} />
                        <br />
                        <TextField name="employeeAddress" value={this.state.employeeAddress} floatingLabelText="Address" onChange={this._handleFromChange} />
                        <br />
                        <RaisedButton
                            primary={true}
                            label="Add Employee"
                            onClick={() => { this.setState({ ...this.state, isAddingEmployee: true }) }} />
                    </form>
                </Dialog>

                <Dialog
                    title="View Employee"
                    actions={viewActions}
                    modal={true}
                    open={this.state.isViewing}
                >
                    <Tabs>
                        <Tab label="View Employee" >

                            <List>
                                <ListItem primaryText={" Name: " + this.state.employeeName} />
                                <ListItem primaryText={" Gender: " + this.state.employeeGender} />
                                <ListItem primaryText={" Age: " + this.state.employeeAge} />
                                <ListItem primaryText={" Position: " + this.state.employeePosition} />
                                <ListItem primaryText={" Status: " + this.state.employeeStatus} />
                                <ListItem primaryText={" Id: " + this.state.employeeId} />
                                <ListItem >
                                    Date of Birth: {(this.state.employeeDob) ? <Timestamp format="date" time={this.state.employeeDob / 1000} /> : "-"}
                                </ListItem>
                                <ListItem primaryText={" Contact Number: " + this.state.employeePhone} />
                                <ListItem primaryText={" Address: " + this.state.employeeAddress} />
                            </List>
                        </Tab>
                        <Tab label="Add product" >
                            <TextField name="productId" type="text" value={this.state.productId} floatingLabelText="Id" onChange={this._handleFromChange} />
                            <br />
                            <TextField name="productDesc" type="text" value={this.state.productDesc} floatingLabelText="Description" onChange={this._handleFromChange} />
                            <br />
                            <TextField name="productSamples" type="number" value={this.state.productSamples} floatingLabelText="Samples" onChange={this._handleFromChange} />
                            <br />
                            <TextField name="productSamplesId" type="text" value={this.state.productSamplesId} floatingLabelText="Samples Id" onChange={this._handleFromChange} />
                            <br />
                            <SelectField name="productType" value={this.state.productType} floatingLabelText="Type" onChange={(e, index, value) => { this.setState({ ...this.state, productType: value }); }}>
                                <MenuItem value={"A"} primaryText="A" />
                                <MenuItem value={"B"} primaryText="B" />
                            </SelectField>
                            <br />
                            <RaisedButton
                                primary={true}
                                label="Save Product"
                                onClick={() => { this.addProduct(); this.setState({ ...this.state, isViewing: false }) }} />


                        </Tab>
                    </Tabs>
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
                            <TableHeaderColumn colSpan="11" tooltip="Header" style={{ textAlign: 'center' }}>
                                <p>{this.props.profile.role}: {this.props.profile.name} - {this.props.profile.email}</p>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn colSpan="1" tooltip="serial number">No.</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Employee Name</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Gender</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Position</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Status</TableHeaderColumn>
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
                        {todoList}
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
