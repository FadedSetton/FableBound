import { Schema, model } from 'mongoose';
const adventureSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    currentNode: {
        type: Schema.Types.ObjectId,
        ref: 'StoryNode',
    },
    storyLog: [{
            type: Schema.Types.ObjectId,
            ref: 'StoryNode',
        }],
});
const Adventure = model('Adventure', adventureSchema);
export default Adventure;
