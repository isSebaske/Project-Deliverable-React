import React, { Component } from 'react';
import Product from './product';

class ProductsList extends Component {
  render() {
    return (
      <div className=' container row p-0 d-flex justify-content-center'>
        {this.props.products.map((product) => (
          <div className=' col-sm-4 p-3'><Product product={product} /></div>
        ))}
      </div>
    );
  }
}
 
export default ProductsList;