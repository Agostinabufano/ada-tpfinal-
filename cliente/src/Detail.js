import React, { Component } from 'react';
import axios from 'axios';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        price:{}
      },
      id: this.props.match.params.id,
    }
  }

  componentDidMount() {
    var self = this;
    axios.get(`http://localhost:3000/items/${this.state.id}`)
      .then(function (result) {
        console.log(result);
        
        self.setState({
          product: result.data
        })        
      })
  }

  render() {
    return (
      <div>
        <div className={this.state.product.id}>
          <img src={this.state.product.picture}></img>
          <span>{this.state.product.title}</span>;
          <span>{this.state.product.price.currency}{this.state.product.price.amount}{this.state.product.price.decimals}</span>;
          <span>{this.state.product.condition}</span>;
          <span>{this.state.product.free_shipping}</span>;
          <span>{this.state.product.location}</span>;
          <span>{this.state.product.category}</span>;
          <span>{this.state.product.description}</span>
          <button>Comprar</button>
        </div>
      </div>
    );
  }
}

export default Detail;