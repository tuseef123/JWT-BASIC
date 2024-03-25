const CustomAPIError = require("./custom-error");
const BadRequest = require("./bad-request");

const unauthenticated = require("./unauthenticated");

module.exports = {
  CustomAPIError,
  BadRequest,
  unauthenticated,
};
