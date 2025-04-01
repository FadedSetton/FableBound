import { Thought } from '../models/index.js';
import process from 'process';
const cleanDB = async () => {
    try {
        // Delete documents from School collection
        await Thought.deleteMany({});
        console.log('Tought collection cleaned.');
    }
    catch (err) {
        console.error('Error cleaning collections:', err);
        process.exit(1);
    }
};
export default cleanDB;
