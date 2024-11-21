import React from "react";

const SearchInputBox = ({ onSearch, value }) => {
  return (
    <div className="  ps-3 pt-3">
      <input
        type="text"
        placeholder="Search"
        className="border border-dark form-control"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInputBox;
