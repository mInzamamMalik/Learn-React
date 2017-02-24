import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.state = {
        //     text: "",
        //     author: ""
        // }
        // this._handleTextFieldChange = this._handleTextFieldChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("this is refs: ", this.refs);
        var author = this.refs.author.getValue().trim();
        var text = this.refs.text.getValue().trim();
        this.props.onCommentSubmit({ author: author, text: text });
        this.refs.author.input.value = '';
        this.refs.text.input.value = '';
    }
    // _handleTextFieldChange(event) {
    //     this.setState({
    //         author: event.target.value
    //     });
    // }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>

                {/*<TextField
                    hintText="name"
                    id="text-field-controlled"
                    value={this.state.author}
                    onChange={this._handleTextFieldChange}
                />*/}
                <TextField hintText="name" ref="author" />
                <TextField hintText="Your Comment" ref='text' />
                <RaisedButton type="submit" value="post" label="Primary" primary={true} />
            </form>
        );
    }
}

export default CommentForm;