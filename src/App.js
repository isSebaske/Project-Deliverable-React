import React, { Component } from "react";
import ProductsList from "./components/productsList";
import { Route, Switch, Redirect } from "react-router-dom";
import Cart from "./components/cartPage";
import NavBar from "./components/navBar";
import Home from "./components/home";
import LoginPage from "./components/loginPage";
import AddProduct from "./components/addProduct";
import { getUsers } from "./data/userData";
import { getItems } from "./data/ItemsData";
import _ from "lodash";

class App extends Component {
  state = {
    products: [],
    cartItems: [],
    randomItem: [],
    currentPage: 1,
    pageSize: 3,
    sortColumn: { path: "name", order: "asc" },
    sortGrups: ["name", "description", "price", "quantity"],
    selectedSortGrup: "name",
    searchTerm: "",
    loggedInUser: {
      email: "",
      permission: false,
    },
  };

  async componentDidMount() {
    const { data } = await getItems();
    console.log(await getItems());
    const randomItem = await data[Math.floor(Math.random() * data.length)];

    this.setState({ products: data, randomItem });
  }

  updateProductQuantity = (id, change) => {
    const updatedProducts = this.state.products.map((product) => {
      if (product._id === id) {
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
    const product = this.state.products.find((product) => product._id === id);
    const cartItemIndex = cartItems.findIndex((item) => item._id === id);

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
    this.setState({ searchTerm: randName });
  };

  handleLogin = (email, password) => {
    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.setState({ loggedInUser: user });
      return true;
    } else {
      return false;
    }
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
      loggedInUser,
    } = this.state;

    return (
      <div className="App">
        <NavBar loggedInUser={loggedInUser} />
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
              path="/cart"
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
              path="/shop/:id"
              render={(props) => (
                <AddProduct
                  {...props}
                  loggedInUser={loggedInUser}
                  products={products}
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
                  restock={(id, change) =>
                    this.updateProductQuantity(id, change)
                  }
                  onPageChange={this.handlePageChange}
                  onSort={this.handleSort}
                  onSearch={this.handleSearch}
                  searchTerm={searchTerm}
                  getFilteredProducts={this.getFilteredProducts}
                  loggedInUser={loggedInUser}
                />
              )}
            />
            <Route
              path="/login"
              render={() => <LoginPage onLogin={this.handleLogin} />}
            />
            <Redirect from="/" exact to="/home" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
