import React from "react";

const SearchInputBox = ({ onSearch }) => {
  return (
    <div className=" ps-3 pt-3">
      <input
        type="text"
        placeholder="Search"
        className=" form-control"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInputBox;
