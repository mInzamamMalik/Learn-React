import React, { Component } from 'react';

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        this.props.onCommentSubmit({ author: author, text: text });
        this.refs.author.value = '';
        this.refs.text.value = '';
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your Name" ref='author'/>
                <input type="text" placeholder="Your Comment" ref='text' />
                <input type="submit" value="post" />
            </form>
        );
    }
}

export default CommentForm;