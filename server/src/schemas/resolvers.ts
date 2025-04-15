import { AuthenticationError } from "apollo-server-express";
import { User, Adventure, StoryNode } from "../models/index.js";
import { signToken } from "../utils/auth.js";
import { Types } from "mongoose";
import { generateStoryNode } from "../utils/openai.js";

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
 //       currentNode: ,
      });
      return adventure;
    },
    advanceAdventure: async (_parent: any, { adventureId, choiceText }: any, context: any) => {
      if (!context.user) throw new AuthenticationError('Not logged in');

      const adventure = await Adventure.findById(adventureId).populate('currentNode');
      if (!adventure) throw new Error('Adventure not found');

    //  adventure.currentNode = adventureId;

      if (!adventure.currentNode) {
        throw new Error('Adventure has no current node');
      }

      const currentNode = await StoryNode.findById(adventure.currentNode);
      if (!currentNode) throw new Error('Current node not found');

      //TODO clear up beginning prompt and function 
      const prompt = `Welcome to FableBound a fantasy adventure game. Please select the start of your adventure based
      on the following choices: ${currentNode.text} 
      Player chose ${choiceText}.
      Please provide the next story node text and choices.`;

      // PLacecholder for AI function
      const aiResponseText = await generateStoryNode(prompt); 
      //TODO: Call OpenAI function here

      const nextNode = await StoryNode.create({
        text: aiResponseText,
        choices:[
          { text: 'Attack' },
          { text: 'Run' },
          { text: 'Talk' },
          { text: 'Inspect' },
        ],
        isAI: true,
      });

      adventure.storyLog.push(adventure.currentNode);
      adventure.currentNode = nextNode._id as Types.ObjectId;

      await adventure.save();
      return adventure.populate('currentNode storyLog');
    },

  }
}

export default resolvers;
