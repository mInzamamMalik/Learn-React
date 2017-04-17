import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FlatButton, RaisedButton, TextField, Dialog } from 'material-ui';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
    from 'material-ui/Table';
import { TodoAction } from "../store/action/data"
function mapStateToProps(state) {
    return {
        profile: state.AuthReducer.profile,
        authUser: state.AuthReducer.authUser,
        todos: state.TodoReducer.todos,
        loading: state.TodoReducer.loading,
        isError: state.TodoReducer.isError,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getTodos: (uid) => dispatch(TodoAction.getTodos(uid)),
        getTodosCancel: (uid) => dispatch(TodoAction.getTodosCancel(uid)),
        addTodo: (uid, data) => dispatch(TodoAction.addTodo(uid, data)),
        deleteTodo: (uid, data) => dispatch(TodoAction.deleteTodo(uid, data)),
        updateTodo: (uid, key, data) => dispatch(TodoAction.updateTodo(uid, key, data)),
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
class Profile extends Component {
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
        this.props.getTodos(this.props.profile.uid); //start getting todo from firebase
    }
    componentWillReceiveProps(nextProps) {
        console.log("next props: ", nextProps.todos);
        if (Object.keys(nextProps.todos).length === 0) {
            console.log("getting data for uid: ", );
            this.props.getTodos(nextProps.profile.uid); //start getting todo from firebase
        }
    }
    addTodo(e) {
        e.preventDefault();
        this.props.addTodo(
            this.props.authUser.uid,
            { todo: this.refs.todo.getValue(), isDone: false }
        );
        this.refs.todo.setState({ value: "" });
    }
    deleteTodo(key) {
        this.props.deleteTodo(this.props.authUser.uid, { key: key });
    }
    editTodo(key, dataObj) {
        this.setState({ ...this.state, isEditing: true, editingKey: key, editingValue: dataObj })
    }
    editTodoSave() {
        this.props.updateTodo(
            this.props.authUser.uid,
            this.state.editingKey,
            { todo: this.refs.editTodo.getValue(), isDone: false }
        );
        this.setState({ ...this.state, isEditing: false, editingKey: null, editingValue: null })
        this.refs.editTodo.value = "";
    }


    render() {
        let todoList = Object.keys(this.props.todos).map((key, index) => {
            let val = this.props.todos[key];
            return (
                <TableRow key={index}>
                    <TableRowColumn>{index + 1}</TableRowColumn>
                    <TableRowColumn>{val.todo}</TableRowColumn>
                    <TableRowColumn>{val.isDone}</TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton onClick={() => { this.editTodo(key, val) }} label="Edit" />
                        <RaisedButton onClick={() => { this.deleteTodo(key) }} label="Delete" />
                    </TableRowColumn>

                </TableRow>
            )
        })
        const actions = [
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

        return (
            <div>
                <Dialog
                    title="Edit"
                    actions={actions}
                    modal={false}
                    open={this.state.isEditing}
                >
                    <TextField
                        ref="editTodo"
                        floatingLabelText="Todo"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        defaultValue={this.state.editingValue && this.state.editingValue.todo || "ddd"}
                    />
                </Dialog>

                <form onSubmit={this.addTodo}>
                    <TextField
                        ref="todo"
                        floatingLabelText="Your text here"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    />
                    <br />
                    <RaisedButton primary={true} type="submit" label="Add Row" />

                    {/*<RaisedButton onClick={this.props.getTodosCancel}>
                        Cancel getting todo
                    </RaisedButton>*/}
                </form>



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
                            <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{ textAlign: 'center' }}>
                                <p>{this.props.profile.role}: {this.props.profile.name} - {this.props.profile.email}</p>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="The ID">No.</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">Actions</TableHeaderColumn>
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
                    <TableFooter
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
                    </TableFooter>
                </Table>




            </div>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
