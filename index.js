const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const app = express();

const usersRouter = require("./routers/usersRouter");
const tasksRouter = require("./routers/tasksRouter");

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/myapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(error);
  }
  console.log("Mongo connected.");
  app.use(express.json());

  app.use("/users", usersRouter);
  app.use("/tasks", tasksRouter);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port.`);
  });
};

run();
