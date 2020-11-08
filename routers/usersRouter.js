const express = require("express");
const router = express.Router();
const schema = require("./../Models");

router.get("/", async (req, res) => {
  try {
    res.send(await schema.User.find());
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new schema.User(req.body);
    user.generateToken();
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/sessions", async (req, res) => {
  const user = await schema.User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send({ error: "username not found." });
  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) return res.status(400).send({ error: "Password is wrong." });
  user.generateToken();
  await user.save();
  res.send({ message: "Username and password correct.", user });
});

module.exports = router;
