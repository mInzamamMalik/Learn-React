import React, { Component } from 'react';

class PasswordInput extends Component {
    render() {
        return (
            <input className="form-control"
                type={this.props.visible ? 'text' : 'password'}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange} />
        )
    }
}
export default PasswordInput