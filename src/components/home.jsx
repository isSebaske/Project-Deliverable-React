import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = ({ randomItem, onRandomTiem }) => {
  return (
    <div className="container text-center mt-5">
      <div className="title-section my-5">
        <h1 className="staggered-title">
          <p className="line">What </p>

          <p className="line"> I.S. </p>

          <p className="line"> Fashion</p>
        </h1>
      </div>
      <div>
        <h3>
          At I.S. Fashion, we believe fashion is more than clothing—it's a way
          to Inspire Style and Illuminate Confidence. From casual must-haves to
          refined evening looks, I.S. Fashion is your go-to for trends that
          empower and timeless pieces that endure. Redefine your wardrobe and
          discover the confidence that comes with impeccable style.
        </h3>
      </div>
      <div>
        <h2 className="mb-4">Featured Item</h2>
        <div id="randomItem" className="shadow p-0">
          <img
            src={randomItem.image}
            alt={randomItem.description}
            className="img-fluid rounded-top"
            id="img"
          />
          <p>{randomItem.name}</p>
          <p>{randomItem.description}</p>
          <Link to="/shop">
            <button className="btn btn-outline-dark" onClick={onRandomTiem}>
              Get
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
