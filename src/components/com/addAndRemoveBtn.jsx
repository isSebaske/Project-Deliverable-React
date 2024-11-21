import React from "react";

const AddAndRemoveBtn = ({ i }) => {
  return (
    <div className={i !== "v" ? "btn-group" : "btn-group-vertical"}>
      <button className="btn btn-sm btn-outline-dark">+</button>
      <button className="btn btn-sm btn-outline-dark">-</button>
    </div>
  );
};

export default AddAndRemoveBtn;
