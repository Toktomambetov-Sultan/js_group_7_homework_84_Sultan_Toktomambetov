const mongoose = require("mongoose");

const UserModel = require("./Models/UserModel");
const TaskModel = require("./Models/TaskModel");

const User = mongoose.model("User", UserModel);
const Task = mongoose.model("Task", TaskModel);

module.exports = {
  User,
  Task,
};
