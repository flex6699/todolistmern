const router = require("express").Router();

const todoItemsModel = require("../models/ToDoModel");

router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
      isCompleted: req.body.isCompleted,
    });
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

//data from database

router.get("/api/item", async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch {
    res.json(err);
  }
});

// update database

router.put("/api/item/:id", async (req, res) => {
  try {
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Item Updated");
  } catch (err) {
    res.json(err);
  }
});

router.delete("/api/item/:id", async (req, res) => {
  try {
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("item deleted");
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
