import * as chalk from 'chalk';
import * as mongoose from 'mongoose';

import { config } from './config';

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodb.uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.green('Connected to MongoDB successfully'));
  } catch (error) {
    console.log(
      chalk.red(`There was a problem with MongoDB connection, error: ${error}`)
    );
  }
};
