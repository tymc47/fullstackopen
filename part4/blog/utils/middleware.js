const User = require("../model/user");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else request.token = null;

  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    request.user = await User.findById(decodedToken.id);
  }

  if (request.user) console.log("current user:", request.user.username);

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "Unauthorized",
    });
  }
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  userExtractor,
  errorHandler,
  morgan,
};
