require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();

const connect = require("./db/connect");

app.use(express.json());

// SECTION Routes

const { CustomAPIError } = require("./errors/errors");
const userRouter = require("./routes/user");
const burgerRouter = require("./routes/burgers");
const checkoutRouter = require("./routes/checkout");

app.get("/", (req, res) => {
  res.send("Burgers API");
});

app.use("/api/v1/burgers", burgerRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/checkout", checkoutRouter);

app.use((err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again later." });
});

// SECTION Start Server

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
