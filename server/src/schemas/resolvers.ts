import { AuthenticationError } from "apollo-server-express";
import { User, Adventure, StoryNode } from "../models/index.js";
import { signToken } from "../utils/auth.js";

const resolvers = {

  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in');
      }
      return await User.findById(context.user._id);
    },

    getAdventure: async (_parent: any, { id }: { id: string }) => {
      return await Adventure.findById(id).populate('currentNode storyLog');
    },

    myAdventures: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await Adventure.find({ userId: context.user._id }).populate('currentNode storyLog');
    },

    getStoryNode: async (_parent: any, { id }: { id: string }) => {
      return await StoryNode.findById(id);
    },
  },

  Mutation: {
    createUser: async (_parent: any, { username, email, password }: any) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (_parent: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('No user found with this email');

      const validPw = await user.isCorrectPassword(password);
      if (!validPw) throw new AuthenticationError('Incorrect password');

      const token = signToken(user);
      return { token, user };
    },

    createAdventure: async (_parent: any, { title, characterName, characterClass }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      const adventure = await Adventure.create({
        title,
        characterName,
        characterClass,
        userId: context.user._id,
        storyLog: [],
      });
      return adventure;
    },
  }
}

export default resolvers;
