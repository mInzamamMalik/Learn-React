var Component = React.createClass({
    propType: {
        name: React.PropTypes.string.isRequired
    },
    getDefaultProps: function () {
        return {
            name: 'not provided',
        };
    },
    render: function () {
        return React.DOM.span(null, "My name is " + this.props.name);
    }
});


ReactDOM.render(
    React.createElement(Component, { name: "ali bhai" })
    , document.getElementById("root"));


//---------------------------------------------------------------------
//stateless
var textAreaCounter = React.createClass({
    propType: {
        text: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            text: 'not provided',
        };
    },
    render: function () {
        return React.DOM.div(null,
            React.DOM.textarea({
                defaultValue: this.props.text
            }),
            React.DOM.h3(null, this.props.text.length)
        );
    }
});

ReactDOM.render(
    React.createElement(textAreaCounter, { text: "ali bhai" })
    , document.getElementById("root1"));


//---------------------------------------------------------------------
//statefull
var textAreaCounter = React.createClass({
    propType: {
        text: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            text: 'not provided',
        };
    },
    getInitialState: function () {
        return {
            text: this.props.text,
        }
    },
    _textChange: function (ev) {
        this.setState({
            text: ev.target.value,
        });
    },
    render: function () {
        return React.DOM.div(null,
            React.DOM.textarea({
                value: this.state.text,
                onChange: this._textChange,
            }),
            React.DOM.h3(null, "text count: " + this.state.text.length),
            React.DOM.h3(null, "text: " + this.state.text)
        );
    }
});

ReactDOM.render(
    React.createElement(textAreaCounter, { text: "ali bhai" })
    , document.getElementById("root2"));



