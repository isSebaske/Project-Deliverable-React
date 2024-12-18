import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddAndRemoveBtn from "./com/addAndRemoveBtn";

class Cart extends Component {
  state = {
    orderSubmitted: false,
  };

  handleCheckout = () => {
    this.setState({ orderSubmitted: true });
    this.props.onClearCart();
  };

  render() {
    const { cartItems } = this.props;
    const { orderSubmitted } = this.state;

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return (
      <div className="container my-5">
        <h2 className="text-center mb-4">Shopping Cart</h2>

        {orderSubmitted ? (
          <div className="alert alert-success text-center">
            <h4>Your order has been successfully submitted!</h4>
          </div>
        ) : (
          <div>
            {cartItems.length === 0 ? (
              <p className="text-center text-muted">Your cart is empty.</p>
            ) : (
              <div>
                <div className="row row-cols-1 row-cols-md-2">
                  {cartItems.map((item, index) => (
                    <div key={index} className="col mb-4">
                      <div className="card shadow-sm">
                        <div className="card-body d-flex justify-content-between">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">
                            <strong>Quantity:</strong> {item.quantity}
                          </p>

                          <p className="card-text">
                            <strong>Item Total:</strong> $
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                          <AddAndRemoveBtn
                            addOrRemove={(change) =>
                              this.props.onAddOrReamove(item._id, change)
                            }
                          />
                        </div>
                        <img
                          src={item.image}
                          alt={item.description}
                          className="img-fluid rounded-top"
                          id="img"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                  <h5>Total: ${totalPrice.toFixed(2)}</h5>
                  <button
                    className="btn btn-dark shadow-sm"
                    onClick={this.handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-4">
          <Link className="btn btn-outline-dark shadow-sm" to="/shop">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
}

export default Cart;
