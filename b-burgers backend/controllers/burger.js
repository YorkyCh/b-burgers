const Burger = require("../models/burger");
const { NotFoundError } = require("../errors/errors");
const { StatusCodes } = require("http-status-codes");

// SECTION Get all burgers
const getBurgers = async (req, res) => {
  console.log("Fetching all burgers");
  const burgers = await Burger.find({});
  console.log("Burgers fetched:", burgers);

  res.status(StatusCodes.OK).json({ length: burgers.length, burgers });
};

// SECTION Get one burger
const getBurger = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log("Fetching burger with id:", id);
  const burger = await Burger.findById(id);

  if (!burger) {
    console.error(`No burger found with id: ${id}`);
    throw new NotFoundError(`No burger with id : ${id}`);
  }

  console.log("Burger found:", burger);
  res.status(StatusCodes.OK).json({ burger });
};

// SECTION Create a burger
const createBurger = async (req, res) => {
  try {
    const burger = await Burger.create({ ...req.body });
    console.log("New burger created:", burger);
    res.status(StatusCodes.CREATED).json({ created: burger });
  } catch (error) {
    console.error("Error creating burger:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

// SECTION Update a burger
const updateBurger = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;



  try {
    const updatedBurger = await Burger.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBurger) {
      console.error(`No burger found with id: ${id}`);
      throw new NotFoundError(`No burger with id: ${id}`);
    }

    console.log("Updated burger:", updatedBurger);
    res.status(StatusCodes.OK).json({ burger: updatedBurger });
  } catch (error) {
    console.error("Error updating burger:", error);
    if (error instanceof NotFoundError) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: error.message });
    }
    res.status(StatusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

// SECTION Delete a burger
const deleteBurger = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const burger = await Burger.findByIdAndDelete(id);

    console.log("Burger deleted:", burger);
    res.status(StatusCodes.OK).send("Successfully deleted");
  } catch (error) {
    console.log("Error deleting burger:", error);
    throw new NotFoundError(`No burger with id : ${id}`);
  }
};

module.exports = {
  getBurgers,
  getBurger,
  createBurger,
  updateBurger,
  deleteBurger,
};
