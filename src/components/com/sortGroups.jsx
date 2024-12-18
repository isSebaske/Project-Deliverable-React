import React from "react";

const SortGroups = (props) => {
  const { onSort, sortGrups, selectedSortGrup } = props;
  return (
    <div className="SortGroups mt-3 ms-3 ">
      <h3>Sort By</h3>
      <ul className="list-group border border-dark btn-group-vertical shadow ">
        {sortGrups.map((path) => (
          <li
            onClick={() => onSort(path.toLowerCase())}
            key={path}
            className={
              path.toLowerCase() === selectedSortGrup.toLowerCase()
                ? "list-group-item btn btn-outline-dark active "
                : "list-group-item btn btn-outline-dark "
            }
          >
            {path === "Severity.name" ? "Severity" : path}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortGroups;
