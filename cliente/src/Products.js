import React, { Component } from 'react';
import Product from "./Product";
import axios from 'axios';
import { log } from 'util';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      keyword: "",
    }
    this.searchParams = this.searchParams.bind(this)
  }

  componentDidMount() {
    var self = this;
    axios.get(`http://localhost:3000/items?search=${this.searchParams()}`)
      .then(function (result) {
        self.setState({
          products: result.data.items,
          keyword: self.searchParams()
        })
      })
  }

  componentDidUpdate() {
    var self = this;   
    if (this.state.keyword != this.searchParams()){
     axios.get(`http://localhost:3000/items?search=${this.searchParams()}`)
      .then(function (result) {
        self.setState({
          products: result.data.items,
          keyword: self.searchParams()
        })
      })
    } 
  }

  searchParams() {
    var search = window.location.search;
    search = search.slice(1, search.length);
    search = search.split("=");
    return search[1];
  }

  render() {
    return (
      <div>
        <div className="searchedProducts">
          {this.state.products.map(function (x, y) {
            return (
              <Product product={x} key={y}></Product>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Products;