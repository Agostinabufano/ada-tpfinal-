import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Product extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.product.id}>
                <Link to={'/items/'+ this.props.product.id}><img src={this.props.product.picture}></img></Link>
                <span>{this.props.product.title}</span>;
                <span>{this.props.product.price.currency}{this.props.product.price.amount}{this.props.product.price.decimals}</span>;
                <span>{this.props.product.condition}</span>;
                <span>{this.props.product.free_shipping}</span>;
                <span>{this.props.product.location}</span>;
                <span>{this.props.product.category}</span>; 
            </div>
        );
    }
}

export default Product;