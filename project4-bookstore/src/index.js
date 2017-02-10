import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const { hashHistory,
    Router,
    Route,
    IndexRoute,
    Link,
    IndexLink
} = require('react-router')

import Modal from './components/modal.jsx'
import Cart from './components/cart.jsx'
import Checkout from './components/checkout.jsx'
import Product from './components/product.jsx'


const PRODUCTS = [
    { id: 0, src: 'images/proexpresscover.jpg', title: 'Pro Express.js', url: 'http://amzn.to/1D6qiqk' },
    { id: 1, src: 'images/practicalnodecover.jpeg', title: 'Practical Node.js', url: 'http://amzn.to/NuQ0fM' },
    { id: 2, src: 'images/expressapirefcover.jpg', title: 'Express API Reference', url: 'http://amzn.to/1xcHanf' },
    { id: 3, src: 'images/reactquicklycover.jpg', title: 'React Quickly', url: 'https://www.manning.com/books/reactquickly' },
    { id: 4, src: 'images/fullstackcover.png', title: 'Full Stack JavaScript', url: 'http://www.apress.com/9781484217504' }
]

const Heading = () => {
    return <h1>Nile Book Store</h1>
}

const Copy = () => {
    return <p>Please click on a book to view details in a modal. You can copy/paste the link of
the modal. The link will open book on a separate page.</p>
}


let cartItems = {}
const addToCart = (id) => {
    if (cartItems[id])
        cartItems[id] += 1
    else
        cartItems[id] = 1
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="/products/:id" component={Product}
                addToCart={addToCart}
                products={PRODUCTS} />
            <Route path="/cart" component={Cart}
                cartItems={cartItems} products={PRODUCTS} />
        </Route>
        <Route path="/checkout" component={Checkout}
            cartItems={cartItems} products={PRODUCTS} />
    </Router>
), document.getElementById('root'))


class Index extends React.Component {
    render() {
        return <div></div>
    }
}
class App extends Component {
    render() {
        return <div>dasfasdf</div>
    }
}
export default App;
