import React, { Component } from 'react';
import { connect } from 'react-redux'

class UserDetail extends Component {
    render() {
        return (
            <div>
                <h2>asdf: {this.props.user.first}</h2>
                <h3>vfgs: {this.props.user.last}</h3>
                <h3>sdfgr: {this.props.user.age}</h3>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.activeUser
    }
}


export default connect(mapStateToProps)(UserDetail);