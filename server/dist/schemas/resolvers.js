import { Thought } from '../models/index.js';
const resolvers = {
    Query: {
        thoughts: async () => {
            return await Thought.find().sort({ createdAt: -1 });
        },
        thought: async (_parent, { thoughtId }) => {
            return await Thought.findOne({ _id: thoughtId });
        },
    },
    Mutation: {
        addThought: async (_parent, { input }) => {
            const thought = await Thought.create({ ...input });
            return thought;
        },
        addComment: async (_parent, { thoughtId, commentText }) => {
            return await Thought.findOneAndUpdate({ _id: thoughtId }, {
                $addToSet: { comments: { commentText } },
            }, {
                new: true,
                runValidators: true,
            });
        },
        removeThought: async (_parent, { thoughtId }) => {
            return await Thought.findOneAndDelete({ _id: thoughtId });
        },
        removeComment: async (_parent, { thoughtId, commentId }) => {
            return await Thought.findOneAndUpdate({ _id: thoughtId }, { $pull: { comments: { _id: commentId } } }, { new: true });
        },
    },
};
export default resolvers;
