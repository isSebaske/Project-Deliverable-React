import React from "react";

const AddAndRemoveBtn = ({ addOrRemove, i }) => {
  return (
    <div className={i !== "v" ? "btn-group" : "btn-group-vertical"}>
      <button
        className="btn btn-sm btn-outline-dark"
        onClick={() => addOrRemove(1)}
      >
        +
      </button>
      <button
        className="btn btn-sm btn-outline-dark"
        onClick={() => addOrRemove(-1)}
      >
        -
      </button>
    </div>
  );
};

export default AddAndRemoveBtn;
