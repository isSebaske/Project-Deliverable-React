import React, { Component } from "react";

class Product extends Component {
  state = {};
  render() {
    const { product } = this.props;

    return (
      <div className="card btn btn-light p-0">
        <div className="card-header p-0 bg-white border-0 ">
          <img
            src={product.image}
            alt={product.description}
            className="img-fluid rounded-top"
            id="img"
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title mb-2">{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
                <p className="card-text">Quantity: {product.quantity} ID: {product.id}</p>
                <button className="btn btn-primary">${product.price}</button>
        </div>
      </div>
    );
  }
}

export default Product;
