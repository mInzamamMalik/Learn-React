import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUser } from "../store/actions";

class UserList extends Component {


    createListItem() {
        return this.props.users.map((user) => {
            return (
                <li
                    key={user.id}
                    onClick={() => this.props.selectUser(user)}
                >
                    {user.first} {user.last}
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.createListItem()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectUser: selectUser }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(UserList);