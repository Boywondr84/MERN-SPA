const { Schema, model } = require("mongoose");

const cookieSchema = new Schema({
  cookieName: {
    type: String,
    required: true,
    unique: true,
  },
  //cookie_id can reference both orders and reviews.. got this syntax from a Googlesearch
  // cookie_id: {
  //   type: Schema.Types.ObjectId,
  //   references: { type: [Schema.Types.ObjectId], refPath: "model_type" },
  //   model_type: { type: String, enum: ["orders", "reviews"], required: true },
  // },
  //image will be a string that is the http link to the image like in Book-engine?
  image: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  //we can just put Wheat, Dairy, Egg, Peanut, Soy, and Tree nut here as applicable when add cookie to DB
  allergens: [
    {
      type: String,
    },
  ],
  //need all the reviews with this cookieType's _id to (.populate) when cookie queried
  reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
});

const Cookie = model("cookies", cookieSchema);

module.exports = Cookie;