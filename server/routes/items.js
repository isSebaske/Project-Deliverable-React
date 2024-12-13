const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully", item: deletedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
