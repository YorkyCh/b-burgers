const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/errors");

// SECTION Register route
const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.createJWT();

    res
      .status(StatusCodes.CREATED)
      .json({ user: { name: user.name, email: user.email }, token });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

// SECTION Login route
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const token = user.createJWT();

    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name, id: user._id }, token });
  } catch (error) {
    throw error;
  }
};

// TESTING Delete Route Temporaty

const deleteUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(StatusCodes.OK).send("All users deleted");
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

module.exports = {
  register,
  login,
  deleteUsers,
};
