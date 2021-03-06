const schema = require("./../Models");
const myMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    return res.status(401).send({ error: "Token not provided!" });
  }
  const user = await schema.User.findOne({
    token,
  });
  if (!user) return res.status(401).send({ error: "Token is wrong." });
  req.user = user;
  next();
};
module.exports = myMiddleware;
