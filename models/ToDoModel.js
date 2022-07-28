const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  item: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
});

module.exports = mongoose.model("todo", todoSchema);
