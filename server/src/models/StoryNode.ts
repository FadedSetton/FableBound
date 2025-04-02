import { Schema,model,Types,Document } from 'mongoose';

export interface Choice {
    text: string;
    nextNode?: Types.ObjectId;
}

export interface IStoryNode extends Document {
    text: string;
    choices: Choice[];
    isAI: boolean;
    createdAt: Date;
}

const choiceSchema = new Schema<Choice>({
    text:{
        type:String,
        required:true,
        trim:true,
    },
    nextNode:{
        type:Schema.Types.ObjectId,
        ref:'StoryNode',
    },
}, 
    {_id:false,} // Disable automatic _id generation for subdocuments
);

const storyNodeSchema = new Schema<IStoryNode>({
    text:{
        type:String,
        required:true,
        trim:true,
    },
    choices:[choiceSchema],
    isAI:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

const StoryNode = model<IStoryNode>('StoryNode',storyNodeSchema);
export default StoryNode;