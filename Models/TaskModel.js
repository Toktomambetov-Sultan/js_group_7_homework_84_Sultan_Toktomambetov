const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    queue: ["new", "in_progress", "complete"],
    default: "new",
  },
});

module.exports = TaskModel;