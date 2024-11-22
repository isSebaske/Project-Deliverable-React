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

    this.setState({ products, randomItem });
  }

  updateProductQuantity = (id, change) => {
    const updatedProducts = this.state.products.map((product) => {
      if (product.id === id) {
        const newQuantity = product.quantity + change;
        if (newQuantity >= 0) {
          return { ...product, quantity: newQuantity };
        }
      }
      return product;
    });

    this.setState({ products: updatedProducts });
  };

  updateCartItemQuantity = (id, change) => {
    const cartItems = [...this.state.cartItems];
    const product = this.state.products.find((product) => product.id === id);
    const cartItemIndex = cartItems.findIndex((item) => item.id === id);

    if (cartItemIndex !== -1) {
      const cartItem = cartItems[cartItemIndex];

      if (product.quantity !== 0 || (product.quantity === 0 && change === -1)) {
        cartItem.quantity += change;
      }
      if (cartItem.quantity <= 0) {
        cartItems.splice(cartItemIndex, 1);
      }
    } else if (change > 0 && product.quantity >= 1) {
      cartItems.push({ ...product, quantity: 1 });
    }

    this.setState({ cartItems });
  };

  handleAddOrReamove = (id, change) => {
    if (change === 1) {
      this.updateCartItemQuantity(id, 1);
      this.updateProductQuantity(id, -1);
    } else {
      this.updateCartItemQuantity(id, -1);
      this.updateProductQuantity(id, 1);
    }
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
    const randName = this.state.randomItem.name;
    console.log(randName);
    this.setState({ searchTerm: randName });
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
              render={() => (
                <Home
                  randomItem={randomItem}
                  onRandomTiem={this.handleRandomItem}
                />
              )}
            />
            <Route
              path="/shop/cart"
              render={() => (
                <Cart
                  cartItems={cartItems}
                  onClearCart={this.handleClearCart}
                  onAddOrReamove={(id, change) =>
                    this.handleAddOrReamove(id, change)
                  }
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
                  onAddOrReamove={(id, change) =>
                    this.handleAddOrReamove(id, change)
                  }
                  onPageChange={this.handlePageChange}
                  onSort={this.handleSort}
                  onSearch={this.handleSearch}
                  searchTerm={searchTerm}
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
