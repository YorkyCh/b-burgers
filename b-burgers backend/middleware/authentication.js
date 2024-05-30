const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/errors");

const authenticateUser = async (req, res, next) => {
  // INFO Check if Authorization header is present
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  // INFO Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // INFO Attach the user to the request object
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authenticateUser;
