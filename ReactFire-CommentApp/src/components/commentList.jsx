import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='comment'>
                <h2 className='commentAuthor'>{this.props.author}</h2>
                <span>{this.props.children.toString()}</span>
            </div>
        );
    }
}

class CommentList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var commentNodesArray = this.props.data.map(function (comment, index) {
            return <Comment key={index} author={comment.author}>{comment.text}</Comment>;
        });
        return <div className='commentList'>{commentNodesArray}</div>;
    }
}
export default CommentList;