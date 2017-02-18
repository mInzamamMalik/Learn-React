import React, { Component } from 'react';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';

class UserList extends Component {


    createListItem() {
        return this.props.users.map((user) => {
            return (
                <div key={user.id}>{user.first} {user.last}</div>
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

export default connect(mapStateToProps)(UserList);