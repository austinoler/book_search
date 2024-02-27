const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('savedBooks');
        return user;
      }
      throw new Error('Not authenticated');
    },
    getUser: async (_, { userId }) => {
      const user = await User.findById(userId).populate('savedBooks');
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Can't find this user");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Wrong password!');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { bookId, authors, description, title, image, link }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: { bookId, authors, description, title, image, link } } },
          { new: true, runValidators: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw new Error('Not authenticated');
    },
    deleteBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw new Error('Not authenticated');
    },
  },
};

module.exports = resolvers;
