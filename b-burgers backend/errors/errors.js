const { StatusCodes } = require("http-status-codes");

class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
};
