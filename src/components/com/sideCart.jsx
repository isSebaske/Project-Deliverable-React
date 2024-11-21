import React from "react";
import CartBtn from "./cartBtn";

const SideCart = ({ cartItems }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <aside className="border border-dark p-3" id="aside">
      <h5 className="text-center">Your Cart</h5>
      <div>
        {cartItems.map((item, index) => (
          <div key={index} className="card mb-2">
            <div className="card-body p-2">
              <p className="card-text mb-1">{item.name}</p>
              <p className="card-text mb-1">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <div className="mt-3 text-center">
          <h6>Total: ${totalPrice.toFixed(2)}</h6>
          <CartBtn text="Check Out" />
        </div>
      )}
    </aside>
  );
};

export default SideCart;
