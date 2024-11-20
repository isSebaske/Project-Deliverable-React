import React from "react";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <div className="title-section my-5">
        <h1 className="staggered-title">
          <span className="line">What</span>
          <br />
          <span className="line">I.S</span>
          <br />
          <span className="line">Fashion</span>
        </h1>
      </div>

      <div className="p-4 mt-5">
        <h2 className="mb-4">Featured Item</h2>
        <div className="placeholder bg-light p-5 rounded shadow-sm">
          <p className="text-muted">Placeholder for the featured item.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
