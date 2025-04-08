import db from '../config/connection.js';
import { User } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json'};
//import thoughtData from './thoughtData.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    // bulk create each model
    await User.create(userData);
    //await Thought.insertMany(thoughtData);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error: unknown) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
