const { unauthenticated } = require("../errors");
const jwt = require("jsonwebtoken");
const autheticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unauthenticated("Something bad has happend");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERT);
    const { username, id } = decoded;
    req.user = { username, id };
    next();
  } catch (error) {
    throw new unauthenticated("Not authorized to access this route");
  }
};

module.exports = autheticationMiddleware;
