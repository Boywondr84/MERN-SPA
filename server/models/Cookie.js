const { Schema, model } = require("mongoose");
const reviewSchema = require("./Review");

const cookieSchema = new Schema(
  {
    cookieName: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      unique: true,
    },
    //we can just put Wheat, Dairy, Egg, Peanut, Soy, and Tree nut here as applicable when creating cookies in the DB
    allergens: [
      {
        type: String,
      },
    ],
    // reviews: {
    //   type: [String],
    // },
    //addReview just pushes to this array
    reviews: [reviewSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Cookie = model("cookies", cookieSchema);

module.exports = Cookie;
