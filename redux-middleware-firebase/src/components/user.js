import React, { Component } from 'react';
import { connect } from "react-redux";

import { GitAction } from './../store/action/git.js';

function mapStateToProps(state) {
    return {
        userData: state.gitReducer['userData'],
        isLoading: state.gitReducer['isLoading'],
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getData: () => dispatch((GitAction.getDataFromUrl()))
    };
}

class GitUser extends Component {

    constructor(props) {
        super(props);
        this.getUser = this.getUser.bind(this);
    }
    getUser() {
        console.log("clicked");
        this.props.getData();
    }


    render() {
        return (
            <div>
                <h1>this is component</h1>

                <button onClick={this.getUser}>Get User</button>

                <p>
                    {(this.props.isLoading) ?
                        'Loading Data... ' : JSON.stringify(this.props.userData, null, 2)}
                </p>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GitUser);
