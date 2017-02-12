import React, { Component } from 'react';
class PasswordGenerate extends Component {
    render() {
        return (
            <button {...this.props} className="btn generate-btn">{this.props.children}</button>
        )
    }
}
export default PasswordGenerate;