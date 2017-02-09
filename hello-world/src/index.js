import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



// let h1 = React.createElement('h1', null, 'Hello world!');
// class HelloWorld extends React.Component {
//     render() {
//         return React.createElement('div', null, h1, h1)
//     }
// }


//this is a Component class
class HelloWorld extends React.Component {
    render() {
        return React.createElement('h1', null, "Hello " + this.props.framworkName + " world")

    }
}

//making three seaprate instances of class with different props
let a = React.createElement(HelloWorld, {
    id: 'ember',
    framworkName: 'Ember.js',
    title: 'a framwork'
});

let b = React.createElement(HelloWorld, {
    id: 'ember1',
    framworkName: 'Angular',
    title: 'a framwork'
})
let c = React.createElement(HelloWorld, {
    id: 'ember1',
    framworkName: 'React',
    title: 'a framwork'
})

//display that instances as chid of a div
ReactDOM.render(
    React.createElement('div', null, a, b, c),
    document.getElementById('root')
)








// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );
