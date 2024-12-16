const express = require("express");
const router = express.Router();
const { Item, validateItem } = require("../models/Item");

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) return res.status(404).send({ message: "Item not found" });

  res.send(item);
});

router.post("/", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newItem = new Item(req.body);

  try {
    const savedItem = await newItem.save();
    res.status(201).send(savedItem);
    console.log(savedItem);
  } catch (err) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    image: req.body.image,
  });

  if (!updatedItem) return res.status(404).send("Item not found.");

  res.send(updatedItem);
});

router.delete("/:id", async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.params.id);

  if (!deletedItem) return res.status(404).send({ message: "Item not found" });

  res.send({ message: "Item deleted successfully", item: deletedItem });
});

module.exports = router;
