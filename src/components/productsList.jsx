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
  products,
  onAddToCart,
  onPageChange,
  onSort,
  onSearch,
  getFilteredProducts,
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
        <SearchInputBox onSearch={onSearch} />
      </div>

      {paginatedProducts.map((item) => (
        <div className="col-3 p-5 mt-2" key={item.id}>
          <Product product={item} addToCart={() => onAddToCart(item.id)} />
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
        <SideCart cartItems={cartItems} />
      </div>
    </div>
  );
};

export default ProductsList;
