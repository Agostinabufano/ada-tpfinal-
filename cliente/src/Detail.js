import React, { Component } from 'react';
import axios from 'axios';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        price: {},
        breadcrumb: []
      },
      id: this.props.match.params.id,
    }
  }

  componentDidMount() {
    var self = this;
    axios.get(`http://localhost:3000/items/${this.state.id}`)
      .then(function (result) {
        console.log(result.data);

        self.setState({
          product: result.data
        })
      })
  }

  formatDecimals() {
    if (this.state.product.price.decimals === 0) {
      return "";
    }
  }

  render() {
    var categories = this.state.product.breadcrumb.map((c, i) => {
      var clase = 'item';
      if (this.state.product.breadcrumb.length - 1 === i) {
        clase = 'item ' + 'last';

      } else {
        c = c + ' > '
      }
      return <span className={clase}>{c}</span>
    })
    return (
      <div>
        <div className='breadcrumbContainer'>
          <span className="breadcrumb">{categories}</span>
        </div>
        <div className='productDetailContainer' id={this.state.product.id}>
          <div className='pictureAndDescriptionContainer'>
            <div className='pictureContainer'>
              <img src={this.state.product.picture} className='img'></img>
            </div>
            <p><b>Descripción del producto</b></p>
            <span className='description'>{this.state.product.description}</span>
          </div>
          <div className='infoContainer'>
            <span>{this.state.product.condition}</span>
            <p><b>{this.state.product.title}</b></p>
            <span className='price'>{this.state.product.price.currency}{this.state.product.price.amount}{this.formatDecimals(this.state.product.price.decimals)}</span>
            <button>Comprar</button>
          </div>
        </div>

      </div>
    );
  }
}

export default Detail;