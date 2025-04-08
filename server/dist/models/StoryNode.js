import { Schema, model } from 'mongoose';
const choiceSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    nextNode: {
        type: Schema.Types.ObjectId,
        ref: 'StoryNode',
    },
}, { _id: false, } // Disable automatic _id generation for subdocuments
);
const storyNodeSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    choices: [choiceSchema],
    isAI: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const StoryNode = model('StoryNode', storyNodeSchema);
export default StoryNode;
