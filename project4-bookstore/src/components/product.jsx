import React, { Component } from 'react';
import { Link } from 'react-router'

class Product extends Component {
    constructor(props) {
        super(props)
        this.handleBuy = this.handleBuy.bind(this)
    }
    handleBuy(event) {
        this.props.route.addToCart(this.props.params.id)
    }
    render() {
        return (
            <div>
                <img src={this.props.route.products[this.props.params.id].src}
                    style={{ height: '90%' }} />
                <p>{this.props.route.products[this.props.params.id].title}</p>
                <Link
                    to={{
                        pathname: `/cart`,
                        state: { productId: this.props.params.id }
                    }}
                    onClick={this.handleBuy}
                    className="btn btn-primary">
                    Buy
                </Link>
            </div >
        )
    }
}
export default Product;
