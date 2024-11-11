import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand ms-3" to="/">
        I.S Fashion
      </Link>
      <div>
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/home">
            Home
          </NavLink>
          <NavLink className="nav-item nav-link" to="/shop">
            Shop
          </NavLink>
          <NavLink className="nav-item nav-link" to="/shop/cart">
            Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;