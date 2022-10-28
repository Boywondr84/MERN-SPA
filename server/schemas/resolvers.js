const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Cookie, Subscription, Review } = require("../models");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("reviews")
          .populate("subscriptions");
        console.log(userData);

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    getCookie: async (parent, args) => {
      const cookie = await Cookie.findOne({ cookieName: args.cookieName }); //cookieName needs to match the name clicked on ??
      return cookie;
    },
    getCookies: async (parent) => {
      const cookies = await Cookie.find({});
      return cookies;
    }
},
    // // get all users
    // // replaced thoughts with reviews and friends with cookies
    // only query in typedefs is me

        //     throw new AuthenticationError('Not logged in');
        // },

        // cookie: async () => {

        // }
        // // get all users
        // // replaced thoughts with reviews and friends with cookies 
        // only query in typedefs is me
        //is users and user needed?
        
        // users: async () => {
        //     return User.find()
        //         .select('-__v -password')
        //         .populate('cookies')
        //         .populate('reviews');
        // },
        // // get a user by username
        // user: async (parent, { username }) => {
        //     return User.findOne({ username })
        //         .select('-__v -password')
  
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    removeCookie: async (parent, { cookieName }, context) => {
      if (context.user) {
        const updatedSubscription = await Subscription.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedCookies: { cookieName } } },
          { new: true }
        );
        return updatedSubscription;
      }
    },

    addCookie: async (parent, { cookieName }, context) => {
      if (context.user) {
        const updatedSubscription = await Subscription.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedCookies: { cookieName } } },
          { new: true }
        );
        return updatedSubscription;
      }
    },
    //this is to put cookies inthe DB!
    createCookie: async (parent, { cookieName, description, allergens }) => {
      const newCookie = await Cookie.create({
        cookieName,
        description,
        allergens,
      });
      return newCookie;
    },

    //create a new review on a cookie
    addReview: async (parent, { cookieReviewed, reviewText }) => {
      // if (context.user){
      const reviewData = await Review.create({ cookieReviewed, reviewText });

      const updatedCookie = await Cookie.findOneAndUpdate(
        { cookieName: cookieReviewed },
        { $push: { reviews: reviewData } },
        { new: true }
      );
      return updatedCookie;
      //}
      //throw new AuthenticationError("you need to be logged in!");
    },

    deleteReview: async (parent, args, context) => {
      if (context.user) {
        const updatedCookie = await Cookie.findOneAndUpdate(
          { _id: cookie._id },
          { $pull: { reviews: { reviewId: args._id } } },
          { new: true }
        );
        return updatedCookie;
      }
      throw new AuthenticationError("you need to be logged in!");
    },
    addSubscription: async (parent, args, context) => {
      if (context.user) {
        const subscriptionData = await Subscription.create(args);
        console.log(subscriptionData);
        const userData = await User.findOneAndUpdate(
          { _id: context.user._id },
          { subscription: subscriptionData._id },
          { new: true }
        );
        console.log(userData);
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    deleteSubscription: async (parent, args, context) => {
      if (context.user) {
      }
    },
  },

};
module.exports = resolvers;
