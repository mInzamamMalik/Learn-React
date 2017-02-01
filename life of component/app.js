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



