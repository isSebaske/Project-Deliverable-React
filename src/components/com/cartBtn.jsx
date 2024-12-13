import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CartBtn = ({ text }) => {
  return (
    <div>
      <Link className="btn btn-outline-dark shadow-sm" to="/cart">
        {text}
      </Link>
    </div>
  );
};

export default CartBtn;
