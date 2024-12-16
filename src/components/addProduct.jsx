import React, { Component } from "react";
import Joi from "joi-browser";
import { saveItem, getItem, deleteItem } from "../data/ItemsData";

class AddProduct extends Component {
  state = {
    data: {
      _id: "",
      name: "",
      description: "",
      price: "",
      quantity: "",
      image: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string().allow(""),
    name: Joi.string().required().label("Name"),
    description: Joi.string().required().label("Description"),
    price: Joi.number().required().positive().label("Price"),
    quantity: Joi.number().required().integer().positive().label("Quantity"),
    image: Joi.string().uri().required().label("Image URL"),
  };

  async populateItem() {
    try {
      const itemId = this.props.match.params.id;
      if (itemId === "new") return;

      const { data: item } = await getItem(itemId);
      this.setState({ data: this.mapToViewModel(item) });
    } catch (ex) {
      // if (ex.response && ex.response.status === 404)
      //   this.props.history.replace("/");
    }
  }

  async componentDidMount() {
    await this.populateItem();
  }

  mapToViewModel(item) {
    return {
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    };
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const { _id, ...itemData } = this.state.data;

    if (_id) {
      await saveItem(this.state.data);
    } else {
      await saveItem(itemData);
    }
    this.props.products();
    this.props.history.push("/shop");
  };

  handleDelete = async () => {
    if (!this.state.data._id) return;

    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteItem(this.state.data._id);
      this.props.products();
      this.props.history.push("/shop");
    }
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <div className="form-group mb-2">
        <label className="form-label">{label}</label>
        <input
          type={type}
          name={name}
          value={data[name]}
          onChange={this.handleChange}
          className="form-control form-control-sm"
        />
        {errors[name] && typeof errors[name] === "string" && (
          <div className="text-danger">{errors[name]}</div>
        )}
      </div>
    );
  }

  renderButton(label) {
    return (
      <button
        className="btn btn-primary btn-sm w-100"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  }

  render() {
    return (
      <div className="container-sm mt-4">
        {!this.props.loggedInUser.permission ? (
          <div className="h1">Page Not Found</div>
        ) : (
          <div className="d-flex justify-content-center">
            <form
              onSubmit={this.handleSubmit}
              className="col-md-6 col-sm-8 p-3 border rounded"
            >
              {this.renderInput("name", "Name")}
              {this.renderInput("description", "Description")}
              {this.renderInput("price", "Price", "number")}
              {this.renderInput("quantity", "Quantity", "number")}
              {this.renderInput("image", "Image URL", "url")}
              <br />
              <div className="d-flex justify-content-between">
                {this.renderButton("Save")}
                {this.state.data._id && (
                  <button
                    type="button"
                    className="btn btn-danger ms-3"
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default AddProduct;
