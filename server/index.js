const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const items = require("./routes/items");
const users = require("./routes/users");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1/CapstoneProject");

app.use("/api/items", items);
app.use("/api/users", users);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
