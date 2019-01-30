import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import free_shipping from './img/Icono_Envio.png'

class Product extends Component {
    constructor(props) {
        super(props);
    }

    formatDecimals() {
        if (this.props.product.price.decimals === 0) {
            return "";

        }
    }

    formatAmount(price) {
        return Intl.NumberFormat('es-AR', { maximumSignificantDigits: 3, currency: 'ARG' }).format(price)
    }

    render() {
        return (
            <div id={this.props.product.id} className="productContainer">
                <div className="productImg">
                    <Link to={'/items/' + this.props.product.id}><img src={this.props.product.picture}></img></Link>
                </div>
                <div className="priceContainer">
                    <span>{this.props.product.price.currency}   {this.formatAmount(this.props.product.price.amount)}{this.formatDecimals(this.props.product.price.decimals)}</span>
                    <span>{this.props.product.free_shipping}</span>{this.props.product.free_shipping === true && <img className="shippingImg" src={free_shipping}></img>}
                    <span>{this.props.product.title}</span>
                </div>
                <div className="location">
                    <span>{this.props.product.location}</span>
                </div>
                {/* <span>{this.props.product.category}</span> */}
            </div>
        );
    }
}

export default Product;