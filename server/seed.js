const mongoose = require("mongoose");
const User = require("./models/User");
const Item = require("./models/Item");

// Predefined users
const users = [
  {
    email: "test@test.com",
    password: "testpassword",
    permission: true,
  },
  {
    email: "test2@test.com",
    password: "testpassword",
    permission: false,
  },
];

// Predefined products
const products = [
  {
    name: "Shirt",
    description: "T-shirt White with logo",
    price: 15.99,
    quantity: 10,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHQlMjBzaGlydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Jacket",
    description: "Leather Jacket",
    price: 79.99,
    quantity: 20,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMGphY2tldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Hat",
    description: "Baseball cap with logo",
    price: 21.99,
    quantity: 5,
    image:
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aGF0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Sun Glasses",
    description: "Polarized sun glasses",
    price: 12.99,
    quantity: 100,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Phone Case",
    description: "iPhone 10 case",
    price: 24.99,
    quantity: 50,
    image:
      "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZSUyMGNhc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];

// Main seeding function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1/CapstoneProject");
    console.log("Connected to MongoDB...");

    // Insert users
    await User.insertMany(users);
    console.log("Users added successfully!");

    // Insert products
    await Item.insertMany(products);
    console.log("Products added successfully!");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (err) {
    console.error("Error seeding the database:", err);
    mongoose.disconnect();
  }
};

seedDatabase();
