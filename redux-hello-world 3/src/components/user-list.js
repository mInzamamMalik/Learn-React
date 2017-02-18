import React, { Component } from 'react';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux'

class UserList extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>one</li>
                    <li>two</li>
                    <li>three</li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    users: state.users
}

export default connect(mapStateToProps)(UserList);