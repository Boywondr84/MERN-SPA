const { Schema, model } = require("mongoose");
// const dateFormat = require("../utils/dateFormat");
const cookieSchema = require("./Cookie.js");
const orderSchema = new Schema({
  cookies: {
    type: String,
    required: true,
  },
  //assigning the logged in user's _id to this property, can it be a string?
  email: {
    type: String,
    required: true,
  },

  //this could just be how many dozen cookies.. one, two, three etc
  total: {
    type: String,
    required: true,
  },
});

const Order = model("orders", orderSchema);

module.exports = Order;
