import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, addToCart, restock, loggedInUser }) => {
  return (
    <div className="card shadow p-0 border border-dark">
      <div className="card-header p-0 bg-white border-bottom border-dark ">
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
        <p className="card-text">Quantity: {product.quantity}&nbsp;</p>
        {product.quantity === 0 ? (
          <button
            className="btn btn-outline-dark disabled"
            onClick={() => addToCart(product._id)}
          >
            Out Of Stock
          </button>
        ) : (
          <button
            className="btn btn-outline-dark"
            onClick={() => addToCart(product._id)}
          >
            ${product.price}
          </button>
        )}
        {loggedInUser.permission ? (
          <Link
            className="btn btn-outline-dark m-1"
            // onClick={restock}
            to={`/shop/${product._id}`}
          >
            Change
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Product;
