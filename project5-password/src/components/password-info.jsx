import React, { Component } from 'react';

class PasswordInfo extends Component {
    render() {
        return (
            <div>
                <h4>Password Strength</h4>
                <ul>
                    {this.props.rules.map(function (processedRule, index, list) {
                        if (processedRule.isCompleted) {
                            return <li key={processedRule.key}>
                                <strike>{processedRule.rule.message}</strike>
                            </li>
                        } else {
                            return <li key={processedRule.key}>{processedRule.rule.message}</li>
                        }
                    })}
                </ul>
            </div>
        )
    }
}
export default PasswordInfo