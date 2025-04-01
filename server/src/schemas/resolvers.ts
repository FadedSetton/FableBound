import { Thought } from '../models/index.js';

// Define types for the arguments
interface ThoughtArgs {
  thoughtId: string;
}

interface AddThoughtArgs {
  input:{
    thoughtText: string;
    thoughtAuthor: string;
  }
}

interface AddCommentArgs {
  thoughtId: string;
  commentText: string;
}

interface RemoveCommentArgs {
  thoughtId: string;
  commentId: string;
}

const resolvers = {
  Query: {
    thoughts: async () => {
      return await Thought.find().sort({ createdAt: -1 });
    },
    thought: async (_parent: unknown, { thoughtId }: ThoughtArgs) => {
      return await Thought.findOne({ _id: thoughtId });
    },
  },
  Mutation: {
    addThought: async (_parent: unknown, { input }: AddThoughtArgs) => {
        const thought = await Thought.create({ ...input });
        return thought;
    },
    addComment: async (_parent: unknown, { thoughtId, commentText }: AddCommentArgs) => {
      return await Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (_parent: unknown, { thoughtId }: ThoughtArgs) => {
      return await Thought.findOneAndDelete({ _id: thoughtId });
    },
    removeComment: async (_parent: unknown, { thoughtId, commentId }: RemoveCommentArgs) => {
      return await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

export default resolvers;
