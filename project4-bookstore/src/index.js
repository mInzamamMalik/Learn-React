import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import { hashHistory, Router, Route, IndexRoute, Link, IndexLink } from 'react-router';

import Modal from './components/modal.jsx'
import Cart from './components/cart.jsx'
import Checkout from './components/checkout.jsx'
import Product from './components/product.jsx'


const PRODUCTS = [
    { id: 0, src: 'https://i.imgur.com/1w6UFY9.jpg', title: 'Pro Express.js', url: 'http://amzn.to/1D6qiqk' },
    { id: 1, src: 'https://i.imgur.com/mVhn1xd.jpg', title: 'Practical Node.js', url: 'http://amzn.to/NuQ0fM' },
    { id: 2, src: 'http://reactessentials.com/images/react-essentials-italian-book-cover.gif', title: 'Express API Reference', url: 'http://amzn.to/1xcHanf' },
    { id: 3, src: 'http://whatpixel.com/images/2016/02/mastering-react-book-cover.jpg', title: 'React Quickly', url: 'https://www.manning.com/books/reactquickly' },
    { id: 4, src: 'http://reactkungfu.com/assets/images/rbe-cover.png', title: 'Full Stack JavaScript', url: 'http://www.apress.com/9781484217504' }
]

const Heading = () => {
    return <h1>Nile Book Store</h1>
}

const Copy = () => {
    return <p>Please click on a book to view details in a modal. You can copy/paste the link of
the modal. The link will open book on a separate page.</p>
}




class Index extends React.Component {
    render() {
        return (
            <div>
                <Copy />
                <p><Link to="/cart" className="btn btn-danger">Cart</Link></p>
                <div>
                    {PRODUCTS.map(picture => (
                        <Link key={picture.id}
                            to={{
                                pathname: `/products/${picture.id}`,
                                state: {
                                    modal: true,
                                    returnTo: this.props.location.pathname
                                }
                            }
                            }>
                            <img style={{ margin: 10 }} src={picture.src} height="100" />
                        </Link>
                    ))}
                </div> <div></div>
            </div >
        )
    }
}
class App extends Component {
    componentWillReceiveProps(nextProps) {
        this.isModal = (nextProps.location.state &&
            nextProps.location.state.modal)
        if (this.isModal &&
            nextProps.location.key !== this.props.location.key) {
            this.previousChildren = this.props.children
        }
    }
    render() {
        console.log('Modal: ', this.isModal)
        return (
            <div className="well">
                <Heading />
                <div>
                    {(this.isModal) ? this.previousChildren : this.props.children}
                    {(this.isModal) ?
                        <Modal isOpen={true} returnTo={this.props.location.state.returnTo}>
                            {this.props.children}
                        </Modal> : ''
                    }
                </div>
            </div>
        )
    }
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
            <Route path="/products/:id" component={Product} addToCart={addToCart} products={PRODUCTS} />
            <Route path="/cart" component={Cart} cartItems={cartItems} products={PRODUCTS} />
        </Route>

        <Route path="/checkout" component={Checkout} cartItems={cartItems} products={PRODUCTS} />

    </Router>
), document.getElementById('root'))



