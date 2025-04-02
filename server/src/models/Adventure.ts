import {Schema,model,Types,Document} from 'mongoose';

export interface IAventure extends Document {
    title: string;
    userId: Types.ObjectId;
    createdAt: Date;
    currentNode?: Types.ObjectId;
    storyLog: Types.ObjectId[];
}

const adventureSchema = new Schema<IAventure>({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    currentNode:{
        type:Schema.Types.ObjectId,
        ref:'StoryNode',
    },
    storyLog:[{
        type:Schema.Types.ObjectId,
        ref:'StoryNode',
    }],
})

const Adventure = model<IAventure>('Adventure',adventureSchema);
export default Adventure;
