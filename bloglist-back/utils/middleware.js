const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token"
    });
  }
  console.log("error:", error.message);
  next(error);
};

const tokenExtractor = (request, response, next) => {
  if (Object.getOwnPropertyNames(request.headers).includes("authorization")) {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      const token = authorization.substring(7);
      Object.assign(request, { token: token });
    } else {
      return null;
    }
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
