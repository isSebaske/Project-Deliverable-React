import React, { Component } from "react";
import ProductsList from "./components/productsList";
import { Route, Switch, Redirect } from "react-router-dom";
import Cart from "./components/cartPage";
import NavBar from "./components/navBar";
import Home from "./components/home";
import { getProducts } from "./data/ItemsData";
import _ from "lodash";

class App extends Component {
  state = {
    products: [],
    cartItems: [],
    randomItem: [],
    currentPage: 1,
    pageSize: 3,
    sortColumn: { path: "id", order: "asc" },
    sortGrups: ["id", "name", "description", "price", "quantity"],
    selectedSortGrup: "id",
    searchTerm: "",
  };

  componentDidMount() {
    const products = getProducts();
    const randomItem = products[Math.floor(Math.random() * products.length)];
    console.log(randomItem);
    this.setState({ products, randomItem });
  }

  updateProductQuantity = (id, change) => {
    const updatedProducts = [...this.state.products];
    const productIndex = updatedProducts.findIndex(
      (product) => product.id === id
    );

    if (productIndex !== -1) {
      updatedProducts[productIndex].quantity += change;
      this.setState({ products: updatedProducts });
    }
  };

  handleAddToCart = (id) => {
    const cartItems = [...this.state.cartItems] || [];
    const matchProductIndex = this.state.products.findIndex((i) => i.id === id);
    const matchProduct = this.state.products[matchProductIndex];
    const existingProductIndex = cartItems.findIndex((item) => item.id === id);

    if (existingProductIndex !== -1) {
      const availableQuantity = matchProduct.quantity;

      if (availableQuantity > 0) {
        cartItems[existingProductIndex].quantity++;
        this.updateProductQuantity(id, -1);
      }
    } else {
      cartItems.push({ ...matchProduct, quantity: 1 });
      this.updateProductQuantity(id, -1);
    }

    this.setState({ cartItems });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.setState({ sortColumn, selectedSortGrup: path });
  };

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm, currentPage: 1 });
  };

  handleClearCart = () => {
    const cartItems = [];
    this.setState({ cartItems });
  };

  handleRandomItem = () => {
    const randomItem =
      this.state.products[
        Math.floor(Math.random() * this.state.products.length)
      ];

    return { randomItem };
  };

  getFilteredProducts = () => {
    const { products, searchTerm, sortColumn } = this.state;

    const filtered = searchTerm
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : products;

    return _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  };

  render() {
    const {
      products,
      cartItems,
      currentPage,
      pageSize,
      sortColumn,
      selectedSortGrup,
      searchTerm,
      sortGrups,
      randomItem,
    } = this.state;

    return (
      <div className="App">
        <NavBar />
        <div>
          <Switch>
            <Route
              path="/home"
              render={() => <Home randomItem={randomItem} />}
            />
            <Route
              path="/shop/cart"
              render={() => (
                <Cart
                  cartItems={cartItems}
                  onClearCart={this.handleClearCart}
                />
              )}
            />
            <Route
              path="/shop/"
              render={() => (
                <ProductsList
                  products={products}
                  cartItems={cartItems}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  sortColumn={sortColumn}
                  sortGrups={sortGrups}
                  selectedSortGrup={selectedSortGrup}
                  searchTerm={searchTerm}
                  onAddToCart={(id) => this.handleAddToCart(id)}
                  onPageChange={this.handlePageChange}
                  onSort={this.handleSort}
                  onSearch={this.handleSearch}
                  getFilteredProducts={this.getFilteredProducts}
                />
              )}
            />
            <Redirect from="/" exact to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
