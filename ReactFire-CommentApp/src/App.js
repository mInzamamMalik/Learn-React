import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import CommentForm from './components/commentForm'
import CommentList from './components/commentList'

var config = {
    apiKey: "AIzaSyDspeNWtv6xycKzfsFA2mcVWxIYaKA1Mkk",
    authDomain: "test-project-5a3f4.firebaseapp.com",
    databaseURL: "https://test-project-5a3f4.firebaseio.com"
};
firebase.initializeApp(config);

var App = React.createClass({
    mixins: [ReactFireMixin],

    handleCommentSubmit: function (comment) {
        // Here we push the update out to Firebase and let ReactFire update this.state.data
        this.firebaseRefs['data'].push(comment);
    },
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentWillMount: function () {
        // Here we bind the component to Firebase and it handles all data updates,
        // no need to poll as in the React example.
        this.bindAsArray(firebase.database().ref('commentsBox'), 'data');
    },
    render: function () {
        return (
            <div className='commentBox'>
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

export default App;
