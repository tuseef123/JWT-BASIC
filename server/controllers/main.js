const { BadRequest } = require("../errors");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  console.log("i was called");
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECERT, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secert: `Here is your authorized data. your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
