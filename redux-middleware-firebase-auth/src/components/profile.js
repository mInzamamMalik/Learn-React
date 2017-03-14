import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AuthActions } from './../store/action/auth';
import { RaisedButton, TextField } from 'material-ui';

function mapStateToProps(state) {
    return {
        authUser: state.AuthReducer.authUser,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AuthActions.logout())
    };
}
class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                this is profile page

                <RaisedButton onClick={() => { this.props.logout() }}> Logout</RaisedButton>

            </div>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
