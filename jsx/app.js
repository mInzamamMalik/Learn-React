//with function calls approch
ReactDOM.render(
    React.DOM.h1({ id: "myheading" },
        React.DOM.span(null, "hello",
            React.DOM.em(null, " world"
            )
        )
    )
    , document.getElementById("root"));


//with function calls approch 
ReactDOM.render(
    <h1 id="myheading">
        <span>Hello
            <em>World</em>
        </span>
    </h1>
    , document.getElementById("root1"));