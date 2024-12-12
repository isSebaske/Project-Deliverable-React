import React from "react";
import Product from "./product";
import { paginate } from "../utils/paginate";
import Pagination from "./com/pagination";
import SortGroups from "./com/sortGroups";
import SideCart from "./com/sideCart";
import SearchInputBox from "./com/searchInput";

const ProductsList = ({
  currentPage,
  pageSize,
  selectedSortGrup,
  sortGrups,
  cartItems,
  onAddOrReamove,
  onPageChange,
  onSort,
  onSearch,
  searchTerm,
  getFilteredProducts,
  restock,
  loggedInUser,
}) => {
  const filteredProducts = getFilteredProducts();
  const paginatedProducts = paginate(filteredProducts, currentPage, pageSize);

  return (
    <div className="row container-fluid">
      <div className="col-2 ps-5 pe-5">
        <SortGroups
          onSort={onSort}
          sortGrups={sortGrups}
          selectedSortGrup={selectedSortGrup}
        />
        <SearchInputBox onSearch={onSearch} value={searchTerm} />
      </div>

      {paginatedProducts.map((item) => (
        <div className="col-3 p-5 mt-2" key={item._id}>
          <Product
            product={item}
            addToCart={() => onAddOrReamove(item._id, 1)}
            restock={() => restock(item._id, 1)}
            loggedInUser={loggedInUser}
          />
        </div>
      ))}

      <div className="offset-6 col ps-5">
        <Pagination
          itemsCount={filteredProducts.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>

      <div>
        <SideCart
          cartItems={cartItems}
          addOrRemove={(id, change) => onAddOrReamove(id, change)}
        />
      </div>
    </div>
  );
};

export default ProductsList;
