
import { User } from '../models/index.js';
import process from 'process';


const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from School collection
    await User.deleteMany({});
    console.log('Tought collection cleaned.');

// import { Thought } from '../models/index.js';
// import process from 'process';

// const cleanDB = async (): Promise<void> => {
//   try {
//     // Delete documents from School collection
//     await Thought.deleteMany({});
//     console.log('Tought collection cleaned.');


//   } catch (err: unknown) {
//     console.error('Error cleaning collections:', err);
//     process.exit(1);
//   }
// };

// export default cleanDB;
