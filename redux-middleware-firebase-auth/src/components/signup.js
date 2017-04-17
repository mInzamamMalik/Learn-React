import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { FlatButton, RaisedButton, TextField, Dialog, MenuItem, SelectField } from 'material-ui';
import { AuthActions } from './../store/action/auth'

function mapStateToProps(state) {
    return {
        isRegistered: state.AuthReducer.isRegistered,
        isError: state.AuthReducer.isError,
        errorMessage: state.AuthReducer.errorMessage,
        isProcessing: state.AuthReducer.isProcessing,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        signup: (credentials) => dispatch(AuthActions.signup(credentials))
    };
}
class Signup extends Component {
    constructor(props) {
        super(props)
        this.doSignup = this.doSignup.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.state = {
            errorPopup: false,
            role: "user"
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Signup component nextProps: ", nextProps);
        if (nextProps.isError) {
            // alert(nextProps.errorMessage);
            this.setState({
                errorPopup: true
            })
        }
        if (nextProps.isRegistered) {
            browserHistory.push('/login');
        }
    }


    doSignup() {
        var name = this.refs.name.getValue();
        var email = this.refs.email.getValue();
        var password = this.refs.password.getValue();
        var role = this.state.role;
        console.log(name, email, password, role);

        this.props.signup(
            {
                "name": name,
                "email": email,
                "password": password,
                "role": role,
            })
    }
    handleRoleChange = (event, index, value) => {
        this.setState({ ...this.state, role: value })
    }

    render() {
        return (<div>

            <Dialog
                title={"Signup Failed"}
                modal={false}
                open={this.state.errorPopup}
                actions={<FlatButton
                    label="Submit"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={() => { this.setState({ errorPopup: false }) }}
                />}
            >
                <p>{this.props.errorMessage}</p>
            </Dialog>

            <div>This is Login</div>

            <TextField defaultValue="abc" type="text" hintText="name" ref="name" /> <br />
            <TextField defaultValue="abc@abc.com" type="text" hintText="email" ref="email" /> <br />
            <TextField defaultValue="aaaaaa" type="password" hintText="password" ref="password" /> <br />
            <SelectField
                floatingLabelText="Role"
                value={this.state.role}
                onChange={this.handleRoleChange}
            >
                <MenuItem value={"user"} primaryText="user" />
                <MenuItem value={"product"} primaryText="product" />
                <MenuItem value={"verifier"} primaryText="verifier" />
                <MenuItem value={"admin"} primaryText="admin" />
            </SelectField>
            <br/>

            <RaisedButton primary={true} onClick={this.doSignup}>
                Signup
            </RaisedButton>
        </div >)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)