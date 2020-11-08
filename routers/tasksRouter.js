const express = require("express");
const router = express.Router();
const middleware = require("../Middlewares/authorizationMiddleware");
const schema = require("./../Models");

router.get("/", middleware, async (req, res) => {
  try {
    const tasks = await schema.Task.find({ user: req.user._id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", middleware, async (re1, res) => {
  try {
    const task = new schema.Task({ ...req.body, user: req.user._id });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", middleware, (req, res) => {});

router.delete("/:id", middleware, (req, res) => {});

module.exports = router;
