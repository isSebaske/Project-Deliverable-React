import React, { Component } from "react";
import ProductsList from "./com/productsList";
import { getProducts } from "./data/ItemsData";

class App extends Component {

  state = { products: getProducts() } 

  render() {
    return (
      <div className="App d-flex justify-content-center"><ProductsList products={ this.state.products } /></div>
    );
  }
}

export default App;
