import {Schema,model,Types,Document} from 'mongoose';

export interface IAventure extends Document {
    title: string;
    userId: Types.ObjectId;
    characterName: string;
    characterClass?: string;
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
    characterName: {
        type: String,
        required: true,
        trim: true,
      },
    characterClass:{
        type:String,
        required:true,
        enum:['Warrior','Mage','Rogue','Ranger'],
        trim:true,
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
