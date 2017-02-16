import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class Comment extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ListItem
                leftAvatar={<Avatar />}
                rightIcon={<CommunicationChatBubble />}
                primaryText={this.props.author}
                secondaryText={this.props.children.toString()}
            >
            </ListItem>
        );
    }
}
/*
<List>
    <Subheader>Recent chats</Subheader>
    <ListItem
        primaryText="Brendan Lim"
        leftAvatar={<Avatar src="images/ok-128.jpg" />}
        rightIcon={<CommunicationChatBubble />}
    />*/



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