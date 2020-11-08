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

router.post("/", middleware, async (req, res) => {
  try {
    const task = new schema.Task({ ...req.body, user: req.user._id });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", middleware, async (req, res) => {
  try {
    const task = await schema.Task.updateOne(
      {
        user: req.user._id,
        _id: req.params.id,
      },
      {
        ...req.body,
        user: req.user._id,
      }
    );
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", middleware, async (req, res) => {
  try {
    const task = await schema.Task.findOneAndRemove({
      user: req.user._id,
      _id: req.params.id,
    });
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
