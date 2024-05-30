const Checkout = require("../models/checkout");
const Burger = require("../models/burger");
const { getItemIndexInCheckout, updateItemQuantity } = require("../utils");

// SECTION 1: Create a new checkout
const createCheckout = async (req, res) => {
  try {
    const { user, burgerId } = req.body;

    const burger = await Burger.findById(burgerId);
    if (!burger) {
      throw new Error("Burger not found");
    }

    const checkout = await Checkout.findOne({ user, status: "pending" });
    if (checkout) {
      throw new Error("Checkout already exists");
    }

    const newCheckout = new Checkout({
      user,
      items: [
        {
          burger: burger._id,
          name: burger.name,
          price: burger.price,
          quantity: 1,
        },
      ],
    });

    await newCheckout.save();
    return res.status(201).json({ newCheckout });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// SECTION 2: Get checkouts by user

const getCheckoutsByUser = async (req, res) => {
  const { user } = req.params;

  const checkouts = await Checkout.find({ user });

  res.status(200).json({ checkouts });
};

// SECTION 2: Get checkout
const getCheckout = async (req, res) => {
  const { id } = req.params;

  const checkout = await Checkout.findById(id);

  res.status(200).json({ checkout });
};

// SECTION 3: Update checkout
const updateCheckout = async (req, res) => {
  const { id } = req.params;
  const { status, quantity, burgerId } = req.body;

  try {
    const checkout = await Checkout.findById(id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    if (burgerId) {
      const burgerIndex = getItemIndexInCheckout(checkout.items, burgerId);
      if (burgerIndex === -1) {
        // Burger not found in the checkout
        if (typeof quantity === "number" && quantity > 0) {
          // Add a new item to the checkout
          const burger = await Burger.findById(burgerId);
          if (!burger) {
            return res.status(400).json({ message: "Burger not found" });
          }
          checkout.items.push({
            burger: burger._id,
            name: burger.name,
            price: burger.price,
            quantity: quantity,
          });
        } else {
          // Quantity is 0 or negative, return an error
          return res.status(400).json({ message: "Invalid quantity" });
        }
      } else {
        // Burger found in the checkout, update the quantity
        if (typeof quantity === "number") {
          updateItemQuantity(checkout, burgerIndex, quantity);
        }
      }
    }

    if (status) {
      checkout.status = status;
    }

    await checkout.save();
    res.status(200).json({ checkout });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCheckout,
  getCheckout,
  updateCheckout,
  getCheckoutsByUser,
};
