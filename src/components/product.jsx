import React, { Component } from "react";

class Product extends Component {
  state = {};
  render() {
    const { product, addToCart } = this.props;

    return (
      <div className="card btn btn-outline-dark shadow p-0">
        <div className="card-header p-0 bg-white border-0 ">
          <img
            src={product.image}
            alt={product.description}
            className="img-fluid rounded-top"
            id="img"
          />
        </div>
        <div className="card-body text-center ">
          <h5 className="card-title mb-2">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">
            Quantity: {product.quantity} ID: {product.id}
          </p>
          {product.quantity === 0 ? (
            <button
              className="btn btn-primary disabled"
              onClick={() => addToCart(product.id)}
            >
              Out Of Stock
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              ${product.price}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Product;
