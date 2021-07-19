import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://elysee:o96CmmauPhTCJFc0@cluster0.kcjzc.mongodb.net/test_db?retryWrites=true&w=majority',
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: true,
        },
      ),
  },
];
