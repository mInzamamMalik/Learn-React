import React, { Component } from 'react';
import { connect } from 'react-redux'
import { RaisedButton, TextField } from 'material-ui';
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
        markTodoArchived: (uid, data) => dispatch(TodoAction.markTodoArchived(uid, data)),
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

const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
        selected: true,
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
        selected: true,
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
];
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '300px',
        };
        this.addTodo = this.addTodo.bind(this);
    }

    flag = false;
    componentWillReceiveProps(nextProps) {
        if (!this.flag) {
            console.log("getting data for uid: ", nextProps.profile.uid);
            this.props.getTodos(nextProps.profile.uid); //start getting todo from firebase
        }
        this.flag = true
    }
    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({ height: event.target.value });
    };

    addTodo(e) {
        e.preventDefault();
        this.props.addTodo(
            this.props.authUser.uid,
            { todo: this.refs.todo.value, isDone: false }
        );
        this.refs.todo.value = "";
    }



    render() {
        let todoList = Object.keys(this.props.todos).map((key, index) => {
            let val = this.props.todos[key];
            return (
                <TableRow key={index} selected={2}>
                    <TableRowColumn>{index}</TableRowColumn>
                    <TableRowColumn>{val.todo}</TableRowColumn>
                    <TableRowColumn>{val.isDone}</TableRowColumn>
                    <p>
                        {(val.isDone) ? <button onClick={() => { this.deleteTodo(key) }}>Delete</button> : ""}
                        <button onClick={() => { this.toggleMarkArchived(key, val.isDone) }} >{val.isDone ? "Undo Archive" : "Mark Archive"}</button>
                    </p>
                </TableRow>
            )
        })

        return (
            <div>
                <form onSubmit={this.addTodo}>
                    <input type="text" placeholder="todo" ref="todo" /> <br />
                    <button type="submit">Add Todo</button>

                    <button onClick={this.props.getTodosCancel}>
                        Cancel getting todo
                </button>
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
                                {JSON.stringify(this.props.profile) || "no data"}
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
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
