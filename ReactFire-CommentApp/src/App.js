import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';

import CommentForm from './components/commentForm'
import CommentList from './components/commentList'

import AppBar from 'material-ui/AppBar';

var config = {
    apiKey: "AIzaSyDspeNWtv6xycKzfsFA2mcVWxIYaKA1Mkk",
    authDomain: "test-project-5a3f4.firebaseapp.com",
    databaseURL: "https://test-project-5a3f4.firebaseio.com"
};
firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    handleCommentSubmit(comment) {
        // Here we push the update out to Firebase and let ReactFire update this.state.data
        this.firebaseRefs['data'].push(comment);
    }
    componentWillMount() {
        // Here we bind the component to Firebase and it handles all data updates,
        // no need to poll as in the React example.
        this.bindAsArray(firebase.database().ref('commentsBox'), 'data');
    }
    render() {
        return (
            <div className='commentBox'>
                <AppBar title="Comments"></AppBar>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
};

reactMixin(App.prototype, ReactFireMixin);

export default App;
